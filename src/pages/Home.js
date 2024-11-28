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
  const [produtos, setProdutos] = useState([]);
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [produtosRecomendados, setProdutosRecomendados] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const data = await ProdutoService.buscarProdutos();
        setProdutos(data);

        // Ordena os produtos pelo número de compras (decrescente)
        const produtosOrdenados = [...data].sort(
          (a, b) => b.compras - a.compras
        );

        // Pega os 4 produtos mais vendidos para destaque
        const destaques = produtosOrdenados.filter((produto) =>
          [18, 19, 20, 21, 17].includes(produto.id)
        );
        // Pega os próximos 4 produtos mais vendidos para recomendados
        const recomendados = produtosOrdenados.slice(0, 4);

        console.log("Produtos em destaque (mais vendidos):", destaques);
        console.log("Produtos recomendados:", recomendados);

        setProdutosDestaque(destaques);
        setProdutosRecomendados(recomendados);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    carregarProdutos();

    return () => {
      // Cleanup ao desmontar
      document.body.classList.remove("home-page-active");
    };
  }, []);

  const handleAddToCart = useCallback(
    (produto) => {
      addToCart({
        ...produto,
        desc: produto.descricao,
        quantidade: 1,
      });
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

      {produtosDestaque && produtosDestaque.length > 0 ? (
        <DestaqueCarousel
          produtos={produtosDestaque}
          onAddToCart={handleAddToCart}
        />
      ) : (
        <p>Nenhum produto em destaque disponível</p>
      )}

      <section className="section-title">
        <h2>Recomendados</h2>
      </section>

      <div className="produtos-recomendados home-products">
        {produtosRecomendados && produtosRecomendados.length > 0 ? (
          produtosRecomendados.map((produto) => (
            <ProductCard
              key={produto.id}
              {...produto}
              desc={produto.descricao}
              className="home-product-card"
              viewType="home"
              onAddToCart={() => handleAddToCart(produto)}
            />
          ))
        ) : (
          <p>Nenhum produto recomendado disponível</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Home);
