import './titulo.css';

function Titulo(props) {
    return (
        <section className="recomendados-text">
            <p className="recomendados-line">{props.linha}</p>
            <h1 id="recomendados">{props.titulo}</h1>
            <p className="recomendados-line">{props.linha}</p>
        </section>
    )
}
export default Titulo