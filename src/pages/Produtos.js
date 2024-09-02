import React, { Suspense, memo } from "react";
import NavBar from "../componentes/topbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { register } from "swiper/element/bundle";
import "./produtos.css";
import Carrossel from "../componentes/carrossel";
import Categorias from "./produtos/categorias";
import { Outlet } from "react-router-dom";

register();

const Produtos = memo(() => {
  return (
    <div>
      <NavBar />
      <Carrossel />
      <Categorias />
      <Suspense fallback={<div>Carregando subcategoria...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
});

export default Produtos;
