import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./categorias.css";
import { ProdutoService } from "../../services/ProdutoService";
import { supabase } from "../../lib/supabase";

const Categorias = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (
      location.pathname === "/produtos" ||
      location.pathname === "/produtos/bebidas"
    ) {
      setActiveLink("/produtos/bebidas");
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/produtos") {
      navigate("/produtos/bebidas", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const data = await ProdutoService.buscarProdutosPorCategoria(
        activeLink.split("/").pop()
      );
      setProdutos(data);
    };

    fetchProdutos();
  }, [activeLink]);

  useEffect(() => {
    const subscription = supabase
      .from("produtos")
      .on("INSERT", (payload) => {
        fetchProdutos();
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const renderLink = useCallback(
    (to, label) => (
      <Link
        to={to}
        className={`categorias ${
          activeLink === `/produtos/${to}` ? "active2" : ""
        }`}
      >
        {label}
      </Link>
    ),
    [activeLink]
  );

  return (
    <nav className="categorias-geral">
      {renderLink("bebidas", "Bebidas")}
      {renderLink("sobremesas", "Sobremesas")}
      {renderLink("entradas", "Entradas")}
    </nav>
  );
};

export default React.memo(Categorias);
