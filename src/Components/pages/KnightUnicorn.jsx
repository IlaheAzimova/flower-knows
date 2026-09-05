import React, { useMemo } from 'react';
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

function KnightUnicorn() {
    const { products, loading } = useProducts();

    // 1. Knight Unicorn kolleksiyasına aid məhsullar
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        return products.filter((p) => {
            const title = (p.title || '').toLowerCase();
            const tags = Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase() : '';
            const collectionsArr = Array.isArray(p.collections)
                ? p.collections.map((c) => String(c).toLowerCase().replace(/[^a-z0-9]/g, ''))
                : [];
            const singleCollection = (p.collection || '').toLowerCase().replace(/[^a-z0-9]/g, '');

            const inCollections =
                collectionsArr.some((c) => c.includes('unicorn')) ||
                singleCollection.includes('unicorn');

            return (
                inCollections ||
                title.includes('unicorn') ||
                tags.includes('unicorn')
            );
        });
    }, [products]);

    // 2. Bütün filtrləmə və sıralama parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: unicornProducts,
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
            {/* HERO BANNER */}
            <div
                className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] bg-[#eedde5] bg-cover bg-center flex items-center justify-end pr-8 md:pr-24"
                style={{
                    backgroundImage: `url('https://flowerknows.co/cdn/shop/files/20260526-164122.jpg?v=1779799740&width=3000')`
                }}
            >
                <h1 className="font text-[32px] sm:text-[44px] md:text-[56px] text-[#333] tracking-[1px] drop-shadow-md select-none">
                    Knight Unicorn
                </h1>
            </div>

            <div className="md:w-[90%] mx-auto px-4 md:px-8 pt-8 pb-16">
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
                    {unicornProducts.length} products
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
                ) : unicornProducts.length === 0 ? (
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
                        {unicornProducts.map((product) => (
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

export default KnightUnicorn;