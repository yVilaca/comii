import React, { useState, useEffect } from "react";
import "./rodape.css";
import { Outlet, Link, useLocation } from "react-router-dom";

function Rodape() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [mesaParam, setMesaParam] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
    const searchParams = new URLSearchParams(location.search);
    const mesa = searchParams.get("mesa");
    setMesaParam(mesa ? mesa : "");
  }, [location.pathname, location.search]);

  const isActiveLink = (link) => {
    if (link === "/carrinho") {
      return activeLink === link || activeLink.startsWith("/carrinho/");
    }
    return activeLink === link;
  };

  return (
    <>
      <footer>
        <Link
          to="/home"
          className={`aba home ${isActiveLink("/home") ? "active" : ""}`}
        >
          <img src="/imgs/home.svg" alt="imagem" /> <p className="abanome">Home</p>
        </Link>
        <Link
          to={`/carrinho/${mesaParam}`}
          className={`aba cart ${isActiveLink("/carrinho") ? "active" : ""}`}
        >
          <img src="/imgs/shopping-cart.svg" alt="imagem" /> <p className="abanome">Carrinho</p>
        </Link>
        <Link
          to="/produtos"
          className={`aba products ${isActiveLink("/produtos") ? "active" : ""}`}
        >
          <img src="/imgs/shopping-bag.svg" alt="imagem" /><p className="abanome">Produtos</p>
        </Link>
      </footer>
      <Outlet />
    </>
  );
}

export default Rodape;
