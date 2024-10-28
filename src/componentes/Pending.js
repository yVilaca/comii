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

  useEffect(() => {
    const socket = io("https://comii-backend.onrender.com");

    socket.on("pedidoAprovado", (data) => {
      console.log("Evento 'pedidoAprovado' recebido:", data); // Adicione este log
      if (data.mesa === localStorage.getItem("lastMesa")) {
        navigate(`/success?pedido_id=${data.pedidoId}`);
      }
    });

    const checkPaymentStatus = async () => {
      try {
        const preferenceId = localStorage.getItem("lastPreferenceId");
        const mesa = localStorage.getItem("lastMesa");

        // Log para depuração
        console.log("Verificando status do pagamento com:", {
          preferenceId,
          mesa,
        });

        const response = await fetch(
          `https://comii-backend.onrender.com/check-payment-status/${preferenceId}?mesa=${mesa}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta da API:", data); // Log para depuração

        if (data.status === "approved") {
          navigate(`/success?pedido_id=${data.pedidoId}`);
        } else if (data.status === "rejected") {
          navigate("/failure");
        } else {
          setStatus(`Status do pagamento: ${data.status}`);
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
        setStatus(
          "Erro ao verificar status do pagamento. Tente novamente mais tarde."
        );
      }
    };
    const interval = setInterval(checkPaymentStatus, 5000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
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
