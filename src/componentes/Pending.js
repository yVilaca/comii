import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../pages/CartContext";

const Pending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(CartContext);
  const [status, setStatus] = useState("Verificando status do pagamento...");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get("payment_id");

      try {
        const response = await fetch(
          `http://localhost:5000/check-payment-status/${paymentId}`
        );
        const data = await response.json();

        if (data.isPaid) {
          setStatus("Pagamento confirmado! Seu pedido foi registrado.");
          clearCart();
          setTimeout(() => navigate("/"), 5000);
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
    const interval = setInterval(checkPaymentStatus, 5000); // Verifica a cada 5 segundos

    return () => clearInterval(interval);
  }, [location.search, clearCart, navigate]);

  return (
    <div>
      <h1>Status do Pagamento</h1>
      <p>{status}</p>
      {status === "Pagamento confirmado! Seu pedido foi registrado." && (
        <p>Você será redirecionado para a página inicial em 5 segundos.</p>
      )}
    </div>
  );
};

export default Pending;
