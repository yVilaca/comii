import './titulo.css';

function Titulo (props){
    return (
        <section className="recomendados-text">
            <p className="recomendados-line">----------------------------</p>
            <h1 id="recomendados">{props.titulo}</h1>
            <p className="recomendados-line">----------------------------</p>
        </section>
    )
}
export default Titulo