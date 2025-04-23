// import "./index.css";
import pokemonLogo from '../assets/pokemon-23.svg';
import "../index.css";
const Header = () => {
    return (
      <header className="site-header">
        <img src={pokemonLogo} alt="Pokemon" className='Logo' />
      </header>
    );
  };
  
  export default Header;
  