import './topbar.css';
function NavBar() {
    return <div id='topbar'>
        <ul id='lista-fundo'>
            <li><img src="/imgs/Logo.svg" alt="logo" id='logo' /></li>
            <li id='ajuda-fundo'> <a href="index.php">Ajuda</a> <img id='seta-ajuda' src="/imgs/help-arrow.svg" alt="" /></li>
        </ul>
    </div>
}
export default NavBar;