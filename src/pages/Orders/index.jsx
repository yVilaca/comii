import React, { useEffect, useState } from "react";
import { PedidoService } from "../../services/PedidoService";
import OrderCard from "../../componentes/OrderCard";
import "./orders.css";

const Orders = ({ session }) => {
  const [pedidosAnteriores, setPedidosAnteriores] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      console.log("Sessão do usuário:", session);
      console.log("Email do usuário:", session?.user?.email);
      if (session?.user?.email) {
        try {
          const pedidos = await PedidoService.listarPedidosPorEmail(
            session.user.email
          );
          console.log("Pedidos retornados:", pedidos);
          setPedidosAnteriores(pedidos);
        } catch (error) {
          console.error("Erro ao buscar pedidos:", error);
        }
      }
    };

    fetchPedidos();
  }, [session]);

  return (
    <div className="pedidos-anteriores">
      <h1 className="pedidos-titulo">Seus Pedidos Anteriores</h1>
      {console.log("Pedidos anteriores:", pedidosAnteriores)}
      {pedidosAnteriores.length > 0 ? (
        pedidosAnteriores.map((pedido) => (
          <div key={pedido.id} className="pedido-item">
            <h3>Pedido #{pedido.id}</h3>
            <p>Data: {pedido.data_pedido.toLocaleString()}</p>
            <p>Total: R$ {pedido.total.toFixed(2)}</p>
            <p>Status: {pedido.status_preparo}</p>
            <OrderStatusTracker orderId={pedido.id} mesa={pedido.numero_mesa} />
            <details>
              <summary>Ver itens</summary>
              <ul>
                {pedido.produtos.map((produto, index) => (
                  <li key={index}>
                    {produto.produto.nome} - Quantidade: {produto.quantidade}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))
      ) : (
        <p>Você ainda não fez nenhum pedido.</p>
      )}
    </div>
  );
};

export default Orders;
