import React, { useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import "./AuthModal.css";

// Função para validar o formato do email
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const UserPanel = ({ user, onClose }) => {
  const [fullName, setFullName] = useState(user.full_name || "");
  const [username, setUsername] = useState(user.username || "");

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, username: username })
      .eq("id", user.id);
    if (error) {
      console.error("Erro ao atualizar perfil:", error);
    } else {
      alert("Perfil atualizado com sucesso!");
      onClose(); // Fecha o painel após a atualização
    }
  };

  return (
    <div className="user-panel">
      <h2>Perfil do Usuário</h2>
      <input
        type="text"
        placeholder="Nome completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleUpdateProfile}>Atualizar Perfil</button>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

const AuthModal = ({ isOpen, onClose, onAuthSuccess, onContinueAsGuest }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado

  const handleSuccessfulAuth = (user) => {
    console.log("Autenticação bem-sucedida, fechando modal");
    setUser(user); // Armazena o usuário autenticado
    if (typeof onAuthSuccess === "function") {
      onAuthSuccess(user);
    }
    if (typeof onClose === "function") {
      onClose();
    }
    window.location.reload();
  };

  const createProfile = async (user) => {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: name,
      username: email.split("@")[0],
      avatar_url: null,
      website: null,
    });
    if (profileError) throw profileError;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      try {
        if (!isValidEmail(email)) {
          setError("Por favor, insira um email válido.");
          return;
        }

        if (isLoginMode) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (error) throw error;
          handleSuccessfulAuth(data.user);
        } else {
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                full_name: name,
              },
            },
          });
          if (error) throw error;
          if (data.user) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { data: sessionData, error: sessionError } =
              await supabase.auth.getSession();
            if (sessionError) throw sessionError;

            if (sessionData.session) {
              await createProfile(data.user);
              handleSuccessfulAuth(data.user);
            } else {
              setError(
                "Falha ao autenticar após o registro. Por favor, faça login manualmente."
              );
            }
          } else {
            setError(
              "Por favor, verifique seu e-mail para confirmar o cadastro."
            );
          }
        }
      } catch (err) {
        console.error("Erro durante autenticação:", err);
        setError(err.message);
      }
    },
    [email, password, name, isLoginMode, onAuthSuccess, onClose]
  );

  const handleUserPanelOpen = () => {
    setUserPanelOpen(true);
  };

  const handleUserPanelClose = () => {
    setUserPanelOpen(false);
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
        {user ? ( // Se o usuário estiver autenticado
          <>
            <button onClick={handleUserPanelOpen}>Editar Perfil</button>
            {userPanelOpen && (
              <UserPanel user={user} onClose={handleUserPanelClose} />
            )}
          </>
        ) : (
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
        )}
        <div className="auth-toggle">
          <p>
            {isLoginMode ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? "Criar conta" : "Fazer login"}
            </button>
          </p>
        </div>
        <button className="continue-as-guest" onClick={onContinueAsGuest}>
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
