import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
    background: {
      default: "#f0f4f8",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const Success = () => {
  const [status, setStatus] = useState("Verificando status do pagamento...");
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

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
          `https://comii-backend.onrender.com/check-payment-status/${paymentId}?mesa=${mesa}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Resposta do servidor:", data);

        if (data.isPaid) {
          setStatus("Pagamento confirmado! Seu pedido foi registrado.");
          clearCart();
          // Limpar informações relevantes
          localStorage.removeItem("lastPreferenceId");
          localStorage.removeItem("lastMesa");
          // Redirecionar para a página inicial após 5 segundos
          setTimeout(() => navigate("/"), 5000);
        } else if (data.status === "pending") {
          setStatus("Aguardando confirmação do pagamento...");
          // Verificar novamente após 5 segundos
          setTimeout(checkPaymentStatus, 5000);
        } else {
          setStatus("Erro no pagamento. Por favor, tente novamente.");
          // Redirecionar para o carrinho após 5 segundos
          setTimeout(() => navigate("/carrinho"), 5000);
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
        setStatus(
          "Erro ao verificar status do pagamento. Tente novamente mais tarde."
        );
        // Redirecionar para o carrinho após 5 segundos
        setTimeout(() => navigate("/carrinho"), 5000);
      }
    };

    checkPaymentStatus();
  }, [location.search, navigate, clearCart]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
              boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 64, color: "white" }} />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
              color="primary.main"
            >
              Status do Pagamento
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
              {status}
            </Typography>
            {status === "Verificando status do pagamento..." && (
              <CircularProgress size={32} thickness={4} sx={{ mt: 2 }} />
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Success;
