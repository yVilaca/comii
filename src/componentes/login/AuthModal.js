import React, { useState, useCallback } from "react";
import { supabase } from "../../supabaseClient"; // Certifique-se de que este caminho está correto
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      try {
        if (isLoginMode) {
          await onLogin(email, password);
        } else {
          await onRegister(name, email, password);
        }
      } catch (err) {
        setError(err.message);
      }
    },
    [email, password, name, isLoginMode, onLogin, onRegister]
  );

  const handleContinueAsGuest = () => {
    onClose(); // Simplesmente fecha o modal
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{isLoginMode ? "Bem-vindo de volta!" : "Crie sua conta"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isLoginMode ? "Entrar" : "Criar conta"}
          </button>
        </form>
        <div className="auth-toggle">
          <p>
            {isLoginMode ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? "Criar conta" : "Fazer login"}
            </button>
          </p>
        </div>
        <button className="continue-as-guest" onClick={handleContinueAsGuest}>
          Continuar como convidado
        </button>
        <div className="auth-benefits">
          <h3>Benefícios exclusivos para membros:</h3>
          <ul>
            <li>10% de desconto na primeira compra</li>
            <li>Acumule pontos e troque por recompensas</li>
            <li>Acesso a promoções exclusivas</li>
            <li>Histórico completo de pedidos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
