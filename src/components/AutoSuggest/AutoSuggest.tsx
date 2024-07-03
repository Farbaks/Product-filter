
import { useEffect, useRef, useState } from 'react';
import './AutoSuggest.scss';
import axios from 'axios';
import Fuse, { FuseResult } from 'fuse.js'


function AutoSuggest(props: { children: any, query: string, options: SuggestionConfig }) {
    const searchBoxRef: any = useRef(null);
    const [searchBoxHeight, setSearchBoxHeight] = useState<string>('0px');
    const [searchBoxLeftOffset, setSearchBoxLeftOffset] = useState<number>(0);

    const [suggestions, setSuggestions] = useState<Array<Suggestion>>([]);
    const [collections, setCollections] = useState<Array<Suggestion>>([]);
    const [products, setProducts] = useState<Array<Suggestion>>([]);

    // Position the suggestion box directly below the search box
    useEffect(() => {
        if (searchBoxRef.current) {
            setSearchBoxHeight((searchBoxRef.current.offsetHeight + 10) + 'px');
            const rect = searchBoxRef.current.getBoundingClientRect();
            setSearchBoxLeftOffset(rect.left);
        }
    }, []);

    // Listen for the query changes
    useEffect(() => {
        setCollections([]);
        setProducts([]);
        setSuggestions([]);

        if (props.query.length >= props.options.minChar) loadResult();
    }, [props.query]);

    // Function to load results
    const loadResult = async () => {
        axios.get('/api/data.json').then((res: any) => {
            if (props.options.showSuggestion) setSuggestions(filterResult(res.data.suggestion, 'suggestion'));
            if (props.options.showCollection) setCollections(filterResult(res.data.collection, 'collection'));
            if (props.options.showProducts) setProducts(filterResult(res.data.product, 'product'));
        });
    }

    // Function to filter using fuzzy search
    const filterResult = (data: Array<Suggestion>, type: 'suggestion' | 'collection' | 'product'): Array<Suggestion> => {
        let keys: Array<string> = [];
        switch (type) {
            case 'suggestion':
                keys = ['term']
                break;
            case 'collection':
                keys = ['title']
                break;
            case 'product':
                keys = ['title', 'brand']
                break;
            default:
                keys = ['title']
                break;
        }

        const options = { keys: keys, threshold: 0.5, };
        const fuse = new Fuse(data, options);
        const rawResult: Array<FuseResult<Suggestion>> = fuse.search(props.query);
        return rawResult.map((item: any) => item.item).slice(0, 3);
    }

    return (
        <div className='auto-suggest'>
            {/* Search Box */}
            <div className='search-con' ref={searchBoxRef} >
                {props.children}
            </div>
            {/* Suggestion Box */}
            <section className={`suggestion-box ${searchBoxLeftOffset > 100 ? 'full-box' : ''} ${props.query ? 'show-box' : ''}`} style={{ marginTop: searchBoxHeight }}>
                {/* Suggestion Term section */}
                {props.options.showSuggestion && (
                    <div className='list'>
                        <h2>SUGGESTIONS</h2>
                        <ul>
                            {suggestions.map((item: Suggestion, index: number) => (
                                <a key={index} href={item.url}>{item.term}</a>
                            ))}
                        </ul>
                        {suggestions.length == 0 && (
                            <p className='no-result'>No suggestions found...</p>
                        )}
                    </div>
                )}
                {/* Collection section */}
                {props.options.showCollection && (
                    <div className='list'>
                        <h2>COLLECTIONS</h2>
                        <ul>
                            {collections.map((item: Suggestion, index: number) => (
                                <a key={index} href={item.url}>{item.title}</a>
                            ))}
                        </ul>
                        {collections.length == 0 && (
                            <p className='no-result'>No collections found...</p>
                        )}
                    </div>
                )}
                {/* Products section */}
                {props.options.showProducts && (
                    <div className='list'>
                        <h2>PRODUCTS</h2>
                        <div className='product-list'>
                            {products.map((item: Suggestion, index: number) => (
                                <ProductItem key={index} product={item} />
                            ))}
                        </div>
                        {products.length == 0 && (
                            <p className='no-result'>No products found...</p>
                        )}
                    </div>
                )}
                {products.length > 0 && (
                    <p className='action'>VIEW ALL PRODUCTS</p>
                )}
            </section>
        </div>
    );
}

function ProductItem({ product }: { product: Suggestion }) {
    return (
        <a className='product-item' href={product.url}>
            <div className='image'>
                <img src={product.image} />
            </div>
            <div className='details'>
                <h3>{product.title}</h3>
                <p>{product.brand}</p>
                <p>${product.price}</p>
            </div>
        </a>
    )
}

type Suggestion = {
    term?: string,
    url: string,
    title?: string,
    brand?: string,
    image?: string,
    price?: string
}

export type SuggestionConfig = {
    showSuggestion: boolean,
    showCollection: boolean,
    showProducts: boolean,
    minChar: number
}

export default AutoSuggest;