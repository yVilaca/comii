import React, { useState, useContext } from 'react';
import './itens.css';
import { CartContext } from '../../pages/CartContext';

function Itens(props) {
    const [mensagem, setMensagem] = useState('');
    const { addToCart } = useContext(CartContext);

    function Adicionar(item) {
        addToCart(item);
        setMensagem(`${item.nome} foi incluído ao carrinho!`);
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    }

    return (
        <div>
            <ul id='item-geral'>
                <img src="/imgs/item1.svg" alt="" />
                <li id='linha-1'><p>{props.nome}</p></li>
                <li id='desc-item'>Burrito do chefe com queijos especiais e temperos italianos selecionados.</li>
                <li id='preco'>R$ {Number(props.preco).toFixed(2)}</li>
                <button onClick={() => Adicionar({ id: props.id, nome: props.nome, desc: props.desc, preco: Number(props.preco) })}>Incluir ao carrinho</button>
            </ul>
            {mensagem && (
                <div className="mensagem-alerta">
                    <img src="/imgs/check.svg" alt='check' width={"20px"} style={{ paddingRight: "1vh" }} />{mensagem}</div>
            )}
        </div>
    );
}

export default Itens;
