
import { useEffect, useRef, useState } from 'react';
import './AutoSuggest.scss';

function ProductItem() {
    return (
        <div className='product-item'>
            <div className='image'>
                <img src='https://picsum.photos/seed/dxMhug/640/480' />
            </div>
            <div className='details'>
                <h3>Licensed Bronze Bike</h3>
                <p>Zara</p>
                <p>$646.00</p>
            </div>
        </div>
    )
}

function AutoSuggest(props: { children: any, query:string }) {
    const searchBoxRef: any = useRef(null);
    const [searchBoxHeight, setSearchBoxHeight] = useState('0px');

    // Position the suggestion box directly below the search box
    useEffect(() => {
        if (searchBoxRef.current) {
            setSearchBoxHeight((searchBoxRef.current.offsetHeight + 10) + 'px');
        }
    }, []);

    // Listen for the query changes
    useEffect(() => {
        console.log(props.query);
    }, [props.query]);

    return (
        <div className='auto-suggest'>
            <div className='search-con' ref={searchBoxRef} >
                {props.children}
            </div>
            {/* Suggestion Box */}
            <section className='suggestion-box' style={{ marginTop: searchBoxHeight }}>
                <div className='list'>
                    <h2>SUGGESTIONS</h2>
                    <ul>
                        {[1, 2, 3, 5].map((val:number) => (
                            <li key={val}>red top</li>
                        ))}
                    </ul>
                </div>
                <div className='list'>
                    <h2>COLLECTIONS</h2>
                    <ul>
                        {[1, 2, 3, 5].map((val:number) => (
                            <li key={val}>red top</li>
                        ))}
                    </ul>
                </div>
                <div className='list'>
                    <h2>PRODUCTS</h2>
                    <div className='product-list'>
                        {[1, 2, 3].map((val:number) => (
                            <ProductItem key={val} />
                        ))}

                    </div>
                </div>
                <p className='action'>VIEW ALL PRODUCTS</p>
            </section>
        </div>
    );
}

export default AutoSuggest;