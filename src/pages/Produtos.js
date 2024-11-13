import React, { Suspense, memo, useState } from "react";
import NavBar from "../componentes/topbar";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./produtos.css";

const categories = [
  { id: "entradas", icon: "🍟", label: "Entradas" },
  { id: "bebidas", icon: "🍹", label: "Bebidas" },
  { id: "sobremesas", icon: "🍨", label: "Sobremesas" },
];

const Produtos = memo(() => {
  const [activeTab, setActiveTab] = useState("entradas");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/produtos/${tab}`);
  };

  return (
    <div className="produtos-page">
      <NavBar />

      <div className="produtos-header">
        <nav className="category-nav">
          {categories.map(({ id, icon, label }) => (
            <button
              key={id}
              className={`category-btn ${activeTab === id ? "active" : ""}`}
              onClick={() => handleTabChange(id)}
            >
              <motion.div
                className="category-content"
                whileTap={{ scale: 0.95 }}
              >
                <span className="category-icon">{icon}</span>
                <span className="category-label">{label}</span>
                {activeTab === id && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.div>
            </button>
          ))}
        </nav>
      </div>

      <motion.main
        className="produtos-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Suspense fallback={<ProductsSkeleton />}>
          <Outlet />
        </Suspense>
      </motion.main>
    </div>
  );
});

const ProductsSkeleton = () => (
  <div className="products-grid">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="product-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-price"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Produtos;
