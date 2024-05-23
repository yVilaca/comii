import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import NavBar from '../componentes/topbar';

const Carrinho = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const handleQuantityChange = (index, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(index, quantity);
  };

  const total = cart.reduce((sum, item) => {
    if (item && item.preco && !isNaN(item.preco) && !isNaN(item.quantidade)) {
      return sum + item.preco * item.quantidade;
    }
    console.error('Item com preço ou quantidade inválidos:', item);
    return sum;
  }, 0);

  return (
    <div style={{ marginBottom: "10vh" }}>
      <NavBar/>
      <h1 style={{
        margin:'2vh 0',
        fontFamily:'Sarabun',
        color:'#85120B',
        fontWeight:'500',
        textAlign:'center',
        fontSize:'18px'
      }}>CARRINHO DE COMPRAS</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item && item.preco && (
              <div id='div-item2'>
                <ul id='deitado-flex'>
                  <li><img src={item.img} alt="Item" /></li>
                  <li id='info-item2'>
                    <p id='nome-item2' style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      display: 'flex'
                    }}>{item.nome} <span style={{ color: "#85120B", fontSize: "15px", alignItems: 'center' }}>R$ {item.preco.toFixed(2)}</span></p>

                    <p id='desc-item2'>{item.desc}</p>
                    <div id='flex-preco'>

                      <select
                        value={String(item.quantidade)}
                        onChange={(event) => handleQuantityChange(index, event)}
                      >
                        {[...Array(10).keys()].map((number) => (
                          <option key={number + 1} value={number + 1}>
                            {number + 1}
                          </option>
                        ))}
                      </select>
                      <button style={{ backgroundColor: "#85120B", color: "white" }} onClick={() => removeFromCart(item.id)}>Remover do Carrinho</button>
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
