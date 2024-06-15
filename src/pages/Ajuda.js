import React from 'react';
import NavBar from '../componentes/topbar';
import './Ajuda.css';
import ChamarGarcom from '../componentes/chamar-gançom';


const Ajuda = () => {

    return (
        <div style={{marginBottom:"15vh"}}>
            <NavBar />

            <div id='ajuda'>Como podemos ajudar você?</div>

            <div><img src='/imgs/AJUDAimg1.jpg' alt='' id='imagens-ajuda'/></div>
            <div className='desc-ajuda'>Encontrando dificuldades para fazer seu pedido? Não se preocupe! Preparamos um breve guia para você entender melhor o funcionamento do nosso sistema. No entanto, se ainda restarem dúvidas, clique no botão ao final da tela para chamar um dos nossos garçons. Estamos aqui para assegurar que sua experiência seja a melhor possível.</div>

            <section className="recomendados-text">
                <p className="recomendados-line">-----------------------------------</p>
                <h1 id="recomendados">TELA INICIAL</h1>
                <p className="recomendados-line">-----------------------------------</p>
            </section>

            <div><img src='/imgs/tela-inicial.png' alt='' id='imagem-inicio'/></div>
            <div className='desc-ajuda'> Aqui está uma parte da nossa tela inicial, conhecida como 'Home', onde apresentamos algumas de nossas recomendações. Ao clicar no botão “Incluir ao Carrinho', o item será automaticamente incluído em sua lista de compras. </div>
            
            <div className='barra-pequena'></div>

            <div id='roda'><img src='/imgs/rodape-inicio.png' alt=''id='imagem-rodape'/></div>
            <div className='desc-ajuda'>Este é o rodapé, onde teremos acesso à tela inicial, conhecida como 'Home', em seguida ao carrinho, onde você poderá acessar todos os itens que selecionou, e por último aos produtos, onde encontrará todo o nosso cardápio. Para acessar cada um deles, basta clicar no ícone correspondente e aguardar.</div>

            <section className="recomendados-text">
                <p className="recomendados-line">-----------------------------------</p>
                <h1 id="recomendados">PRODUTOS</h1>
                <p className="recomendados-line">-----------------------------------</p>
            </section>

            <div><img src='/imgs/produtos-ajuda.png' alt=''id='imagem-produtos'/></div>
            <div className='desc-ajuda'>Essa é a tela de produtos, onde você pode navegar por algumas categorias de produtos como: Bebidas, entradas e sobremesas. E escolher quais deles deseja inserir no seu carrinho.</div>

            <section className="recomendados-text">
                <p className="recomendados-line">-----------------------------------</p>
                <h1 id="recomendados">CARRINHO</h1>
                <p className="recomendados-line">-----------------------------------</p>
            </section>
            
            <div id='ajuste'><img src='/imgs/carrinho-ajuda.png' alt='' id='imagem-carrinho'/></div>
            <div className='desc-ajuda'>Essa é a tela de produtos, onde você pode navegar por algumas categorias de produtos como: Bebidas, entradas e sobremesas. E escolher quais deles deseja inserir no seu carrinho.</div>
            <div className='desc-ajuda'>Restou alguma dúvida? Pressione o botão abaixo para chamar um garçom até sua mesa.</div>

            <ChamarGarcom />

        </div>
    );
};

export default Ajuda;
