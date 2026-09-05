import React, { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import ProductCard from '../common/ProductCard';
import ShopByCategory from '../common/ShopByCategory';
import CollectionToolbar from '../common/CollectionToolbar';
import CategoryTabs from '../common/CategoryTabs';
import { getProductFinalPrice } from '../service/price';
import { useCollectionFilter } from '../service/useCollectionFilter';

// Under $100 üçün uyğun olan əsas setlər və məhsulların ID-ləri
const UNDER_100_IDS = [24, 25, 26, 14, 19, 21, 23];

const CATEGORIES = [
    'ALL',
    'ALL-IN'
];

function Under100() {
    const { products, loading } = useProducts();
    const { formatPrice } = useCurrency();

    // 1. ID ilə baza məhsullar
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter((p) => UNDER_100_IDS.includes(Number(p.id)));
    }, [products]);

    // 2. Bütün filtrləmə, sıralama və sütun parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: under100Products,
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

    return (
        <div className="w-full bg-white min-h-screen">
            {/* BAŞLIQ */}
            <div className="pt-12 pb-8 text-center px-4">
                <h1 className="font text-[36px] sm:text-[44px] text-[#ea9393] tracking-[1px] select-none">
                    Under {formatPrice(100)}
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
                    {under100Products.length} products
                </p>

                {/* ORTAQ KATEQORİYA TABLARI */}
                <CategoryTabs
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : under100Products.length === 0 ? (
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
                    <div className={`grid ${gridClass} gap-x-4 md:gap-x-6 gap-y-10`}>
                        {under100Products.map((product) => (
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

export default Under100;