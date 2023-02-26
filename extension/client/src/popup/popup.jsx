import React, { useState } from "react";
import { createRoot } from "react-dom/client"
import "./popup.css"

function Popup() {
    const [state, setState] = useState(false)

    function toggleBtnActiv() {
        const btn = document.querySelector(".button")
        btn.classList.toggle("pressedBtn")
        btn.classList.toggle("hover-btn")
        setState(!state)
    }

    return (
        <div className="main-div">
            <h1 className="main-name">Innuendo Solutions</h1>
            <button className="button hover-btn" onClick={toggleBtnActiv}>{state ? 'ON' : 'OFF'}</button>
            <div className="soft-open" onClick={chrome.runtime.openOptionsPage}>Перейти к софту</div>
        </div>
    )
}

const app = document.getElementById("react-target")
const root = createRoot(app)
root.render(<Popup />)