import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const OrderStatusTracker = ({ orderId, mesa }) => {
  const [statusPagamento, setStatusPagamento] = useState("pendente");
  const [statusPreparo, setStatusPreparo] = useState("pendente");
  const lastPreferenceId = localStorage.getItem("lastPreferenceId");

  useEffect(() => {
    const socket = io("https://comii-backend.onrender.com");

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `https://comii-backend.onrender.com/check-payment-status/${lastPreferenceId}`
        );
        const data = await response.json();

        if (response.ok) {
          setStatusPagamento(data.status_pagamento);
          setStatusPreparo(data.status_preparo);
        }
      } catch (error) {
        console.error("Erro ao verificar status:", error);
      }
    };

    checkStatus();

    socket.on("statusPagamentoAtualizado", (data) => {
      if (data.pedidoId === orderId) {
        setStatusPagamento(data.status_pagamento);
        setStatusPreparo(data.status_preparo);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId, lastPreferenceId]);

  return (
    <div className="status-tracker">
      <div className="status-item">
        <h4>Status do Pagamento</h4>
        <div className={`status-badge ${statusPagamento}`}>
          {statusPagamento === "aprovado"
            ? "Aprovado"
            : statusPagamento === "rejeitado"
            ? "Rejeitado"
            : "Pendente"}
        </div>
      </div>
      <div className="status-item">
        <h4>Status do Preparo</h4>
        <div className={`status-badge ${statusPreparo}`}>
          {statusPreparo === "concluido"
            ? "Concluído"
            : statusPreparo === "em_preparo"
            ? "Em Preparo"
            : "Pendente"}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTracker;
