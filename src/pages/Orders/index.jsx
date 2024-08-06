import React, { useEffect, useState } from 'react';
import OrderCard from '../../componentes/OrderCard';
import './orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Função para buscar pedidos
        const fetchOrders = () => {
            fetch('http://localhost/buscar_pedidos.php')
                .then(response => response.json())
                .then(data => {
                    const groupedOrders = groupOrdersByTable(data);
                    setOrders(groupedOrders);
                })
                .catch(error => {
                    console.error('Erro ao buscar pedidos:', error);
                });
        };

        // Função para agrupar os pedidos por número da mesa
        const groupOrdersByTable = (orders) => {
            const groupedOrders = {};
            orders.forEach(order => {
                const tableNumber = order.N_Mesa;
                if (!groupedOrders[tableNumber]) {
                    groupedOrders[tableNumber] = [];
                }
                groupedOrders[tableNumber].push(order);
            });
            return groupedOrders;
        };

        // Buscar pedidos inicialmente
        fetchOrders();

        // Atualizar os pedidos a cada 5 segundos
        const intervalId = setInterval(fetchOrders, 5000);

        // Limpar o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);

    const handleDelete = (orderId) => {
        // Implemente a lógica para deletar o pedido do backend
        // e depois atualizar o estado para refletir a exclusão
        console.log(`Excluir pedido com ID ${orderId}`);
    };

    return (
        <div className="orders-page">
            <h1>Pedidos</h1>
            <div className="orders-list">
                {Object.keys(orders).map(tableNumber => (
                    <div key={tableNumber}>
                        <h2>Mesa {tableNumber}</h2>
                        {orders[tableNumber].map(order => (
                            <OrderCard key={order.pedido_id} order={order} onDelete={handleDelete} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
