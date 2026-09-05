import React, { useMemo, useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../common/ProductCard';
import ShopByCategory from '../common/ShopByCategory';
import CollectionToolbar from '../common/CollectionToolbar';
import CategoryTabs from '../common/CategoryTabs';
import { getProductFinalPrice } from '../service/price';
import { useCollectionFilter } from '../service/useCollectionFilter';

const CATEGORIES = [
    'ALL',
    'EYES',
    'FACE',
    'LIPS',
    'FRAGRANCE',
    'ALL-IN',
    'ACCESSORIES&TOOLS'
];

function ShopAll() {
    const { products, loading } = useProducts();
    const [showAll, setShowAll] = useState(false);

    // 1. Baza məhsullar
    const baseProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products;
    }, [products]);

    // 2. Bütün filtrləmə, sıralama və sütun parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: allProductsList,
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
    } = useCollectionFilter(baseProducts);

    // Kateqoriya, çeşidləmə və ya filtr dəyişdikdə "Show More" vəziyyətini sıfırlayırıq
    useEffect(() => {
        setShowAll(false);
    }, [selectedCategory, sortBy, selectedTypes, minPrice, maxPrice]);

    const initialCount = gridCols * 3;
    const displayedProducts = showAll ? allProductsList : allProductsList.slice(0, initialCount);

    return (
        <div className="w-full bg-white min-h-screen">
            {/* BAŞLIQ */}
            <div className="pt-12 pb-6 text-center">
                <h1 className="font text-[36px] sm:text-[44px] text-[#ea9393] tracking-[1px] select-none">
                    All Products
                </h1>
            </div>

            <div className="md:w-[90%] mx-auto px-4 md:px-8 pb-16">
                {/* ORTAQ TOOLBAR */}
                <CollectionToolbar
                    products={baseProducts}
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
                    {allProductsList.length} products
                </p>

                {/* ORTAQ KATEQORİYA TABLARI */}
                <CategoryTabs
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => {
                        setSelectedCategory(cat);
                        setShowAll(false);
                    }}
                />

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : displayedProducts.length === 0 ? (
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

                        {/* SHOW MORE DÜYMƏSİ */}
                        {!showAll && allProductsList.length > initialCount && (
                            <div className="flex justify-center mt-14">
                                <button
                                    type="button"
                                    onClick={() => setShowAll(true)}
                                    className="border border-[#ea9393] text-[#ea9393] hover:bg-[#ea9393] hover:text-white transition duration-300 font uppercase text-[12px] tracking-[2.5px] px-10 py-3.5 cursor-pointer"
                                >
                                    Show More ({allProductsList.length - initialCount} more)
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

export default ShopAll;