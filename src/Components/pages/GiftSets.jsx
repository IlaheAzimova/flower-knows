import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { useProducts } from '../context/ProductContext';
import { toSlug } from '../service/slug';
import ShopByCategory from '../common/ShopByCategory';
import { TbShoppingBag } from "react-icons/tb";
import { FiColumns } from 'react-icons/fi';
import { LuColumns3, LuColumns4 } from 'react-icons/lu';
import { getProductFinalPrice, getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';

function GiftSets() {
    const { products, openQuickView, loading } = useProducts();
    const { formatPrice } = useCurrency();
    const [sortBy, setSortBy] = useState('featured');
    const [gridCols, setGridCols] = useState(4);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { addToBasket } = useBasket();
    // Sırf 'all-in' kateqoriyalı real dəstləri süzürük
    const setProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        let list = products.filter((p) => {
            if (p.id === 51 || p.category === 'gift-card') return false;
            return p.category === 'all-in';
        });

        const sorted = [...list];
        if (sortBy === 'price-low') {
            sorted.sort((a, b) => getProductFinalPrice(a) - getProductFinalPrice(b));
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => getProductFinalPrice(b) - getProductFinalPrice(a));
        }

        return sorted;
    }, [products, sortBy]);

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

    const getGridClass = () => {
        if (gridCols === 2) return 'grid-cols-2';
        if (gridCols === 3) return 'grid-cols-2 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
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
                {/* TOOLBAR */}
                <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0] mb-4">
                    {/* SORT BY DROPDOWN DÜYMƏSİ */}
                    <div className="relative inline-block text-left">
                        <button
                            type="button"
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="bg-[#ea9393] hover:bg-[#d88080] text-white text-[12px] tracking-[2px] uppercase font-medium px-4 py-2 flex items-center gap-3 transition cursor-pointer"
                        >
                            <span>SORT BY</span>
                            <svg
                                className={`w-3 h-3 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isSortOpen && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setIsSortOpen(false)} />
                                <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-[#ea9393] shadow-lg py-2.5 z-30 flex flex-col font">
                                    <button
                                        type="button"
                                        onClick={() => { setSortBy('featured'); setIsSortOpen(false); }}
                                        className={`text-left px-5 py-2 text-[14px] cursor-pointer ${sortBy === 'featured' ? 'text-[#ea9393] font-medium' : 'text-[#333] hover:text-[#ea9393]'}`}
                                    >
                                        {sortBy === 'featured' && <span>—</span>} Featured
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setSortBy('price-low'); setIsSortOpen(false); }}
                                        className={`text-left px-5 py-2 text-[14px] cursor-pointer ${sortBy === 'price-low' ? 'text-[#ea9393] font-medium' : 'text-[#333] hover:text-[#ea9393]'}`}
                                    >
                                        {sortBy === 'price-low' && <span>—</span>} Price, low to high
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setSortBy('price-high'); setIsSortOpen(false); }}
                                        className={`text-left px-5 py-2 text-[14px] cursor-pointer ${sortBy === 'price-high' ? 'text-[#ea9393] font-medium' : 'text-[#333] hover:text-[#ea9393]'}`}
                                    >
                                        {sortBy === 'price-high' && <span>—</span>} Price, high to low
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* SÜTUN DÜYMƏLƏRİ */}
                    <div className="hidden sm:flex items-center gap-3 text-[#999]">
                        <button
                            type="button"
                            onClick={() => setGridCols(2)}
                            className={`text-[12px] flex items-center gap-0.5 cursor-pointer ${gridCols === 2 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                        >
                            <FiColumns /> 2
                        </button>
                        <button
                            type="button"
                            onClick={() => setGridCols(3)}
                            className={`text-[12px] flex items-center gap-0.5 cursor-pointer ${gridCols === 3 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                        >
                            <LuColumns3 /> 3
                        </button>
                        <button
                            type="button"
                            onClick={() => setGridCols(4)}
                            className={`text-[12px] flex items-center gap-0.5 cursor-pointer ${gridCols === 4 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                        >
                            <LuColumns4 /> 4
                        </button>
                    </div>
                </div>

                {/* MƏHSUL SAYI */}
                <p className="dmsans text-[12px] text-[#777] mb-8">
                    {setProducts.length} products
                </p>

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : displayedProducts.length === 0 ? (
                    <p className="text-center py-20 font text-gray-500">No sets found.</p>
                ) : (
                    <div className={`grid ${getGridClass()} gap-x-4 md:gap-x-6 gap-y-12`}>
                        {displayedProducts.map((product) => {
                            const { finalPrice, originalPrice, discountPercent, isFromPrice } = getProductPriceDetails(product);
                            const valueTag = product.value || (originalPrice ? `VALUE ${formatPrice(Math.round(originalPrice))}` : null);

                            return (
                                <div key={product.id} className="group flex flex-col">
                                    <div className="relative overflow-hidden bg-[#faf9f8] aspect-[5/6] flex items-center justify-center">
                                        <Link to={`/products/${toSlug(product.title)}`} className="w-full h-full block">
                                            <img
                                                src={product.images?.[0] || product.img || ""}
                                                alt={product.title}
                                                referrerPolicy="no-referrer"
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            {/* Sağ Yuxarı Bəclər */}
                                            <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
                                                {discountPercent > 0 ? (
                                                    <span className="bg-[#ea9393] text-white text-[9px] tracking-[1px] uppercase px-2 py-0.5 font-medium">
                                                        {discountPercent}% OFF
                                                    </span>
                                                ) : valueTag ? (
                                                    <span className="bg-[#ea9393] text-white text-[9px] tracking-[1px] uppercase px-2 py-0.5 font-medium">
                                                        {valueTag}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openQuickView(product);
                                            }}
                                            className="hidden lg:block absolute bottom-0 left-0 right-0 bg-[#ea9393] text-white font uppercase text-[12px] tracking-[2.5px] py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#d88080] z-20 cursor-pointer"
                                        >
                                            Choose Options
                                        </button>
                                        {/* MOBİL: Səbət ikonu */}
                                        <button
                                            type="button"
                                            aria-label="Add to cart"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToBasket(product, 0, 1, false);
                                            }}
                                            className="xl:hidden flex items-center justify-center absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#dd9c9c] text-white shadow-sm z-20 cursor-pointer"
                                        >
                                            <TbShoppingBag className="text-[18px]" />
                                        </button>
                                    </div>

                                    <div className="text-center pt-3.5 pb-2">
                                        <h3 className="font text-[14px] text-[#212326] tracking-[0.5px] mb-1 line-clamp-1">
                                            <Link to={`/products/${toSlug(product.title)}`} className="hover:text-[#c78a99] transition">
                                                {product.title}
                                            </Link>
                                        </h3>

                                        <p className="font text-[14px] mb-1.5">
                                            {originalPrice !== null && originalPrice > finalPrice && (
                                                <span className="text-gray-400 line-through mr-2 text-[13px]">
                                                    {formatPrice(originalPrice)}
                                                </span>
                                            )}
                                            <span className="text-[#ea9393] font-medium text-[15px]">
                                                {isFromPrice && "From "}{formatPrice(finalPrice)}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
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