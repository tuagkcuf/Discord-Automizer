import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/index.jsx";
import Home from "./components/Home/index.jsx";
import Profiles from "./components/DiscordTools/Profiles/index.jsx";
import Joiner from "./components/DiscordTools/Joiner/index.jsx";
import Spammer from "./components/DiscordTools/Spammer/index.jsx";
import ServersCleaner from "./components/DiscordTools/ServersCleaner/index.jsx";
import Binance from "./components/Monitors/Binance/index.jsx";
import "./script.css";

function Script() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/discord-tools">
                        <Route path="profiles" element={<Profiles />} />
                        <Route path="joiner" element={<Joiner />} />
                        <Route path="spammer" element={<Spammer />} />
                        <Route
                            path="servers-cleaner"
                            element={<ServersCleaner />}
                        />
                    </Route>
                    <Route path="/monitors">
                        <Route path="binance" element={<Binance />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </>
    );
}

export default Script;
