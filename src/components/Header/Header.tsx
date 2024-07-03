
import './Header.scss';
import logo from '../../assets/images/logo.svg';
import SearchBox from '../SearchBox/SearchBox';
import AutoSuggest from '../AutoSuggest/AutoSuggest';
import { useState } from 'react';

function Header() {
    const [searchQuery, setSearchQuery] = useState("");

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

            <AutoSuggest query={searchQuery}>
                <SearchBox query={searchQuery} queryChange={(val: string) => setSearchQuery(val)} />
            </AutoSuggest>

        </header>
    );
}

export default Header;