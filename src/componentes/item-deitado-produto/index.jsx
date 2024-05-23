import React, { useState, useContext } from 'react';
import './deitado-produto.css';
import { CartContext } from '../../pages/CartContext';

function ItemDBebidas(props) {
    const { addToCart } = useContext(CartContext);
    const [mensagem, setMensagem] = useState('');

    function Adicionar(item) {
        addToCart(item);
        setMensagem(`${item.nome} foi incluído ao carrinho!`);
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    }

    return <div>

            <div className='deitado'>
                <ul className='list-deitado'>
                    <li className="imgProduto"><img src={props.img} alt={props.nome} /></li>
                    <li className='info-deitado'>
                        <p className="nomeItem">{props.nome}</p>
                        <p className="descItem">{props.desc}</p>

                        <div id='flex-preco'>
                            <p>R$ {props.preco.toFixed(2)}</p>
                        </div>
                    </li>
                    <button onClick={() => Adicionar({ id: props.id, nome: props.nome, desc: props.desc, preco: props.preco, img: props.img })} id="mais"><img src="/imgs/mais.svg" alt="Adicionar" /></button>
                </ul>
                {mensagem && (
                    <div className="mensagem-alerta">
                        <img src="/imgs/check.svg" alt='check' width={"20px"} style={{ paddingRight: "1vh" }} />{mensagem}
                    </div>
                )}
            </div>
        </div>
}

export default ItemDBebidas;
