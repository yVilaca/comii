import './topbar.css';
function NavBar() {
    return <div id='topbar'>
        <ul id='lista-fundo'>
            <li><img src="./imgs/Logo.svg" alt="logo" id='logo'/></li>
            <li id='ajuda-fundo'> <a href="index.html">Ajuda</a> <svg id='seta-ajuda' viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.39215L7 7.5098L1 13.6274" stroke="#FED725" stroke-opacity="0.87" stroke-width="2" stroke-linecap="round" /></svg>
            </li>
        </ul>
    </div>
}
export default NavBar;