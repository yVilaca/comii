import './app.css';
import Rodape from "./componentes/rodape";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Produtos from './pages/Produtos';
import Bebidas from './pages/produtos/subpages/Bebidas';
import Sobremesas from './pages/produtos/subpages/Sobremesas';
import Entradas from './pages/produtos/subpages/Entradas';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rodape />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="carrinho" element={<Carrinho />} />
            <Route path="produtos" element={<Produtos />}>
              <Route path="bebidas" element={<Bebidas />} />
              <Route path="sobremesas" element={<Sobremesas />} />
              <Route path="entradas" element={<Entradas />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
