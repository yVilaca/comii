// Categorias.js
import "./categorias.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Categorias() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  // Define o link ativo baseado na localização atual
  useEffect(() => {
    if (location.pathname === "/produtos" || location.pathname === "/produtos/bebidas") {
      setActiveLink("/produtos/bebidas");
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

  // Redireciona para a rota de bebidas se estiver na rota de produtos
  useEffect(() => {
    if (location.pathname === "/produtos") {
      navigate("/produtos/bebidas", { replace: true });
    }
  }, [location.pathname, navigate]);

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
