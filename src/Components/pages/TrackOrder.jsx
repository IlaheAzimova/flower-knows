import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaPinterestP } from 'react-icons/fa6';


const GALLERY_IMAGES = [
    {
        url: "https://files.am-usercontent.com/pltf-as-icecube/841544b760a8444a81dd66ed650b2c39/0.jpg",
        alt: "Moonlight Mermaid Blush"
    },
    {
        url: "https://files.am-usercontent.com/pltf-as-icecube/02ee400602f242989fe8a5d808e35df7/11.jpg",
        alt: "Chocolate Wonder-Shop Blush"
    },
    {
        url: "https://files.am-usercontent.com/pltf-as-icecube/448a4ca4abae4877b4125eae2636f2aa/11.jpg",
        alt: "Swan Ballet Music Box Set"
    }
];

function TrackOrder() {
    const [tab, setTab] = useState('order'); // 'order' or 'tracking'
    const [verifyMethod, setVerifyMethod] = useState('email'); // 'email' or 'phone'

    const [orderNumber, setOrderNumber] = useState('');
    const [contactVal, setContactVal] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleTrack = (e) => {
        e.preventDefault();
        console.log({
            tab,
            orderNumber,
            contactVal,
            trackingNumber
        });
    };

    return (
        <div className="w-full bg-white text-[#212326] min-h-screen flex flex-col justify-between">

            {/* 1. AFTERSHIP TOP HEADER */}
            <header className=" bg-[#f8f6f3] border-b border-[#eeeae4] px-6 md:px-16 py-3.5 ">
                <div className="w-[90%] mx-auto flex items-center justify-between">
                    <Link to="/" className="inline-block">
                        <img
                            src="https://aftership.am-usercontent.com/images/asset_66370498101441808ba97aa9b7102469.png"
                            alt="Flower Knows"
                            className="h-5 sm:h-6 w-auto object-contain hover:opacity-90 transition"
                        />
                    </Link>

                    <nav className="flex items-center gap-6 sm:gap-8 text-[15px] font-medium text-[#444]">
                        <Link to="/collections/little-angel" className="hover:text-[#c98f92] transition">New-In</Link>
                        <Link to="/collections/best-sellers" className="hover:text-[#c98f92] transition">Best Seller</Link>
                        <Link to="/collections/all-products" className="hover:text-[#c98f92] transition">Shop All</Link>
                        <Link to="/pages/contact-us" className="hover:text-[#c98f92] transition">Contact Us</Link>
                    </nav>

                </div>

            </header>

            {/* 2. HERO TRACKING SECTION */}
            <main className="flex-1">
                <div
                    className="relative w-full bg-[#f6f2ee] bg-cover bg-center py-14 sm:py-20 px-6 md:px-16"
                    style={{
                        backgroundImage: `url('https://flowerknows.co/cdn/shop/files/StrawberryCupid-PC_1920x.jpg?v=1708493181')`,
                        backgroundBlendMode: 'soft-light',
                        backgroundColor: '#faf7f2'
                    }}
                >
                    <div className="max-w-[1140px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

                        {/* Sol Tərəf: Başlıq */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-[40px] sm:text-[54px] md:text-[62px] font-bold text-[#1f1d1d] tracking-tight leading-none">
                                Track your order
                            </h1>
                        </div>

                        {/* Sağ Tərəf: İzləmə Kartı */}
                        <div className="w-full max-w-[420px] bg-white rounded-xs shadow-md p-6 sm:p-8 border border-[#eae6e1]">

                            {/* Tabs */}
                            <div className="flex border-b border-[#e5e0da] mb-6 text-[13px] sm:text-[14px]">
                                <button
                                    type="button"
                                    onClick={() => setTab('order')}
                                    className={`pb-3 font-medium transition relative cursor-pointer ${tab === 'order'
                                        ? 'text-[#212326] border-b-2 border-[#212326] -mb-[1px]'
                                        : 'text-[#888] hover:text-[#555]'
                                        }`}
                                >
                                    Order number
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTab('tracking')}
                                    className={`ml-6 pb-3 font-medium transition relative cursor-pointer ${tab === 'tracking'
                                        ? 'text-[#212326] border-b-2 border-[#212326] -mb-[1px]'
                                        : 'text-[#888] hover:text-[#555]'
                                        }`}
                                >
                                    Tracking number
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleTrack} className="space-y-4">
                                {tab === 'order' ? (
                                    <>
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Order number"
                                                value={orderNumber}
                                                onChange={(e) => setOrderNumber(e.target.value)}
                                                className="w-full border border-[#d8d3cd] rounded-xs px-3.5 py-2.5 text-[14px] text-[#333] outline-none focus:border-[#a89b91] transition placeholder-[#aaa]"
                                            />
                                        </div>

                                        <div>
                                            <input
                                                required
                                                type={verifyMethod === 'email' ? 'email' : 'tel'}
                                                placeholder={verifyMethod === 'email' ? 'Email' : 'Phone number'}
                                                value={contactVal}
                                                onChange={(e) => setContactVal(e.target.value)}
                                                className="w-full border border-[#d8d3cd] rounded-xs px-3.5 py-2.5 text-[14px] text-[#333] outline-none focus:border-[#a89b91] transition placeholder-[#aaa]"
                                            />
                                        </div>

                                        <div className="text-right">
                                            <button
                                                type="button"
                                                onClick={() => setVerifyMethod(verifyMethod === 'email' ? 'phone' : 'email')}
                                                className="text-[12px] text-[#8c827a] hover:text-[#212326] transition cursor-pointer"
                                            >
                                                Verify by {verifyMethod === 'email' ? 'phone number' : 'email'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Tracking number"
                                            value={trackingNumber}
                                            onChange={(e) => setTrackingNumber(e.target.value)}
                                            className="w-full border border-[#d8d3cd] rounded-xs px-3.5 py-2.5 text-[14px] text-[#333] outline-none focus:border-[#a89b91] transition placeholder-[#aaa]"
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#e2cebd] hover:bg-[#d6c0ae] text-white text-[13px] font-semibold tracking-wider uppercase rounded-xs transition cursor-pointer mt-2"
                                >
                                    Track
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

                {/* 3. MƏHSUL QALEREYASI */}
                <div className="max-w-[1140px] mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {GALLERY_IMAGES.map((img, idx) => (
                            <div key={idx} className="w-full aspect-[4/3] overflow-hidden rounded-xs border border-[#eeeae4]">
                                <img
                                    src={img.url}
                                    alt={img.alt}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>

                    {/* DƏSTƏK SAATI ZOLAĞI */}
                    <div className="mt-8 bg-[#faf7f3] border border-[#eee8e0] py-3.5 px-4 text-center rounded-xs">
                        <p className="text-[13px] text-[#555] tracking-[0.3px]">
                            Online Support ⏰: Monday - Sunday 17:30 PM - 1:30 AM (+1) PST
                        </p>
                    </div>
                </div>
            </main>

            {/* 4. AFTERSHIP FOOTER */}
            <footer className="w-full border-t border-[#eeeae4] px-6 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#777]">
                <div>
                    Powered by <span className="font-semibold text-[#333]">AfterShip</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[#555]">
                    <Link to="/pages/contact-us" className="hover:text-[#212326] transition">Contact Us</Link>
                    <span>•</span>
                    <Link to="/pages/return-policy" className="hover:text-[#212326] transition">Returns</Link>
                    <span>•</span>
                    <Link to="/pages/terms-and-conditions" className="hover:text-[#212326] transition">Terms</Link>
                    <span>•</span>
                    <Link to="/pages/privacy-policy" className="hover:text-[#212326] transition">Privacy</Link>
                </div>

                <div className="flex items-center gap-4 text-[14px] text-[#555]">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#212326]"><FaFacebookF /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#212326]"><FaXTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#212326]"><FaInstagram /></a>
                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#212326]"><FaTiktok /></a>
                    <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#212326]"><FaPinterestP /></a>
                </div>
            </footer>

        </div>
    );
}

export default TrackOrder;