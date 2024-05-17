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
                    <img src="/imgs/home.svg" alt="imagem" /> <p className="abanome">Home</p>
                </Link>
                <Link
                    to="/carrinho"
                    className={`aba cart ${activeLink === "/carrinho" ? "active" : ""}`}
                >
                    <img src="/imgs/shopping-cart.svg" alt="imagem" /> <p className="abanome">Carrinho</p>
                </Link>
                <Link
                    to="/produtos"
                    className={`aba products ${activeLink === "/produtos" ? "active" : ""}`}
                >
                    <img src="/imgs/shopping-bag.svg" alt="imagem" /><p className="abanome">Produtos</p>
                </Link>
            </footer>
            <Outlet />
        </>
    );
}

export default Rodape;
