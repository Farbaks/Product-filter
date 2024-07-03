
import './SearchBox.scss';
import search from '../../assets/images/search.svg'
import close from '../../assets/images/close.svg'
import { useState } from 'react';

function SearchBox() {
    const [isOpen, setIsOpen] = useState(true);

    function toggleBox(value: boolean): void {
        setIsOpen((val:boolean) => value);
    }

    return (
        <div className={`search-box ${isOpen ? 'open' : 'close'}`}>
            <img className='search' src={search} onClick={() => toggleBox(true)} />
            <input type='text' placeholder='Search' />
            <img className='close' src={close} onClick={() => toggleBox(false)} />
        </div>
    );
}

export default SearchBox;