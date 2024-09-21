import React from "react";
import "./entradas.css";
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Entradas() {
  return (
    <div style={{ marginBottom: "8vh" }}>
      <Titulo
        titulo="ENTRADAS"
        linha="----------------------------------------"
      />
      <ItemDBebidas
        img="/imgs/bruschettas2.svg"
        id="5"
        nome="Bruschettas"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
      <ItemDBebidas
        img="/imgs/carpaccio2.svg"
        id="6"
        nome="Carpaccio"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
      <ItemDBebidas
        img="/imgs/espetinho2.svg"
        id="7"
        nome="Espetinho caprese ao molho pesto"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
      <ItemDBebidas
        img="/imgs/cestinha2.svg"
        id="8"
        nome="Cestinha de massa de pastel"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        preco={0.01}
      />
    </div>
  );
}

export default Entradas;
