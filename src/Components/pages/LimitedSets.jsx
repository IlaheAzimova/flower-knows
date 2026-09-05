import React, { useMemo, useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import ProductCard from '../common/ProductCard';
import ShopByCategory from '../common/ShopByCategory';
import CollectionToolbar from '../common/CollectionToolbar';
import { getProductFinalPrice } from '../service/price';
import { useCollectionFilter } from '../service/useCollectionFilter';

function LimitedSets() {
    const { products, loading } = useProducts();
    const { formatPrice } = useCurrency();
    const [showAll, setShowAll] = useState(false);

    // 1. Limited Sets baza məhsulları
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        return products.filter((p) => {
            const colStr = Array.isArray(p.collections)
                ? p.collections.join(' ').toLowerCase()
                : String(p.collections || p.collection || '').toLowerCase();
            const tags = Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase() : '';
            const title = (p.title || '').toLowerCase();
            const cat = (p.category || '').toLowerCase();

            // Set yoxlanışları
            const isLimited = colStr.includes('limited-set') || colStr.includes('limited') || tags.includes('limited');
            const isAllIn = cat === 'all-in' || cat === 'allin' || title.includes('all-in');
            const isGiftSet = title.includes('gift set') || title.includes('makeup set') || title.includes('value set') || title.includes('collection set');
            const isBox = title.includes('gift box') || title.includes('all-in box');

            // Tək məhsulları kənarlaşdırırıq
            const isSingleProduct = title.includes('setting powder') || cat === 'face' || cat === 'eyes' || cat === 'lips';

            return (isLimited || isAllIn || isGiftSet || isBox) && !isSingleProduct;
        });
    }, [products]);

    // 2. Bütün filtrləmə, sıralama və sütun parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: limitedProducts,
        sortBy,
        setSortBy,
        gridCols,
        setGridCols,
        selectedTypes,
        setSelectedTypes,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        gridClass
    } = useCollectionFilter(baseCollectionProducts);

    // Filtr və çeşidləmə dəyişdikdə "Show More" vəziyyətini sıfırlayırıq
    useEffect(() => {
        setShowAll(false);
    }, [sortBy, selectedTypes, minPrice, maxPrice]);

    // 3 sətir limit
    const initialCount = gridCols * 3;
    const displayedProducts = showAll ? limitedProducts : limitedProducts.slice(0, initialCount);

    return (
        <div className="w-full bg-white min-h-screen">
            {/* BAŞLIQ VƏ PROMO MƏTNİ */}
            <div className="pt-12 pb-8 text-center px-4">
                <h1 className="font text-[36px] sm:text-[44px] text-[#ea9393] tracking-[1px] select-none mb-3">
                    Limited Sets
                </h1>
                <div className="dmsans text-[13px] md:text-[14px] text-[#555] space-y-1">
                    <p>Spend {formatPrice(50)}+, get a Mini Rosy Bow Pouch</p>
                    <p>Spend {formatPrice(80)}+, get a random Full-size Product</p>
                </div>
            </div>

            <div className="md:w-[90%] mx-auto px-4 md:px-8 pb-16">
                {/* ORTAQ TOOLBAR */}
                <CollectionToolbar
                    products={baseCollectionProducts}
                    selectedTypes={selectedTypes}
                    setSelectedTypes={setSelectedTypes}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    getPrice={getProductFinalPrice}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    gridCols={gridCols}
                    setGridCols={setGridCols}
                />

                {/* MƏHSUL SAYI */}
                <p className="dmsans text-[12px] text-[#777] my-4">
                    {limitedProducts.length} products
                </p>

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : displayedProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="font text-gray-500 mb-2">No products found.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedTypes([]);
                                setMinPrice(0);
                                setMaxPrice(null);
                            }}
                            className="text-[12px] uppercase tracking-wider text-[#ea9393] underline cursor-pointer hover:text-[#d88080]"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={`grid ${gridClass} gap-x-4 md:gap-x-6 gap-y-10`}>
                            {displayedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    bg="bg-[#faf9f8]"
                                />
                            ))}
                        </div>

                        {/* SHOW MORE DÜYMƏSİ */}
                        {!showAll && limitedProducts.length > initialCount && (
                            <div className="flex justify-center mt-14">
                                <button
                                    type="button"
                                    onClick={() => setShowAll(true)}
                                    className="border border-[#ea9393] text-[#ea9393] hover:bg-[#ea9393] hover:text-white transition duration-300 font uppercase text-[12px] tracking-[2.5px] px-10 py-3.5 cursor-pointer"
                                >
                                    Show More ({limitedProducts.length - initialCount} more)
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <ShopByCategory />
        </div>
    );
}

export default LimitedSets;