import React, { useContext, useCallback } from "react";
import "./ProductCard.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProductCard = ({ viewType = "home", ...props }) => {
  const cardClassName = `product-card ${viewType}-view ${
    props.className || ""
  }`;
  const { addToCart } = useContext(CartContext);

  const handleAdicionar = useCallback(() => {
    const item = {
      id: props.id,
      nome: props.nome,
      preco: props.preco,
      img: props.img,
      desc: props.desc,
      quantidade: 1,
    };
    addToCart(item);
    toast.success(`${props.nome} adicionado!`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  }, [props.id, props.nome, props.preco, props.img, props.desc, addToCart]);

  return (
    <motion.div
      className={cardClassName}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="product-image">
        <img src={props.img} alt={props.nome} loading="lazy" />
      </div>

      <div className="product-content">
        <h3 className="product-title">{props.nome}</h3>
        <p className="product-description">{props.desc}</p>

        <div className="product-footer">
          <span className="product-price">R$ {props.preco.toFixed(2)}</span>
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
