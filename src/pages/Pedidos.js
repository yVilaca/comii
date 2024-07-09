import React, { useState, useEffect } from 'react';
import NavBar from '../componentes/topbar'; // Ajuste o caminho conforme necessário

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://comii.000.pe/php/listar_pedidos.php'); // Endpoint para listar pedidos
        if (!response.ok) {
          throw new Error('Erro ao obter pedidos.');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div>
      <NavBar /> {/* Componente de navegação, ajuste conforme necessário */}
      <h1 style={{ textAlign: 'center' }}>Pedidos Realizados</h1>
      <ul>
        {pedidos.map((pedido, index) => (
          <li key={index}>
            <h2>Mesa: {pedido.numero_mesa}</h2>
            <ul>
              {pedido.produtos.map((produto, prodIndex) => (
                <li key={prodIndex}>
                  {produto.nome} - Quantidade: {produto.quantidade}
                </li>
              ))}
            </ul>
            <p>Tempo de espera: {pedido.tempo_espera} minutos</p>
            <button>Concluir Pedido</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;
