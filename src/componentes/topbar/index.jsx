import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import AuthModal from "../login/AuthModal";
import { supabase } from "../../supabaseClient";
import { FaUser } from "react-icons/fa";

function NavBar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log("Login successful", data);
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const handleRegister = async (name, email, password) => {
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
      alert("Erro ao registrar: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Erro ao fazer logout: " + error.message);
    }
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
              <button onClick={handleLogout} className="login-button">
                <FaUser /> Sair
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
    </div>
  );
}

export default NavBar;
