import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import { useNavigate } from 'react-router';

import 'swiper/css';
import 'swiper/css/navigation';
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductPriceDetails } from '../service/price';

function Bestsellers() {
    const { bestsellerProducts, loading } = useProducts();
    const { formatPrice, currency } = useCurrency();
    const [active, setActive] = useState(0);
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    if (loading || !bestsellerProducts || bestsellerProducts.length === 0) return null;

    return (
        <section className="py-12 bg-white overflow-hidden">
            <h2 className="font tracking-[2px] text-center text-[36px] lg:text-[40px] mb-12 text-[#212326] select-none">
                Shop Our Bestsellers
            </h2>

            <div className="w-full">
                <Swiper
                    key={currency?.code || 'bestseller-key'}
                    onSwiper={(s) => {
                        swiperRef.current = s;
                        setActive(s.realIndex || 0);
                    }}
                    onSlideChange={(s) => setActive(s.realIndex)}
                    modules={[Navigation, Mousewheel]}
                    mousewheel={{ forceToAxis: true }}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={bestsellerProducts.length > 5}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 }
                    }}
                    className="bestsellersSwiper"
                >
                    {bestsellerProducts.map((item, i) => {
                        const isActive = i === active;

                        const displayImg = (item.poster && item.poster.trim() !== '')
                            ? item.poster
                            : (item.images?.[0] || item.img || "");

                        const { finalPrice, originalPrice } = getProductPriceDetails(item);

                        return (
                            <SwiperSlide
                                key={`${item.id}-${currency?.code || 'val'}`}
                                className="!h-[460px] !flex !items-center justify-center"
                            >
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate(`/products/${toSlug(item.title)}`)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            navigate(`/products/${toSlug(item.title)}`);
                                        }
                                    }}
                                    className={`
                                        relative
                                        w-full
                                        rounded-2xl
                                        overflow-hidden
                                        bg-[#f3f1f9]
                                        transition-all
                                        duration-300
                                        cursor-pointer
                                        select-none
                                        ${isActive ? 'h-[450px] shadow-lg' : 'h-[380px] opacity-75 hover:opacity-100'}
                                    `}
                                >
                                    <img
                                        src={displayImg}
                                        alt={item.title}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 pointer-events-none"
                                    />

                                    {/* Aktiv Kart */}
                                    {isActive && (
                                        <div className="absolute bottom-4 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-3 text-center transition-all duration-300 z-20">
                                            <p className="font text-[13px] font-semibold leading-snug text-[#212326] line-clamp-1">
                                                {item.title}
                                            </p>

                                            <p className="text-[13px] mt-1.5 flex items-center justify-center gap-1.5">
                                                {originalPrice !== null && originalPrice > finalPrice && (
                                                    <span className="text-[#999] line-through text-[12px]">
                                                        {formatPrice(originalPrice)}
                                                    </span>
                                                )}
                                                <span className="text-[#c78a99] font-bold text-[14px]">
                                                    {formatPrice(finalPrice)}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Oxlar */}
            <div className="flex justify-center gap-6 mt-8">
                <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ddd] text-[#3f3c39] hover:text-[#c78a99] hover:border-[#c78a99] transition bg-white shadow-sm cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ddd] text-[#3f3c39] hover:text-[#c78a99] hover:border-[#c78a99] transition bg-white shadow-sm cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default Bestsellers;