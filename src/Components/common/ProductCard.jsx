import React, { useState } from 'react';
import { Link } from 'react-router';
import { TbShoppingBag } from "react-icons/tb";
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductPriceDetails } from '../service/price';

export default function ProductCard({ product, bg = "bg-white" }) {
    const { openQuickView } = useProducts();
    const { addToBasket } = useBasket();
    const { formatPrice } = useCurrency();

    const variants = product.variants ?? [];
    const [active, setActive] = useState(0);

    const activeVariant = variants[active];
    const displayImg = activeVariant?.images?.[0]
        ?? activeVariant?.img
        ?? product.images?.[0]
        ?? product.img
        ?? "";

    const { finalPrice, originalPrice, discountPercent, isFromPrice } = getProductPriceDetails(product, active);

    // Seçilən variant indeksini URL-ə əlavə edirik
    const productUrl = `/products/${toSlug(product.title)}?variant=${active}`;

    return (
        <div className="group flex flex-col h-full">
            <div className={`relative overflow-hidden ${bg} aspect-[4/5]`}>
                <Link to={productUrl}>
                    <img
                        src={displayImg}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {discountPercent > 0 && (
                        <span className="absolute top-2.5 right-2.5 bg-[#e8989a] text-white text-[10px] sm:text-[11px] tracking-[1px] uppercase px-2.5 py-0.5 font-medium z-10">
                            {discountPercent}% OFF
                        </span>
                    )}

                    {/* DESKTOP: Choose Options - seçilən active indeksini də göndəririk */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            openQuickView(product, active);
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
                            addToBasket(product, active, 1, false);
                        }}
                        className="xl:hidden flex items-center justify-center absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#dd9c9c] text-white shadow-sm z-20 cursor-pointer"
                    >
                        <TbShoppingBag className="text-[18px]" />
                    </button>
                </Link>
            </div>

            <div className="text-center py-3.5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font text-[14px] sm:text-[15px] text-[#212326] mb-1.5 tracking-[1px] line-clamp-1">
                        <Link to={productUrl} className="hover:text-[#c78a99] transition">
                            {product.title}
                        </Link>
                    </h3>
                    <p className="font text-[14px]">
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="text-gray-400 line-through mr-2 text-[13px] sm:text-[14px]">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        {(product.from || isFromPrice) && (
                            <span className="text-[#c78a99] mr-1 text-[13px]">From </span>
                        )}
                        <span className="text-[#c78a99] text-[15px] sm:text-[16px] font-medium">
                            {formatPrice(finalPrice)}
                        </span>
                    </p>
                </div>

                {variants.length > 0 && variants.some(v => v.color) && (
                    <div className="flex justify-center flex-wrap gap-1.5 mt-2.5">
                        {variants.map((v, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActive(i)}
                                onMouseEnter={() => setActive(i)}
                                aria-label={v.name}
                                title={v.name}
                                className={`w-3.5 h-3.5 rounded-full border border-white transition cursor-pointer ${active === i ? 'ring-1.5 ring-[#c78a99] scale-110' : 'ring-1 ring-[#ddd]'
                                    }`}
                                style={{ backgroundColor: v.color || '#fff' }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}