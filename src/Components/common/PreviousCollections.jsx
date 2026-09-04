import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';
import { Link } from 'react-router';
import { getPreviousCollections } from '../service/api';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../App.css';

function CollectionCard({ item }) {
    return (
        <Link to={item.link} className="group relative overflow-hidden block">
            <div className="aspect-[7/8] overflow-hidden bg-[#f3f1f9]">
                <img
                    src={item.img}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="font text-white text-[16px] lg:text-[18px] text-center tracking-[1.3px] leading-tight">
                    {item.title}
                </h3>
            </div>
        </Link>
    );
}

function PreviousCollections() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getPreviousCollections()
            .then((data) => {
                setItems(data);
            })
            .catch((err) => console.error('Previous Collections xətası:', err));
    }, []);

    if (!items || items.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <h2 className="font text-center text-[36px] lg:text-[40px] tracking-[1.3px] text-[#212326] mb-12">
                Explore Previous Collections
            </h2>

            <div className="w-[92%] max-w-[1280px] mx-auto">
                {/* DESKTOP: 4-lü grid */}
                <div className="hidden lg:grid grid-cols-4 gap-4">
                    {items.map((item) => (
                        <CollectionCard key={item.id} item={item} />
                    ))}
                </div>

                {/* MOBİL: swiper */}
                <div className="lg:hidden">
                    <Swiper
                        modules={[Pagination, Mousewheel]}
                        mousewheel={{ forceToAxis: true }}
                        grabCursor={true}
                        pagination={{ clickable: true }}
                        spaceBetween={16}
                        slidesPerView={2.3}
                        className="prevCollectionsSwiper !pb-12 [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination-bullet-active]:!bg-[#ea9393]"
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <CollectionCard item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default PreviousCollections;