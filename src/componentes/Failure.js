import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/carrinho");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Falha no pagamento</h1>
      <p>
        Ocorreu um erro durante o processamento do pagamento. Você será
        redirecionado para o carrinho em 5 segundos.
      </p>
    </div>
  );
};

export default Failure;
