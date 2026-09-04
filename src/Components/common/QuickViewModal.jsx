import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';

function QuickViewModal() {
    const { quickViewProduct, closeQuickView } = useProducts();
    const { formatPrice } = useCurrency();

    const [activeVariant, setActiveVariant] = useState(0);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [descOpen, setDescOpen] = useState(false);
    const { addToBasket } = useBasket();

    useEffect(() => {
        setActiveVariant(0);
        setActiveImg(0);
        setQty(1);
        setDescOpen(false);
    }, [quickViewProduct]);

    if (!quickViewProduct) return null;

    const variants = quickViewProduct.variants ?? [];
    const currentVariant = variants[activeVariant];

    const { finalPrice, originalPrice, discountPercent } = getProductPriceDetails(quickViewProduct, activeVariant);

    const currentImages = (currentVariant?.images && currentVariant.images.length > 0)
        ? currentVariant.images
        : (quickViewProduct.images && quickViewProduct.images.length > 0)
            ? quickViewProduct.images
            : (quickViewProduct.img ? [quickViewProduct.img] : []);

    const mainImg = currentImages[activeImg] || currentImages[0] || '';

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={closeQuickView} />

            <div className="relative w-full max-w-[880px] bg-white shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row items-center max-h-[90vh]">

                {/* BAĞLA DÜYMƏSİ */}
                <button
                    type="button"
                    onClick={closeQuickView}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#f4f4f4] hover:bg-[#eaeaea] flex items-center justify-center text-[#212326] transition cursor-pointer"
                >
                    <IoCloseOutline size={20} />
                </button>

                {/* SOL TƏRƏF: ŞƏKİL */}
                <div className="md:w-1/2 bg-[#faf9f8] self-stretch relative flex items-center justify-center p-6 min-h-[320px]">
                    <img
                        src={mainImg}
                        alt={quickViewProduct.title}
                        referrerPolicy="no-referrer"
                        className="max-h-[340px] w-auto object-contain transition-all duration-300 select-none"
                    />
                </div>

                {/* SAĞ TƏRƏF: MƏHSUL DETALLARI */}
                <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[85vh] w-full">
                    <h2 className="font text-[22px] md:text-[24px] text-[#212326] leading-tight mb-2">
                        {quickViewProduct.title}
                    </h2>

                    {/* QİYMƏTLƏR */}
                    <div className="font text-[20px] mb-1 flex items-center gap-2.5">
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="text-[#999] line-through text-[16px]">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <span className="text-[#c78a99]">
                            {formatPrice(finalPrice)}
                        </span>
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="border border-[#c78a99] text-[#c78a99] text-[10px] px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                                {discountPercent > 0 ? `${discountPercent}% OFF` : 'SALE'}
                            </span>
                        )}
                    </div>

                    <p className="dmsans text-[12px] text-[#888] mb-5">
                        <span className="underline">Shipping</span> calculated at checkout.
                    </p>

                    {/* RƏNG VƏ YA OPTION SEÇİMİ */}
                    {variants.length > 0 && (
                        <div className="mb-5">
                            <p className="dmsans text-[12px] text-[#555] mb-2 font-medium">
                                <span className="uppercase font-semibold tracking-wider">
                                    {variants.some(v => v.color) ? 'COLOR' : 'OPTION'}
                                </span>
                                {' — '}
                                <span className="text-[#212326] font-normal">{currentVariant?.name}</span>
                            </p>

                            <div className="flex flex-wrap gap-2 items-center">
                                {variants.map((v, i) => {
                                    // 1. Əgər rəngdirsə (dairəvi rəng swatch-ı)
                                    if (v.color) {
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => {
                                                    setActiveVariant(i);
                                                    setActiveImg(0);
                                                }}
                                                title={v.name}
                                                className={`w-6 h-6 rounded-full p-[2px] border transition-all duration-200 cursor-pointer ${activeVariant === i
                                                    ? 'border-[#c78a99] scale-110'
                                                    : 'border-transparent hover:border-[#ddd]'
                                                    }`}
                                            >
                                                <span
                                                    className="block w-full h-full rounded-full border border-black/10"
                                                    style={{ backgroundColor: v.color }}
                                                />
                                            </button>
                                        );
                                    }

                                    // 2. Əgər rəng yoxdursa (Mystery Bags kimi mətn/məbləğ düymələri)
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => {
                                                setActiveVariant(i);
                                                setActiveImg(0);
                                            }}
                                            className={`px-3 py-1.5 text-[12px] dmsans border transition font-medium cursor-pointer ${activeVariant === i
                                                ? 'border-[#ea9393] bg-[#ea9393] text-white'
                                                : 'border-[#ddd] text-[#3f3c39] hover:border-[#ea9393] bg-white'
                                                }`}
                                        >
                                            {v.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* SAY ARTIRMA VƏ ADD TO CART */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex items-center border border-[#ddd] bg-white h-10">
                            <button
                                type="button"
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-8 h-full flex items-center justify-center text-lg text-[#3f3c39] hover:bg-[#f5f5f5] transition cursor-pointer"
                            >
                                −
                            </button>
                            <span className="w-8 text-center dmsans text-[14px] text-[#212326] select-none">
                                {qty}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQty(qty + 1)}
                                className="w-8 h-full flex items-center justify-center text-lg text-[#3f3c39] hover:bg-[#f5f5f5] transition cursor-pointer"
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                addToBasket(quickViewProduct, activeVariant, qty, false);
                                closeQuickView();
                            }}
                            className="flex-1 h-10 bg-[#ea9393] hover:bg-[#d88080] text-white font uppercase text-[12px] tracking-[2px] transition flex items-center justify-center font-semibold cursor-pointer"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* ACCORDION: PRODUCT DESCRIPTION */}
                    <div className="border-t border-[#eee] py-3">
                        <button
                            type="button"
                            onClick={() => setDescOpen(!descOpen)}
                            className="w-full flex items-center justify-between text-[11px] uppercase tracking-[2px] text-[#212326] font-semibold cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <span>△</span> PRODUCT DESCRIPTION
                            </span>
                            {descOpen ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
                        </button>

                        {descOpen && (
                            <p className="dmsans text-[13px] text-[#666] mt-2.5 leading-relaxed">
                                {currentVariant?.description || quickViewProduct.description || quickViewProduct.subtitle || "No description available."}
                            </p>
                        )}
                    </div>

                    {/* VIEW FULL DETAILS LINK */}
                    <div className="border-t border-[#eee] pt-3">
                        <Link
                            to={`/products/${toSlug(quickViewProduct.title)}`}
                            onClick={closeQuickView}
                            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-[#212326] hover:text-[#c78a99] font-semibold transition cursor-pointer"
                        >
                            <span>→</span> VIEW FULL DETAILS
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default QuickViewModal;