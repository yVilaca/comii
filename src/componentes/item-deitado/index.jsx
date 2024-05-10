import './deitado.css';
import React, { useState } from 'react';

function ItemD (props){
    const [mensagem, setMensagem] = useState('');

    function Adicionar(nome) {
        setMensagem(`"${nome}" foi incluído ao carrinho!`);
        setTimeout(() => {
            setMensagem('');
        }, 1500);
    }
    return( <div id='div-item2'>
        <ul id='deitado-flex'>
            <li><img src="./imgs/item2.png" alt="Item" /></li>
            <li id='info-item2'><p id='nome-item2'>{props.nome}</p><p id='desc-item2'>{props.desc}</p> <div id='flex-preco'><p>R$ 100,00</p> <button onClick={() => Adicionar(props.id)}>Incluir ao carrinho</button></div></li>
        </ul>
        {mensagem && <div className="alert alert-success" role="alert"> <p className="mensagem">{mensagem}</p> </div>}
    </div>);
}
export default ItemD;