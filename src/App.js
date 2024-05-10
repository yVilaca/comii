import './app.css'
import Rodape from "./componentes/rodape";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Produtos from './pages/Produtos';


function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rodape />}>
            <Route path="home" element={<Home/>} />
            <Route path="carrinho" element={<Carrinho/>} />
            <Route path="produtos" element={<Produtos/>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>


  );
}

export default App;
