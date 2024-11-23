import React, { useState, useEffect } from "react";
import "./entradas.css";
import Itens from "../../../componentes/itens";
import Titulo from "../../../componentes/titulo";
import { ProdutoService } from "../../../services/ProdutoService";

function Entradas({ isActive }) {
  const [entradasPrincipais, setEntradasPrincipais] = useState([]);
  const [entradasAdicionais, setEntradasAdicionais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const atualizarEntradas = async () => {
    try {
      const entradas = await ProdutoService.buscarProdutosPorCategoria(
        "Entrada"
      );

      if (entradas && entradas.length > 0) {
        setEntradasPrincipais(entradas.slice(0, 5));
        setEntradasAdicionais(entradas.length > 5 ? entradas.slice(5) : []);
      }
    } catch (error) {
      console.error("Erro ao atualizar entradas:", error);
    }
  };

  useEffect(() => {
    if (isActive) {
      atualizarEntradas();
      setCarregando(false);
    }
  }, [isActive]);

  if (carregando) {
    return <div>Carregando entradas...</div>;
  }

  return (
    <div style={{ marginBottom: "8vh" }}>
      <Titulo
        titulo="ENTRADAS"
        linha="----------------------------------------"
      />

      {/* Entradas Principais */}
      <div className="entradas-principais">
        {entradasPrincipais.map((entrada) => (
          <Itens
            key={entrada.id}
            id={entrada.id}
            nome={entrada.nome}
            desc={entrada.descricao}
            preco={entrada.preco}
            img={entrada.img}
          />
        ))}
      </div>

      {/* Outros Produtos */}
      {entradasAdicionais.length > 0 && (
        <div className="produtos-adicionais">
          <Titulo titulo="OUTRAS ENTRADAS" />
          {entradasAdicionais.map((entrada) => (
            <Itens
              key={entrada.id}
              id={entrada.id}
              nome={entrada.nome}
              desc={entrada.descricao}
              preco={entrada.preco}
              img={entrada.img}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Entradas;
