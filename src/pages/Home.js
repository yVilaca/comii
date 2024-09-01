import React from "react";
import Banner from "../componentes/banner";
import ItemD from "../componentes/item-deitado";
import Itens from "../componentes/itens";
import NavBar from "../componentes/topbar";
import "./home.css";

const Home = () => {
  const items = [
    {
      id: 13,
      nome: "Cheese Burguer",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      preco: 19.8,
    },
    {
      id: 14,
      nome: "X-Bacon",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      preco: 13.99,
    },
    {
      id: 15,
      nome: "X-Tudo",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      preco: 17.5,
    },
    {
      id: 16,
      nome: "X-Vegetariano",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      preco: 15.0,
    },
  ];
  const categoriasJuntasItems = [
    {
      id: 17,
      nome: "Burrito",
      preco: 19.8,
      desc: "Burrito do chefe com queijos especiais e temperos italianos selecionados.",
    },
    {
      id: 18,
      nome: "Macarrão",
      preco: 13.99,
      desc: "Macarrão com queijos especiais e temperos italianos selecionados.",
    },
    {
      id: 19,
      nome: "Fritas",
      preco: 25.8,
      desc: "Deliciosa porção de batatas fritas palito com sal.",
    },
    {
      id: 20,
      nome: "Espetinho",
      preco: 7.5,
      desc: "Maça de peito em cubinhos assada na grelha e tempero do chefe.",
    },
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

      <div className="categorias-juntas2">
        {categoriasJuntasItems.map((item) => (
          <div key={item.id} className="item-container">
            <Itens
              id={item.id}
              nome={item.nome}
              preco={item.preco}
              desc={item.desc}
              img={"/imgs/" + item.nome + ".png"}
            />
          </div>
        ))}
      </div>

      <div className="itens" style={{ marginBottom: "15%" }}>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: "15px" }}>
            <ItemD
              id={item.id}
              nome={item.nome}
              desc={item.desc}
              preco={item.preco}
              img={"/imgs/" + item.nome + ".png"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
