import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./categorias.css";

const Categorias = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

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
