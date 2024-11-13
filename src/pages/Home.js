import React, { useState, useEffect, useCallback, useContext } from "react";
import { CartContext } from "../pages/CartContext";
import Banner from "../componentes/banner";
import NavBar from "../componentes/topbar";
import Modal from "react-modal";
import ProductCard from "../componentes/ProductCard";
import DestaqueCarousel from "../componentes/DestaqueCarousel";
import { ProdutoService } from "../services/ProdutoService";
import { toast } from "react-toastify";
import "./home.css";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [mesa, setMesa] = useState(localStorage.getItem("mesa") || "");
  const [modalIsOpen, setModalIsOpen] = useState(!mesa);
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [produtosRecomendados, setProdutosRecomendados] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const todosOsProdutos = await ProdutoService.buscarProdutos();
        setProdutosDestaque(todosOsProdutos.slice(16, 20));
        setProdutosRecomendados(todosOsProdutos.slice(12, 16));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    carregarProdutos();
  }, []);

  const handleAddToCart = useCallback(
    (produto) => {
      addToCart({ ...produto, quantidade: 1 });
      toast.success(`${produto.nome} adicionado ao carrinho!`);
    },
    [addToCart]
  );

  const handleMesaSubmit = useCallback(() => {
    const numeroMesa = document.getElementById("numeroMesa").value;
    if (numeroMesa) {
      setMesa(numeroMesa);
      localStorage.setItem("mesa", numeroMesa);
      setModalIsOpen(false);
    }
  }, []);

  return (
    <div className="home-container">
      <NavBar />
      <Banner />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="mesa-modal"
        overlayClassName="mesa-modal-overlay"
      >
        <h2>Informe o número da mesa</h2>
        <input
          id="numeroMesa"
          type="text"
          placeholder="Número da Mesa"
          className="mesa-input"
        />
        <button onClick={handleMesaSubmit} className="mesa-button">
          Confirmar
        </button>
      </Modal>

      <section className="section-title">
        <h2>Destaques</h2>
      </section>

      <DestaqueCarousel
        produtos={produtosDestaque}
        onAddToCart={handleAddToCart}
      />

      <section className="section-title">
        <h2>Recomendados</h2>
      </section>

      <div className="produtos-recomendados">
        {produtosRecomendados.map((produto) => (
          <ProductCard
            key={produto.id}
            {...produto}
            onAddToCart={() => handleAddToCart(produto)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home);
