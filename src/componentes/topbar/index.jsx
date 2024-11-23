import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import AuthModal from "../login/AuthModal";
import UserPanel from "../userPanel/UserPanel";
import { useAuth } from "../../componentes/AuthContext/AuthContext";
import { FaUser } from "react-icons/fa";
import { supabase } from "../../supabaseClient";

function NavBar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const { user, login, signOut } = useAuth();

  const handleLogin = useCallback(
    async (email, password) => {
      try {
        await login(email, password);
        console.log("Login successful");
        setIsAuthModalOpen(false);
      } catch (error) {
        console.error("Error logging in:", error.message);
        throw error; // Propagate the error to be handled in AuthModal
      }
    },
    [login]
  );

  const handleRegister = useCallback(async (name, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      if (error) throw error;
      console.log("Registration successful", data);
      setIsAuthModalOpen(false);
      alert(
        "Registro bem-sucedido! Por favor, verifique seu e-mail para confirmar sua conta."
      );
    } catch (error) {
      console.error("Error registering:", error.message);
      throw error; // Propagate the error to be handled in AuthModal
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      console.log("Logout successful");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Erro ao fazer logout: " + error.message);
    }
  }, [signOut]);

  const getUserDisplayName = () => {
    if (user && user.user_metadata && user.user_metadata.full_name) {
      return user.user_metadata.full_name.split(" ")[0]; // Pega apenas o primeiro nome
    }
    return user?.email?.split("@")[0] || "Usuário"; // Fallback para o início do email ou 'Usuário'
  };

  const handleUserPanelOpen = () => {
    setIsUserPanelOpen(true);
  };

  return (
    <div id="topbar">
      <ul id="lista-fundo">
        <li>
          <img src="/imgs/Logo.svg" alt="logo" id="logo" />
        </li>
        <div className="ajuda-login">
          <li>
            {user ? (
              <button onClick={handleUserPanelOpen} className="login-button">
                <FaUser /> {getUserDisplayName()}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="login-button"
              >
                <FaUser /> Entrar
              </button>
            )}
          </li>

          <li id="ajuda-fundo">
            <Link to="/ajuda">Ajuda</Link>
            <img id="seta-ajuda" src="/imgs/help-arrow.svg" alt="" />
          </li>
        </div>
      </ul>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      {isUserPanelOpen && (
        <UserPanel user={user} onClose={() => setIsUserPanelOpen(false)} />
      )}
    </div>
  );
}

export default React.memo(NavBar);
