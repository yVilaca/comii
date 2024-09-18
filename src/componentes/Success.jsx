import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
          `http://https://comii-backend.onrender.com/check-payment-status/${paymentId}?mesa=${
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
