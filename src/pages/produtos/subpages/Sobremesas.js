import React from "react";
import './sobremesas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Sobremesas() {
  return(
  <div style={{marginBottom:"8vh"}}>
      <Titulo titulo="SOBREMESAS"/>
      <ItemDBebidas img="/imgs/pudim2.svg" id="11" nome="Pudim" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={29.99} />
      <ItemDBebidas img="/imgs/torta2.svg" id="12" nome="Torta" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={19.99} />
      <ItemDBebidas img="/imgs/sorvete2.svg" id="13" nome="Sorvete" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={14.80} />
      <ItemDBebidas img="/imgs/pave2.svg" id="14" nome="Pavê" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={20.80} />
    </div>
  )
}

export default Sobremesas;
