import React, { useState, useEffect } from "react";
import "./bebidas.css";
import Itens from "../../../componentes/itens";
import Titulo from "../../../componentes/titulo";
import { ProdutoService } from "../../../services/ProdutoService";

function Bebidas() {
  const [bebidasPrincipais, setBebidasPrincipais] = useState([]);
  const [bebidasAdicionais, setBebidasAdicionais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarBebidas = async () => {
      try {
        console.log("Iniciando carregamento de bebidas...");
        const bebidas = await ProdutoService.buscarProdutosPorCategoria(
          "Bebidas"
        );
        console.log("Bebidas recebidas:", bebidas);

        if (bebidas && bebidas.length > 0) {
          setBebidasPrincipais(bebidas.slice(0, 4));
          if (bebidas.length > 4) {
            setBebidasAdicionais(bebidas.slice(4));
          }
        } else {
          console.log("Nenhuma bebida encontrada");
        }
      } catch (error) {
        console.error("Erro ao carregar bebidas:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarBebidas();
  }, []);

  if (carregando) {
    return <div>Carregando bebidas...</div>;
  }

  return (
    <div style={{ marginBottom: "8vh" }}>
      <Titulo
        titulo="BEBIDAS"
        linha="-------------------------------------------"
      />

      {/* Bebidas Principais */}
      <div className="bebidas-principais">
        {bebidasPrincipais.map((bebida) => (
          <Itens
            key={bebida.id}
            id={bebida.id}
            nome={bebida.nome}
            desc={bebida.descricao}
            preco={bebida.preco}
            img={bebida.img}
          />
        ))}
      </div>

      {/* Outros Produtos */}
      {bebidasAdicionais.length > 0 && (
        <div className="produtos-adicionais">
          <Titulo titulo="OUTRAS BEBIDAS" />
          {bebidasAdicionais.map((bebida) => (
            <Itens
              key={bebida.id}
              id={bebida.id}
              nome={bebida.nome}
              desc={bebida.descricao}
              preco={bebida.preco}
              img={bebida.img}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Bebidas;
