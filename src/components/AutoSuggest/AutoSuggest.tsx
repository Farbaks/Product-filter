
import { useEffect, useRef, useState } from 'react';
import './AutoSuggest.scss';
import axios from 'axios';
import Fuse, { FuseResult } from 'fuse.js'


function AutoSuggest(props: { children: any, query: string }) {
    const searchBoxRef: any = useRef(null);
    const [searchBoxHeight, setSearchBoxHeight] = useState<string>('0px');

    const [suggestions, setSuggestions] = useState<Array<Suggestion>>([]);
    const [collections, setCollections] = useState<Array<Suggestion>>([]);
    const [products, setProducts] = useState<Array<Suggestion>>([]);

    // Position the suggestion box directly below the search box
    useEffect(() => {
        if (searchBoxRef.current) setSearchBoxHeight((searchBoxRef.current.offsetHeight + 10) + 'px');
    }, []);

    // Listen for the query changes
    useEffect(() => {
        loadResult();
    }, [props.query]);

    // Function to load results
    const loadResult = async () => {
        axios.get('/api/data.json').then((res: any) => {
            setSuggestions(filterResult(res.data.suggestion, 'suggestion'));
            setCollections(filterResult(res.data.collection, 'collection'));
            setProducts(filterResult(res.data.product, 'product'));
        }).catch((error) => {

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
            case 'suggestion':
                keys = ['title', 'brand']
                break;
            default:
                keys = ['title']
                break;
        }

        const options = { keys: keys }
        const fuse = new Fuse(data, options)
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
            <section className='suggestion-box' style={{ marginTop: searchBoxHeight }}>
                <div className='list'>
                    <h2>SUGGESTIONS</h2>
                    <ul>
                        {suggestions.map((item: Suggestion, index: number) => (
                            <a key={index} href={item.url}>{item.term}</a>
                        ))}
                    </ul>
                </div>
                <div className='list'>
                    <h2>COLLECTIONS</h2>
                    <ul>
                        {collections.map((item: Suggestion, index: number) => (
                            <a key={index} href={item.url}>{item.title}</a>
                        ))}
                    </ul>
                </div>
                <div className='list'>
                    <h2>PRODUCTS</h2>
                    <div className='product-list'>
                        {products.map((item: Suggestion, index: number) => (
                            <ProductItem key={index} product={item} />
                        ))}

                    </div>
                </div>
                <p className='action'>VIEW ALL PRODUCTS</p>
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

export default AutoSuggest;