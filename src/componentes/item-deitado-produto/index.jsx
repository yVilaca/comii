import React, { useState, useContext } from "react";
import "./deitado-produto.css";
import { CartContext } from "../../pages/CartContext";
import { toast } from "react-toastify";
function ItemDBebidas(props) {
  const { addToCart } = useContext(CartContext);
  const [mensagem, setMensagem] = useState("");

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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Exibe uma notificação se o item não foi adicionado
      toast.error(
        `${props.nome} não pode ser adicionado ao carrinho porque já há 10 ou mais unidades.`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }
  return (
    <div>
      <div className="deitado">
        <ul className="list-deitado">
          <li className="imgProduto">
            <img src={props.img} alt={props.nome} />
          </li>
          <li className="info-deitado">
            <p className="nomeItem">{props.nome}</p>
            <p className="descItem">{props.desc}</p>

            <div id="flex-preco">
              <p>R$ {props.preco.toFixed(2)}</p>
            </div>
          </li>
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
            id="mais"
          >
            <img src="/imgs/mais.svg" alt="Adicionar" />
          </button>
        </ul>
        {mensagem && (
          <div className="mensagem-alerta">
            <img
              src="/imgs/check.svg"
              alt="check"
              width={"20px"}
              style={{ paddingRight: "1vh" }}
            />
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDBebidas;
