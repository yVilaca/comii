// ItemD.jsx
import React, { useState, useContext } from 'react';
import './deitado.css';
import { CartContext } from '../../pages/CartContext';

function ItemD(props) {
    const { cart, addToCart } = useContext(CartContext);
    const [mensagem, setMensagem] = useState('');

    function Adicionar(item) {
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            // Item already exists in the cart, update its quantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantidade++;
            addToCart(updatedCart);
        } else {
            // Item is not in the cart, add it with quantity 1
            addToCart({ ...item, quantidade: 1 });
        }
        setMensagem(`${item.nome} foi incluído ao carrinho!`);
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    }

    return (
        <div id='div-item2'>
            <ul id='deitado-flex'>
                <li><img src="./imgs/item2.png" alt="Item" /></li>
                <li id='info-item2'>
                    <p id='nome-item2'>{props.nome}</p>
                    <p id='desc-item2'>{props.desc}</p>
                    <div id='flex-preco'>
                        <p>R$ {props.preco}</p>
                        <button onClick={() => Adicionar({ id: props.id, nome: props.nome, desc: props.desc, preco: props.preco })}>Incluir ao carrinho</button>
                    </div>
                </li>
            </ul>
            {mensagem && (
                <div className="mensagem-alerta">
                    <img src="/imgs/check.svg" alt='check' width={"20px"} style={{ paddingRight: "1vh" }} />{mensagem}</div>
            )}
        </div>
    );
}

export default ItemD;
