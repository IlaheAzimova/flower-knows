import { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../service/api';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // MODAL STATE
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [quickViewInitialVariant, setQuickViewInitialVariant] = useState(0);

    const openQuickView = (product, variantIndex = 0) => {
        setQuickViewProduct(product);
        setQuickViewInitialVariant(variantIndex);
    };

    const closeQuickView = () => {
        setQuickViewProduct(null);
        setQuickViewInitialVariant(0);
    };

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.error('Products xətası:', err))
            .finally(() => setLoading(false));
    }, []);

    const unicornProducts = products.filter((p) => Number(p.id) >= 1 && Number(p.id) <= 12);
    const readyGiftProducts = products.filter((p) => Number(p.id) >= 13 && Number(p.id) <= 28);
    const limitedSaleProducts = products.filter((p) => Number(p.id) >= 29 && Number(p.id) <= 39);
    const bestsellerProducts = products.filter((p) =>
        p.collections?.includes('best-sellers')
    );

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                unicornProducts,
                readyGiftProducts,
                limitedSaleProducts,
                bestsellerProducts,
                quickViewProduct,
                quickViewInitialVariant,
                openQuickView,
                closeQuickView
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}