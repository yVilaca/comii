import Rodape from "../componentes/rodape";
import NavBar from "../componentes/topbar";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { register } from "swiper/element/bundle";
import './produtos.css';
import Carrossel from "../componentes/carrossel";
//import CategoriaProduto from "../componentes/categoria-produto";


register();


const Produtos = () => {
    return (<div>
        <NavBar />

        <Rodape />


       {/* <div id="categoria-juntas4">
            <div id="categoria-junta"> 
                <CategoriaProduto titulo="Bebidas" href="#bebidas" className="categorias"/>
                <CategoriaProduto titulo="Entradas" href="#entradas" className="categorias"/>
                <CategoriaProduto titulo="Sobremesas" href="#sobremesas" className="categorias"/>
            </div>
    </div> */}
        <Carrossel/>
    </div>
    )
};

export default Produtos;