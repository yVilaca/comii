import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import NavBar from "../componentes/topbar";
import { Transition, TransitionGroup } from "react-transition-group";
import Modal from "react-modal";
import "./Carrinho.css";
import Titulo from "../componentes/titulo";

// Configuração do Modal
Modal.setAppElement("#root"); // Para acessibilidade

const Carrinho = () => {
  const { mesa } = useParams();
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [observacoes, setObservacoes] = useState({});
  const [editing, setEditing] = useState({});
  const [mesaAtual, setMesaAtual] = useState(
    mesa || localStorage.getItem("mesa") || ""
  );
  const [modalIsOpen, setModalIsOpen] = useState(
    !mesa || !localStorage.getItem("mesa")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (mesaAtual) {
      localStorage.setItem("mesa", mesaAtual);
      setModalIsOpen(false); // Fecha o modal quando a mesa é definida
    }
  }, [mesaAtual]);

  useEffect(() => {
    if (!mesaAtual) {
      setModalIsOpen(true);
    }
  }, [mesaAtual]);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((sum, item) => {
        if (
          item &&
          item.preco &&
          !isNaN(item.preco) &&
          !isNaN(item.quantidade)
        ) {
          return sum + item.preco * item.quantidade;
        }
        console.error("Item com preço ou quantidade inválidos:", item.nome);
        return sum;
      }, 0);
      setTotal(total);
    };

    calculateTotal();
  }, [cart]);

  const handleQuantityChange = (index, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(index, quantity);
  };

  const handleObservationChange = (id, event) => {
    setObservacoes((prevObservacoes) => ({
      ...prevObservacoes,
      [id]: event.target.value,
    }));
  };

  const toggleEdit = (id) => {
    setEditing((prevEditing) => ({
      ...prevEditing,
      [id]: !prevEditing[id],
    }));
  };

  const finalizarPedido = async () => {
    if (!mesaAtual) {
      alert("Por favor, informe o número da mesa.");
      return;
    }

    const pedido = {
      produtos: cart.map((item) => ({
        id: item.id,
        quantidade: item.quantidade,
        observacao: observacoes[item.id] || "",
      })),
      total: total.toFixed(2),
      mesa: mesaAtual || "",
      observacoesProduto: cart.map((item) => ({
        produto_id: item.id,
        observacao: observacoes[item.id] || "",
      })),
    };

    console.log("Dados do pedido a serem enviados:", pedido);

    try {
      const response = await fetch("http://localhost/salvar_pedido.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(pedido),
      });

      console.log("resposta do fetch: ", response);

      if (!response.ok) {
        throw new Error("Erro ao finalizar pedido.");
      }

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (data.status === "success") {
        alert("Pedido realizado com sucesso!");
        clearCart();
        localStorage.removeItem("mesa"); // Remove o número da mesa do localStorage
        navigate("/home"); // Redireciona para a página inicial
      } else {
        alert("Erro ao finalizar pedido. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert("Erro ao finalizar pedido. Tente novamente.");
    }
  };

  const handleMesaSubmit = () => {
    const numeroMesa = document.getElementById("numeroMesa").value;
    if (numeroMesa) {
      setMesaAtual(numeroMesa);
    }
  };

  return (
    <div style={{ marginBottom: "40vh" }}>
      <NavBar />
      <h1
        style={{
          margin: "2vh 0",
          fontFamily: "Sarabun",
          color: "#85120B",
          fontWeight: "500",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        CARRINHO DE COMPRAS
      </h1>
      <ul style={{ listStyle: "none" }}>
        <TransitionGroup component={null}>
          {cart.map((item, index) => (
            <Transition
              key={item.id}
              timeout={500}
              onEnter={(node) => {
                node.style.opacity = 0;
                node.style.transform = "scale(0.5)";
                requestAnimationFrame(() => {
                  node.style.transition = "opacity 500ms, transform 500ms";
                  node.style.opacity = 1;
                  node.style.transform = "scale(1)";
                });
              }}
              onExit={(node) => {
                node.style.transition = "opacity 500ms, transform 500ms";
                node.style.opacity = 0;
                node.style.transform = "scale(0.5)";
              }}
            >
              <li>
                {item && item.preco && (
                  <div id="div-item2">
                    <ul id="deitado-flex">
                      <li>
                        <img src={item.img} alt="Item" />
                      </li>
                      <li id="info-item2">
                        <p
                          id="nome-item2"
                          style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          {item.nome}{" "}
                          <span
                            style={{
                              color: "#85120B",
                              fontSize: "15px",
                              alignItems: "center",
                            }}
                          >
                            R$ {item.preco.toFixed(2)}
                          </span>
                        </p>

                        <p id="desc-item2">{item.desc}</p>
                        <div id="flex-preco">
                          <select
                            value={String(item.quantidade)}
                            onChange={(event) =>
                              handleQuantityChange(index, event)
                            }
                          >
                            {[...Array(10).keys()].map((number) => (
                              <option key={number + 1} value={number + 1}>
                                {number + 1}
                              </option>
                            ))}
                          </select>
                          <button
                            style={{
                              backgroundColor: "#85120B",
                              color: "white",
                            }}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remover do Carrinho
                          </button>
                        </div>

                        <button
                          className="obs-button"
                          onClick={() => toggleEdit(item.id)}
                        >
                          {editing[item.id]
                            ? "Salvar Observações"
                            : observacoes[item.id]
                            ? "Editar Observações"
                            : "Adicionar Observações"}
                        </button>

                        {editing[item.id] && (
                          <textarea
                            value={observacoes[item.id] || ""}
                            onChange={(e) =>
                              handleObservationChange(item.id, e)
                            }
                            placeholder="Adicione observações para este produto"
                            className="obs-textarea"
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </Transition>
          ))}
        </TransitionGroup>
      </ul>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          paddingBottom: "8vh",
          backgroundColor: "white",
          boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Titulo
          titulo="SUBTOTAL"
          linha="---------------------------------------"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 40px",
          }}
        >
          <h2 style={{ fontFamily: "Sarabun", fontWeight: "500" }}>
            R$ {total.toFixed(2)}
          </h2>

          <button className="finapedido" onClick={finalizarPedido}>
            Finalizar Pedido
          </button>
        </div>
      </div>

      {/* Modal para solicitar o número da mesa */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Número da Mesa"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            borderRadius: "5px",
            fontFamily: "Sarabun",
            textAlign: "center",
            width: "60vw",
          },
        }}
      >
        <h2>Informe o número da mesa</h2>
        <input
          id="numeroMesa"
          type="text"
          placeholder="Número da Mesa"
          style={{
            padding: "10px",
            width: "100%",
            margin: "10px 0px",
            border: "none",
            boxShadow: "1px 1px 10px #aaa",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleMesaSubmit}
          style={{
            padding: "10px",
            backgroundColor: "#85120B",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Confirmar
        </button>
      </Modal>
    </div>
  );
};

export default Carrinho;
