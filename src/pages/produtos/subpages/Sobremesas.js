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
        const sobremesas = await ProdutoService.buscarProdutosPorCategoria("Sobremesa");
        setSobremesasPrincipais(sobremesas);
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
      <div className="produtos-adicionais">
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
    </div>
  );
}

export default Sobremesas;
