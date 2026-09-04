import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router';
import { useProducts } from '../context/ProductContext';
import { toSlug } from '../service/slug';
import ShopByCategory from '../common/ShopByCategory';
import { TbShoppingBag } from "react-icons/tb";
import { getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';

// API-dakı dəqiq 4 setin ID-ləri
const TARGET_SET_IDS = [17, 21, 22, 28];

function LongTermOffer() {
    const { products, openQuickView, loading } = useProducts();
    const { formatPrice } = useCurrency();
    const [activeSlide, setActiveSlide] = useState(0);
    const sliderRef = useRef(null);
    const { addToBasket } = useBasket();

    // API-dan 4 əsas setin çəkilməsi
    const mustHaveSets = useMemo(() => {
        if (!products || products.length === 0) return [];
        return TARGET_SET_IDS.map(id => products.find(p => Number(p.id) === id)).filter(Boolean);
    }, [products]);

    // Mobildə scroll olduqda nöqtəni (dot) yeniləyən funksiya
    const handleScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const index = Math.round(scrollLeft / (clientWidth * 0.7));
            setActiveSlide(Math.min(index, mustHaveSets.length - 1));
        }
    };

    const scrollToSlide = (index) => {
        if (sliderRef.current) {
            const width = sliderRef.current.clientWidth * 0.7;
            sliderRef.current.scrollTo({
                left: index * width,
                behavior: 'smooth'
            });
            setActiveSlide(index);
        }
    };

    return (
        <div className="w-full bg-[#fdfbfb] min-h-screen">
            <div className="md:w-[90%] mx-auto px-4 md:px-8 py-6 md:py-10 space-y-12 md:space-y-16">

                {/* 1. YUXARI HERO BANNER */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center p-4 sm:p-8 md:p-12">
                    {/* Sol tərəf / Üst tərəf: Qutu Şəkli */}
                    <div className="md:col-span-6 flex justify-center">
                        <img
                            src="https://flowerknows.co/cdn/shop/files/20260723-105904.jpg?v=1784775656&width=1500"
                            alt="Must-Have Value Sets"
                            referrerPolicy="no-referrer"
                            className="w-full max-w-[360px] md:max-w-[460px] object-cover rounded-sm"
                        />
                    </div>

                    {/* Sağ tərəf / Alt tərəf: Mətn və SHOP NOW */}
                    <div className="md:col-span-6 text-center flex flex-col items-center justify-center">
                        <h1 className="font text-[28px] sm:text-[36px] text-[#333] tracking-[0.5px] mb-3">
                            Must-Have Value Sets
                        </h1>
                        <p className="dmsans text-[13px] md:text-[15px] text-[#666] leading-relaxed max-w-[440px] mb-6 md:mb-8">
                            Shop our must-have value sets to get great deals on the hottest products. Customize the exclusive gift sets you want.
                        </p>
                        <Link
                            to="/collections/value-set"
                            className="w-full sm:w-auto inline-block bg-[#ea9393] hover:bg-[#d88080] text-white font uppercase text-[12px] tracking-[2.5px] px-10 py-3.5 transition duration-300 font-medium cursor-pointer"
                        >
                            SHOP NOW
                        </Link>
                    </div>
                </div>

                {/* 2. VALUE SETS (MOBİLDƏ SLİDER + NÖQTƏLƏR, DESKTOPDA 4 SÜTUN) */}
                <section>
                    {loading ? (
                        <p className="text-center py-10 font text-gray-400">Loading...</p>
                    ) : (
                        <div>
                            {/* Məhsul Karuseli / Qridi */}
                            <div
                                ref={sliderRef}
                                onScroll={handleScroll}
                                className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-2"
                            >
                                {mustHaveSets.map((product) => {
                                    const { finalPrice, originalPrice } = getProductPriceDetails(product);
                                    const valueTag = product.value || (originalPrice ? `VALUE ${formatPrice(Math.round(originalPrice))}` : null);

                                    return (
                                        <div
                                            key={product.id}
                                            className="min-w-[70%] sm:min-w-[45%] md:min-w-0 snap-center group flex flex-col p-2 md:p-0"
                                        >
                                            <div className="relative overflow-hidden bg-[#faf9f8] aspect-[5/6] flex items-center justify-center">
                                                <Link to={`/products/${toSlug(product.title)}`} className="w-full h-full block">
                                                    <img
                                                        src={product.images?.[0] || product.img || ""}
                                                        alt={product.title}
                                                        referrerPolicy="no-referrer"
                                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />

                                                    {/* Sağ Yuxarı: VALUE Bəci */}
                                                    <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
                                                        {valueTag && (
                                                            <span className="bg-[#ea9393] text-white text-[8px] md:text-[9px] tracking-[1px] uppercase px-2 py-1 font-medium">
                                                                {valueTag}
                                                            </span>
                                                        )}
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
                                                        e.preventDefault(); // Linkə keçməsin
                                                        addToBasket(product, 0, 1, false);
                                                    }}
                                                    className="xl:hidden flex items-center justify-center absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#dd9c9c] text-white shadow-sm z-20 cursor-pointer"
                                                >
                                                    <TbShoppingBag className="text-[18px]" />
                                                </button>
                                            </div>

                                            <div className="text-center pt-3 pb-2">
                                                <h3 className="font text-[13px] md:text-[14px] text-[#212326] tracking-[0.5px] mb-1 line-clamp-1">
                                                    <Link to={`/products/${toSlug(product.title)}`} className="hover:text-[#c78a99] transition">
                                                        {product.title}
                                                    </Link>
                                                </h3>
                                                <p className="font text-[13px] md:text-[14px]">
                                                    {originalPrice !== null && (
                                                        <span className="text-gray-400 line-through mr-1.5 text-[12px] md:text-[13px]">
                                                            {formatPrice(originalPrice)}
                                                        </span>
                                                    )}
                                                    <span className="text-[#ea9393] font-medium text-[14px] md:text-[15px]">
                                                        {formatPrice(finalPrice)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* MOBİL NÖQTƏLƏR */}
                            <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
                                {mustHaveSets.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => scrollToSlide(idx)}
                                        aria-label={`Slide ${idx + 1}`}
                                        className={`transition-all duration-300 rounded-full cursor-pointer ${activeSlide === idx
                                            ? 'w-4 h-1.5 bg-[#ea9393]'
                                            : 'w-1.5 h-1.5 bg-[#ddd]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* 3. EXCLUSIVE FREE GIFTS */}
                {(() => {
                    const [activeGiftTab, setActiveGiftTab] = useState(0);

                    const giftTabs = [
                        {
                            title: "Gift With Any Purchase",
                            desc: "Get a random gift:",
                            bullet: "Makeup Remover Wipe or Cleansing Balm Sample",
                            note: "It will be automatically applied to your package.",
                            image: "https://flowerknows.co/cdn/shop/files/20260303-113637.jpg?v=1772509018&width=1500"
                        },
                        {
                            title: "Complimentary Puff",
                            desc: "Buy any Powder Highlighter, Powder Blush, or Cream Blush to receive:",
                            bullet: "1 Random Powder Puff",
                            note: "It will be automatically applied to your package.",
                            image: "https://flowerknows.co/cdn/shop/files/20250313-172236.jpg?v=1741857791&width=1500"
                        },
                        {
                            title: "Free Perfume Sample",
                            desc: "Buy any full-size Perfume to receive:",
                            bullet: "1 Random Perfume Sample",
                            note: "It will be automatically applied to your package.",
                            image: "https://flowerknows.co/cdn/shop/files/20260422-115934.jpg?v=1776836401&width=1500"
                        }
                    ];

                    const currentGift = giftTabs[activeGiftTab];

                    return (
                        <>
                            <section className="pt-6">
                                <h2 className="font text-[32px] md:text-[42px] text-[#333] text-center tracking-[0.5px] mb-8 md:mb-12 select-none">
                                    Exclusive Free Gift
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-sm">
                                    {/* Sol Tərəf: Çəhrayı Arxa Fon və Tab Menyu */}
                                    <div className="md:col-span-6 bg-[#ebafb2] p-8 sm:p-10 md:p-14 flex flex-col justify-between text-white">
                                        {/* Tab Başlıqları */}
                                        <div className="space-y-2 select-none">
                                            {giftTabs.map((tab, idx) => (
                                                <h3
                                                    key={idx}
                                                    onClick={() => setActiveGiftTab(idx)}
                                                    className={`font text-[22px] sm:text-[26px] md:text-[30px] leading-tight cursor-pointer transition-opacity duration-300 ${activeGiftTab === idx
                                                        ? 'opacity-100 font-normal'
                                                        : 'opacity-40 hover:opacity-75'
                                                        }`}
                                                >
                                                    {tab.title}
                                                </h3>
                                            ))}
                                        </div>

                                        {/* Seçilmiş Tab-ın Təsviri */}
                                        <div className="mt-8 md:mt-12 space-y-3 font text-[13px] sm:text-[14px] leading-relaxed text-[#fff]/95">
                                            <p>{currentGift.desc}</p>
                                            <ul className="list-disc list-inside space-y-1 pl-1">
                                                <li>{currentGift.bullet}</li>
                                            </ul>
                                            <p className="text-[12px] sm:text-[13px] text-[#fff]/80 pt-1">
                                                {currentGift.note}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sağ Tərəf: Şəkil */}
                                    <div className="md:col-span-6 w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-full">
                                        <img
                                            src={currentGift.image}
                                            alt={currentGift.title}
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 4. FREE SHIPPING BANNER SECTION */}
                            <section>
                                <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[360px] md:min-h-[420px]">
                                    {/* Sol Tərəf: Mətn və Shop Now Düyməsi */}
                                    <div className="md:col-span-6 p-6 sm:p-10 md:p-16 flex flex-col items-center justify-center text-center">
                                        <h2 className="font text-[32px] sm:text-[38px] text-[#333] tracking-[0.5px] mb-4">
                                            Free Shipping
                                        </h2>

                                        <p className="dmsans text-[13px] md:text-[14.5px] text-[#555] leading-relaxed max-w-[420px] mb-8">
                                            Enjoy free shipping on all orders {formatPrice(100)}+ for the US and {formatPrice(100)}+ for other regions. Offer is automatically applied at checkout and can be combined with other offers.
                                        </p>

                                        <Link
                                            to="/collections/best-sellers"
                                            className="inline-block bg-[#ea9393] hover:bg-[#d88080] text-white font uppercase text-[12px] tracking-[2.5px] px-10 py-3.5 transition duration-300 font-medium cursor-pointer"
                                        >
                                            SHOP NOW
                                        </Link>
                                    </div>

                                    {/* Sağ Tərəf: Karetka Şəkli */}
                                    <div className="md:col-span-6 w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center">
                                        <img
                                            src="https://flowerknows.co/cdn/shop/files/77f0123d7b9007474e69cfc117b3547c.jpg?v=1685086517&width=1500"
                                            alt="Free Shipping Carriage"
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </section>
                        </>
                    );
                })()}

            </div>

            <ShopByCategory />
        </div>
    );
}

export default LongTermOffer;