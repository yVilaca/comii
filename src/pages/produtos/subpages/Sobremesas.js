import React from "react";
import './sobremesas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Sobremesas() {
  return(
  <div>
      <Titulo titulo="SOBREMESAS"/>
      <ItemDBebidas img="/imgs/pudim.svg" id="1" nome="Pudim" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={29.99} />
      <ItemDBebidas img="/imgs/torta.svg" id="1" nome="Torta" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={19.99} />
      <ItemDBebidas img="/imgs/sorvete.svg" id="2" nome="Sorvete" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={14.80} />
      <ItemDBebidas img="/imgs/pave.svg" id="2" nome="Pavê" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={20.80} />
    </div>
  )
}

export default Sobremesas;
