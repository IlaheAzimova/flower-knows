import React, { useState } from 'react';
import { Link } from 'react-router';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import { PiPlantBold } from 'react-icons/pi';

const POLICY_LINKS = [
    {
        title: "Refund Policy",
        content: "We offer refunds or replacements for damaged, defective, or incorrect items reported within 7 days of delivery. Due to the personal hygiene nature of cosmetic products, opened or used makeup items cannot be returned for a change of mind."
    },
    {
        title: "Returns & Exchanges Note",
        content: "Please inspect your order upon reception. If the item is defective, damaged or if you receive the wrong item, contact us immediately with your order number and unboxing photos so that we can evaluate the issue and make it right."
    },
    {
        title: "Start Your Return for U.S. Orders",
        link: "/account/login"
    },
    {
        title: "Start Your Return for International Orders",
        link: "/account/login"
    }
];

function RefundPolicy() {
    const [openModal, setOpenModal] = useState(null);

    return (
        <div className="w-full bg-white text-[#212326] min-h-screen">

            {/* 1. HERO BANNER */}
            <div
                className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] bg-cover bg-center flex items-center justify-center "
                style={{
                    backgroundImage: `url('https://flowerknows.co/cdn/shop/files/1_97dbb452-aaba-449c-a4ec-b5647b99f79e.jpg?v=1755240746&width=3000')`,
                    backgroundColor: '#ebd3d6'
                }}
            >
                <div className="absolute inset-0 bg-[#e8c6ca]/35 pointer-events-none" />

                <div className="relative z-10 text-center px-4">
                    <h1 className="font text-[34px] sm:text-[46px] md:text-[52px] text-[#2c2929] tracking-[1.5px] leading-tight select-none">
                        Refund & Return Policy
                    </h1>
                </div>
            </div>

            {/* 2. ƏSAS BLOKLAR */}
            <div className="w-[90%] max-w-[1100px] mx-auto py-14 md:py-20">

                {/* 4 Ədəd Üst Kart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {POLICY_LINKS.map((item, idx) => {
                        if (item.link) {
                            return (
                                <Link
                                    key={idx}
                                    to={item.link}
                                    className="bg-white border border-[#e5e5e5] hover:border-[#ea9393] p-6 flex items-center justify-between transition-all group shadow-2xs"
                                >
                                    <span className="font text-[15px] sm:text-[16px] text-[#212326] group-hover:text-[#ea9393] transition-colors">
                                        {item.title}
                                    </span>
                                    <HiOutlineChevronRight className="text-[#999] group-hover:text-[#ea9393] text-lg transition-transform group-hover:translate-x-1" />
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setOpenModal(item)}
                                className="bg-white border border-[#e5e5e5] hover:border-[#ea9393] p-6 flex items-center justify-between text-left transition-all group cursor-pointer shadow-2xs"
                            >
                                <span className="font text-[15px] sm:text-[16px] text-[#212326] group-hover:text-[#ea9393] transition-colors">
                                    {item.title}
                                </span>
                                <HiOutlineChevronRight className="text-[#999] group-hover:text-[#ea9393] text-lg transition-transform group-hover:translate-x-1" />
                            </button>
                        );
                    })}
                </div>

                {/* Alt 2 İkonlu Kart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Track Your Order */}
                    <Link
                        to="/pages/international-shipping-policy"
                        className="bg-white border border-[#e5e5e5] hover:border-[#ea9393] py-10 px-6 flex flex-col items-center justify-center text-center transition-all group shadow-2xs"
                    >
                        <TbTruckDelivery className="text-[36px] text-[#333] group-hover:text-[#ea9393] mb-3 transition-colors stroke-[1.4]" />
                        <span className="font text-[16px] text-[#212326] group-hover:text-[#ea9393] transition-colors">
                            Track Your Order
                        </span>
                    </Link>

                    {/* Reward */}
                    <Link
                        to="/pages/membership"
                        className="bg-white border border-[#e5e5e5] hover:border-[#ea9393] py-10 px-6 flex flex-col items-center justify-center text-center transition-all group shadow-2xs"
                    >
                        <PiPlantBold className="text-[34px] text-[#333] group-hover:text-[#ea9393] mb-3 transition-colors" />
                        <span className="font text-[16px] text-[#212326] group-hover:text-[#ea9393] transition-colors">
                            Reward
                        </span>
                    </Link>
                </div>

            </div>

            {/* Məlumat üçün Modal Pop-up */}
            {openModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs"
                    onClick={() => setOpenModal(null)}
                >
                    <div
                        className="bg-white border border-[#fae8e8] max-w-[500px] w-full p-8 rounded-xl shadow-xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font text-[22px] text-[#212326] mb-3">
                            {openModal.title}
                        </h3>
                        <p className="dmsans text-[14px] text-[#666] leading-relaxed mb-6">
                            {openModal.content}
                        </p>
                        <button
                            type="button"
                            onClick={() => setOpenModal(null)}
                            className="w-full py-2.5 bg-[#ea9393] hover:bg-[#d88080] text-white font text-[12px] uppercase tracking-wider rounded-xs transition cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default RefundPolicy;