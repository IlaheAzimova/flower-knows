import React, { useMemo, useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../common/ProductCard';
import ShopByCategory from '../common/ShopByCategory';
import CollectionToolbar from '../common/CollectionToolbar';
import { getProductFinalPrice } from '../service/price';
import { useCollectionFilter } from '../service/useCollectionFilter';

function GiftSets() {
    const { products, loading } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 1. Sırf 'all-in' kateqoriyalı baza dəstlərini süzürük
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter((p) => {
            if (Number(p.id) === 51 || p.category === 'gift-card') return false;
            return p.category === 'all-in';
        });
    }, [products]);

    // 2. Bütün filtrləmə, sıralama və sütun parametrləri tək hook-dan idarə olunur
    const {
        filteredProducts: setProducts,
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

    // Filtr və ya çeşidləmə dəyişdikdə 1-ci səhifəyə qayıdırıq
    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy, selectedTypes, minPrice, maxPrice]);

    // Paginasiya hesabı
    const totalPages = Math.ceil(setProducts.length / itemsPerPage) || 1;
    const displayedProducts = setProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full bg-white min-h-screen">
            {/* BAŞLIQ */}
            <div className="pt-14 pb-8 text-center px-4">
                <h1 className="font text-[36px] sm:text-[44px] text-[#ea9393] tracking-[1px] select-none">
                    Gift Sets
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
                    {setProducts.length} products
                </p>

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : displayedProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="font text-gray-500 mb-2">No sets found.</p>
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
                    <div className={`grid ${gridClass} gap-x-4 md:gap-x-6 gap-y-12`}>
                        {displayedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                bg="bg-[#faf9f8]"
                            />
                        ))}
                    </div>
                )}

                {/* PAGİNASİYA (PREV + RƏQƏMLƏR + NEXT) */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-16 font">
                        {currentPage > 1 && (
                            <button
                                type="button"
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-3 h-8 flex items-center justify-center text-[13px] text-[#555] hover:text-[#ea9393] transition cursor-pointer"
                            >
                                ‹ Prev
                            </button>
                        )}

                        {[...Array(totalPages)].map((_, idx) => {
                            const pageNum = idx + 1;
                            return (
                                <button
                                    key={pageNum}
                                    type="button"
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-8 h-8 flex items-center justify-center text-[13px] transition cursor-pointer ${currentPage === pageNum
                                            ? 'bg-[#ea9393] text-white font-semibold'
                                            : 'text-[#555] hover:bg-[#faf9f8]'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {currentPage < totalPages && (
                            <button
                                type="button"
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-3 h-8 flex items-center justify-center text-[13px] text-[#555] hover:text-[#ea9393] transition cursor-pointer"
                            >
                                Next ›
                            </button>
                        )}
                    </div>
                )}
            </div>

            <ShopByCategory />
        </div>
    );
}

export default GiftSets;