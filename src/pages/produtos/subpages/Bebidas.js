import React from "react";
import './bebidas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Bebidas () {
  return (
  
    <div style={{marginBottom:"8vh"}}>
      <Titulo titulo="BEBIDAS"/>
      <ItemDBebidas id="7" nome="Água" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={9.99} img="/imgs/Água.png" />
      <ItemDBebidas id="8" nome="Água" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={9.99} img="/imgs/Água.png" />

      <Titulo titulo="BEBIDAS ALCOÓLICAS"/>
      <ItemDBebidas  id="3" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} img="/imgs/cerveja.svg"/>
      <ItemDBebidas  id="4" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} img="/imgs/cerveja.svg"/>
    </div>
  )
}

export default Bebidas;