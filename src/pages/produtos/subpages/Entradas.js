import React, { useState, useEffect } from "react";
import "./entradas.css";
import Itens from "../../../componentes/itens";
import Titulo from "../../../componentes/titulo";
import { ProdutoService } from "../../../services/ProdutoService";

function Entradas() {
  const [entradasPrincipais, setEntradasPrincipais] = useState([]);
  const [entradasAdicionais, setEntradasAdicionais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarEntradas = async () => {
      try {
        const entradas = await ProdutoService.buscarProdutosPorCategoria("Entrada");
        setEntradasPrincipais(entradas);
      } catch (error) {
        console.error("Erro ao carregar entradas:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarEntradas();
  }, []);

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
      <div className="produtos-adicionais">
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
    </div>
  );
}

export default Entradas;
