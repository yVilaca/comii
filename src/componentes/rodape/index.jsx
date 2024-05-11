import React, { useState, useEffect } from "react";
import "./rodape.css";
import { Outlet, Link, useLocation } from "react-router-dom";

function Rodape() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <footer>
                <Link
                    to="/home"
                    className={`aba home ${activeLink === "/home" ? "active" : ""}`}
                >
                    <img src="./imgs/help-arrow.svg" alt="imagem" /> Home
                </Link>
                <Link
                    to="/carrinho"
                    className={`aba cart ${activeLink === "/carrinho" ? "active" : ""}`}
                >
                    Carrinho
                </Link>
                <Link
                    to="/produtos"
                    className={`aba products ${activeLink === "/produtos" ? "active" : ""}`}
                >
                    Produtos
                </Link>
            </footer>
            <Outlet />
        </>
    );
}

export default Rodape;
