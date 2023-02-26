import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Script from "./script.jsx";

const root = createRoot(document.getElementById("react-target"));
root.render(
    <React.StrictMode>
        <HashRouter basename="/">
            <Script />
        </HashRouter>
    </React.StrictMode>
);
