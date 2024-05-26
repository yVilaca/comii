import React from "react";
import './bebidas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Bebidas() {
  return (

    <div style={{ marginBottom: "8vh" }}>
      <Titulo titulo="BEBIDAS" linha="-------------------------------------------"/>
      <ItemDBebidas id="7" nome="Água sem gás" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={3.00} img="/imgs/Água.png" />
      <ItemDBebidas id="8" nome="Água com gás" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={3.99} img="/imgs/Água.png" />

      <Titulo titulo="BEBIDAS ALCOÓLICAS" />
      <ItemDBebidas id="3" nome="Heineken" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} img="/imgs/cerveja.svg" />
      <ItemDBebidas id="4" nome="Kaiser" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={7.80} img="/imgs/cerveja.svg" />
    </div>
  )
}

export default Bebidas;