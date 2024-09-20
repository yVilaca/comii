import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./deitado.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";

function ItemD(props) {
  const { addToCart } = useContext(CartContext);

  function Adicionar() {
    const item = {
      id: props.id,
      nome: props.nome,
      preco: props.preco,
      img: props.img,
      desc: props.desc,
      quantidade: 1,
    };

    // Adiciona o item ao carrinho
    addToCart(item);

    // Exibe a notificação sempre
    toast.success(`${props.nome} adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      draggablePercent: 40,
    });
  }

  return (
    <div id="div-item2">
      <ul id="deitado-flex">
        <li>
          <img src={props.img} alt={props.nome} />
        </li>
        <li id="info-item2">
          <p id="nome-item2">{props.nome}</p>
          <p id="desc-item2">{props.desc}</p>
          <div id="flex-preco">
            <p>R$ {props.preco.toFixed(2)}</p>
            <button onClick={Adicionar}>
              Incluir ao carrinho
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ItemD;
