
import './SearchBox.scss';
import search from '../../assets/images/search.svg'
import close from '../../assets/images/close.svg'
import { useState } from 'react';

function SearchBox({ query, queryChange }: { query: string, queryChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleBox = (value: boolean): void => {
        setIsOpen(() => value);
    };

    return (
        <div className={`search-box ${isOpen ? 'open' : 'close'}`}>
            <img className='search' src={search} onClick={() => toggleBox(true)} />
            <input type='text' placeholder='Search' value={query} onChange={(e) => queryChange(e.target.value)} />
            <img className='close' src={close} onClick={() => toggleBox(false)} />
        </div>
    );
}

export default SearchBox;