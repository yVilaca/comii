import React, { useState, useEffect } from "react";
import Banner from "../componentes/banner";
import ItemD from "../componentes/item-deitado";
import Itens from "../componentes/itens";
import NavBar from "../componentes/topbar";
import Modal from "react-modal";
import "./home.css";

Modal.setAppElement("#root"); // Para acessibilidade

const Home = () => {
  const [mesa, setMesa] = useState(localStorage.getItem("mesa") || "");
  const [modalIsOpen, setModalIsOpen] = useState(!mesa);

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

  useEffect(() => {
    if (mesa) {
      localStorage.setItem("mesa", mesa);
      setModalIsOpen(false);
    }
  }, [mesa]);

  const handleMesaSubmit = () => {
    const numeroMesa = document.getElementById("numeroMesa").value;
    if (numeroMesa) {
      setMesa(numeroMesa);
    }
  };

  return (
    <div>
      <NavBar />
      <Banner />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Número da Mesa"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            borderRadius: "5px",
            fontFamily: "Sarabun",
            textAlign: "center",
            width: "60vw",
          },
        }}
      >
        <h2>Informe o número da mesa</h2>
        <input
          id="numeroMesa"
          type="text"
          placeholder="Número da Mesa"
          style={{
            padding: "10px",
            width: "100%",
            margin: "10px 0px",
            border: "none",
            boxShadow: "1px 1px 10px #aaa",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleMesaSubmit}
          style={{
            padding: "10px",
            backgroundColor: "#85120B",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Confirmar
        </button>
      </Modal>

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
