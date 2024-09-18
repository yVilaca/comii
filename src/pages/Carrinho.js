import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import NavBar from "../componentes/topbar";
import { Transition, TransitionGroup } from "react-transition-group";
import Modal from "react-modal";
import "./Carrinho.css";
import { QRCodeSVG } from "qrcode.react"; // Alterado aqui

// Configuração do Modal
Modal.setAppElement("#root"); // Para acessibilidade

const Carrinho = () => {
  const { mesa } = useParams();
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [observacoes, setObservacoes] = useState({});
  const [editing, setEditing] = useState({});
  const [resumoExpandido, setResumoExpandido] = useState(false);
  const [qrCodePix, setQrCodePix] = useState("");
  const [pixCopiaECola, setPixCopiaECola] = useState("");
  const [showPixModal, setShowPixModal] = useState(false);

  const [mesaAtual, setMesaAtual] = useState(
    mesa || localStorage.getItem("mesa") || ""
  );
  const [modalIsOpen, setModalIsOpen] = useState(
    !mesa || !localStorage.getItem("mesa")
  );
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagem de erro
  const navigate = useNavigate();
  const [satisfactionLevel, setSatisfactionLevel] = useState(0);
  const [countdown, setCountdown] = useState(300); // 5 minutos em segundos
  const [suggestion, setSuggestion] = useState("");
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [tempoPreparo, setTempoPreparo] = useState(0);
  const [gorjeta, setGorjeta] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const resumoRef = useRef(null);

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
          item.quantidade &&
          !isNaN(item.quantidade) &&
          item.quantidade > 0
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

  useEffect(() => {
    // Calcula o nível de satisfação baseado no total do pedido
    const level = Math.min(Math.floor(total / 50), 5); // Máximo de 5 níveis
    setSatisfactionLevel(level);

    // Gera uma sugestão baseada nos itens do carrinho
    const randomItem = cart[Math.floor(Math.random() * cart.length)];
    if (randomItem) {
      setSuggestion(
        `Que tal adicionar mais um ${randomItem.nome.toLowerCase()} ao seu pedido?`
      );
    }
  }, [cart, total]);

  useEffect(() => {
    // Contagem regressiva
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Lógica melhorada para o tempo de preparo
    const tempoBase = 10; // 10 minutos base
    const tempoMaximo = 120; // Máximo de 60 minutos
    const tempoAdicionalPorItem = 15; // 3 minutos adicionais por item
    const tempoTotal = Math.min(
      tempoBase +
        cart.reduce((total, item) => total + item.quantidade, 0) *
          tempoAdicionalPorItem,
      tempoMaximo
    );
    setTempoPreparo(tempoTotal);
  }, [cart]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleQuantityChange = (index, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateQuantity(index, quantity);
    }
  };
  const toggleResumoExpansao = () => {
    setResumoExpandido(!resumoExpandido);
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
    try {
      if (!mesaAtual) {
        alert("Por favor, informe o número da mesa.");
        return;
      }
      if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
      }

      const totalComDesconto = total - desconto + gorjeta;
      if (totalComDesconto <= 0) {
        alert("O valor total deve ser positivo.");
        return;
      }

      const pedido = {
        produtos: cart.map((item) => ({
          id: item.id,
          nome: item.nome,
          quantidade: item.quantidade,
          preco: item.preco,
          observacao: observacoes[item.id] || "",
        })),
        total: totalComDesconto.toFixed(2),
        desconto: desconto.toFixed(2),
        gorjeta: gorjeta.toFixed(2),
        mesa: mesaAtual,
      };

      // Criar preferência de pagamento no Mercado Pago
      const response = await fetch(
        "https://comii-backend.onrender.com/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedido),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro do servidor: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (!data.id || !data.init_point) {
        throw new Error("Resposta inválida do servidor");
      }

      // Armazenar o preferenceId no localStorage
      localStorage.setItem("lastPreferenceId", data.id);
      localStorage.setItem("lastMesa", mesaAtual);

      console.log("Preference ID armazenado:", data.id);

      // Redirecionar para a página de pagamento do Mercado Pago
      window.location.href = data.init_point;
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert(`Erro ao finalizar pedido: ${error.message}`);
    }
  };
  const handleMesaSubmit = () => {
    const numeroMesa = document.getElementById("numeroMesa").value;
    if (numeroMesa) {
      setMesaAtual(numeroMesa);
    }
  };

  const aplicarCupom = () => {
    // Simples simulação de validação de cupom
    if (cupom === "DESCONTO10") {
      setDesconto(total * 0.1);
    } else {
      alert("Cupom inválido");
    }
  };

  const calcularGorjeta = (percentual) => {
    setGorjeta((total - desconto) * (percentual / 100));
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
    const deltaY = startY - currentY;
    const maxDeltaY = window.innerHeight - 120; // 60px for top and bottom bars
    const newTranslateY = Math.max(0, Math.min(deltaY, maxDeltaY));
    resumoRef.current.style.transform = `translateY(calc(100% - 60px - ${newTranslateY}px))`;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const deltaY = startY - currentY;
    if (deltaY > 50) {
      setResumoExpandido(true);
      resumoRef.current.style.transform = "translateY(0)";
    } else if (deltaY < -50) {
      setResumoExpandido(false);
      resumoRef.current.style.transform = "translateY(calc(100% - 60px))";
    } else {
      resumoRef.current.style.transform = resumoExpandido
        ? "translateY(0)"
        : "translateY(calc(100% - 60px))";
    }
  };

  return (
    <div className="carrinho-container">
      <NavBar />
      <h1 className="carrinho-titulo">Seu Carrinho</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="carrinho-content">
        <ul className="carrinho-lista">
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
                <li className="carrinho-item">
                  {item && item.preco && (
                    <div className="item-card">
                      <div className="item-imagem-container">
                        <img
                          src={item.img}
                          alt={item.nome}
                          className="item-imagem"
                        />
                      </div>
                      <div className="item-detalhes">
                        <div className="item-header">
                          <h3 className="item-nome">{item.nome}</h3>
                          <span className="item-preco">
                            R$ {item.preco.toFixed(2)}
                          </span>
                        </div>
                        <p className="item-descricao">{item.desc}</p>
                        <div className="item-acoes">
                          <div className="quantidade-controle">
                            <button
                              onClick={() =>
                                updateQuantity(index, item.quantidade - 1)
                              }
                              disabled={item.quantidade <= 1}
                            >
                              -
                            </button>
                            <span>{item.quantidade}</span>
                            <button
                              onClick={() =>
                                updateQuantity(index, item.quantidade + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="remover-button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remover
                          </button>
                        </div>
                        <div className="observacoes-container">
                          <button
                            className="obs-button"
                            onClick={() => toggleEdit(item.id)}
                          >
                            {editing[item.id]
                              ? "Salvar"
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
                          {!editing[item.id] && observacoes[item.id] && (
                            <p className="observacao-texto">
                              {observacoes[item.id]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </Transition>
            ))}
          </TransitionGroup>
        </ul>

        <div
          ref={resumoRef}
          className={`carrinho-resumo ${resumoExpandido ? "expandido" : ""}`}
        >
          <div
            className="resumo-handle"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="handle-line"></div>
          </div>
          <h2 className="resumo-titulo">Resumo do Pedido</h2>
          <div className="resumo-detalhes">
            <div className="resumo-linha subtotal">
              <span>Subtotal:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            {desconto > 0 && (
              <div className="resumo-linha desconto">
                <span>Desconto:</span>
                <span>- R$ {desconto.toFixed(2)}</span>
              </div>
            )}
            <div className="cupom-container">
              <input
                type="text"
                value={cupom}
                onChange={(e) => setCupom(e.target.value)}
                placeholder="Código do cupom"
              />
              <button onClick={aplicarCupom}>Aplicar</button>
            </div>
            <div className="gorjeta-container">
              <span>Gorjeta:</span>
              <div className="gorjeta-opcoes">
                {[0, 5, 10, 15].map((percentual) => (
                  <button
                    key={percentual}
                    onClick={() => calcularGorjeta(percentual)}
                    className={
                      gorjeta === (total - desconto) * (percentual / 100)
                        ? "active"
                        : ""
                    }
                  >
                    {percentual}%
                  </button>
                ))}
              </div>
              <span>R$ {gorjeta.toFixed(2)}</span>
            </div>
            <div className="resumo-linha total">
              <span>Total:</span>
              <span>R$ {(total - desconto + gorjeta).toFixed(2)}</span>
            </div>
            <div className="tempo-preparo">
              <i className="fas fa-clock"></i>
              <span>Tempo estimado de preparo: {tempoPreparo} minutos</span>
            </div>
          </div>
          <button className="finalizar-pedido" onClick={finalizarPedido}>
            Finalizar Pedido
          </button>
        </div>
      </div>
      <Modal
        isOpen={showPixModal}
        onRequestClose={() => setShowPixModal(false)}
        contentLabel="QR Code PIX"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <h2>Pagamento PIX</h2>
        <QRCodeSVG value={qrCodePix} size={256} /> {/* Alterado aqui */}
        <p>Ou use o código PIX Copia e Cola:</p>
        <textarea
          readOnly
          value={pixCopiaECola}
          style={{ width: "100%", height: "60px", marginBottom: "10px" }}
        />
        <button
          onClick={() => {
            if (pixCopiaECola) {
              navigator.clipboard.writeText(pixCopiaECola);
              alert("Código PIX copiado para a área de transferência!");
            } else {
              alert("Código PIX não disponível");
            }
          }}
        >
          Copiar código PIX
        </button>
        <p>Aguardando confirmação de pagamento...</p>
      </Modal>
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
