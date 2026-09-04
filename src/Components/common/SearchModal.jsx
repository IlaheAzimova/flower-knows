import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { IoCloseOutline } from 'react-icons/io5';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { toSlug } from '../service/slug';
import { getProductPriceDetails } from '../service/price';

// Şəkil URL-ni təhlükəsiz təyin edən funksiya
const getProductImage = (p) => {
    if (!p) return null;

    let imgUrl =
        p.img ||
        p.image ||
        (p.images && p.images.length > 0 ? p.images[0] : null) ||
        (p.variants && p.variants[0]?.images && p.variants[0].images.length > 0 ? p.variants[0].images[0] : null) ||
        (p.variants && p.variants[0]?.img ? p.variants[0].img : null) ||
        null;

    if (typeof imgUrl === 'string') {
        imgUrl = imgUrl.trim();
        if (imgUrl === '') return null;
        if (imgUrl.startsWith('//')) {
            imgUrl = `https:${imgUrl}`;
        }
    }

    return imgUrl;
};

function SearchModal({ isOpen, onClose }) {
    const { products } = useProducts();
    const { formatPrice } = useCurrency();
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
            setSearchTerm('');
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Yalnız məhsulun adına (title) görə axtarış
    const filteredProducts = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return [];

        return (products || []).filter((p) => {
            const title = (p.title || '').toLowerCase();
            return title.includes(query);
        });
    }, [products, searchTerm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex flex-col justify-start">
            {/* Arxa fon qatı */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[3px] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Axtarış Pəncərəsi */}
            <div className="relative w-full bg-[#fdfaf8] border-b border-[#f0e3e3] shadow-2xl z-10 animate-slideDown max-h-[90vh] flex flex-col">

                {/* 1. ÜST HEADER & INPUT */}
                <div className="w-[92%] max-w-[850px] mx-auto pt-8 pb-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font tracking-[3px] uppercase text-[11px] text-[#b38e92] font-semibold select-none">
                            Search Our Store
                        </span>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-8 h-8 rounded-full border border-[#edd5d7] flex items-center justify-center text-[#7a6b6d] hover:text-[#ea9393] hover:border-[#ea9393] bg-white transition cursor-pointer"
                            aria-label="Close"
                        >
                            <IoCloseOutline size={18} />
                        </button>
                    </div>

                    <div className="relative flex items-center border-b-2 border-[#e8b6b8] pb-2 group focus-within:border-[#ea9393] transition-colors">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Type product name here..."
                            className="w-full text-[18px] md:text-[24px] font bg-transparent text-[#212326] placeholder-[#c7b2b4] outline-none pr-16 tracking-wide"
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-0 text-[11px] uppercase tracking-[1.5px] font text-[#9a7d80] hover:text-[#ea9393] transition cursor-pointer"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* 2. NƏTİCƏLƏR VƏ TÖVSİYƏLƏR */}
                <div className="w-[92%] max-w-[850px] mx-auto pb-10 overflow-y-auto flex-1">
                    {searchTerm.trim() === '' ? (
                        <div className="py-6 text-center">
                            <p className="dmsans text-[12px] uppercase tracking-[2px] text-[#9a7d80] mb-3 font-medium">
                                Popular Searches
                            </p>
                            <div className="flex justify-center gap-2.5 flex-wrap">
                                {['Bunny', 'Unicorn', 'Angel', 'Lipstick', 'Perfume', 'Blush'].map((suggest) => (
                                    <button
                                        key={suggest}
                                        type="button"
                                        onClick={() => setSearchTerm(suggest)}
                                        className="px-4 py-1.5 bg-white hover:bg-[#ea9393] hover:text-white border border-[#edd5d7] text-[12px] font text-[#5c4f51] transition duration-200 cursor-pointer shadow-2xs"
                                    >
                                        {suggest}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="py-14 text-center">
                            <p className="font text-[18px] text-[#4d4244] mb-1">No products found</p>
                            <p className="dmsans text-[13px] text-[#9a7d80]">
                                We couldn't find any matches for "{searchTerm}".
                            </p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#f2e5e5]">
                                <span className="dmsans text-[11px] uppercase tracking-[1.5px] text-[#8a7275]">
                                    Products ({filteredProducts.length})
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                                {filteredProducts.map((product) => {
                                    const { finalPrice, originalPrice, discountPercent } = getProductPriceDetails(product);
                                    const imgUrl = getProductImage(product);

                                    return (
                                        <Link
                                            key={product.id}
                                            to={`/products/${toSlug(product.title)}`}
                                            onClick={onClose}
                                            className="group flex flex-col bg-white border border-[#f5eae8] hover:border-[#e8b6b8] p-2 transition duration-300 shadow-2xs hover:shadow-sm cursor-pointer"
                                        >
                                            <div className="aspect-[4/5] overflow-hidden bg-[#faf8f7] relative flex items-center justify-center">
                                                {imgUrl ? (
                                                    <img
                                                        src={imgUrl}
                                                        alt={product.title || 'Product Image'}
                                                        referrerPolicy="no-referrer"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[#c4b5b7] text-[11px] font">
                                                        No Image
                                                    </div>
                                                )}

                                                {discountPercent > 0 && (
                                                    <span className="absolute top-2 right-2 bg-[#ea9393] text-white text-[9px] px-2 py-0.5 uppercase tracking-wider font-medium">
                                                        {discountPercent}% OFF
                                                    </span>
                                                )}
                                            </div>

                                            <div className="pt-3 pb-1 text-center">
                                                <h4 className="font text-[13px] text-[#212326] tracking-[0.5px] line-clamp-1 group-hover:text-[#c78a99] transition">
                                                    {product.title}
                                                </h4>
                                                <p className="font text-[13px] mt-1">
                                                    {originalPrice !== null && originalPrice > finalPrice && (
                                                        <span className="text-gray-400 line-through mr-1.5 text-[12px]">
                                                            {formatPrice(originalPrice)}
                                                        </span>
                                                    )}
                                                    <span className="text-[#ea9393] font-medium text-[14px]">
                                                        {formatPrice(finalPrice)}
                                                    </span>
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchModal;