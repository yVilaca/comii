import Banner from "../componentes/banner";
import Categoria from "../componentes/categoria";
import ItemD from "../componentes/item-deitado";
import Itens from "../componentes/itens";
import Rodape from "../componentes/rodape";
import NavBar from "../componentes/topbar";


const Home = () => {
    return (
        <div>
            <NavBar />
            <Banner />
            <div className='categorias-juntas'>
                <Categoria img="./imgs/recomendados.svg" titulo="Recomendados" href="#recomendados" />
                <Categoria img="./imgs/categoria.svg" titulo="Categorias" href="#categoria" />
            </div>
            <hr></hr>
            <div className='categorias-juntas2'>
                <a href="#item"><Itens nome="Burrito" preco="19,80" /></a>
                <a href="#item"><Itens nome="Sambuei" preco="13,99" /></a>
            </div>
            <ItemD id="1" nome="Cheese Burguer" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
            <ItemD id="2" nome="X-Bacon" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
            <ItemD id="3" nome="X-Tudo" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
            <ItemD id="4" nome="X-Vegetariano" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
        </div>
    );
};

export default Home;