
import './Header.scss';
import logo from '../../assets/images/logo.svg';
import SearchBox from '../SearchBox/SearchBox';

function Header() {
    return (
        <header>
            <div className='logo'>
                <img src={logo} />
            </div>

            <nav>
                <a className='first-link'>Home</a>
                <a>Tops</a>
                <a>Dresses</a>
                <a>Outerwear</a>
                <a>Intimates</a>
                <a>Swimwear</a>
                <a>Shoes</a>
            </nav>

            <SearchBox />
        </header>
    );
  }
  
export default Header;