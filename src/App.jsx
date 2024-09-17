import React, { Suspense, lazy } from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./pages/CartContext";
import Home from "./pages/Home"; // Importação direta, sem lazy loading
import { ToastContainer } from "react-toastify"; // Importar o ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importar o CSS do react-toastify
import Failure from "./componentes/Failure";
import Pending from "./componentes/Pending";
import Success from "./componentes/Success";

const Carrinho = lazy(() => import("./pages/Carrinho"));
const Produtos = lazy(() => import("./pages/Produtos"));
const Bebidas = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/produtos/subpages/Bebidas")
);
const Sobremesas = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/produtos/subpages/Sobremesas")
);
const Entradas = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/produtos/subpages/Entradas")
);
const Orders = lazy(() => import("./pages/Orders"));
const Rodape = lazy(() => import("./componentes/rodape"));
const Ajuda = lazy(() => import("./pages/Ajuda"));

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <div className="conteudotodo">
            <Suspense fallback={<div>Carregando...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/ajuda" element={<Ajuda />} />
                <Route path="/carrinho/:mesa?" element={<Carrinho />} />
                <Route path="/success" element={<Success />} />
                <Route path="/failure" element={<Failure />} />
                <Route path="/pending" element={<Pending />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/produtos" element={<Produtos />}>
                  <Route path="bebidas" element={<Bebidas />} />
                  <Route path="sobremesas" element={<Sobremesas />} />
                  <Route path="entradas" element={<Entradas />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
          <Suspense fallback={<div>Carregando rodapé...</div>}>
            <Rodape />
          </Suspense>
        </Router>
      </CartProvider>
      <span className="msgmaxwidth">
        PAGINA INDISPONÍVEL PARA SEU DISPOSITIVO <br />
        [Por favor, utilize dispositivos móveis]
      </span>
      <ToastContainer
        position="top-right"
        autoClose={5000} // Tempo de exibição das notificações em milissegundos
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
