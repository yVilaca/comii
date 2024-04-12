import './categoria.css';
function Categoria(props){
    return <div >
        <section id='fundo-categoria'>
            <img src={props.img} alt="" />
            <p>{props.titulo}</p>
        </section>
    </div>
}
export default Categoria;