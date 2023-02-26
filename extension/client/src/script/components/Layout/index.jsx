import { Outlet } from "react-router-dom";
import "./index.css";
import styled from "styled-components";
import Panel from "../Panel/index.jsx";

const App = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: white;
`;

const Layout = () => {
    return (
        <App>
            <Panel />
            <Outlet />
        </App>
    );
};

export default Layout;
