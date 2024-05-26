import './categoria.css';
function Categoria(props) {
    return <div >
        <section id='fundo-categoria'>
            <img src={props.img} alt="" />
            <a href={props.href}>{props.titulo}</a>
        </section>
    </div>
}
export default Categoria;