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
        console.log("Iniciando carregamento de entradas...");
        const entradas = await ProdutoService.buscarProdutosPorCategoria("Entrada");
        console.log("Entradas recebidas:", entradas);

        if (entradas && entradas.length > 0) {
          setEntradasPrincipais(entradas.slice(0, 5));
          if (entradas.length > 5) {
            setEntradasAdicionais(entradas.slice(5));
          }
        } else {
          console.log("Nenhuma entrada encontrada");
        }
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
