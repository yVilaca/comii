import React, { useState, useEffect } from "react";
import "./sobremesas.css";
import Itens from "../../../componentes/itens";
import Titulo from "../../../componentes/titulo";
import { ProdutoService } from "../../../services/ProdutoService";

function Sobremesas() {
  const [sobremesasPrincipais, setSobremesasPrincipais] = useState([]);
  const [sobremesasAdicionais, setSobremesasAdicionais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarSobremesas = async () => {
      try {
        console.log("Iniciando carregamento de sobremesas...");
        const sobremesas = await ProdutoService.buscarProdutosPorCategoria("Sobremesa");
        console.log("Sobremesas recebidas:", sobremesas);

        if (sobremesas && sobremesas.length > 0) {
          setSobremesasPrincipais(sobremesas.slice(0, 5));
          if (sobremesas.length > 5) {
            setSobremesasAdicionais(sobremesas.slice(5));
          }
        } else {
          console.log("Nenhuma sobremesa encontrada");
        }
      } catch (error) {
        console.error("Erro ao carregar sobremesas:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarSobremesas();
  }, []);

  if (carregando) {
    return <div>Carregando sobremesas...</div>;
  }

  return (
    <div style={{ marginBottom: "8vh" }}>
      <Titulo
        titulo="SOBREMESAS"
        linha="----------------------------------------"
      />
      
      {/* Sobremesas Principais */}
      <div className="sobremesas-principais">
        {sobremesasPrincipais.map((sobremesa) => (
          <Itens
            key={sobremesa.id}
            id={sobremesa.id}
            nome={sobremesa.nome}
            desc={sobremesa.descricao}
            preco={sobremesa.preco}
            img={sobremesa.img}
          />
        ))}
      </div>

      {/* Outros Produtos */}
      {sobremesasAdicionais.length > 0 && (
        <div className="produtos-adicionais">
          <Titulo titulo="OUTRAS SOBREMESAS" />
          {sobremesasAdicionais.map((sobremesa) => (
            <Itens
              key={sobremesa.id}
              id={sobremesa.id}
              nome={sobremesa.nome}
              desc={sobremesa.descricao}
              preco={sobremesa.preco}
              img={sobremesa.img}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sobremesas;
