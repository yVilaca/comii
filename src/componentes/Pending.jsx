import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../pages/CartContext";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import io from "socket.io-client";

const Pending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(CartContext);
  const [status, setStatus] = useState("Verificando status do pagamento...");
  const [error, setError] = useState("");

  useEffect(() => {
    const socket = io("https://comii-backend.onrender.com");

    socket.on("pedidoAprovado", (data) => {
      console.log("Evento 'pedidoAprovado' recebido:", data);
      if (data.mesa === localStorage.getItem("lastMesa")) {
        navigate(`/success?pedido_id=${data.pedidoId}`);
      }
    });

    const checkPaymentStatus = async () => {
      const mesa = localStorage.getItem("lastMesa");

      if (!mesa) {
        setError("Mesa não encontrada");
        return;
      }

      try {
        const response = await fetch(
          `https://comii-backend.onrender.com/check-payment-status/null?mesa=${mesa}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta da API:", data);

        if (data.status === "aprovado" || data.status === "approved") {
          navigate("/success");
          return;
        }

        if (data.status === "rejeitado" || data.status === "rejected") {
          setStatus("Pagamento rejeitado. Redirecionando ao carrinho...");
          setTimeout(() => navigate("/carrinho"), 2000);
        } else if (data.status === null) {
          setStatus("Aguardando confirmação do pagamento...");
        } else {
          setStatus("Aguardando pagamento...");
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
        setError("Erro ao verificar status do pagamento");
      }
    };

    // Verifica a cada 2 segundos
    const interval = setInterval(checkPaymentStatus, 2000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 2, textAlign: "center" }}
        >
          <HourglassEmptyIcon
            sx={{ fontSize: 64, color: "info.main", mb: 2 }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Status do Pagamento
          </Typography>
          <Typography variant="body1" paragraph>
            {status}
          </Typography>
          {status === "Aguardando confirmação do pagamento..." && (
            <CircularProgress size={24} sx={{ mt: 2 }} />
          )}
          {status === "Pagamento confirmado! Seu pedido foi registrado." && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Você será redirecionado para a página inicial em 5 segundos.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Pending;
