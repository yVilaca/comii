import React, { useContext, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./deitado.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";

const ItemD = React.memo(({ id, nome, preco, img, desc }) => {
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
    <div id="div-item2">
      <ul id="deitado-flex">
        <li>
          <img src={img} alt={nome} />
        </li>
        <li id="info-item2">
          <p id="nome-item2">{nome}</p>
          <p id="desc-item2">{desc}</p>
          <div id="flex-preco">
            <p>R$ {preco.toFixed(2)}</p>
            <button onClick={handleAdicionar}>Incluir ao carrinho</button>
          </div>
        </li>
      </ul>
    </div>
  );
});

export default ItemD;
