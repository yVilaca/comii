// Home.js
import React from 'react';
import Banner from "../componentes/banner";
import ItemD from "../componentes/item-deitado";
import Itens from "../componentes/itens";
import NavBar from "../componentes/topbar";
import "./home.css";

const Home = () => {
    const items = [
        { id: 1, nome: "Cheese Burguer", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", preco: 19.80 },
        { id: 2, nome: "X-Bacon", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", preco: 13.99 },
        { id: 3, nome: "X-Tudo", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", preco: 17.50 },
        { id: 4, nome: "X-Vegetariano", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", preco: 15.00 }
    ];

    return (
        <div>
            <NavBar />
            <Banner />

            <section className="recomendados-text">
                <p className="recomendados-line">-----------------------------------</p>
                <h1 id="recomendados">RECOMENDADOS</h1>
                <p className="recomendados-line">-----------------------------------</p>
            </section>

            <div className='categorias-juntas2'>
                <a href="#item"><Itens id={5} nome="Burrito" preco={19.80} desc="Burrito do chefe com queijos especiais e temperos italianos selecionados." /></a>
                <a href="#item"><Itens id={6} nome="Sambuei" preco={13.99} desc="Sambuei delicioso com ingredientes frescos." /></a>
            </div>

            <div className="itens" style={{ marginBottom: "15%" }}>
                {items.map(item => (
                    <div key={item.id} style={{ marginBottom: '15px' }}>
                        <ItemD id={item.id} nome={item.nome} desc={item.desc} preco={item.preco} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
