const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        popup: "./src/popup/popup.jsx",
        background: "./src/background.js",
        popupCss: "./src/popup/popup.css",
        scriptCss: "./src/script/script.css",
        scriptIndex: "./src/script/index.jsx",
        scriptApp: "./src/script/script.jsx",
        Layout: "./src/script/components/Layout/index.jsx",
        Panel: "./src/script/components/Panel/index.jsx",
        Home: "./src/script/components/Home/index.jsx",
        Profiles: "./src/script/components/DiscordTools/Profiles/index.jsx",
        Spammer: "./src/script/components/DiscordTools/Spammer/index.jsx",
        ServersCleaner:
            "./src/script/components/DiscordTools/ServersCleaner/index.jsx",
        Joiner: "./src/script/components/DiscordTools/Joiner/index.jsx",
        Binance: "./src/script/components/Monitors/Binance/index.jsx",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/popup/popup.html",
            filename: "popup.html",
            chunks: ["popupCss", "popup"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/script/script.html",
            filename: "script.html",
            chunks: [
                "scriptCss",
                "scriptIndex",
                "scriptApp",
                "Panel",
                "Home",
                "Layout",
                "Profiles",
                "DIY",
                "ServersCleaner",
                "Joiner",
                "Binance",
            ],
        }),
        new CopyPlugin({
            patterns: [{ from: "public" }],
        }),
    ],
};
