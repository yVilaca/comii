import React from "react";
import './bebidas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Bebidas () {
  return (
  
    <div style={{marginBottom:"8vh"}}>
      <Titulo titulo="BEBIDAS"/>
      <ItemDBebidas id="1" nome="Água" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={9.99} img="/imgs/Água.png" />
      <ItemDBebidas id="2" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} img="/imgs/Cerveja.png" />

      <Titulo titulo="BEBIDAS ALCOÓLICAS"/>
      <ItemDBebidas  id="2" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} img="/imgs/cerveja.svg"/>
      <ItemDBebidas  id="2" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} img="/imgs/cerveja.svg"/>
    </div>
  )
}

export default Bebidas;