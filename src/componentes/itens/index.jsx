import './itens.css';

function Itens() {
    return <div>
        <ul id='item-img'>
            <img src="./imgs/item1.svg" alt="" />
            <div><img src="./imgs/star_fill.svg" alt=""/><p>4,5</p></div>
        </ul>
        <ul id='item-geral'>
            <li id='linha-1'><p>Comida</p> <p>R$5,00</p></li>
            <li id='desc-item'>Burrito do chefe com queijos especiais e temperos italianos selecionados.</li>
        </ul>
    </div>
}
export default Itens;
