import React from "react";
import './bebidas.css';
import ItemDBebidas from "../../../componentes/item-deitado-produto";
import Titulo from "../../../componentes/titulo";

function Bebidas () {
  return (
    <>
    <Titulo/>
    <ItemDBebidas nome="Água" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit." preco={9.99}/>
    </>
  )
}

export default Bebidas;