import React, { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../common/ProductCard';
import ShopByCategory from '../common/ShopByCategory';
import CollectionToolbar from '../common/CollectionToolbar';
import CategoryTabs from '../common/CategoryTabs';
import { getProductFinalPrice } from '../service/price';
import { useCollectionFilter } from '../service/useCollectionFilter';

// Face səhifəsində olan kolleksiya filtrləri
const FACE_COLLECTIONS = [
    'ALL',
    'KNIGHT UNICORN',
    'BUNNY GARDEN',
    'THE SWEETIE BEAR',
    'LITTLE ANGEL',
    "SHELL'S JEWEL"
];

function Face() {
    const { products, loading } = useProducts();

    // 1. Baza Face məhsulları
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter((p) => p.category?.toLowerCase() === 'face');
    }, [products]);

    // 2. Bütün filtrləmə, sıralama və sütun parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: faceProducts,
        selectedCategory: selectedCollection,
        setSelectedCategory: setSelectedCollection,
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
            <h1 className="font text-center text-[32px] sm:text-[44px] mt-10 text-[#ea9393] tracking-[1px] select-none">
                Face Makeup & Face Products
            </h1>

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
                    {faceProducts.length} products
                </p>

                {/* ORTAQ KATEQORİYA / KOLLEKSİYA TABLARI */}
                <CategoryTabs
                    categories={FACE_COLLECTIONS}
                    selectedCategory={selectedCollection}
                    onSelectCategory={setSelectedCollection}
                />

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : faceProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="font text-gray-500 mb-2">No products found.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCollection('ALL');
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
                        {faceProducts.map((product) => (
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

export default Face;