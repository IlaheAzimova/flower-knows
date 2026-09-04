import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { Link } from 'react-router';
import { TbShoppingBag } from "react-icons/tb";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../App.css';
import readyImg from '../../assets/img/ready-to-gift.webp';
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';

function ReadyToGift() {
    const { readyGiftProducts, loading, openQuickView } = useProducts();
    const { formatPrice } = useCurrency();
    const swiperRef = useRef(null);
    const { addToBasket } = useBasket();

    if (loading) return <p className="text-center py-10 font text-gray-500">Loading...</p>;
    if (!readyGiftProducts || readyGiftProducts.length === 0) return null;

    return (
        <section className="my-[16px]">
            <div className="flex flex-col lg:flex-row">
                <div className="hidden lg:flex lg:w-[38%]">
                    <img
                        src={readyImg}
                        alt="Ready to Gift"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="lg:w-[62%] bg-white px-[4%] py-14">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                        <div className="text-center lg:text-left">
                            <h2 className="font text-[38px] lg:text-[42px] tracking-[1.06px] text-[#212326] leading-[1.06] mb-4">
                                Ready-To-Gift
                            </h2>
                            <p className="font text-[16px] text-[#555] tracking-[1.2px]">
                                Gift sets are here for you &amp; everyone on your list
                            </p>
                        </div>
                        <Link
                            to="/collections/limited-set"
                            className="hidden lg:inline-block bg-[#e8989a] text-white dmsans uppercase text-[12px] tracking-[3px] px-6 py-3 whitespace-nowrap transition-colors duration-300 hover:bg-[#b9788a] cursor-pointer"
                        >
                            View Full Collection
                        </Link>
                    </div>

                    <div className="relative">
                        <Swiper
                            onSwiper={(s) => (swiperRef.current = s)}
                            modules={[Pagination, Navigation, Mousewheel]}
                            spaceBetween={20}
                            pagination={{ clickable: true }}
                            mousewheel={{ forceToAxis: true }}
                            grabCursor={true}
                            slidesPerView={1.1}
                            breakpoints={{
                                320: { slidesPerView: 2.3 },
                                640: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="readyGiftSwiper !items-start !pb-16 [&_.swiper-pagination]:!bottom-1 [&_.swiper-pagination-bullet-active]:!bg-[#ea9393]"
                        >
                            {readyGiftProducts.map((product) => {
                                const mainImg = product.images?.[0] || product.img || "";
                                const { finalPrice, originalPrice, discountPercent } = getProductPriceDetails(product);
                                const valueTag = product.value || (originalPrice ? `Value ${formatPrice(Math.round(originalPrice))}` : null);

                                return (
                                    <SwiperSlide key={product.id} className="!h-auto">
                                        <div className="group flex flex-col h-full">
                                            <div className="relative overflow-hidden bg-white aspect-[4/5]">
                                                <Link to={`/products/${toSlug(product.title)}`}>
                                                    <img
                                                        src={mainImg}
                                                        alt={product.title}
                                                        referrerPolicy="no-referrer"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />


                                                    <div className="absolute top-2 right-2 p-1 sm:top-3 sm:right-3 flex flex-col gap-1 z-10">
                                                        {valueTag && (
                                                            <span className="bg-[#e8989a] text-white text-[8px] sm:text-[11px] tracking-[0.5px] sm:tracking-[1px] uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1 w-fit font-medium leading-tight rounded-[2px]">
                                                                {valueTag}
                                                            </span>
                                                        )}
                                                        {discountPercent > 0 && !valueTag && (
                                                            <span className="bg-[#e8989a] text-white text-[8px] sm:text-[10px] tracking-[0.3px] sm:tracking-[0.5px] uppercase px-1.5 py-0.5 sm:px-2 sm:py-0.5 w-fit font-medium leading-tight rounded-[2px]">
                                                                {discountPercent}% OFF
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
                                                </Link>
                                            </div>

                                            <div className="text-center py-4 flex-1 flex flex-col justify-between">
                                                <h3 className="font text-[16px] text-[#212326] mb-2 tracking-[1.2px] leading-tight px-1 line-clamp-1">
                                                    <Link to={`/products/${toSlug(product.title)}`} className="hover:text-[#c78a99] transition">
                                                        {product.title}
                                                    </Link>
                                                </h3>
                                                <p className="font text-[15px]">
                                                    {originalPrice !== null && originalPrice > finalPrice && (
                                                        <span className="text-[#999] line-through mr-2 text-[15px]">
                                                            {formatPrice(originalPrice)}
                                                        </span>
                                                    )}
                                                    <span className="text-[#c78a99] text-[17px] font-medium">
                                                        {formatPrice(finalPrice)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        {/* Desktop Oxları */}
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Previous"
                            className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 left-1 z-10 w-10 h-10 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#c78a99] transition cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Next"
                            className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 right-1 z-10 w-10 h-10 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#c78a99] transition cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ReadyToGift;