import React, { useState, useEffect, useCallback } from "react";
import Banner from "../componentes/banner";
import NavBar from "../componentes/topbar";
import Modal from "react-modal";
import "./home.css";
import { ProdutoService } from "../services/ProdutoService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement("#root");

const Home = () => {
  const [mesa, setMesa] = useState(localStorage.getItem("mesa") || "");
  const [modalIsOpen, setModalIsOpen] = useState(!mesa);
  const [produtosCarrossel, setProdutosCarrossel] = useState([]);
  const [produtosAdicionais, setProdutosAdicionais] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const todosOsProdutos = await ProdutoService.buscarProdutos();
        // Garantir que temos 4 produtos para o carrossel
        setProdutosCarrossel(todosOsProdutos.slice(16, 20));
        // Ajustar os produtos adicionais para começar após os do carrossel
        setProdutosAdicionais(todosOsProdutos.slice(12, 16));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    carregarProdutos();
  }, []);

  useEffect(() => {
    if (mesa) {
      localStorage.setItem("mesa", mesa);
      setModalIsOpen(false);
    }
  }, [mesa]);

  const handleMesaSubmit = useCallback(() => {
    const numeroMesa = document.getElementById("numeroMesa").value;
    if (numeroMesa) {
      setMesa(numeroMesa);
    }
  }, []);

  const adicionarAoCarrinho = useCallback((produto) => {
    setCarrinho(carrinhoAtual => [...carrinhoAtual, produto]);
    toast.success(`${produto.nome} adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);


  const renderProdutoCarrossel = (produto) => (
    <div key={produto.id} className="produto-item">
      <div id="item-geral">
        <img 
          src={produto.img || "/imgs/default.png"} 
          alt={produto.nome}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/imgs/default.png";
          }}
        />
        <div className="item-content">
          <h3 className="item-nome">{produto.nome}</h3>
          <p id="desc-item">{produto.descricao}</p>
          <p className="item-preco">R$ {produto.preco.toFixed(2)}</p>
        </div>
        <button onClick={() => adicionarAoCarrinho(produto)}>Incluir ao carrinho</button>
      </div>
    </div>
  );

  return (
    <div>
      <NavBar />
      <Banner />
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

      <section className="recomendados-text">
        <p className="recomendados-line">--------------------------------</p>
        <h1 id="recomendados">RECOMENDADOS</h1>
        <p className="recomendados-line">--------------------------------</p>
      </section>

      <div className="carrossel-container">
        <div className="produtos-carrossel">
          {produtosCarrossel.map(renderProdutoCarrossel)}
        </div>
      </div>

      <div className="produtos-adicionais">
        {produtosAdicionais.map(renderProdutoCarrossel)}
      </div>
    </div>
  );
};

export default React.memo(Home);
