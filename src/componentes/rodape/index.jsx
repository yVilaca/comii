import "./rodape.css";
import { Outlet, Link } from "react-router-dom";
function Rodape() {
    function mudarfundo(){
        
    }
    return (
        <>
            <footer>

                <Link to="/home" className="aba home" onClick={mudarfundo()}> <img src="./imgs/help-arrow.svg" alt="imagem"/> Home</Link>
                <Link to="/carrinho" className="aba cart">Carrinho</Link>
                <Link to="/produtos" className="aba products">Produtos</Link>

            </footer>
            <Outlet />
        </>
    );
}
export default Rodape;