import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./deitado.css";
import { CartContext } from "../../pages/CartContext";

function ItemD(props) {
  const { addToCart } = useContext(CartContext);

  function Adicionar(item) {
    addToCart({ ...item, quantidade: 1 });
    toast.success(`${item.nome} foi incluído ao carrinho!`, {
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
            <button
              onClick={() =>
                Adicionar({
                  id: props.id,
                  nome: props.nome,
                  desc: props.desc,
                  preco: props.preco,
                  img: props.img,
                })
              }
            >
              Incluir ao carrinho
            </button>
          </div>
        </li>
      </ul>
      <ToastContainer
        className="notifications-container"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ItemD;
