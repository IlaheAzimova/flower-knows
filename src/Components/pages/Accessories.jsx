import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { useProducts } from '../context/ProductContext';
import { toSlug } from '../service/slug';
import ShopByCategory from '../common/ShopByCategory';
import CollectionFilter from '../common/CollectionFilter';
import { TbShoppingBag } from "react-icons/tb";
import { FiColumns } from "react-icons/fi";
import { LuColumns3, LuColumns4 } from "react-icons/lu";
import { getProductFinalPrice, getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';

// Accessories səhifəsi üçün kolleksiya filtrləri
const ACCESSORIES_COLLECTIONS = [
    'ALL',
    'KNIGHT UNICORN'
];

function AccessoriesProductCard({ product }) {
    const { openQuickView } = useProducts();
    const [activeVariant, setActiveVariant] = useState(0);
    const { addToBasket } = useBasket();
    const { formatPrice } = useCurrency();

    const variants = product.variants ?? [];
    const currentVariant = variants[activeVariant];
    const displayImg = currentVariant?.images?.[0] || product.images?.[0] || product.img || "";

    const { finalPrice, originalPrice, discountPercent, isFromPrice } = getProductPriceDetails(product, activeVariant);

    return (
        <div className="group flex flex-col">
            <div className="relative overflow-hidden bg-[#faf9f8] aspect-[4/5]">
                <Link to={`/products/${toSlug(product.title)}`}>
                    <img
                        src={displayImg}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {discountPercent > 0 && (
                        <div className="absolute top-2 right-2 z-10 bg-[#ea9393] text-white text-[10px] tracking-[0.5px] uppercase px-2 py-0.5 font-medium">
                            {discountPercent}% OFF
                        </div>
                    )}
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
                        e.preventDefault(); // Linkə keçməsin
                        addToBasket(product, 0, 1, false);
                    }}
                    className="xl:hidden flex items-center justify-center absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#dd9c9c] text-white shadow-sm z-20 cursor-pointer"
                >
                    <TbShoppingBag className="text-[18px]" />
                </button>
            </div>

            <div className="text-center pt-3.5 pb-2 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font text-[14px] text-[#212326] tracking-[0.5px] mb-1.5 leading-snug line-clamp-1">
                        <Link to={`/products/${toSlug(product.title)}`} className="hover:text-[#c78a99] transition">
                            {product.title}
                        </Link>
                    </h3>

                    <p className="font text-[14px]">
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="text-gray-400 line-through mr-2 text-[13px]">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <span className="text-[#c78a99] font-medium text-[15px]">
                            {isFromPrice && "From "}{formatPrice(finalPrice)}
                        </span>
                    </p>
                </div>

                {variants.length > 0 && variants.some(v => v.color) && (
                    <div className="flex justify-center flex-wrap gap-1.5 mt-2.5">
                        {variants.map((v, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveVariant(i)}
                                onMouseEnter={() => setActiveVariant(i)}
                                aria-label={v.name}
                                title={v.name}
                                className={`w-3.5 h-3.5 rounded-full border border-white transition cursor-pointer ${activeVariant === i ? 'ring-1.5 ring-[#c78a99] scale-110' : 'ring-1 ring-[#ddd]'
                                    }`}
                                style={{ backgroundColor: v.color || '#fff' }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Accessories() {
    const { products, loading } = useProducts();
    const [selectedCollection, setSelectedCollection] = useState('ALL');
    const [sortBy, setSortBy] = useState('featured');
    const [gridCols, setGridCols] = useState(4);
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Filtr parametrləri
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(null);

    // Baza Accessories məhsulları
    const baseCollectionProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter((p) => {
            const cat = (p.category || '').toLowerCase();
            return cat.includes('access') || cat.includes('tool');
        });
    }, [products]);

    // Filtrlənmiş və sıralanmış məhsul siyahısı
    const accessoryProducts = useMemo(() => {
        let list = [...baseCollectionProducts];

        // 1. Kolleksiya düyməsinə görə filtrləmə
        if (selectedCollection !== 'ALL') {
            const cleanFilter = selectedCollection.toLowerCase().replace(/[^a-z0-9]/g, '');

            list = list.filter((p) => {
                const title = (p.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const colStr = Array.isArray(p.collections)
                    ? p.collections.join(' ').toLowerCase().replace(/[^a-z0-9]/g, '')
                    : String(p.collections || p.collection || '').toLowerCase().replace(/[^a-z0-9]/g, '');

                return colStr.includes(cleanFilter) || title.includes(cleanFilter);
            });
        }

        // 2. Açılan Filter menyusundakı Product Type-lar
        if (selectedTypes.length > 0) {
            list = list.filter((p) => {
                const cleanCat = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const title = (p.title || '').toLowerCase();

                return selectedTypes.some((t) => {
                    const cleanT = t.toLowerCase().replace(/[^a-z0-9]/g, '');

                    if (cleanT === 'accessoriesandtools' || cleanT === 'accessoriestools') {
                        return cleanCat.includes('access') || cleanCat.includes('tool');
                    }
                    if (cleanT === 'allin') {
                        if (title.includes('setting') || cleanCat.includes('setting')) return false;
                        return cleanCat === 'allin' || cleanCat === 'all-in' || title.includes('all-in') || title.includes('set') || title.includes('box');
                    }

                    return cleanCat.includes(cleanT);
                });
            });
        }

        // 3. Qiymət aralığı
        if (maxPrice !== null) {
            list = list.filter((p) => {
                const price = Number(getProductFinalPrice(p)) || 0;
                return price >= minPrice && price <= maxPrice;
            });
        }

        // 4. Qiymət sıralaması
        const sortedList = [...list];
        if (sortBy === 'price-low') {
            sortedList.sort((a, b) => getProductFinalPrice(a) - getProductFinalPrice(b));
        } else if (sortBy === 'price-high') {
            sortedList.sort((a, b) => getProductFinalPrice(b) - getProductFinalPrice(a));
        }

        return sortedList;
    }, [baseCollectionProducts, selectedCollection, selectedTypes, minPrice, maxPrice, sortBy]);

    const getGridClass = () => {
        if (gridCols === 2) return 'grid-cols-2';
        if (gridCols === 3) return 'grid-cols-2 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    };

    return (
        <div className="w-full bg-white min-h-screen">
            {/* HERO BANNER */}
            <h1 className="font text-center text-[32px] sm:text-[44px] pt-10  text-[#ea9393] tracking-[1px] select-none">
                Accessories & Tools
            </h1>

            <div className="md:w-[90%] mx-auto px-4 md:px-8 pt-8 pb-16">
                {/* TOOLBAR */}
                <div className="relative pb-6 border-b border-[#f0f0f0]">
                    <div className="flex items-center justify-between">

                        {/* SOL TƏRƏF: FILTER VƏ SORT BY */}
                        <div className="flex items-center gap-3">

                            {/* 1. COLLECTION FILTER KOMPONENTİ */}
                            <CollectionFilter
                                products={baseCollectionProducts}
                                selectedTypes={selectedTypes}
                                setSelectedTypes={setSelectedTypes}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                setMinPrice={setMinPrice}
                                setMaxPrice={setMaxPrice}
                                getPrice={getProductFinalPrice}
                            />

                            {/* 2. CUSTOM SORT BY DROPDOWN (AĞ FON, ÇƏHRAYI YAZI VƏ ÇƏRÇİVƏ) */}
                            <div className="relative inline-block text-left">
                                <button
                                    type="button"
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="bg-white border border-[#ea9393] text-[#ea9393] hover:bg-[#faf0f0] text-[12px] tracking-[2px] uppercase font-medium px-4 py-2 flex items-center gap-3 transition cursor-pointer"
                                >
                                    <span>SORT BY</span>
                                    <svg
                                        className={`w-3 h-3 text-[#ea9393] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isSortOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-20"
                                            onClick={() => setIsSortOpen(false)}
                                        />

                                        <div className="absolute left-0 top-full mt-1.5 w-56 bg-white border border-[#ea9393] shadow-lg py-2.5 z-30 flex flex-col font">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSortBy('featured');
                                                    setIsSortOpen(false);
                                                }}
                                                className={`text-left px-5 py-2 text-[14px] tracking-[0.5px] transition flex items-center gap-2 cursor-pointer ${sortBy === 'featured' ? 'text-[#ea9393] font-medium' : 'text-[#333] hover:text-[#ea9393]'
                                                    }`}
                                            >
                                                {sortBy === 'featured' && <span>—</span>} Featured
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSortBy('price-low');
                                                    setIsSortOpen(false);
                                                }}
                                                className={`text-left px-5 py-2 text-[14px] tracking-[0.5px] transition flex items-center gap-2 cursor-pointer ${sortBy === 'price-low' ? 'text-[#ea9393] font-medium' : 'text-[#333] hover:text-[#ea9393]'
                                                    }`}
                                            >
                                                {sortBy === 'price-low' && <span>—</span>} Price, low to high
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSortBy('price-high');
                                                    setIsSortOpen(false);
                                                }}
                                                className={`text-left px-5 py-2 text-[14px] tracking-[0.5px] transition flex items-center gap-2 cursor-pointer ${sortBy === 'price-high' ? 'text-[#ea9393] font-medium' : 'text-[#333] hover:text-[#ea9393]'
                                                    }`}
                                            >
                                                {sortBy === 'price-high' && <span>—</span>} Price, high to low
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>

                        {/* SAĞ: SÜTUN DÜYMƏLƏRİ */}
                        <div className="hidden sm:flex items-center gap-3 text-[#999]">
                            <button
                                type="button"
                                onClick={() => setGridCols(2)}
                                className={`flex items-center gap-0.5 text-[12px] cursor-pointer ${gridCols === 2 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                            >
                                <span><FiColumns /></span> 2
                            </button>
                            <button
                                type="button"
                                onClick={() => setGridCols(3)}
                                className={`flex items-center gap-0.5 text-[12px] cursor-pointer ${gridCols === 3 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                            >
                                <span><LuColumns3 /></span> 3
                            </button>
                            <button
                                type="button"
                                onClick={() => setGridCols(4)}
                                className={`flex items-center gap-0.5 text-[12px] cursor-pointer ${gridCols === 4 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                            >
                                <span><LuColumns4 /></span> 4
                            </button>
                        </div>
                    </div>
                </div>

                {/* MƏHSUL SAYI */}
                <p className="dmsans text-[12px] text-[#777] my-4">
                    {accessoryProducts.length} products
                </p>

                {/* KOLLEKSİYA DÜYMƏLƏRİ */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {ACCESSORIES_COLLECTIONS.map((col) => (
                        <button
                            key={col}
                            type="button"
                            onClick={() => setSelectedCollection(col)}
                            className={`px-3 py-1.5 text-[11px] tracking-[1.5px] uppercase border transition cursor-pointer ${selectedCollection === col
                                ? 'border-[#212326] text-[#212326] font-semibold bg-[#faf9f8]'
                                : 'border-[#ddd] text-[#777] hover:border-[#212326] hover:text-[#212326]'
                                }`}
                        >
                            {col}
                        </button>
                    ))}
                </div>

                {/* MƏHSUL QRİDİ */}
                {loading ? (
                    <p className="text-center py-20 font text-gray-400">Loading...</p>
                ) : accessoryProducts.length === 0 ? (
                    <p className="text-center py-20 font text-gray-500">No products found.</p>
                ) : (
                    <div className={`grid ${getGridClass()} gap-x-4 md:gap-x-6 gap-y-10`}>
                        {accessoryProducts.map((product) => (
                            <AccessoriesProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <ShopByCategory />
        </div>
    );
}

export default Accessories;