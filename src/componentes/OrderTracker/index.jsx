import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const OrderStatusTracker = ({ orderId, mesa }) => {
  const [status, setStatus] = useState("Pedido recebido");

  useEffect(() => {
    const socket = io("https://comii-backend.onrender.com");

    socket.emit("joinRoom", mesa);

    socket.on("orderStatusUpdate", (data) => {
      if (data.orderId === orderId) {
        setStatus(data.status);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId, mesa]);

  return (
    <div>
      <h3>Status do Pedido: {status}</h3>
      {/* Você pode adicionar uma representação visual do progresso aqui */}
    </div>
  );
};

export default OrderStatusTracker;
