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

const Pending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(CartContext);
  const [status, setStatus] = useState("Verificando status do pagamento...");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get("payment_id");
      const mesa = localStorage.getItem("lastMesa");

      try {
        const response = await fetch(
          `https://comii-backend.onrender.com/check-payment-status/${paymentId}?mesa=${mesa}`
        );
        const data = await response.json();

        if (data.isPaid) {
          setStatus("Pagamento confirmado! Seu pedido foi registrado.");
          clearCart();
          localStorage.removeItem("lastPreferenceId");
          localStorage.removeItem("lastMesa");
          setTimeout(() => navigate("/"), 5000);
        } else if (data.status === "pending") {
          setStatus("Aguardando confirmação do pagamento...");
        } else {
          setStatus("Erro no pagamento. Por favor, tente novamente.");
          setTimeout(() => navigate("/carrinho"), 5000);
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
        setStatus(
          "Erro ao verificar status do pagamento. Tente novamente mais tarde."
        );
        setTimeout(() => navigate("/carrinho"), 5000);
      }
    };

    checkPaymentStatus();
    const interval = setInterval(checkPaymentStatus, 5000); // Verifica a cada 5 segundos

    return () => clearInterval(interval);
  }, [location.search, clearCart, navigate]);

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
