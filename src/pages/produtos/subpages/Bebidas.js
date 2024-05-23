import React from "react";
import './bebidas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";

const Bebidas = () => {
  return (
    <div>
      <ItemDBebidas id="1" nome="Água" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={9.99} img="/imgs/Água.png" />
      <ItemDBebidas id="2" nome="Cerveja" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={10.80} img="/imgs/Cerveja.png" />
    </div>
  )
}

export default Bebidas;
