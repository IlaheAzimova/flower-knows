import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';
import { Link } from 'react-router';
import '../../App.css';
import knight from '../../assets/img/swiper-main.webp';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../common/ProductCard';

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
                                        <ProductCard product={product} bg="bg-white" />
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