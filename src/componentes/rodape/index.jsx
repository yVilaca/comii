import React, { useState } from "react";
import "./rodape.css";
import { Outlet, Link } from "react-router-dom";

function Rodape() {
    const [selectedTab, setSelectedTab] = useState(null);

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <>
            <footer>
                <Link to="/home" className={`aba home ${selectedTab === "home" ? "selected" : ""}`} onClick={() => handleTabClick("home")}>
                    <img src="./imgs/help-arrow.svg"/> Home
                </Link>
                <Link to="/carrinho" className={`aba cart ${selectedTab === "carrinho" ? "selected" : ""}`} onClick={() => handleTabClick("carrinho")}>
                    Carrinho
                </Link>
                <Link to="/produtos" className={`aba products ${selectedTab === "produtos" ? "selected" : ""}`} onClick={() => handleTabClick("produtos")}>
                    Produtos
                </Link>
            </footer>
            <Outlet />
        </>
    );
}

export default Rodape;
