import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../App.css';
import { TbShoppingBag } from "react-icons/tb";
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';

function LimitedCard({ product }) {
    const { openQuickView } = useProducts();
    const { formatPrice } = useCurrency();
    const variants = product.variants ?? [];
    const [active, setActive] = useState(0);
    const { addToBasket } = useBasket();
    const activeVariant = variants[active];
    const currentImg = activeVariant?.images?.[0]
        ?? activeVariant?.img
        ?? product.images?.[0]
        ?? product.img
        ?? "";

    const { finalPrice, originalPrice, discountPercent, isFromPrice } = getProductPriceDetails(product, active);

    return (
        <div className="group flex flex-col h-full">
            <div className="relative overflow-hidden bg-white aspect-[4/5]">
                <Link to={`/products/${toSlug(product.title)}`}>
                    <img
                        src={currentImg}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                        {discountPercent > 0 && (
                            <span className="bg-[#e8989a] text-white text-[10px] tracking-[0.5px] uppercase px-2.5 py-1 w-fit font-medium">
                                {discountPercent}% off
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            openQuickView(product);
                        }}
                        className="hidden lg:block absolute bottom-0 left-0 right-0 bg-[#e8989a] text-white font uppercase text-[12px] tracking-[2px] py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#d88080] z-20 cursor-pointer"
                    >
                        Choose Options
                    </button>
                    {/* MOBİL: Səbət ikonu */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            addToBasket(product, 0, 1, false);
                        }}
                        aria-label="Add to cart"
                        className="xl:hidden flex items-center justify-center absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#dd9c9c] text-white shadow-sm z-20 cursor-pointer"
                    >
                        <TbShoppingBag className="text-[18px]" />
                    </button>
                </Link>
            </div>

            <div className="text-center py-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font text-[15px] text-[#212326] tracking-[1.1px] mb-2 leading-tight px-2 line-clamp-1">
                        <Link to={`/products/${toSlug(product.title)}`} className="hover:text-[#c78a99] transition">
                            {product.title}
                        </Link>
                    </h3>
                    <p className="font text-[15px]">
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="text-gray-400 line-through mr-2 text-[16px]">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        {(product.from || isFromPrice) && (
                            <span className="text-[#c78a99] tracking-[1px] mr-1 text-[15px]">From </span>
                        )}
                        <span className="text-[#c78a99] text-[17px] font-medium">
                            {formatPrice(finalPrice)}
                        </span>
                    </p>
                </div>

                {variants.length > 0 && variants.some(v => v.color) && (
                    <div className="flex justify-center flex-wrap gap-2 mt-3">
                        {variants.map((v, i) => (
                            <button
                                key={i}
                                type="button"
                                onMouseEnter={() => setActive(i)}
                                onClick={() => setActive(i)}
                                aria-label={v.name}
                                title={v.name}
                                className={`w-4 h-4 rounded-full border border-white transition cursor-pointer ${active === i ? 'ring-2 ring-[#c78a99] ring-offset-1' : 'ring-1 ring-[#ddd] hover:ring-[#c78a99]'
                                    }`}
                                style={{ background: v.color || '#fff' }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function LimitedSale() {
    const { limitedSaleProducts, loading } = useProducts();
    const swiperRef = useRef(null);

    if (loading) return null;
    if (!limitedSaleProducts || limitedSaleProducts.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="text-center mb-12">
                <h2 className="font text-[36px] tracking-[1.6px] lg:text-[40px] text-[#212326] mb-3 select-none">
                    Limited Sale
                </h2>
                <p className="font text-[13px] uppercase text-[#555] tracking-[1.5px]">
                    Grab your favorites before they’re gone !
                </p>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 relative">
                <Swiper
                    onSwiper={(s) => (swiperRef.current = s)}
                    grabCursor={true}
                    modules={[Pagination, Navigation, Mousewheel]}
                    mousewheel={{ forceToAxis: true }}
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    breakpoints={{
                        320: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 4.4 },
                    }}
                    className="bogoSwiper !items-start !pb-16 [&_.swiper-pagination]:!bottom-1 [&_.swiper-pagination-bullet-active]:!bg-[#ea9393]"
                >
                    {limitedSaleProducts.map((product) => (
                        <SwiperSlide key={product.id} className="!h-auto">
                            <LimitedCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous"
                    className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 left-0 z-10 w-11 h-11 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#c78a99] transition cursor-pointer"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next"
                    className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 right-0 z-10 w-11 h-11 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#c78a99] transition cursor-pointer"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default LimitedSale;