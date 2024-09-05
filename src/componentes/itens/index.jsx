import React, { useContext } from "react";
import "./itens.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";

function Itens(props) {
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

    // Adiciona o item ao carrinho e verifica o resultado
    const result = addToCart(item);

    // Se o item foi adicionado, exibe a notificação
    if (result) {
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
    } else {
      // Exibe uma notificação se o item não foi adicionado
      toast.error(
        `${props.nome} não pode ser adicionado ao carrinho porque já há 10 ou mais unidades.`,
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          draggablePercent: 40,
        }
      );
    }
  }

  return (
    <div className="item-container">
      <ul id="item-geral">
        <img src={props.img} alt={props.nome} />
        <li id="linha-1">
          <p>{props.nome}</p>
        </li>
        <li id="desc-item">{props.desc}</li>
        <li id="preco">R$ {props.preco.toFixed(2)}</li>
        <button onClick={Adicionar}>Incluir ao carrinho</button>
      </ul>
    </div>
  );
}

export default Itens;
