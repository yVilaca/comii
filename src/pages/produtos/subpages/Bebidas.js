import React from "react";
import './bebidas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Bebidas () {
  return (
  
    <div>
      <Titulo titulo="BEBIDAS"/>
      <ItemDBebidas img="/imgs/agua.svg" id="1" nome="Água" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={9.99} />
      <ItemDBebidas img="/imgs/agua.svg" id="1" nome="Água" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={9.99} />

      <Titulo titulo="BEBIDAS ALCOÓLICAS"/>
      <ItemDBebidas img="/imgs/cerveja.svg" id="2" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} />
      <ItemDBebidas img="/imgs/cerveja.svg" id="2" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} />
    </div>

  )
}

export default Bebidas;