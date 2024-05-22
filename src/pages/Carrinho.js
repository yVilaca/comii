// Carrinho.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Carrinho = () => {
  const { cart, updateQuantity, clearCart } = useContext(CartContext);

  const handleQuantityChange = (index, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(index, quantity);
  };

  const total = cart.reduce((sum, item) => {
    if (item && item.preco) {
      return sum + item.preco * item.quantidade;
    }
    return sum;
  }, 0);

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item && item.preco && (
              <div id='div-item2'>
                <ul id='deitado-flex'>
                  <li><img src="./imgs/item2.png" alt="Item" /></li>
                  <li id='info-item2'>
                    <p id='nome-item2'>{item.nome}</p>
                    <p id='desc-item2'>{item.desc}</p>
                    <div id='flex-preco'>
                      <p>R$ {item.preco.toFixed(2)}</p>
                      <select
                        value={item.quantidade}
                        onChange={(event) => handleQuantityChange(index, event)}
                      >
                        {[...Array(10).keys()].map((number) => (
                          <option key={number + 1} value={number + 1}>
                            {number + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Total: R$ {total.toFixed(2)}</h2>
      <button onClick={clearCart}>Limpar Carrinho</button>
    </div>
  );
};

export default Carrinho;
