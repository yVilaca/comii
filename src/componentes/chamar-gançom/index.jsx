import React from "react";
import "./chamar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChamarGarcom() {
  const chamarGarcom = () => {
    toast.info("O garçom foi solicitado para sua mesa.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      draggablePercent: 40,
    });
    
    // Aqui você pode adicionar lógica adicional, como enviar uma solicitação para o servidor
  };

  return (
    <div>
      <div id="chamar" onClick={chamarGarcom}>
        Chamar Garçom
      </div>
    </div>
  );
}

export default ChamarGarcom;