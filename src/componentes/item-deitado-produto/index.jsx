import React, { useContext, useCallback } from "react";
import "./deitado-produto.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";

const ItemDBebidas = React.memo(({ id, nome, preco, img, desc }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdicionar = useCallback(() => {
    const item = { id, nome, preco, img, desc, quantidade: 1 };
    const result = addToCart(item);
    if (result) {
      toast.success(`${nome} adicionado ao carrinho!`, {
        draggablePercent: 40,
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [id, nome, preco, img, desc, addToCart]);

  return (
    <div className="deitado">
      <ul className="list-deitado">
        <li className="imgProduto">
          <img src={img} alt={nome} />
        </li>
        <li className="info-deitado">
          <p className="nomeItem">{nome}</p>
          <p className="descItem">{desc}</p>
          <div id="flex-preco">
            <p>R$ {preco.toFixed(2)}</p>
          </div>
        </li>
        <button onClick={handleAdicionar} id="mais">
          <img src="/imgs/mais.svg" alt="Adicionar" />
        </button>
      </ul>
    </div>
  );
});

export default ItemDBebidas;
