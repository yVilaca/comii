import React from 'react';
import './orderCard.css'; // Estilização do card de pedido

const OrderCard = ({ order, onDelete }) => {
    const { N_Mesa, pedido_id, data_pedido, produtos } = order;

    const handleDeleteClick = () => {
        // Faz a requisição para excluir o pedido
        fetch('http://localhost/excluir_pedido.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pedido_id: pedido_id }),
        })
        .then(response => {
            if (response.ok) {
                // Se a exclusão for bem-sucedida, chama a função onDelete para atualizar o estado
                onDelete(pedido_id);
            } else {
                throw new Error('Erro ao excluir pedido');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir pedido:', error);
            // Trate o erro conforme necessário
        });
        window.location.reload();
    };

    return (
        <div className="order-card">
            <h3>Pedido ID: {pedido_id}</h3>
            <p>Mesa: {N_Mesa}</p>
            <p>Tempo de espera: {calculateWaitTime(data_pedido)} minutos</p>
            {produtos.map((produto, index) => (
                <p key={index}>Produto: {produto.quantidade}x {produto.produto_nome}</p>
            ))}
            <button onClick={handleDeleteClick}>Excluir</button>
        </div>
    );
};

const calculateWaitTime = (orderTime) => {
    const orderDate = new Date(orderTime);
    const currentDate = new Date();
    const diffMs = currentDate - orderDate;
    return Math.round(diffMs / 60000); // Convertendo para minutos
    
};

export default OrderCard;
