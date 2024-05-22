// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.nome === item.nome);

    if (existingItem) {
      // Se o item já existe no carrinho, atualiza a quantidade
      const updatedCart = cart.map((cartItem) =>
        cartItem.nome === item.nome
          ? { ...cartItem, quantidade: Math.min(cartItem.quantidade + item.quantidade, 10) }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // Se o item não existe, adiciona ao carrinho
      setCart((prevCart) => [...prevCart, { ...item, quantidade: Math.min(item.quantidade, 10) }]);
    }
  };

  const updateQuantity = (index, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantidade = Math.min(quantity, 10);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
