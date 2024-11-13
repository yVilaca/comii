import React from "react";
import "./DestaqueCarousel.css";

const DestaqueCarousel = ({ produtos, onAddToCart }) => {
  return (
    <div className="destaque-wrapper">
      <div className="destaque-container">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="destaque-card"
            onClick={() => onAddToCart(produto)}
          >
            <div className="destaque-image">
              <img src={produto.img} alt={produto.nome} loading="lazy" />
              <div className="destaque-tag">Destaque</div>
            </div>
            <div className="destaque-content">
              <h3>{produto.nome}</h3>
              <p>{produto.desc}</p>
              <div className="destaque-footer">
                <span className="destaque-price">
                  R$ {produto.preco.toFixed(2)}
                </span>
                <button className="destaque-button">Adicionar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DestaqueCarousel);
