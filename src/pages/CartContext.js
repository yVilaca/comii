import React, { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    try {
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      // Validate each item in the cart
      return parsedCart.every(
        (item) => item.id && item.nome && item.preco && item.quantidade
      )
        ? parsedCart
        : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback(
    (item) => {
      // Verifica o número atual de unidades do item no carrinho
      const existingItemIndex = cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Verifica se a quantidade no carrinho já atingiu o limite de 10
        /* if (cart[existingItemIndex].quantidade >= 10) {
        return false; // Não adiciona o item e retorna false
      } */

        // Atualiza a quantidade do item existente no carrinho
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantidade += item.quantidade || 1;
        setCart(updatedCart);
        return true;
      }

      // Adiciona um novo item ao carrinho
      setCart([...cart, { ...item, quantidade: 1 }]);
      return true;
    },
    [cart]
  );

  const updateQuantity = (index, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantidade = quantity;
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
