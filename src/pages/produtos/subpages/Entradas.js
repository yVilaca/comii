import React from "react";
import './entradas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Entradas() {
  return(
  <div>
      <Titulo titulo="ENTRADAS"/>
      <ItemDBebidas img="/imgs/bruschettas.svg" id="1" nome="Bruschettas" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={29.99} />
      <ItemDBebidas img="/imgs/carpaccio.svg" id="1" nome="Carpaccio" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={19.99} />
      <ItemDBebidas img="/imgs/espetinho.svg" id="2" nome="Espetinho caprese ao molho pesto" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={14.80} />
      <ItemDBebidas img="/imgs/cestinha.svg" id="2" nome="Cestinha de massa de pastel" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={20.80} />
    </div>
  )
}

export default Entradas;
