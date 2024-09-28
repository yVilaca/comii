import React, { Suspense, lazy, useState, useEffect } from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./pages/CartContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Failure from "./componentes/Failure";
import Pending from "./componentes/Pending";
import Success from "./componentes/Success";
import AuthModal from "./componentes/login/AuthModal";
import { supabase } from "./supabaseClient";

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

  const handleAuthSuccess = (user) => {
    setSession(user);
    setShowAuthModal(false);
  };

  return (
    <div className="App">
      <CartProvider>
        <Router>
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
                <Route path="/produtos" element={<Produtos />}>
                  <Route path="bebidas" element={<Bebidas />} />
                  <Route path="sobremesas" element={<Sobremesas />} />
                  <Route path="entradas" element={<Entradas />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
          <Suspense fallback={<div>Carregando rodapé...</div>}>
            <Rodape className="rodape" />
          </Suspense>
        </Router>
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
  );
}

export default App;
