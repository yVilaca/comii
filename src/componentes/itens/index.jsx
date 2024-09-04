import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./itens.css";

function Itens(props) {
  function Adicionar() {
    toast.success(`${props.nome} foi incluído ao carrinho!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <ul id="item-geral">
        <img src={props.img} alt={props.nome} />
        <li id="linha-1">
          <p>{props.nome}</p>
        </li>
        <li id="desc-item">{props.desc}</li>
        <li id="preco">R$ {props.preco.toFixed(2)}</li>
        <button onClick={Adicionar}>Incluir ao carrinho</button>
      </ul>
      <ToastContainer
        className="notifications-container"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true} // Garante que novas notificações apareçam no topo
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Itens;
