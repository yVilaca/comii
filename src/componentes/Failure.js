import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, CircularProgress, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useContext } from "react";
import { CartContext } from "../pages/CartContext";

const Failure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(CartContext);
  const [errorDetails, setErrorDetails] = useState("");

  useEffect(() => {
    const fetchErrorDetails = async () => {
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get("payment_id");
      const mesa = localStorage.getItem("lastMesa");

      try {
        const response = await fetch(
          `https://comii-backend.onrender.com/check-payment-status/${paymentId}?mesa=${mesa}`
        );
        const data = await response.json();
        setErrorDetails(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Erro ao buscar detalhes do erro:", error);
        setErrorDetails("Não foi possível obter detalhes do erro.");
      }
    };

    fetchErrorDetails();
    clearCart();
    localStorage.removeItem("lastPreferenceId");
    localStorage.removeItem("lastMesa");
    const timer = setTimeout(() => {
      navigate("/carrinho");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate, clearCart, location.search]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Falha no pagamento
        </Typography>
        <Typography variant="body1" paragraph>
          Ocorreu um erro durante o processamento do pagamento. Você será
          redirecionado para o carrinho em 10 segundos.
        </Typography>
        <Typography variant="body2" paragraph>
          Detalhes do erro:
        </Typography>
        <pre style={{ textAlign: "left", maxWidth: "100%", overflowX: "auto" }}>
          {errorDetails}
        </pre>
        <CircularProgress size={24} sx={{ mt: 2 }} />
      </Box>
    </Container>
  );
};

export default Failure;
