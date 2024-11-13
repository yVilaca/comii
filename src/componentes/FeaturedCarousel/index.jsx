import React from "react";
import "./FeaturedCarousel.css";

const FeaturedProduct = ({ nome, preco, img, desc, onAdd }) => (
  <div className="featured-card">
    <div className="featured-image">
      <img
        src={img}
        alt={nome}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/imgs/default.png";
        }}
      />
      <span className="featured-tag">Destaque</span>
    </div>
    <div className="featured-content">
      <h3>{nome}</h3>
      <p>{desc}</p>
      <div className="featured-footer">
        <span className="featured-price">R$ {preco.toFixed(2)}</span>
        <button onClick={onAdd} className="featured-add-btn">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
);

const FeaturedCarousel = ({ produtos, onAddToCart }) => {
  return (
    <div className="featured-section">
      <div className="featured-container">
        {produtos.map((produto) => (
          <FeaturedProduct
            key={produto.id}
            {...produto}
            onAdd={() => onAddToCart(produto)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
