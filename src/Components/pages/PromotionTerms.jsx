import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';

const LIMITED_TIME_PROMOTIONS = [
    {
        id: 'free-gifts-offer',
        title: 'FREE GIFTS OFFER',
        items: [
            'Spend $50+, get a Melody Headband',
            'Spend $80+, get a random full-size product'
        ],
        notes: [
            '* The amount of Worry-Free Purchase, taxes and shipping fee will not be included in the qualifying spend for gifts.',
            '* If applying any other discount code at checkout causes the order total to fall below the required amount, the corresponding free gift will be automatically removed after payment.',
            '* Offer is valid from August 28 at 00:00 to September 2 at 11:59 pm on Flower Knows Official Online Store.',
            '* Flower Knows reserve the right to withdraw this offer at any time'
        ]
    }
];

const LONG_TERM_PROMOTIONS = [
    {
        id: 'gift-set-discount',
        title: 'GIFT SET - UP TO 40% OFF',
        items: [
            'Offer is valid on Flower Knows Official Online Store Only',
            'Different Gift Sets enjoy different discounts',
            'Flower Knows reserve the right to withdraw this offer at any time'
        ]
    },
    {
        id: 'us-sms-offer',
        title: 'US ONLY - 15% OFF FOR FIRST-TIME SMS SUBSCRIBERS',
        items: [
            'Offer is valid on Flower Knows Official Online Store Only',
            'This offer is open to US customers who subscribe to Flower Knows SMS marketing for the first time',
            'Eligible US customers will get a unique 15% off discount code via SMS, no minimum order amount requirement',
            'The discount code will be valid for 30 days from the date of issue',
            'The code can only be used for a single transaction and cannot be combined with any other discount codes, promotions, or offers',
            'The discount code is non-transferable and cannot be exchanged for cash or any other alternative',
            'Flower Knows reserve the right to withdraw this offer at any time'
        ]
    },
    {
        id: 'free-shipping-promo',
        title: 'FREE SHIPPING',
        items: [
            'Offer is valid on Flower Knows Official Online Store Only',
            'If total value exceeds $100 for the US or exceeds $100 for other regions, the discount will be automatically applied at checkout',
            'Perfumes are not included in free shipping and need $20 for shipping separately',
            'This offer can combine with other offers',
            'Flower Knows reserve the right to withdraw this offer at any time'
        ]
    }
];

function PromotionTerms() {
    // Hansı bölmələrin açıq olduğunu saxlayan state
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (id) => {
        setOpenSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="w-full bg-white text-[#212326] min-h-[70vh] py-14 md:py-24">
            <div className="w-[90%] max-w-[850px] mx-auto">

                {/* 1. LIMITED-TIME PROMOTIONS */}
                <section className="mb-20">
                    <h1 className="font text-[28px] sm:text-[34px] text-center text-[#212326] tracking-[0.5px] mb-12">
                        Limited-time Promotions
                    </h1>

                    <div className="space-y-6">
                        {LIMITED_TIME_PROMOTIONS.map((promo) => {
                            const isOpen = openSections[promo.id];
                            return (
                                <div key={promo.id} className="border-b border-[#f4e4e6] pb-6">
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(promo.id)}
                                        className="w-full flex items-center gap-4 text-left group cursor-pointer"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#2c2929] text-white flex items-center justify-center text-xs shrink-0 transition-transform">
                                            {isOpen ? <HiOutlineMinus size={11} /> : <HiOutlinePlus size={11} />}
                                        </span>
                                        <span className="font text-[12px] sm:text-[13px] tracking-[2px] uppercase text-[#333] group-hover:text-[#ea9393] transition">
                                            {promo.title}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="mt-5 pl-10 pr-2 dmsans text-[13px] text-[#555] space-y-3 leading-relaxed">
                                            <ul className="space-y-2">
                                                {promo.items.map((it, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-[#333] text-sm">•</span>
                                                        <span>{it}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {promo.notes && (
                                                <div className="pt-3 space-y-2 text-[#666]">
                                                    {promo.notes.map((note, idx) => (
                                                        <p key={idx}>{note}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 2. LONG-TERM PROMOTIONS */}
                <section>
                    <h2 className="font text-[28px] sm:text-[34px] text-center text-[#212326] tracking-[0.5px] mb-12">
                        Long-term Promotions
                    </h2>

                    <div className="space-y-6">
                        {LONG_TERM_PROMOTIONS.map((promo) => {
                            const isOpen = openSections[promo.id];
                            return (
                                <div key={promo.id} className="border-b border-[#f4e4e6] pb-6">
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(promo.id)}
                                        className="w-full flex items-center gap-4 text-left group cursor-pointer"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#2c2929] text-white flex items-center justify-center text-xs shrink-0 transition-transform">
                                            {isOpen ? <HiOutlineMinus size={11} /> : <HiOutlinePlus size={11} />}
                                        </span>
                                        <span className="font text-[12px] sm:text-[13px] tracking-[2px] uppercase text-[#333] group-hover:text-[#ea9393] transition">
                                            {promo.title}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="mt-5 pl-10 pr-2 dmsans text-[13px] text-[#555] leading-relaxed">
                                            <ul className="space-y-2.5">
                                                {promo.items.map((it, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-[#333] text-sm">•</span>
                                                        <span>{it}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
    );
}

export default PromotionTerms;