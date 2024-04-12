import Banner from "./componentes/banner";
import Categoria from "./componentes/categoria";
import NavBar from "./componentes/topbar";
import './app.css'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <div id='categorias-juntas'>
        <Categoria img="./imgs/recomendados.svg" titulo="Recomendados" href="#recomendados"/>
        <Categoria img="./imgs/categoria.svg" titulo="Categorias" href="#categoria"/>
      </div>
      <hr></hr>
    </div>
  );
}

export default App;
