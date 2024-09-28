import React, { useContext, useCallback } from "react";
import "./itens.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";

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
      progress: undefined,
      draggablePercent: 40,
    });
  }, [id, nome, preco, img, desc, addToCart]);

  return (
    <div className="item-container">
      <ul id="item-geral">
        <img src={img} alt={nome} />
        <li id="linha-1">
          <p>{nome}</p>
        </li>
        <li id="desc-item">{desc}</li>
        <li id="preco">R$ {preco.toFixed(2)}</li>
        <button onClick={handleAdicionar}>Incluir ao carrinho</button>
      </ul>
    </div>
  );
});

export default Itens;
