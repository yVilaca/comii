import React, { useContext, useCallback } from "react";
import "./ProductCard.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProductCard = ({ id, nome, preco, img, desc }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdicionar = useCallback(() => {
    const item = { id, nome, preco, img, desc, quantidade: 1 };
    addToCart(item);
    toast.success(`${nome} adicionado!`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  }, [id, nome, preco, img, desc, addToCart]);

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="product-image">
        <img src={img} alt={nome} loading="lazy" />
      </div>

      <div className="product-content">
        <h3 className="product-title">{nome}</h3>
        <p className="product-description">{desc}</p>

        <div className="product-footer">
          <span className="product-price">R$ {preco.toFixed(2)}</span>
          <motion.button
            className="add-button"
            onClick={handleAdicionar}
            whileTap={{ scale: 0.95 }}
          >
            Adicionar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);
