import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import { Link } from 'react-router';

import 'swiper/css';
import 'swiper/css/navigation';
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductPriceDetails } from '../service/price';

function Bestsellers() {
    const { bestsellerProducts, loading } = useProducts();
    const { formatPrice, currency } = useCurrency();
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    if (loading || !bestsellerProducts || bestsellerProducts.length === 0) return null;

    return (
        <section className="py-14 bg-white overflow-hidden">
            <h2 className="font tracking-[2px] text-center text-[34px] lg:text-[40px] mb-12 text-[#212326] select-none">
                Shop Our Bestsellers
            </h2>

            <div className="w-full">
                <Swiper
                    key={currency?.code || 'bestseller-key'}
                    onSwiper={(s) => {
                        swiperRef.current = s;
                        setActiveIndex(s.realIndex || 0);
                    }}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    modules={[Navigation, Mousewheel]}
                    mousewheel={{ forceToAxis: true }}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={bestsellerProducts.length > 5}
                    spaceBetween={20}
                    slidesPerView={1.8}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 }
                    }}
                    className="bestsellersSwiper"
                >
                    {bestsellerProducts.map((item, i) => {
                        const isActive = i === activeIndex;

                        const displayImg = (item.poster && item.poster.trim() !== '')
                            ? item.poster
                            : (item.images?.[0] || item.img || "");

                        const { finalPrice, originalPrice } = getProductPriceDetails(item);

                        return (
                            <SwiperSlide
                                key={`${item.id}-${currency?.code || 'val'}`}
                                className="!h-[470px] !flex !items-center justify-center"
                            >
                                <Link
                                    to={`/products/${toSlug(item.title)}`}
                                    className={`
                                        group
                                        relative
                                        w-full
                                        block
                                        rounded-2xl
                                        overflow-hidden
                                        bg-[#faf9f8]
                                        transition-all
                                        duration-300
                                        cursor-pointer
                                        select-none
                                        ${isActive ? 'h-[460px] shadow-xl ring-1 ring-black/5' : 'h-[390px] opacity-75 hover:opacity-100'}
                                    `}
                                >
                                    <img
                                        src={displayImg}
                                        alt={item.title}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    {/* Aktiv kartın məlumat paneli */}
                                    {isActive && (
                                        <div className="absolute bottom-4 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-3 text-center transition-all duration-300 z-20">
                                            <p className="font text-[13.5px] font-medium leading-snug text-[#212326] line-clamp-1 group-hover:text-[#ea9393] transition">
                                                {item.title}
                                            </p>

                                            <p className="text-[13.5px] mt-1.5 flex items-center justify-center gap-2">
                                                {originalPrice !== null && originalPrice > finalPrice && (
                                                    <span className="text-[#999] line-through text-[12px]">
                                                        {formatPrice(originalPrice)}
                                                    </span>
                                                )}
                                                <span className="text-[#ea9393] font-semibold text-[14.5px]">
                                                    {formatPrice(finalPrice)}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Naviqasiya Oxları */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous Slide"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-[#444] hover:text-[#ea9393] hover:border-[#ea9393] transition bg-white shadow-sm cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next Slide"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-[#444] hover:text-[#ea9393] hover:border-[#ea9393] transition bg-white shadow-sm cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default Bestsellers;