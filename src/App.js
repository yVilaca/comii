import Banner from "./componentes/banner";
import Categoria from "./componentes/categoria";
import NavBar from "./componentes/topbar";
import './app.css'
import Itens from "./componentes/itens";



function App() {

  return (
    <div className="App">
      <NavBar />
      <Banner />
      <div class='categorias-juntas'>
        <Categoria img="./imgs/recomendados.svg" titulo="Recomendados" href="#recomendados" />
        <Categoria img="./imgs/categoria.svg" titulo="Categorias" href="#categoria" />
      </div>
      <hr></hr>
      <div class='categorias-juntas2'>
        <a href="#item"><Itens nome="Burrito" preco="19,80"/></a>
        <a href="#item"><Itens nome="Sambuei" preco="13,99"/></a>
      </div>
      Toreto cria de favela
    </div>


  );
}

export default App;
