import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Failure = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
    localStorage.removeItem("lastPreferenceId");
    localStorage.removeItem("lastMesa");
    const timer = setTimeout(() => {
      navigate("/carrinho");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate, clearCart]);

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
          redirecionado para o carrinho em 5 segundos.
        </Typography>
        <CircularProgress size={24} sx={{ mt: 2 }} />
      </Box>
    </Container>
  );
};

export default Failure;
