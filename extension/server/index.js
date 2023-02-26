import discord from "./discord.js";
import binance from "./binance.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Profiles } from "./models/Profiles.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

mongoose
    .connect(process.env.LINK_MONGOOSE_LOGIN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to db"))
    .catch(console.error);

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // dsabled for securty on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/creators", async (req, res) => {
    const profiles = await Profiles.find();
    res.send(profiles);
});

app.post("/creators/new/password", async (req, res) => {
    await discord.initialize();
    const data = await discord.loginWithPassword(
        req.body.login,
        req.body.password
    );
    if (data) {
        const profiles = new Profiles({
            name: data.name,
            token: data.token,
        });
        await profiles.save();
        res.json(profiles);
    } else {
        res.send(false);
    }
});

app.post("/creators/new/token", async (req, res) => {
    await discord.initialize();
    const data = await discord.loginWithToken(req.body.token);

    if (data) {
        const profiles = new Profiles({
            name: data.name,
            token: data.token,
        });
        await profiles.save();
        res.json(profiles);
    } else {
        res.send(false);
    }
});

app.post("/spammer", async (req, res) => {
    await discord.initialize();

    const messages = req.body.messages;
    const token = req.body.accounts;
    const delayMax = req.body.delayMax;
    const delayMin = req.body.delayMin;
    const link = req.body.link;
    const data = await discord.spammer(
        messages,
        token,
        delayMax,
        delayMin,
        link
    );

    res.send(data);
});

app.post("/creators/delete/:id", async (req, res) => {
    const result = await Profiles.findByIdAndDelete(req.params.id);

    res.send(result);
});

app.post("/joiner", async (req, res) => {
    await discord.initialize();

    const data = await discord.joiner(req.body.accounts, req.body.links);

    res.send(data);
});

app.post("/cleaner", async (req, res) => {
    await discord.initialize();

    const data = await discord.serversCleaner(req.body.accounts);

    res.send(data);
});

// binance
app.get("/binance/monitor/login", async (req, res) => {
    const data = await binance.login();

    res.send(data);
});

app.get("/binance/monitor/buy/BUSD", async (req, res) => {
    const data = await binance.monitorBuyBUSD();

    res.send(data);
});

app.get("/binance/monitor/sell/BUSD", async (req, res) => {
    const data = await binance.monitorSellBUSD();

    res.send(data);
});

app.get("/binance/monitor/buy/USDT", async (req, res) => {
    const data = await binance.monitorBuyUSDT();

    res.send(data);
});

app.get("/binance/monitor/sell/USDT", async (req, res) => {
    const data = await binance.monitorSellUSDT();

    res.send(data);
});

app.listen(port, () => console.log(`started on port ${port}`));
