import "./categorias.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Categorias() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <nav className="categorias-geral">
        <Link
          to="bebidas"
          className={`categorias ${activeLink === "/produtos/bebidas" ? "active2" : ""}`}
        >
          Bebidas
        </Link>
        <Link
          to="sobremesas"
          className={`categorias ${activeLink === "/produtos/sobremesas" ? "active2" : ""}`}
        >
          Sobremesas
        </Link>
        <Link
          to="entradas"
          className={`categorias ${activeLink === "/produtos/entradas" ? "active2" : ""}`}
        >
          Entradas
        </Link>
      </nav>
    </div>
  );
}

export default Categorias;
