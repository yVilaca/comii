import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './pages/CartContext';

import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Produtos from './pages/Produtos';
import Bebidas from './pages/produtos/subpages/Bebidas';
import Sobremesas from './pages/produtos/subpages/Sobremesas';
import Entradas from './pages/produtos/subpages/Entradas';
import Orders from './pages/Orders'; // Importe o componente Orders aqui
import Rodape from './componentes/rodape';
import Ajuda from './pages/Ajuda';

function App() {
  return (
    <div className="App">
      <div className='conteudotodo'>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/ajuda" element={<Ajuda />} />
              <Route path="/carrinho/:mesa" element={<Carrinho />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/produtos" element={<Produtos />}>
                <Route path="bebidas" element={<Bebidas />} />
                <Route path="sobremesas" element={<Sobremesas />} />
                <Route path="entradas" element={<Entradas />} />
              </Route>
            </Routes>
            <Rodape />
          </BrowserRouter>
        </CartProvider>
      </div>

      <span className='msgmaxwidth' style={{ margin: "0 auto" }}>
        PAGINA INDISPONÍVEL PARA SEU DISPOSITIVO <br />
        [Por favor, utilize dispositivos móveis]
      </span>
    </div>
  );
}

export default App;
