import React from "react";
import './bebidas.css'

function Bebidas() {
  return <div>
    <section className="recomendados-text">
      <p className="recomendados-line">------------------------------------------</p>
      <h1 id="recomendados">BEBIDAS</h1>
      <p className="recomendados-line">------------------------------------------</p>
    </section>

    <div className='deitado'>
      <ul className='list-deitado'>
        <li><img src="/imgs/agua.svg" alt="" /></li>
        <li className='imfo-deitado'>
          <p className="nomeItem">Água</p>
          <p className="descItem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed faucibus odio. Quisque leo ligula, lobortis nec est a, mattis iaculis massa..</p>

          <div id='flex-preco'>
            <p>R$ 100,00</p>
            <button><img src="" alt="" /></button>
          </div>
        </li>
      </ul>
    </div>
  </div>;
}

export default Bebidas;
