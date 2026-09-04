import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { FiMinus, FiPlus } from 'react-icons/fi';
import ShopByCategory from '../common/ShopByCategory';

function GiftCard() {
    const { products, addToCart, loading } = useProducts();
    const { formatPrice } = useCurrency();
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const product = products.find(p => p.id === 51 || p.category === 'gift-card');

    const variants = product?.variants || [];
    const currentVariant = variants[selectedVariantIndex] || {};
    const images = product?.images || [
        "https://flowerknows.co/cdn/shop/files/egiftcard_main.jpg?v=1700000000",
        "https://flowerknows.co/cdn/shop/files/egiftcard_preview2.jpg?v=1700000000"
    ];

    // Rəqəm çıxarışı üçün köməkçi (Məsələn "$50.00" və ya 50 gəlsə xalis rəqəmə çevirir)
    const parsePriceNumber = (val) => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') {
            const num = parseFloat(val.replace(/[^0-9.]/g, ''));
            return isNaN(num) ? 0 : num;
        }
        return 0;
    };

    const currentPriceNum = parsePriceNumber(currentVariant.price ?? product?.price);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            id: `${product.id}-${currentVariant.name || 'default'}`,
            productId: product.id,
            title: `${product.title} (${currentVariant.name || formatPrice(currentPriceNum)})`,
            price: currentPriceNum,
            image: images[activeImageIndex] || images[0],
            quantity: quantity,
            isDigital: true
        };

        addToCart(cartItem, quantity);
    };

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <p className="font text-gray-400 text-lg">Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <p className="font text-gray-500 text-lg">Gift card not found.</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

                    {/* SOL TƏRƏF: QALEREYA */}
                    <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
                        {images.length > 1 && (
                            <div className="flex md:flex-col gap-3 w-full md:w-20 shrink-0">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`w-16 h-16 md:w-20 md:h-20 border transition overflow-hidden bg-[#faf9f8] cursor-pointer ${activeImageIndex === idx
                                            ? 'border-[#ea9393] ring-1 ring-[#ea9393]'
                                            : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex-1 w-full bg-[#faf9f8] overflow-hidden rounded-sm border border-[#f0f0f0] aspect-[4/3] flex items-center justify-center">
                            <img
                                src={images[activeImageIndex] || images[0]}
                                alt={product.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* SAĞ TƏRƏF: DETALLAR */}
                    <div className="lg:col-span-5 flex flex-col">
                        <h1 className="font text-[28px] sm:text-[34px] text-[#212326] tracking-[0.5px] mb-2 leading-tight">
                            {product.title}
                        </h1>

                        <p className="font text-[22px] text-[#212326] mb-1">
                            {formatPrice(currentPriceNum)}
                        </p>

                        <p className="dmsans text-[12px] text-[#777] mb-6">
                            Shipping calculated at checkout.
                        </p>

                        {/* DENOMINATIONS */}
                        {variants.length > 0 && (
                            <div className="mb-6">
                                <span className="block text-[11px] uppercase tracking-[1.5px] text-[#777] font-medium mb-3">
                                    Denominations
                                </span>
                                <div className="flex flex-wrap gap-2.5">
                                    {variants.map((v, index) => {
                                        const varPrice = parsePriceNumber(v.price ?? v.name);
                                        const label = varPrice > 0 ? formatPrice(varPrice) : v.name;

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setSelectedVariantIndex(index)}
                                                className={`px-5 py-2 text-[13px] border transition cursor-pointer ${selectedVariantIndex === index
                                                    ? 'bg-[#ea9393] text-white border-[#ea9393] font-medium'
                                                    : 'border-gray-300 text-[#444] hover:border-[#212326]'
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* SAY SEÇİMİ VƏ SƏBƏT DÜYMƏSİ */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center border border-gray-300 h-12 px-3 gap-4 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(-1)}
                                    className="text-gray-500 hover:text-black transition flex items-center justify-center p-1 cursor-pointer"
                                >
                                    <FiMinus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-[14px] font-medium min-w-[16px] text-center select-none">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(1)}
                                    className="text-gray-500 hover:text-black transition flex items-center justify-center p-1 cursor-pointer"
                                >
                                    <FiPlus className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="flex-1 h-12 bg-[#ea9393] hover:bg-[#d88080] text-white font uppercase text-[12px] tracking-[2.5px] transition duration-300 font-medium px-4 flex items-center justify-center cursor-pointer"
                            >
                                Add to cart
                            </button>
                        </div>

                        {/* TƏSVİR */}
                        <div className="dmsans text-[13px] text-[#555] leading-relaxed space-y-4 border-t border-gray-100 pt-6">
                            <p>{product.description}</p>
                        </div>
                    </div>

                </div>
            </div>

            <ShopByCategory />
        </div>
    );
}

export default GiftCard;