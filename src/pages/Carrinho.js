import React, { useContext } from 'react';
import { CartContext } from './CartContext'; // Ajuste o caminho conforme necessário

const Carrinho = () => {
  const { cart, clearCart } = useContext(CartContext);

  // Calculando o valor total
  const total = cart.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.nome} - R$ {item.preco.toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Total: R$ {total.toFixed(2)}</h2>
      <button onClick={clearCart}>Limpar Carrinho</button>
    </div>
  );
};

export default Carrinho;
