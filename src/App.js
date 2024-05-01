import Banner from "./componentes/banner";
import Categoria from "./componentes/categoria";
import NavBar from "./componentes/topbar";
import './app.css'
import Itens from "./componentes/itens";
import Item_d from "./componentes/item-deitado";



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
<<<<<<< HEAD
      
      <Item_d id="1" nome="Cheese Burguer" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa."/>
      <Item_d id="2" nome="X-Bacon" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa."/>
      <Item_d id="3" nome="X-Tudo" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa."/>
      <Item_d id="4" nome="X-Vegetariano" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa."/>
=======
      Toreto cria de favela
>>>>>>> 7fc3431d83bccf1b0c3ce5de66b8c970a82efaff
    </div>


  );
}

export default App;
