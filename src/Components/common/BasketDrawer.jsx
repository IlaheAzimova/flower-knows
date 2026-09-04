import React, { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';
import { toSlug } from '../service/slug';

function BasketDrawer() {
    const {
        basketItems,
        isBasketOpen,
        setIsBasketOpen,
        updateQuantity,
        removeFromBasket,
        subtotal,
        totalCount
    } = useBasket();

    const { formatPrice } = useCurrency();

    // Səbət açıq olanda arxa səhifənin sürüşməsini bağlayırıq
    useEffect(() => {
        if (isBasketOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isBasketOpen]);

    if (!isBasketOpen) return null;

    // $100 və ya daha çox olduqda pulsuz çatdırılma
    const FREE_SHIPPING_LIMIT = 100;
    const progressPercent = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);
    const difference = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);

    return (
        <div className="fixed inset-0 z-[1000] flex justify-end">
            {/* Şəffaf arxa fon qatı */}
            <div
                className="absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300"
                onClick={() => setIsBasketOpen(false)}
            />

            {/* Sağdan açılan Səbət Pəncərəsi */}
            <div className="relative w-full max-w-[420px] bg-[#fdfaf8] h-full shadow-2xl z-10 flex flex-col justify-between">

                {/* 1. BAŞLIQ */}
                <div className="p-5 border-b border-[#f2e5e5] flex items-center justify-between bg-white">
                    <span className="font tracking-[2px] uppercase text-[13px] text-[#212326] font-semibold">
                        Shopping Bag ({totalCount})
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsBasketOpen(false)}
                        className="w-7 h-7 rounded-full border border-[#ecd8d8] flex items-center justify-center text-[#777] hover:text-[#ea9393] hover:border-[#ea9393] transition cursor-pointer"
                        aria-label="Close"
                    >
                        <IoCloseOutline size={18} />
                    </button>
                </div>

                {/* 2. FREE SHIPPING BAR */}
                <div className="px-5 py-3.5 bg-[#fdf5f5] border-b border-[#f5e8e8] text-center">
                    <p className="dmsans text-[12px] text-[#555] mb-2 font-medium">
                        {subtotal >= FREE_SHIPPING_LIMIT ? (
                            <span className="text-[#c78a99] font-bold">🎉 You've unlocked Free Shipping!</span>
                        ) : (
                            <>
                                Add <span className="text-[#ea9393] font-bold">{formatPrice(difference)}</span> more for Free Shipping
                            </>
                        )}
                    </p>
                    <div className="w-full bg-[#ecdcdc] h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-[#ea9393] h-full transition-all duration-500 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* 3. MƏHSULLAR SİYAHISI */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {basketItems.length === 0 ? (
                        <div className="text-center py-24">
                            <p className="font text-[18px] text-[#4a3e40] mb-2">Your bag is empty</p>
                            <p className="dmsans text-[12px] text-[#888] mb-6">Explore our collections and add your favorites.</p>
                            <button
                                type="button"
                                onClick={() => setIsBasketOpen(false)}
                                className="inline-block bg-[#ea9393] hover:bg-[#d88080] text-white font uppercase text-[11px] tracking-[2px] px-8 py-3 transition cursor-pointer"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        basketItems.map((item) => {
                            const itemTotal = (item.price + (item.isGiftWrap ? 4.99 : 0)) * item.quantity;

                            return (
                                <div
                                    key={item.key}
                                    className="flex gap-4 p-3 bg-white border border-[#f5eae8] relative group"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        referrerPolicy="no-referrer"
                                        className="w-20 h-24 object-cover bg-[#faf8f7]"
                                    />

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start pr-6">
                                                <Link
                                                    to={`/products/${toSlug(item.title)}`}
                                                    onClick={() => setIsBasketOpen(false)}
                                                    className="font text-[13px] text-[#212326] leading-tight hover:text-[#ea9393] transition line-clamp-1"
                                                >
                                                    {item.title}
                                                </Link>
                                            </div>

                                            {item.variantName && (
                                                <p className="dmsans text-[11px] text-[#777] mt-1 flex items-center gap-1.5">
                                                    {item.variantColor && (
                                                        <span
                                                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                                                            style={{ backgroundColor: item.variantColor }}
                                                        />
                                                    )}
                                                    {item.variantName}
                                                </p>
                                            )}

                                            {item.isGiftWrap && (
                                                <p className="dmsans text-[10px] text-[#c78a99] mt-0.5">
                                                    🎁 Gift Wrap (+{formatPrice(4.99)})
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            {/* Say artırıb-azaltmaq */}
                                            <div className="flex items-center border border-[#e5dcdc] h-7 bg-white">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.key, -1)}
                                                    className="w-6 h-full flex items-center justify-center text-[#555] hover:bg-[#fbf0f0] transition text-sm cursor-pointer"
                                                >
                                                    −
                                                </button>
                                                <span className="w-7 text-center dmsans text-[12px] text-[#212326] select-none">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.key, 1)}
                                                    className="w-6 h-full flex items-center justify-center text-[#555] hover:bg-[#fbf0f0] transition text-sm cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Məhsulun ümumi qiyməti */}
                                            <span className="font text-[14px] text-[#ea9393] font-medium">
                                                {formatPrice(itemTotal)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Silmə düyməsi */}
                                    <button
                                        type="button"
                                        onClick={() => removeFromBasket(item.key)}
                                        aria-label="Remove item"
                                        className="absolute top-2 right-2 text-[#b0a2a4] hover:text-[#ea9393] transition cursor-pointer p-1"
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* 4. FOOTER VƏ CHECKOUT */}
                {basketItems.length > 0 && (
                    <div className="p-5 border-t border-[#f2e5e5] bg-white space-y-3">
                        <div className="flex justify-between items-center font text-[15px] text-[#212326]">
                            <span>Subtotal</span>
                            <span className="text-[#ea9393] font-semibold text-[17px]">
                                {formatPrice(subtotal)}
                            </span>
                        </div>
                        <p className="dmsans text-[11px] text-[#888] text-center">
                            Taxes and shipping calculated at checkout
                        </p>
                        <button
                            type="button"
                            className="w-full bg-[#ea9393] hover:bg-[#d88080] text-white font uppercase text-[12px] tracking-[2.5px] py-3.5 transition duration-300 font-medium cursor-pointer shadow-sm"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasketDrawer;