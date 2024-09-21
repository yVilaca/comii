import React from "react";
import "./sobremesas.css";
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Sobremesas() {
  return (
    <div style={{ marginBottom: "8vh" }}>
      <Titulo
        titulo="SOBREMESAS"
        linha="-------------------------------------"
      />
      <ItemDBebidas
        img="/imgs/pudim2.svg"
        id="9"
        nome="Pudim"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
      <ItemDBebidas
        img="/imgs/torta2.svg"
        id="10"
        nome="Torta"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
      <ItemDBebidas
        img="/imgs/sorvete2.svg"
        id="11"
        nome="Sorvete"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
      <ItemDBebidas
        img="/imgs/pave2.svg"
        id="12"
        nome="Pavê"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
    </div>
  );
}

export default Sobremesas;
