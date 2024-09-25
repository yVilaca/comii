import React from "react";
import "./bebidas.css";
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Bebidas() {
  return (
    <div style={{ marginBottom: "8vh" }}>
      <Titulo titulo="BEBIDAS" linha="-------------------------------------------" />
      <ItemDBebidas id="1" nome="Água sem gás" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={3.00} img="/imgs/agua_sem_gas.jpg" />
      <ItemDBebidas id="2" nome="Água com gás" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={3.99} img="/imgs/agua_gasosa.jpg" />

      <Titulo titulo="BEBIDAS ALCOÓLICAS" />
      <ItemDBebidas
        id="3"
        nome="Heineken"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
        img="/imgs/heinneken.jpg"
      />
      <ItemDBebidas
        id="4"
        nome="Corona"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
        img="/imgs/corona.png"
      />
    </div>
  );
}

export default Bebidas;
