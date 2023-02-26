import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = proces.env.LINK_DISCORD_LOGIN;

const discord = {
    browser: null,
    page: null,

    initialize: async () => {
        puppeteer.use(StealthPlugin());
        puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
        console.log("initializing");

        discord.browser = await puppeteer.launch({
            headless: false,
        });

        discord.page = await discord.browser.newPage();
        await discord.page.setViewport({
            width: 1600,
            height: 900,
        });
    },
    login: async (token) => {
        try {
            await Promise.all([
                discord.page.waitForNavigation(),
                discord.page.goto(BASE_URL + "/login", {
                    waituntil: "networkidle2",
                }),
            ]);

            await discord.page.evaluate((token) => {
                setInterval(() => {
                    document.body.appendChild(
                        document.createElement`iframe`
                    ).contentWindow.localStorage.token = `"${token}"`;
                }, 50);
                setTimeout(() => {
                    location.reload();
                }, 2500);
            }, token);
        } catch (error) {
            console.log(error);
        }
    },
    loginWithPassword: async (username, password) => {
        try {
            await Promise.all([
                discord.page.waitForNavigation(),
                discord.page.goto(BASE_URL + "/login", {
                    waitUntil: "networkidle2",
                }),
            ]);

            let loginButton = await discord.page.$x('//button[@type="Submit"]');

            await discord.page.type('input[name="email"]', username, {
                delay: 100,
            });
            await discord.page.type('input[name="password"]', password, {
                delay: 95,
            });

            await discord.page.waitForTimeout(5000);

            await Promise.all([
                discord.page.waitForNavigation(),
                loginButton.click(),
            ]);

            try {
                await discord.page.waitForXPath("//div[@id='anchor']", {
                    timeout: 5000,
                });
                const captcha = await discord.page.$x("//div[@id='anchor']");
                if (captcha) {
                    discord.page.waitForTimeout(50000);
                }
            } catch {
                console.log("here is nothing");
            }
            await discord.page.setRequestInterception(true);
            let token;
            discord.page.on("request", (interceptedRequest) => {
                if (
                    interceptedRequest.url() === process.env.LINK_TOKEN_REQUEST
                ) {
                    token = interceptedRequest.headers()["authorization"];
                    return;
                } else {
                    interceptedRequest.continue();
                }
            });

            let [el1] = await discord.page.$x(
                "//div[contains(@class, 'nameTag')]/div/div"
            );
            let [el2] = await discord.page.$x(
                "//div[contains(@class, 'nameTag')]/div[2]"
            );

            await discord.page.waitForTimeout(9000);

            let nickname = await discord.page.evaluate(
                (name) => name.innerText,
                el1
            );
            let id = await discord.page.evaluate((name) => name.innerText, el2);
            let user = {
                name: nickname + id,
                token: token,
            };

            await discord.browser.close();

            return user;
        } catch (error) {
            console.log("error: ", error);
            return false;
        }
    },
    loginWithToken: async (token) => {
        try {
            await discord.page.login(token);

            let [el1] = await discord.page.$x(
                "//div[contains(@class, 'nameTag')]/div/div"
            );
            let [el2] = await discord.page.$x(
                "//div[contains(@class, 'nameTag')]/div[2]"
            );

            await discord.page.waitForTimeout(9000);

            let nickname = await discord.page.evaluate(
                (name) => name.innerText,
                el1
            );
            let id = await discord.page.evaluate((name) => name.innerText, el2);
            let user = {
                name: nickname + id,
                token: token,
            };

            await discord.browser.close();

            return user;
        } catch (error) {
            console.log("error: ", error);
            return false;
        }
    },

    spammer: async (messages, token, link, delayMin, delayMax) => {
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
        try {
            await discord.page.login(token);

            await Promise.all([
                discord.page.waitForNetworkIdle(),
                discord.page.goto(link, { waitUntil: "networkidle0" }),
            ]);

            await discord.page.waitForXPath(
                "//div[contains(text(), 'Написать')]"
            );
            const messageInput = await discord.page.$x(
                "//div[contains(text(), 'Написать')]"
            );

            for (let message of messages) {
                setTimeout(
                    () => messageInput.type(message),
                    getRandomArbitrary(delayMin, delayMax)
                );
            }

            await discord.page.close();

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    joiner: async (tokens, channels) => {
        try {
            for (let token of tokens) {
                discord.page = await discord.browser.newPage();

                await discord.page.login(token);

                for (let channel of channels) {
                    await Promise.all([
                        discord.page.waitForNavigation(),
                        discord.page.goto(channel, {
                            waitUntil: "networkidle0",
                        }),
                    ]);

                    const button = await discord.page.$x(
                        "//div[contains(text(), 'Принять приглашение')]"
                    );

                    await Promise.all([
                        discord.page.waitForNavigation(),
                        button.click(),
                    ]);
                }

                await discord.page.close();
            }

            await discord.browser.close();

            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    },
    serversCleaner: async (tokens) => {
        try {
            for (let token of tokens) {
                discord.page = await discord.browser.newPage();

                await discord.page.login(token);

                const channels = await discord.page.$x(
                    "//div[@aria-label='Серверы']/div"
                );

                for (let channel of channels) {
                    await channel.click({ button: right });
                    await discord.page.waitForTimeout(800);

                    let leaveButton = await discord.page.$x(
                        "//div[contains(text(), 'Покинуть сервер')]"
                    );

                    await leaveButton.click();
                    await discord.page.waitForTimeout(800);

                    leaveButton = await discord.page.$x(
                        "//div[contains(text(), 'Покинуть сервер')]"
                    );

                    await leaveButton.click();

                    await discord.page.close();
                }
            }

            await discord.browser.close();

            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    },
};

export default discord;
