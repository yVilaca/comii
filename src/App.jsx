import React, { Suspense, lazy, useState, useEffect } from "react";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./pages/CartContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Failure from "./componentes/Failure";
import Pending from "./componentes/Pending";
import Success from "./componentes/Success";
import AuthModal from "./componentes/login/AuthModal";
import { getUserProfile } from "./componentes/getUsers";
import { supabase } from "./supabaseClient";
import ErrorBoundary from "./componentes/ErrorBoundary";
import { AuthProvider } from "./componentes/AuthContext/AuthContext";

const Carrinho = lazy(() => import("./pages/Carrinho"));
const Produtos = lazy(() => import("./pages/Produtos"));
const Bebidas = lazy(() => import("./pages/produtos/subpages/Bebidas"));
const Sobremesas = lazy(() => import("./pages/produtos/subpages/Sobremesas"));
const Entradas = lazy(() => import("./pages/produtos/subpages/Entradas"));
const Orders = lazy(() => import("./pages/Orders"));
const Rodape = lazy(() => import("./componentes/rodape"));
const Ajuda = lazy(() => import("./pages/Ajuda"));

function App() {
  const [session, setSession] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = async (user) => {
    setSession(user);
    setShowAuthModal(false);

    // Verifique se o perfil já existe
    const existingProfile = await getUserProfile(user.id);
    if (!existingProfile) {
      // Se não existir, crie um novo perfil
      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        full_name: user.user_metadata.full_name || "",
        username: user.email.split("@")[0],
        avatar_url: null,
        website: null,
      });

      if (error) {
        console.error("Erro ao criar perfil:", error);
      }
    }
  };

  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <div className="App">
            <CartProvider>
              <div className="conteudotodo">
                <Suspense fallback={<div>Carregando...</div>}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Home
                          session={session}
                          setShowAuthModal={setShowAuthModal}
                        />
                      }
                    />
                    <Route
                      path="/home"
                      element={
                        <Home
                          session={session}
                          setShowAuthModal={setShowAuthModal}
                        />
                      }
                    />
                    <Route path="/ajuda" element={<Ajuda />} />
                    <Route
                      path="/carrinho/:mesa?"
                      element={
                        <Carrinho
                          session={session}
                          setShowAuthModal={setShowAuthModal}
                        />
                      }
                    />
                    <Route path="/success" element={<Success />} />
                    <Route path="/failure" element={<Failure />} />
                    <Route path="/pending" element={<Pending />} />
                    <Route
                      path="/orders"
                      element={
                        <Orders
                          session={session}
                          setShowAuthModal={setShowAuthModal}
                        />
                      }
                    />
                    <Route
                      path="/produtos"
                      element={<Navigate to="/produtos/entradas" />}
                    />
                    <Route path="/produtos" element={<Produtos />}>
                      <Route path="bebidas" element={<Bebidas />} />
                      <Route path="sobremesas" element={<Sobremesas />} />
                      <Route
                        path="entradas"
                        element={<Entradas isActive={true} />}
                      />
                    </Route>
                  </Routes>
                </Suspense>
              </div>
              <Suspense fallback={<div>Carregando rodapé...</div>}>
                <Rodape className="rodape" />
              </Suspense>
            </CartProvider>
            <span className="msgmaxwidth">
              PAGINA INDISPONÍVEL PARA SEU DISPOSITIVO <br />
              [Por favor, utilize dispositivos móveis]
            </span>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onAuthSuccess={handleAuthSuccess}
            />
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
