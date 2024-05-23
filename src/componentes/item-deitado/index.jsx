// ItemD.jsx
import React, { useState, useContext } from 'react';
import './deitado.css';
import { CartContext } from '../../pages/CartContext';

function ItemD(props) {
    const { addToCart } = useContext(CartContext);
    const [mensagem, setMensagem] = useState('');

    function Adicionar(item) {
        addToCart({ ...item, quantidade: 1 });
        setMensagem(`${item.nome} foi incluído ao carrinho!`);
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    }

    return (
        <div id='div-item2'>
            <ul id='deitado-flex'>
                <li><img src={props.img} alt={props.nome} /></li>
                <li id='info-item2'>
                    <p id='nome-item2'>{props.nome}</p>
                    <p id='desc-item2'>{props.desc}</p>
                    <div id='flex-preco'>
                        <p>R$ {props.preco.toFixed(2)}</p>
                        <button onClick={() => Adicionar({ id: props.id, nome: props.nome, desc: props.desc, preco: props.preco, img: props.img })}>
                            Incluir ao carrinho
                        </button>
                    </div>
                </li>
            </ul>
            {mensagem && (
                <div className="mensagem-alerta">
                    <img src="/imgs/check.svg" alt='check' width={"20px"} style={{ paddingRight: "1vh" }} />{mensagem}
                </div>
            )}
        </div>
    );
}

export default ItemD;
