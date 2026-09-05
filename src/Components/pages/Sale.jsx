import React, { useMemo, useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import ProductCard from '../common/ProductCard';
import ShopByCategory from '../common/ShopByCategory';
import CollectionToolbar from '../common/CollectionToolbar';
import CategoryTabs from '../common/CategoryTabs';
import { getProductFinalPrice } from '../service/price';
import { useCollectionFilter } from '../service/useCollectionFilter';

const SALE_CATEGORIES = ['ALL', 'EYES', 'FACE', 'LIPS', 'FRAGRANCE', 'ALL-IN'];

function Sale() {
    const { products, loading } = useProducts();
    const { formatPrice } = useCurrency();

    // Məhsul sayı və Show More üçün state
    const ITEMS_PER_PAGE = 8;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // 1. Baza Sale məhsulları
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        return products.filter((p) => {
            if (Number(p.id) === 51 || p.category === 'gift-card') return false;
            return p.collections?.includes('sale');
        });
    }, [products]);

    // 2. Bütün filtrləmə, sıralama və sütun parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: saleProducts,
        selectedCategory,
        setSelectedCategory,
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

    // Filtr, kateqoriya və ya çeşidləmə dəyişdikdə sayğacı sıfırlayırıq
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [selectedCategory, sortBy, selectedTypes, minPrice, maxPrice]);

    // Ekranda göstəriləcək məhsulların kəsilmiş hissəsi
    const displayedProducts = useMemo(() => {
        return saleProducts.slice(0, visibleCount);
    }, [saleProducts, visibleCount]);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    return (
        <div className="w-full bg-white min-h-screen">
            {/* BAŞLIQ VƏ PROMOSİYA MƏTNLƏRİ */}
            <div className="pt-12 pb-6 text-center px-4">
                <h1 className="font text-[36px] sm:text-[44px] text-[#ea9393] tracking-[1px] select-none mb-3">
                    Sale - Up To 50% Off
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
                    {saleProducts.length} products
                </p>

                {/* ORTAQ KATEQORİYA TABLARI */}
                <CategoryTabs
                    categories={SALE_CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : saleProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="font text-gray-500 mb-2">No products found.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory('ALL');
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

                        {/* SHOW MORE HİSSƏSİ */}
                        {visibleCount < saleProducts.length && (
                            <div className="flex flex-col items-center justify-center mt-16 space-y-4">
                                <button
                                    type="button"
                                    onClick={handleShowMore}
                                    className="border border-[#ea9393] text-[#ea9393] hover:bg-[#ea9393] hover:text-white font uppercase text-[12px] tracking-[2.5px] px-10 py-3 transition duration-300 font-medium cursor-pointer"
                                >
                                    SHOW MORE
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

export default Sale;