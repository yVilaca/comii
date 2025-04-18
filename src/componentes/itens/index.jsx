import React, { useContext, useCallback } from "react";
import "./itens.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Itens = React.memo(({ id, nome, preco, img, desc }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdicionar = useCallback(() => {
    const item = { id, nome, preco, img, desc, quantidade: 1 };
    addToCart(item);
    toast.success(`${nome} adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, [id, nome, preco, img, desc, addToCart]);

  return (
    <motion.div
      className="item-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="item-image">
        <img src={img} alt={nome} loading="lazy" />
      </div>

      <div className="item-contentt">
        <h3 className="item-title">{nome}</h3>
        <p className="item-description">{desc}</p>

        <div className="item-footer">
          <span className="item-price">R$ {preco.toFixed(2)}</span>
          <motion.button
            className="add-cart-button"
            onClick={handleAdicionar}
            whileTap={{ scale: 0.95 }}
          >
            Adicionar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

export default Itens;
