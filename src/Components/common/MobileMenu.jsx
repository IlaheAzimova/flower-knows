import React, { useState, useEffect } from 'react';
import { IoCloseOutline, IoChevronDown, IoChevronUp, IoEarthOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router';
import { useCurrency, CURRENCIES } from '../context/CurrencyContext';

function MobileMenu({ isOpen, onClose }) {
    const [openMenu, setOpenMenu] = useState(null); // 'collections', 'gifting', 'sale', 'shopall'
    const [openSubGroup, setOpenSubGroup] = useState(null); // 'g-value', 'g-occasion', 'g-idea', 'g-price'
    const { currency, setCurrency } = useCurrency();
    const [openCurrency, setOpenCurrency] = useState(false);

    // Menyu açılanda arxa səhifənin scroll-nu bağlayırıq
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
        setOpenSubGroup(null);
    };

    const toggleSubGroup = (subGroup) => {
        setOpenSubGroup(openSubGroup === subGroup ? null : subGroup);
    };

    return (
        <div
            className={`fixed inset-0 z-[1000] flex transition-all duration-300 ease-in-out ${isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                }`}
        >
            {/* 1. Şəffaf qara örtük (Fade animasiyası) */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* 2. Soldan açılan panel (Slide animasiyası) */}
            <div
                className={`relative w-[85%] max-w-[340px] bg-[#fffaf8] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div>
                    {/* 1. BAŞLIQ VƏ BAĞLAMA DÜYMƏSİ */}
                    <div className="p-4 border-b border-[#f3e5e5] flex items-center justify-between bg-white">
                        <span className="font tracking-[2px] uppercase text-[12px] text-[#4d4a47] font-semibold">
                            Menu
                        </span>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-7 h-7 rounded-full border border-[#edd7d7] flex items-center justify-center text-[#777] hover:text-[#ea9393] hover:border-[#ea9393] transition cursor-pointer"
                        >
                            <IoCloseOutline size={18} />
                        </button>
                    </div>

                    {/* 2. MENYU BÖLMƏLƏRİ */}
                    <div className="px-5 py-3 divide-y divide-[#f7ebeb]">

                        {/* NEW */}
                        <div className="py-3.5">
                            <Link
                                to="/collections/knight-unicorn-collection"
                                onClick={onClose}
                                className="block font uppercase tracking-[2px] text-[13px] text-[#4d4a47] hover:text-[#c98f92] transition-colors"
                            >
                                New
                            </Link>
                        </div>

                        {/* COLLECTIONS */}
                        <div className="py-3.5">
                            <button
                                type="button"
                                onClick={() => toggleMenu('collections')}
                                className="w-full flex items-center justify-between font uppercase tracking-[2px] text-[13px] text-[#4d4a47] hover:text-[#c98f92] transition-colors"
                            >
                                <span>Collections</span>
                                <span className={`transition-transform duration-200 ${openMenu === 'collections' ? 'rotate-180' : ''}`}>
                                    <IoChevronDown size={14} />
                                </span>
                            </button>

                            {openMenu === 'collections' && (
                                <ul className="mt-3 pl-3 space-y-2.5 border-l border-[#f0dcdc] animate-fadeIn">
                                    <li><Link to="/collections/knight-unicorn-collection" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Knight Unicorn</Link></li>
                                    <li><Link to="/collections/bunny-garden" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Bunny Garden</Link></li>
                                    <li><Link to="/collections/the-sweetie-bear" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">The Sweetie Bear</Link></li>
                                    <li><Link to="/collections/shells-jewel" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Shell's Jewel</Link></li>
                                    <li><Link to="/collections/strawberry-cupid" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Strawberry Cupid</Link></li>
                                    <li><Link to="/collections/little-angel" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Little Angel</Link></li>
                                </ul>
                            )}
                        </div>

                        {/* GIFTING */}
                        <div className="py-3.5">
                            <button
                                type="button"
                                onClick={() => toggleMenu('gifting')}
                                className="w-full flex items-center justify-between font uppercase tracking-[2px] text-[13px] text-[#4d4a47] hover:text-[#c98f92] transition-colors"
                            >
                                <span>Gifting</span>
                                <span className={`transition-transform duration-200 ${openMenu === 'gifting' ? 'rotate-180' : ''}`}>
                                    <IoChevronDown size={14} />
                                </span>
                            </button>

                            {openMenu === 'gifting' && (
                                <div className="mt-3 pl-3 space-y-3 border-l border-[#f0dcdc] animate-fadeIn">

                                    {/* Value Sets */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => toggleSubGroup('g-value')}
                                            className="w-full flex items-center justify-between py-1 fk-serif text-[12px] text-[#4d4a47] font-medium"
                                        >
                                            <span>Value Sets</span>
                                            <IoChevronDown className={`text-[10px] text-[#999] transition-transform duration-200 ${openSubGroup === 'g-value' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openSubGroup === 'g-value' && (
                                            <ul className="pl-2 mt-1 space-y-1.5 border-l border-[#ecd8d8]">
                                                <li><Link to="/collections/limited-set" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">Limited Sets 40% Off</Link></li>
                                                <li><Link to="/collections/all-in-gift-set" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">All-In Gift Sets</Link></li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Occasion */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => toggleSubGroup('g-occasion')}
                                            className="w-full flex items-center justify-between py-1 fk-serif text-[12px] text-[#4d4a47] font-medium"
                                        >
                                            <span>Occasion</span>
                                            <IoChevronDown className={`text-[10px] text-[#999] transition-transform duration-200 ${openSubGroup === 'g-occasion' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openSubGroup === 'g-occasion' && (
                                            <ul className="pl-2 mt-1 space-y-1.5 border-l border-[#ecd8d8]">
                                                <li><Link to="/collections/birthday" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">Birthday</Link></li>
                                                <li><Link to="/collections/for-your-bestie" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">For Your Bestie</Link></li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Gift Idea */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => toggleSubGroup('g-idea')}
                                            className="w-full flex items-center justify-between py-1 fk-serif text-[12px] text-[#4d4a47] font-medium"
                                        >
                                            <span>Gift Idea</span>
                                            <IoChevronDown className={`text-[10px] text-[#999] transition-transform duration-200 ${openSubGroup === 'g-idea' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openSubGroup === 'g-idea' && (
                                            <ul className="pl-2 mt-1 space-y-1.5 border-l border-[#ecd8d8]">
                                                <li><Link to="/products/gift-card" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">E-Gift Cards</Link></li>
                                                <li><Link to="/collections/best-sellers" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">Best Sellers</Link></li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => toggleSubGroup('g-price')}
                                            className="w-full flex items-center justify-between py-1 fk-serif text-[12px] text-[#4d4a47] font-medium"
                                        >
                                            <span>Price</span>
                                            <IoChevronDown className={`text-[10px] text-[#999] transition-transform duration-200 ${openSubGroup === 'g-price' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openSubGroup === 'g-price' && (
                                            <ul className="pl-2 mt-1 space-y-1.5 border-l border-[#ecd8d8]">
                                                <li><Link to="/collections/under-50" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">Under $50</Link></li>
                                                <li><Link to="/collections/under-75" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">Under $75</Link></li>
                                                <li><Link to="/collections/under-100" onClick={onClose} className="block text-[11px] text-[#666] hover:text-[#c98f92]">Under $100</Link></li>
                                            </ul>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* BEST SELLERS */}
                        <div className="py-3.5">
                            <Link
                                to="/collections/best-sellers"
                                onClick={onClose}
                                className="block font uppercase tracking-[2px] text-[13px] text-[#4d4a47] hover:text-[#c98f92] transition-colors"
                            >
                                Best Sellers
                            </Link>
                        </div>

                        {/* SALE */}
                        <div className="py-3.5">
                            <button
                                type="button"
                                onClick={() => toggleMenu('sale')}
                                className="w-full flex items-center justify-between font uppercase tracking-[2px] text-[13px] text-[#4d4a47] hover:text-[#c98f92] transition-colors"
                            >
                                <span className="text-[#dca0a2] font-semibold">Sale</span>
                                <span className={`transition-transform duration-200 ${openMenu === 'sale' ? 'rotate-180' : ''}`}>
                                    <IoChevronDown size={14} />
                                </span>
                            </button>

                            {openMenu === 'sale' && (
                                <ul className="mt-3 pl-3 space-y-2.5 border-l border-[#f0dcdc] animate-fadeIn">
                                    <li><Link to="/collections/sale" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Up To 50% Off</Link></li>
                                    <li><Link to="/pages/offers" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Long-term Offer</Link></li>
                                </ul>
                            )}
                        </div>

                        {/* SHOP ALL */}
                        <div className="py-3.5">
                            <button
                                type="button"
                                onClick={() => toggleMenu('shopall')}
                                className="w-full flex items-center justify-between font uppercase tracking-[2px] text-[13px] text-[#4d4a47] hover:text-[#c98f92] transition-colors"
                            >
                                <span>Shop All</span>
                                <span className={`transition-transform duration-200 ${openMenu === 'shopall' ? 'rotate-180' : ''}`}>
                                    <IoChevronDown size={14} />
                                </span>
                            </button>

                            {openMenu === 'shopall' && (
                                <ul className="mt-3 pl-3 space-y-2.5 border-l border-[#f0dcdc] animate-fadeIn">
                                    <li><Link to="/collections/face" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Face</Link></li>
                                    <li><Link to="/collections/eyes" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Eyes</Link></li>
                                    <li><Link to="/collections/lips" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Lips</Link></li>
                                    <li><Link to="/collections/fragrance" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Fragrance</Link></li>
                                    <li><Link to="/collections/accessories" onClick={onClose} className="block fk-serif text-[12px] text-[#555] hover:text-[#c98f92]">Accessories & Tools</Link></li>
                                </ul>
                            )}
                        </div>

                    </div>
                </div>

                {/* 3. AŞAĞI HİSSƏ: LOG IN / REGISTER VƏ VALYUTA */}
                <div className="p-4 bg-white border-t border-[#f3e5e5] space-y-3">

                    {/* USER / LOG IN LİNKİ */}
                    <Link
                        to="/account/login"
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 bg-[#fff8f7] border border-[#fae2e2] rounded-xs hover:border-[#ea9393] transition group"
                    >
                        <div className="w-7 h-7 rounded-full bg-white border border-[#ebdada] flex items-center justify-center text-[#777] group-hover:text-[#ea9393] group-hover:border-[#ea9393] transition">
                            <FiUser size={14} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font text-[11px] tracking-[1.5px] uppercase text-[#4d4a47] group-hover:text-[#c98f92] font-semibold transition">
                                Log In / Register
                            </span>
                            <span className="dmsans text-[10px] text-[#998b8c]">
                                Access your account & orders
                            </span>
                        </div>
                    </Link>

                    {/* VALYUTA SEÇİMİ */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setOpenCurrency(!openCurrency)}
                            className="w-full flex items-center justify-between text-[#666] text-xs py-2 px-3 border border-[#ecdcdc] rounded-sm cursor-pointer hover:border-[#ea9393] transition"
                        >
                            <div className="flex items-center gap-2">
                                <IoEarthOutline size={16} />
                                <span className="font uppercase text-[10px]">{currency.label}</span>
                            </div>
                            <span className={`transition-transform duration-200 ${openCurrency ? 'rotate-180' : ''}`}>
                                <IoChevronDown size={12} />
                            </span>
                        </button>

                        {openCurrency && (
                            <ul className="mt-2 border border-[#ecdcdc] rounded-sm max-h-32 overflow-y-auto divide-y divide-[#f9ecec]">
                                {Object.values(CURRENCIES).map((item) => (
                                    <li
                                        key={item.code}
                                        onClick={() => {
                                            setCurrency(item);
                                            setOpenCurrency(false);
                                        }}
                                        className={`p-2 text-[11px] text-[#555] hover:bg-[#fff0f0] cursor-pointer ${currency.code === item.code ? 'font-bold text-[#c98f92] bg-[#fdf0f0]' : ''
                                            }`}
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default MobileMenu;