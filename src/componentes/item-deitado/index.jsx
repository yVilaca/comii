import React, { useState } from 'react';
import './deitado.css';

function ItemD(props) {
    const [mensagem, setMensagem] = useState('');

    function Adicionar(nome) {
        setMensagem(`${nome} foi incluído ao carrinho!`);
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
                        <p>R$ 100,00</p>
                        <button onClick={() => Adicionar(props.nome)}>Incluir ao carrinho</button>
                    </div>
                </li>
            </ul>
            {mensagem && (
                <div className="mensagem-alerta">
                <img src="./imgs/check.svg" alt='check' width={"20px"}  style={{paddingRight:"1vh"}}/>{mensagem}</div>
            )}
        </div>
    );
}

export default ItemD;
