import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../App.css';
import readyImg from '../../assets/img/ready-to-gift.webp';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../common/ProductCard';

function ReadyToGift() {
    const { readyGiftProducts, loading } = useProducts();
    const swiperRef = useRef(null);

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
                            {readyGiftProducts.map((product) => (
                                <SwiperSlide key={product.id} className="!h-auto">
                                    <ProductCard product={product} bg="bg-white" />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Desktop Oxları */}
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Previous"
                            className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 left-1 z-10 w-10 h-10 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#ea9393] transition cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Next"
                            className="hidden lg:flex items-center justify-center absolute top-[35%] -translate-y-1/2 right-1 z-10 w-10 h-10 rounded-full bg-white shadow-md text-[#6b6b6b] hover:text-[#ea9393] transition cursor-pointer"
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