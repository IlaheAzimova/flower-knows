import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../App.css';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../common/ProductCard';

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
                            <ProductCard product={product} bg="bg-white" />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous"
                    className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 left-0 z-10 w-11 h-11 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#ea9393] transition cursor-pointer"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next"
                    className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 right-0 z-10 w-11 h-11 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#ea9393] transition cursor-pointer"
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