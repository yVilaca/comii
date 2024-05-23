// Itens.jsx
import React, { useState, useContext } from 'react';
import './itens.css';
import { CartContext } from '../../pages/CartContext';

function Itens(props) {
    const [mensagem, setMensagem] = useState('');
    const { addToCart, cart } = useContext(CartContext);

    function Adicionar() {
        const itemExistenteIndex = cart.findIndex((cartItem) => cartItem.id === props.id);

        if (itemExistenteIndex !== -1) {
            // Se o item já existe, apenas atualiza a quantidade
            const updatedCart = [...cart];
            updatedCart[itemExistenteIndex].quantidade += 1;
            addToCart(updatedCart);
        } else {
            // Se não existe, adiciona ao carrinho
            const itemToAdd = {
                id: props.id,
                nome: props.nome,
                desc: props.desc,
                preco: props.preco,
                quantidade: 1,
                img: props.img
            };
            addToCart(itemToAdd);
        }

        setMensagem(`${props.nome} foi incluído ao carrinho!`);
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    }

    return (
        <div>
            <ul id='item-geral'>
                <img src={props.img} alt={props.nome} />
                <li id='linha-1'><p>{props.nome}</p></li>
                <li id='desc-item'>{props.desc}</li>
                <li id='preco'>R$ {props.preco.toFixed(2)}</li>
                <button onClick={Adicionar}>Incluir ao carrinho</button>
            </ul>
            {mensagem && (
                <div className="mensagem-alerta">
                    <img src="/imgs/check.svg" alt='check' width={"20px"} style={{ paddingRight: "1vh" }} />{mensagem}</div>
            )}
        </div>
    );
}

export default Itens;
