import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getCategories } from '../service/api'; // və ya '../services/api' (faylın yerinə uyğun)

function ShopByCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => {
                console.error('Categories yüklənmədi:', err);
                setCategories([]);
            });
    }, []);

    if (!Array.isArray(categories) || categories.length === 0) return null;

    return (
        <section className="md:w-[90%] mx-auto py-12 md:py-16">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <h2 className="font text-center text-[30px] md:text-[36px] text-[#d5797b] tracking-[1px] mb-10">
                    Shop By Category
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/collections/${cat.slug}`}
                            className="group relative aspect-[15/16] overflow-hidden bg-[#f3f1f9] block"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                            <div className="absolute bottom-4 left-4 right-4 z-10">
                                <span className="font text-white text-[16px] md:text-[18px] tracking-[0.5px] border-b border-transparent group-hover:border-white transition-all duration-300 pb-0.5 inline-block leading-tight">
                                    {cat.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ShopByCategory;