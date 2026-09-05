import React, { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../common/ProductCard';
import ShopByCategory from '../common/ShopByCategory';
import CollectionToolbar from '../common/CollectionToolbar';
import { getProductFinalPrice } from '../service/price';
import { useCollectionFilter } from '../service/useCollectionFilter';

// Şəkildə olan 4 məhsulun ID-ləri
const BIRTHDAY_SET_IDS = [16, 27, 28, 17];

function Birthday() {
    const { products, loading } = useProducts();

    // 1. Birthday baza məhsulları
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter((p) => BIRTHDAY_SET_IDS.includes(Number(p.id)));
    }, [products]);

    // 2. Bütün filtrləmə, sıralama və sütun parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: birthdayProducts,
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

    return (
        <div className="w-full bg-white min-h-screen">
            {/* BAŞLIQ */}
            <div className="pt-12 pb-8 text-center px-4">
                <h1 className="font text-[36px] sm:text-[44px] text-[#ea9393] tracking-[1px] select-none">
                    Birthday Gifts
                </h1>
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
                    {birthdayProducts.length} products
                </p>

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : birthdayProducts.length === 0 ? (
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
                    <div className={`grid ${gridClass} gap-x-4 md:gap-x-6 gap-y-10`}>
                        {birthdayProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                bg="bg-[#faf9f8]"
                            />
                        ))}
                    </div>
                )}
            </div>

            <ShopByCategory />
        </div>
    );
}

export default Birthday;