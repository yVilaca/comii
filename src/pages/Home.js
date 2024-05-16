import Banner from "../componentes/banner";
import ItemD from "../componentes/item-deitado";
import Itens from "../componentes/itens";
import NavBar from "../componentes/topbar";
import "./home.css"


const Home = () => {
    return (
        <div>
            <NavBar />
            <Banner />

            <section className="recomendados-text">
                <p className="recomendados-line">-----------------------------------</p>
                <h1 id="recomendados">RECOMENDADOS</h1>
                <p className="recomendados-line">-----------------------------------</p>
            </section>

            <div className='categorias-juntas2'>
                <a href="#item"><Itens nome="Burrito" preco="19,80" /></a>
                <a href="#item"><Itens nome="Sambuei" preco="13,99" /></a>
            </div>

            <div className="itens" style={{ marginBottom: "15%" }}>
                <ItemD id="1" nome="Cheese Burguer" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
                <ItemD id="2" nome="X-Bacon" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
                <ItemD id="3" nome="X-Tudo" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
                <ItemD id="4" nome="X-Vegetariano" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
                <ItemD id="4" nome="X-Vegetariano" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa." />
            </div>
        </div>
    );
};

export default Home;