import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import * as dotenv from "dotenv";

dotenv.config();

const binance = {
    browser: null, 
    page: null,

    initialize: async () => {
        puppeteer.use(StealthPlugin());
        puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
        console.log("initializing");

        binance.browser = await puppeteer.launch({
            headless: false,
        });

        binance.page = await binance.browser.newPage();
        await binance.page.setViewport({
            width: 1600,
            height: 900,
        });
    },
    login: async () => {
        try {
            // login manually
            await Promise.all([
                binance.page.waitForNavigation({ timeout: 120000 }),
                binance.page.goto(process.env.LINK_BINANCE_LOGIN, {
                    waitUntil: "networkidle2",
                }),
            ]);
        } catch (error) {
            console.log(error);
        }
    },
    getData: async () => {
        // get names, statistics (price, amount, limit), payments through xpath selectors and sort them to get arrays of elements
        const names = await binance.page.$x(
            "//a[@class=' css-vurnku'][starts-with(@href, /en/adver)]"
        );
        const statistics = await binance.page.$x(
            "//div[text()='Price']/following-sibling::div"
        );
        const price = [];
        const amount = [];
        const limit = [];

        for (let i = 2; i < 15; i += 3) {
            price.push(statistics[i - 2].$x("//*[1]").textContent);
            amount.push(statistics[i - 1].$x("//*[2]").textContent);
            limit.push(statistics[i].$x("//*[2]").textContent);
        }

        // comrehensive work with selectors
        const paymentsDivs = await binance.page.$x(
            "//div[text()='Price']/parent::div/parent::div/following-sibling::div"
        );
        const payments = await paymentsDivs.map(
            (payment) => payment.$x("//*/div").textContent
        );

        // create users' arrays with all statistics, take only first 5 users
        const users = [];

        for (let i = 0; i < 5; i++) {
            users.push({
                name: names[i],
                price: price[i],
                amount: amount[i],
                limit: limit[i],
                payments: payments[i],
            });
        }

        return users;
    },
    monitorBuyBUSD: async () => {
        try {
            await binance.page.waitForTimeout(5000);

            await Promise.all([
                binance.page.waitForNavigation(),
                binance.page.goto(process.env.LINK_BUYBUSD),
            ]);

            return binance.getData();
        } catch (error) {
            console.log("there was an error");
        }
    },
    monitorSellBUSD: async () => {
        try {
            await binance.page.waitForTimeout(5000);

            await Promise.all([
                binance.page.waitForNavigation(),
                binance.page.goto(process.env.LINK_SELLBUSD),
            ]);

            return binance.getData();
        } catch (error) {
            console.log("there was an error");
        }
    },
    monitorBuyUSDT: async () => {
        try {
            await binance.page.waitForTimeout(5000);

            await Promise.all([
                binance.page.waitForNavigation(),
                binance.page.goto(process.env.LINK_BUYUSDT),
            ]);

            return binance.getData();
        } catch (error) {
            console.log("there was an error");
        }
    },
    monitorSellUSDT: async () => {
        try {
            await binance.page.waitForTimeout(5000);

            await Promise.all([
                binance.page.waitForNavigation(),
                binance.page.goto(process.env.LINK_SELLUSDT),
            ]);

            return binance.getData();
        } catch (error) {
            console.log("there was an error");
        }
    },
};
