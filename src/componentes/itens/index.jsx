import React, { useState } from 'react';
import './itens.css';

function Itens(props) {
    const [mensagem, setMensagem] = useState('');

    function Adicionar(nome) {
        setMensagem(`"${nome}" foi incluído ao carrinho!`);
        setTimeout(() => {
            setMensagem('');
        }, 1500);
    }

    return (
        <div>
            <ul id='item-geral'>
                <img src="./imgs/item1.svg" alt="" />
                <li id='linha-1'><p>{props.nome}</p></li>
                <li id='desc-item'>Burrito do chefe com queijos especiais e temperos italianos selecionados.</li>
                <li id='preco'>R$ {props.preco}</li>
                <button onClick={() => Adicionar(props.nome)}>Incluir ao carrinho</button>
            </ul>
            
                {mensagem && <div class="alert alert-success" role="alert"> <p className="mensagem">{mensagem}</p> </div>}
        </div>
    );
}

export default Itens;
