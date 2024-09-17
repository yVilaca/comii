import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const [status, setStatus] = useState("Verificando status do pagamento...");
  const location = useLocation();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      console.log("Verificando status do pagamento");
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get("payment_id");
      const mesa = localStorage.getItem("lastMesa");
      console.log("Payment ID:", paymentId);
      console.log("Mesa:", mesa);

      if (!paymentId) {
        setStatus("Erro: ID de pagamento não encontrado.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/check-payment-status/${paymentId}?mesa=${
            mesa || ""
          }`
        );
        const data = await response.json();

        if (data.isPaid) {
          setStatus("Pagamento confirmado! Seu pedido foi registrado.");
          localStorage.removeItem("lastMesa");
        } else if (data.status === "pending") {
          setStatus("Aguardando confirmação do pagamento...");
        } else {
          setStatus("Erro no pagamento. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
        setStatus(
          "Erro ao verificar status do pagamento. Tente novamente mais tarde."
        );
      }
    };

    checkPaymentStatus();
  }, [location.search]);

  return (
    <div>
      <h1>Status do Pagamento</h1>
      <p>{status}</p>
    </div>
  );
};

export default Success;
