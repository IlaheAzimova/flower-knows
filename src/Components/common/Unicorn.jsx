import React, { useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';
import { Link } from 'react-router';
import { TbShoppingBag } from "react-icons/tb";
import '../../App.css';
import knight from '../../assets/img/swiper-main.webp';
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductPriceDetails } from '../service/price';

function ProductCard({ product }) {
    const { openQuickView } = useProducts();
    const variants = product.variants ?? [];
    const [active, setActive] = useState(0);
    const { addToBasket } = useBasket();
    const { formatPrice } = useCurrency();

    // 1. Aktiv şəkli tapırıq
    const activeVariant = variants[active];
    const currentImg = activeVariant?.images?.[0]
        ?? activeVariant?.img
        ?? product.images?.[0]
        ?? product.img
        ?? "";

    // 2. Qiymət və endirimin hesablanması
    const { finalPrice, originalPrice, discountPercent, isFromPrice } = getProductPriceDetails(product, active);

    return (
        <div>
            {/* Şəkil + Hover elementləri */}
            <div className="group relative overflow-hidden bg-white aspect-[4/5]">
                <Link to={`/products/${toSlug(product.title)}`}>
                    <img
                        src={currentImg}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Endirim rozeti */}
                    {discountPercent > 0 && (
                        <span className="absolute top-3 right-3 bg-[#e8989a] text-white text-[11px] tracking-[1.5px] uppercase px-3 py-1 dmsans z-10 font-medium">
                            {discountPercent}% OFF
                        </span>
                    )}

                    {/* DESKTOP: Choose Options */}
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

            {/* Başlıq + Qiymət */}
            <div className="text-center py-4 px-2">
                <h3 className="font text-[15px] text-[#212326] mb-2 leading-[1.3] tracking-[1.2px] line-clamp-1">
                    <Link to={`/products/${toSlug(product.title)}`} className="hover:text-[#c78a99] transition">
                        {product.title}
                    </Link>
                </h3>
                <p className="font text-[15px]">
                    {originalPrice !== null && originalPrice > finalPrice && (
                        <span className="text-[#999] line-through mr-2 text-[14px]">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                    {(product.from || isFromPrice) && (
                        <span className="text-[#c78a99] mr-1 text-[13px]">From </span>
                    )}
                    <span className="text-[#c78a99] xl:text-[1.1rem] font-medium">
                        {formatPrice(finalPrice)}
                    </span>
                </p>

                {/* Yalnız rəng variantı (color) olanlarda swatch-lar */}
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

function Unicorn() {
    const { unicornProducts, loading } = useProducts();
    const swiperRef = useRef(null);

    return (
        <section id="collection" className="bg-[#f3f1f9] my-10">
            <div className="flex flex-col lg:flex-row">

                {/* SOL: Məhsul Qalereyası */}
                <div className="lg:w-[62%] pl-[4%] pr-6 py-14">

                    <div className="flex items-center justify-between gap-6 mb-12">
                        <div className="text-[#212326]">
                            <h4 className="uppercase dmsans text-[13px] tracking-[2px] mb-4">Discover what's new</h4>
                            <h2 className="font text-[35px] leading-[1.2] tracking-[1px]">Knight Unicorn Collection</h2>
                        </div>
                        <Link
                            to="/collections/knight-unicorn-collection"
                            className="hidden lg:inline-block bg-[#e8989a] text-white font uppercase text-[12px] tracking-[3px] px-8 py-4 transition-colors duration-300 hover:bg-[#b9788a] cursor-pointer"
                        >
                            View Full Collection
                        </Link>
                    </div>

                    {loading ? (
                        <p className="text-center py-10 font text-gray-400">Loading...</p>
                    ) : (
                        <div className="relative">
                            <Swiper
                                onSwiper={(s) => (swiperRef.current = s)}
                                modules={[Pagination, Mousewheel]}
                                pagination={{ clickable: true }}
                                grabCursor={true}
                                mousewheel={{ forceToAxis: true }}
                                spaceBetween={20}
                                slidesPerView={2}
                                breakpoints={{
                                    640: { slidesPerView: 2.3 },
                                    1024: { slidesPerView: 3 },
                                }}
                                className="collectionSwiper !items-start !pb-16 [&_.swiper-pagination]:!bottom-1 [&_.swiper-pagination-bullet-active]:!bg-[#ea9393]"
                            >
                                {unicornProducts?.map((product) => (
                                    <SwiperSlide key={product.id} className="!h-auto">
                                        <ProductCard product={product} />
                                    </SwiperSlide>
                                ))}
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
                    )}

                    <div className="mt-8 lg:hidden">
                        <Link
                            to="/collections/knight-unicorn-collection"
                            className="block w-full text-center bg-[#e8989a] text-white font uppercase text-[13px] tracking-[3px] py-4 transition-colors duration-300 hover:bg-[#b9788a] cursor-pointer"
                        >
                            View Full Collection
                        </Link>
                    </div>
                </div>

                {/* SAĞ: Şəkil */}
                <div className="hidden lg:block lg:w-[38%]">
                    <img
                        src={knight}
                        alt="Knight Unicorn Collection"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </section>
    );
}

export default Unicorn;