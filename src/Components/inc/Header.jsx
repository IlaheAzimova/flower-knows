import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaBarsStaggered } from "react-icons/fa6";
import logo from '../../assets/img/logo.avif';
import mdlogo from '../../assets/img/mdlogo.avif';
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation } from 'react-router';
import { IoEarthOutline, IoChevronUp, IoChevronDown } from "react-icons/io5";
import SearchModal from '../common/SearchModal';
import BasketDrawer from '../common/BasketDrawer';
import { useBasket } from '../context/BasketContext';
import MobileMenu from '../common/MobileMenu';
import { FiUser } from "react-icons/fi";
import AuthPage from '../pages/AuthPage';
import { useCurrency, CURRENCIES } from '../context/CurrencyContext';

const SubGroup = ({ id, heading, headingTo = "#", links, openSub, setOpenSub, currentPath }) => {
    const isSubGroupActive = links.some(l => l.to === currentPath);

    return (
        <div onMouseEnter={() => setOpenSub(id)} className="relative">
            <Link
                to={headingTo}
                className="w-full flex items-center justify-between py-1.5"
            >
                <span className={`fk-serif text-[12px] transition-colors duration-200 ${openSub === id || isSubGroupActive ? "text-[#c98f92] underline decoration-1 underline-offset-4" : "text-[#4d4a47]"
                    }`}>
                    {heading}
                </span>
                <IoChevronDown className={`text-[#b3a6a4] text-[11px] transition-transform duration-300 ${openSub === id ? "-rotate-90" : ""}`} />
            </Link>

            {/* SubGroup Yan Açılış Transition-ı */}
            <div
                className={`absolute top-0 left-full bg-[#fbf0f0] w-[190px] px-6 py-3 shadow-sm z-50 transition-all duration-200 ease-out origin-left ${openSub === id
                    ? "opacity-100 translate-x-0 pointer-events-auto visible"
                    : "opacity-0 -translate-x-2 pointer-events-none invisible"
                    }`}
            >
                <ul className="flex flex-col">
                    {links.map((l, i) => {
                        const isLinkActive = currentPath === l.to;
                        return (
                            <li key={i}>
                                <Link
                                    to={l.to}
                                    className={`relative inline-block py-1.5 fk-serif text-[12px] transition-colors ${isLinkActive ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                        }`}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("United States (USD $)");
    const { totalCount, setIsBasketOpen } = useBasket();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [activeMenu, setActiveMenu] = useState(null);
    const [openSub, setOpenSub] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();
    const [openCurrency, setOpenCurrency] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
                setActiveMenu(null);
                setOpenSub(null);
                setOpenCurrency(false);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeAll = () => {
        setActiveMenu(null);
        setOpenSub(null);
    };

    const openMenu = (menu) => {
        if (activeMenu !== menu) {
            setActiveMenu(menu);
            setOpenSub(null);
        }
    };

    // Aktiv ana kateqoriya yoxlanışları
    const isNewActive = currentPath === '/collections/knight-unicorn-collection';
    const isCollectionsActive = (
        currentPath === '/collections/bunny-garden' ||
        currentPath === '/collections/the-sweetie-bear' ||
        currentPath === '/collections/shells-jewel' ||
        currentPath === '/collections/strawberry-cupid' ||
        currentPath === '/collections/little-angel'
    );
    const isGiftingActive = (
        currentPath.includes('/collections/limited-set') ||
        currentPath.includes('/collections/all-in-gift-set') ||
        currentPath.includes('/collections/birthday') ||
        currentPath.includes('/collections/for-your-bestie') ||
        currentPath.includes('/products/gift-card') ||
        currentPath.includes('/collections/under-')
    );
    const isBestSellersActive = currentPath === '/collections/best-sellers';
    const isSaleActive = currentPath === '/collections/sale' || currentPath === '/pages/offers' || currentPath === '/sale';
    const isShopAllActive = (
        currentPath === '/shop-all' ||
        currentPath === '/collections/face' ||
        currentPath === '/collections/eyes' ||
        currentPath === '/collections/lips' ||
        currentPath === '/collections/fragrance' ||
        currentPath === '/collections/accessories'
    );

    return (
        <>
            {/* BÜTÜN HEADER HİSSƏSİ */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#fff0f0] shadow-xs">
                {/* ANNOUNCEMENT BAR */}
                <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
                    <nav className='bg-[#e8989a] p-2 text-white text-center'>
                        <div className="w-[90%] mx-auto">
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                            >
                                <SwiperSlide>Spend $80+, Get a Free Full-Size Product!</SwiperSlide>
                                <SwiperSlide>Free Shipping On Orders Over $100, More Details</SwiperSlide>
                            </Swiper>
                        </div>
                    </nav>
                </div>

                {/* LOQO, SEARCH, VALYUTA VƏ SƏBƏT */}
                <div className="px-4 py-3 md:px-8 md:py-3.5">
                    <div className="container md:w-[90%] md:mx-auto">
                        <div className="grid grid-cols-3 items-center">
                            {/* Sol: Valyuta / Mobil Menyu */}
                            <div className="flex items-center justify-start">
                                <button type="button" aria-label="Open mobile menu" className="lg:hidden">
                                    <FaBarsStaggered onClick={() => setIsMobileMenuOpen(true)} aria-label="Open mobile menu" className="text-[#717171] hover:text-[#c98f92] transition p-1 w-6 h-6 cursor-pointer" />
                                </button>

                                <div className="relative hidden lg:block">
                                    <button
                                        type="button"
                                        onClick={() => setOpenCurrency(!openCurrency)}
                                        className="relative z-50 flex items-center gap-2 text-[#777] tracking-[2px] text-sm cursor-pointer select-none"
                                    >
                                        <IoEarthOutline className="text-lg" />
                                        <span className='font uppercase text-[10px]'>{currency?.label}</span>
                                        {openCurrency ? <IoChevronUp className="text-xs" /> : <IoChevronDown className="text-xs" />}
                                    </button>

                                    {/* Kənara klikləyəndə bağlayan görünməz overlay */}
                                    {openCurrency && (
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setOpenCurrency(false)}
                                        />
                                    )}

                                    {/* Valyuta Dropdown */}
                                    <div
                                        className={`absolute left-0 top-full mt-2 w-[240px] bg-[#fff7f7] shadow-lg z-50 rounded-sm transition-all duration-200 ease-out origin-top ${openCurrency
                                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                                            : "opacity-0 translate-y-2 pointer-events-none invisible"
                                            }`}
                                    >
                                        <ul className="max-h-[220px] overflow-y-auto py-2">
                                            {Object.values(CURRENCIES).map((item) => (
                                                <li
                                                    key={item.code}
                                                    onClick={() => {
                                                        setCurrency(item);
                                                        setOpenCurrency(false);
                                                    }}
                                                    className={`px-5 py-2.5 text-xs font tracking-[1.1px] text-[#666] hover:bg-[#f8ecec] cursor-pointer ${currency?.code === item.code ? ' text-[#c98f92] bg-[#fdf0f0]' : ''
                                                        }`}
                                                >
                                                    {item.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Orta: Loqo */}
                            <div className="flex items-center justify-center">
                                <Link to="/" className="flex items-center justify-center">
                                    <img src={logo} alt="Logo" className='md:hidden block w-[200px] max-w-none object-contain' />
                                    <img src={mdlogo} alt="Desk Logo" className='hidden md:block w-[120px] h-auto object-contain' />
                                </Link>
                            </div>

                            {/* Sağ: Search, User və Səbət */}
                            <div className="flex items-center justify-end gap-5 text-[#717171]">
                                {/* 1. Axtarış */}
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(true)}
                                    aria-label="Search"
                                    className="w-6 h-6 flex items-center justify-center hover:text-[#c98f92] transition-colors cursor-pointer"
                                >
                                    <IoIosSearch className="text-[23px] mt-1" />
                                </button>

                                {/* 2. Profil / Sign In */}
                                <Link
                                    to="/account/login"
                                    aria-label="Account"
                                    className="w-6 h-6 hidden md:block flex items-center justify-center hover:text-[#c98f92] transition-colors cursor-pointer"
                                >
                                    <FiUser className="text-[20px] mt-1" />
                                </Link>

                                {/* 3. Səbət */}
                                <button
                                    type="button"
                                    onClick={() => setIsBasketOpen(true)}
                                    aria-label="Cart"
                                    className="relative w-10 h-10 flex items-center justify-center hover:text-[#c98f92] transition-colors cursor-pointer"
                                >
                                    <svg
                                        className="w-[55px] h-[55px] stroke-current"
                                        viewBox="0 0 100 100"
                                        fill="none"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M34 47V38C34 33 37 29 42 29C47 29 50 33 50 38V47" />
                                        <path d="M22 47L28 72H56L62 47H22Z" />
                                    </svg>

                                    {totalCount > 0 && (
                                        <span className="absolute top-1 right-0 bg-[#ea9393] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                            {totalCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MENYU HİSSƏSİ */}
                {!isScrolled && (
                    <div
                        className="hidden lg:block py-3 relative z-40 bg-[#fff0f0]"
                        onMouseLeave={closeAll}
                    >
                        <div className="container w-[90%] mx-auto">
                            <ul className='flex items-center justify-center gap-14 uppercase text-[#717171] tracking-[2.4px] text-[12px] font'>
                                {/* 1. NEW */}
                                <li className="relative group" onMouseEnter={closeAll}>
                                    <Link
                                        to="/collections/knight-unicorn-collection"
                                        className={`relative inline-flex items-center py-1 transition-colors duration-200 ${isNewActive ? 'text-[#c98f92]' : 'text-[#717171] hover:text-[#c98f92]'
                                            }`}
                                    >
                                        New
                                        <span className={`pointer-events-none absolute left-0 -bottom-[3px] h-[1.5px] w-full bg-[#d9a6a8] origin-center transform transition-transform duration-300 ${isNewActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`} />
                                    </Link>
                                </li>

                                {/* 2. COLLECTIONS */}
                                <li className="relative group" onMouseEnter={() => openMenu("collections")}>
                                    <span
                                        className={`relative inline-flex items-center py-1 cursor-pointer transition-colors duration-200 ${isCollectionsActive ? 'text-[#c98f92]' : 'text-[#717171] hover:text-[#c98f92]'
                                            }`}
                                    >
                                        Collections
                                        <span className={`pointer-events-none absolute left-0 -bottom-[3px] h-[1.5px] w-full bg-[#d9a6a8] origin-center transform transition-transform duration-300 ${activeMenu === "collections" || isCollectionsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`} />
                                    </span>

                                    <div
                                        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ease-out origin-top ${activeMenu === "collections"
                                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                                            : "opacity-0 translate-y-2 pointer-events-none invisible"
                                            }`}
                                    >
                                        <div className="relative bg-[#fbf0f0] w-[170px] px-6 py-3 normal-case tracking-normal shadow-md">
                                            <ul className="flex flex-col">
                                                <li>
                                                    <Link
                                                        to="/collections/knight-unicorn-collection"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/knight-unicorn-collection' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Knight Unicorn
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/bunny-garden"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/bunny-garden' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Bunny Garden
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/the-sweetie-bear"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/the-sweetie-bear' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        The Sweetie Bear
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/shells-jewel"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/shells-jewel' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Shell's Jewel
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/strawberry-cupid"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/strawberry-cupid' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Strawberry Cupid
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/little-angel"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/little-angel' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Little Angel
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                {/* 3. GIFTING */}
                                <li className="relative group" onMouseEnter={() => openMenu("gifting")}>
                                    <span
                                        className={`relative inline-flex items-center py-1 cursor-pointer transition-colors duration-200 ${isGiftingActive ? 'text-[#c98f92]' : 'text-[#717171] hover:text-[#c98f92]'
                                            }`}
                                    >
                                        Gifting
                                        <span className={`pointer-events-none absolute left-0 -bottom-[3px] h-[1.5px] w-full bg-[#d9a6a8] origin-center transform transition-transform duration-300 ${activeMenu === "gifting" || isGiftingActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`} />
                                    </span>

                                    <div
                                        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ease-out origin-top ${activeMenu === "gifting"
                                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                                            : "opacity-0 translate-y-2 pointer-events-none invisible"
                                            }`}
                                    >
                                        <div className="relative bg-[#fbf0f0] w-[170px] px-6 py-3 normal-case tracking-normal shadow-md">
                                            <SubGroup
                                                id="g-value"
                                                heading="Value Sets"
                                                openSub={openSub}
                                                setOpenSub={setOpenSub}
                                                currentPath={currentPath}
                                                links={[
                                                    { label: "Limited Sets 40% Off", to: "/collections/limited-set" },
                                                    { label: "All-In Gift Sets", to: "/collections/all-in-gift-set" },
                                                ]}
                                            />
                                            <SubGroup
                                                id="g-occasion"
                                                heading="Occasion"
                                                openSub={openSub}
                                                setOpenSub={setOpenSub}
                                                currentPath={currentPath}
                                                links={[
                                                    { label: "Birthday", to: "/collections/birthday" },
                                                    { label: "For Your Bestie", to: "/collections/for-your-bestie" },
                                                ]}
                                            />
                                            <SubGroup
                                                id="g-idea"
                                                heading="Gift Idea"
                                                openSub={openSub}
                                                setOpenSub={setOpenSub}
                                                currentPath={currentPath}
                                                links={[
                                                    { label: "E-Gift Cards", to: "/products/gift-card" },
                                                    { label: "Best Sellers", to: "/collections/best-sellers" },
                                                ]}
                                            />
                                            <SubGroup
                                                id="g-price"
                                                heading="Price"
                                                openSub={openSub}
                                                setOpenSub={setOpenSub}
                                                currentPath={currentPath}
                                                links={[
                                                    { label: "Under $50", to: "/collections/under-50" },
                                                    { label: "Under $75", to: "/collections/under-75" },
                                                    { label: "Under $100", to: "/collections/under-100" },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </li>

                                {/* 4. BEST SELLERS */}
                                <li className="relative group" onMouseEnter={closeAll}>
                                    <Link
                                        to="/collections/best-sellers"
                                        className={`relative inline-flex items-center py-1 transition-colors duration-200 ${isBestSellersActive ? 'text-[#c98f92]' : 'text-[#717171] hover:text-[#c98f92]'
                                            }`}
                                    >
                                        Best Sellers
                                        <span className={`pointer-events-none absolute left-0 -bottom-[3px] h-[1.5px] w-full bg-[#d9a6a8] origin-center transform transition-transform duration-300 ${isBestSellersActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`} />
                                    </Link>
                                </li>

                                {/* 5. SALE */}
                                <li className="relative group" onMouseEnter={() => openMenu("sale")}>
                                    <Link
                                        to="/collections/sale"
                                        className={`relative inline-flex items-center py-1 transition-colors duration-200 ${isSaleActive ? 'text-[#c98f92]' : 'text-[#717171]'
                                            }`}
                                    >
                                        <span className="relative inline-block">
                                            Sale
                                            <svg
                                                className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+30px)] h-[calc(100%+18px)] transition-opacity duration-300 ${isSaleActive || activeMenu === "sale"
                                                    ? "opacity-100"
                                                    : "opacity-0 group-hover:opacity-100"
                                                    }`}
                                                viewBox="0 0 100 46"
                                                preserveAspectRatio="none"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M 78 7 C 93 11 95 30 73 38 C 47 47 11 42 5 25 C 1 13 21 6 47 5 C 68 4 83 8 90 14"
                                                    stroke="#dca0a2"
                                                    strokeWidth="1.4"
                                                    strokeLinecap="round"
                                                    vectorEffect="non-scaling-stroke"
                                                />
                                            </svg>
                                        </span>
                                    </Link>

                                    <div
                                        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ease-out origin-top ${activeMenu === "sale"
                                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                                            : "opacity-0 translate-y-2 pointer-events-none invisible"
                                            }`}
                                    >
                                        <div className="relative bg-[#fbf0f0] w-[160px] px-6 py-3 normal-case tracking-normal shadow-md">
                                            <ul className="flex flex-col">
                                                <li>
                                                    <Link
                                                        to="/collections/sale"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/sale' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Up To 50% Off
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/pages/offers"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/pages/offers' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Long-term Offer
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                {/* 6. SHOP ALL */}
                                <li className="relative group" onMouseEnter={() => openMenu("shopall")}>
                                    <Link
                                        to="/shop-all"
                                        className={`relative inline-flex items-center py-1 transition-colors duration-200 ${isShopAllActive ? 'text-[#c98f92]' : 'text-[#717171] hover:text-[#c98f92]'
                                            }`}
                                    >
                                        Shop All
                                        <span className={`pointer-events-none absolute left-0 -bottom-[3px] h-[1.5px] w-full bg-[#d9a6a8] origin-center transform transition-transform duration-300 ${activeMenu === "shopall" || isShopAllActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`} />
                                    </Link>

                                    <div
                                        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ease-out origin-top ${activeMenu === "shopall"
                                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                                            : "opacity-0 translate-y-2 pointer-events-none invisible"
                                            }`}
                                    >
                                        <div className="relative bg-[#fbf0f0] w-[190px] px-6 py-3 normal-case tracking-normal shadow-md">
                                            <ul className="flex flex-col">
                                                <li>
                                                    <Link
                                                        to="/collections/face"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/face' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Face
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/eyes"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/eyes' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Eyes
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/lips"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/lips' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Lips
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/fragrance"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/fragrance' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Fragrance
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/collections/accessories"
                                                        className={`block py-1.5 fk-serif text-[12px] transition-colors ${currentPath === '/collections/accessories' ? 'text-[#c98f92] underline decoration-1 underline-offset-4' : 'text-[#4d4a47] hover:text-[#c98f92]'
                                                            }`}
                                                    >
                                                        Accessories & Tools
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </header>

            {/* SƏHİFƏNİN ƏVVƏLİNDƏKİ BOŞLUQ */}
            <div className="h-[100px] lg:h-[190px] w-full" />

            {/* MODALLAR */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
            <BasketDrawer />
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                selectedCurrency={selected}
                setSelectedCurrency={setSelected}
                currencyList={currency}
            />
        </>
    );
}

export default Header;