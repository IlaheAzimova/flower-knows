import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';

// 1. Çatdırılma Bölgələri və Cədvəllər
const SHIPPING_REGIONS = [
    {
        id: 'africa',
        title: 'AFRICA',
        type: 'table',
        headers: ['Country', 'Delivery Time', 'Shipping Cost'],
        rows: [
            ['South Africa', '10-14 business days', '$20']
        ]
    },
    {
        id: 'asia-middle-east',
        title: 'ASIA & MIDDLE EAST',
        type: 'table',
        headers: ['Country', 'Delivery Time', 'Shipping Cost'],
        rows: [
            ['Japan, the Philippines, Singapore', '6-8 business days', '$10'],
            ['Vietnam', '6-8 business days', '$15'],
            ['Thailand', '6-8 business days', '$20'],
            ['South Korea', '6-10 business days', '$5'],
            ['India, Malaysia', '8-12 business days', '$15'],
            ['Oman', '8-12 business days', '$20'],
            ['United Arab Emirates', '8-15 business days', '$8'],
            ['Bahrain, Kuwait, Qatar, Saudi Arabia', '8-15 business days', '$15']
        ]
    },
    {
        id: 'europe',
        title: 'EUROPE',
        type: 'table',
        headers: ['Country', 'Delivery Time', 'Shipping Cost'],
        rows: [
            ['United Kingdom', '6-12 business days', '$15'],
            ['Austria, Czechia, Estonia, France, Germany, Greece, Italy, Lithuania, Luxembourg, Poland, Slovenia, Spain, Sweden', '6-12 business days', '$10'],
            ['Denmark', '6-12 business days', '$12'],
            ['Belgium, Bulgaria, Finland, Hungary, Latvia, Netherlands, Portugal, Romania, Switzerland', '6-12 business days', '$15'],
            ['Ireland', '6-10 business days', '$18'],
            ['Croatia, Slovakia', '6-12 business days', '$20'],
            ['Cyprus', '6-10 business days', '$25'],
            ['Norway', '10-20 business days', '$10'],
            ['Ukraine', '10-15 business days', '$20'],
            ['Malta', '10-15 business days', '$30'],
            ['Russia', '18-25 business days', '$10']
        ]
    },
    {
        id: 'north-south-america',
        title: 'NORTH & SOUTH AMERICA',
        type: 'table',
        note: 'Attention: Most U.S. orders are shipped from our U.S. warehouse for quick delivery. If any item in your order is temporarily out of stock, it will be shipped from our China warehouse, with an estimated delivery time of 8–15 business days.',
        headers: ['Country', 'Delivery Time', 'Shipping Cost'],
        rows: [
            ['United States', '2-5 business days', '$8'],
            ['Canada', '8-15 business days', '$15'],
            ['Chile', '10-15 business days', '$15'],
            ['Mexico', '10-20 business days', '$10'],
            ['Colombia', '10-20 business days', '$20']
        ]
    },
    {
        id: 'oceania',
        title: 'OCEANIA',
        type: 'table',
        headers: ['Country', 'Delivery Time', 'Shipping Cost'],
        rows: [
            ['Australia', '6-12 business days', '$10'],
            ['New Zealand', '6-12 business days', '$18']
        ]
    },
    {
        id: 'shipping-exclusions',
        title: 'SHIPPING EXCLUSIONS',
        type: 'exclusions',
        items: [
            { country: 'France', areas: 'Armées, Guadeloupe, Hub Armées, Ile de la réunion, Moule, Remire-Montjoly' },
            { country: 'Germany', areas: 'APO, DPO, FPO, Busingen' },
            { country: 'Italy', areas: 'Campione D\'Italia, Livigno, San Marino, Vatican City' },
            { country: 'United States', areas: 'AA, AE, Air Force Post Office, AK, Alaska, AP, Armed Forces Americas, Armed Forces Europe, Armed Forces Pacific Fleet Post Office, GU, Guam, Hawaii, HI, Puerto Rico' },
            { country: 'Spain', areas: 'Areas with postal codes starting with 51 / 52 / 35 / 38 / 07' },
            { country: 'Portugal', areas: 'Located on the island' }
        ]
    }
];

// 2. Vergilər (Taxes) Məlumatları
const TAX_REGIONS = [
    {
        id: 'tax-us',
        title: 'UNITED STATES',
        type: 'text',
        paragraphs: [
            'Orders from Flower Knows Official Store are subject to sales tax based on the shipping address, as per federal and state laws. The tax amount depends on the products and delivery location.',
            'Please note that once placed, orders cannot be altered due to varying tax rates among US states and cities.'
        ]
    },
    {
        id: 'tax-eu',
        title: 'EU COUNTRIES',
        type: 'text',
        paragraphs: [
            'Orders shipped to European countries are subject to tax. The exact tax amount is calculated based on the product category, HS (Harmonized System) code, and destination country\'s tax regulations. The final tax amount will be determined accordingly.'
        ]
    },
    {
        id: 'tax-latam',
        title: 'MEXICO & COLOMBIA',
        type: 'text',
        paragraphs: [
            'Orders shipped to Mexico from Flower Knows Official Store are subject to a 25% tax.',
            'Orders shipped to Colombia from Flower Knows Official Store are subject to a 10% tax.'
        ]
    },
    {
        id: 'tax-asia',
        title: 'ASIA COUNTRIES',
        type: 'tax-table',
        headers: ['Country', 'Tax Rate'],
        rows: [
            ['Kuwait, Oman, United Arab Emirates', '5%'],
            ['Thailand', '7%'],
            ['Bahrain, Vietnam', '10%'],
            ['Saudi Arabia', '15%']
        ],
        footerText: 'Orders shipped to part of Middle East from Flower Knows Official Store are subject to tax. The specific tax rates are as shown in the table.'
    },
    {
        id: 'tax-other',
        title: 'OTHER COUNTRIES',
        type: 'text',
        paragraphs: [
            'For other international shipments, all fees are included in our shipping costs—no additional charges.',
            'If you\'re taxed on delivery, email us at support@flowerknows.co for a refund.'
        ]
    },
    {
        id: 'tax-customs',
        title: 'EXTRA CUSTOMS INSPECTION & DUTIES',
        type: 'text',
        paragraphs: [
            'In rare cases, packages may be selected for customs inspection by local authorities. If this occurs, you may be required to pay applicable duties, taxes, or customs clearance fees requested by their local customs office. The exact amount is determined by the customs authorities at the time of inspection.',
            'If you have any questions, please feel free to contact our support team at support@flowerknows.co.'
        ]
    }
];

function ShippingPolicy() {
    // Default olaraq hamısı bağlı olur (və ya istəsən birbaşa açıq qoya bilərsən)
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (id) => {
        setOpenSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="w-full bg-white text-[#212326]">

            {/* 1. HERO BANNER */}
            <div
                className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] bg-cover bg-center flex items-center justify-center object-cover  "
                style={{
                    backgroundImage: `url('https://flowerknows.co/cdn/shop/files/2_adea6d4d-e41d-409a-815b-19297ba19aec.png?v=1725007038&width=3000')`,
                    backgroundColor: '#e7c6cb'
                }}
            >
                <div className="absolute inset-0 bg-[#deb9bd]/40 pointer-events-none" />

                <div className="relative z-10 text-center px-4">
                    <h1 className="font text-[38px] sm:text-[48px] md:text-[56px] text-white tracking-[2px] leading-tight select-none">
                        Shipping<br />Policy
                    </h1>
                </div>
            </div>

            {/* 2. ƏSAS MƏZMUN */}
            <div className="w-[90%] max-w-[900px] mx-auto py-12 md:py-16 text-[#3b3836]">

                {/* Sifariş Məlumatı */}
                <div className="text-center dmsans text-[13px] sm:text-[14px] text-[#555] leading-relaxed mb-16 space-y-2 max-w-[760px] mx-auto">
                    <p>
                        At Flower Knows, we accept orders 24/7. Orders are processed within 24 hours and usually ship in 3–4 business days.
                    </p>
                    <p>
                        High volume may cause slight delays. Weekend orders start processing on the next business day.
                    </p>
                </div>

                {/* AVAILABLE SHIPPING AREAS */}
                <section className="mb-20">
                    <h2 className="font text-[28px] sm:text-[34px] text-center text-[#212326] tracking-[1px] mb-10">
                        Available Shipping Areas
                    </h2>

                    <div className="space-y-6">
                        {SHIPPING_REGIONS.map((region) => {
                            const isOpen = openSections[region.id];
                            return (
                                <div key={region.id} className="border-b border-[#f4e4e6] pb-6">
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(region.id)}
                                        className="w-full flex items-center gap-4 text-left group cursor-pointer"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#3b3836] text-white flex items-center justify-center text-xs shrink-0 transition-transform">
                                            {isOpen ? <HiOutlineMinus size={11} /> : <HiOutlinePlus size={11} />}
                                        </span>
                                        <span className="font text-[12px] sm:text-[13px] tracking-[2px] uppercase text-[#333] group-hover:text-[#ea9393] transition">
                                            {region.title}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="mt-4 overflow-x-auto">
                                            {region.type === 'table' && (
                                                <>
                                                    <table className="w-full border-collapse text-left dmsans text-[13px] border border-[#f5e6e8]">
                                                        <thead>
                                                            <tr className="bg-[#fcf1f2] border-b border-[#f5e6e8]">
                                                                {region.headers.map((h, i) => (
                                                                    <th key={i} className="py-3 px-4 font text-[13px] text-[#333] font-medium">
                                                                        {h}
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-[#f9ecee]">
                                                            {region.rows.map((row, rIdx) => (
                                                                <tr key={rIdx} className="hover:bg-[#fff9f9]">
                                                                    {row.map((cell, cIdx) => (
                                                                        <td key={cIdx} className="py-3 px-4 text-[#555]">
                                                                            {cell}
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                    {region.note && (
                                                        <p className="dmsans text-[12px] sm:text-[13px] text-[#666] leading-relaxed mt-4">
                                                            {region.note}
                                                        </p>
                                                    )}
                                                </>
                                            )}

                                            {region.type === 'exclusions' && (
                                                <div className="dmsans text-[13px] text-[#555] space-y-3.5 pl-2">
                                                    {region.items.map((item, i) => (
                                                        <div key={i}>
                                                            <p className="font-semibold text-[#333] mb-0.5">• {item.country}</p>
                                                            <p className="text-[#666] pl-3 leading-relaxed">{item.areas}</p>
                                                        </div>
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

                {/* SHIPPING FEE */}
                <section className="mb-20">
                    <h2 className="font text-[22px] sm:text-[24px] text-[#212326] tracking-[0.5px] mb-4">
                        Shipping Fee
                    </h2>
                    <div className="dmsans text-[13px] sm:text-[14px] text-[#555] space-y-2.5 leading-relaxed">
                        <p>Free shipping on non-U.S. orders over $100+.</p>
                        <p>Free ground shipping on U.S. orders over $100+.</p>
                        <p>Shipping costs for others shown at checkout.</p>
                        <p className="pt-2 text-[13px] text-[#333] font-medium">
                            * Perfumes are not included in free shipping and need a shipping fee separately ($20 for international orders and $8 for US orders).
                        </p>
                    </div>
                </section>

                {/* TAXES */}
                <section className="mb-20">
                    <h2 className="font text-[28px] sm:text-[34px] text-center text-[#212326] tracking-[1px] mb-10">
                        Taxes
                    </h2>

                    <div className="space-y-6">
                        {TAX_REGIONS.map((tax) => {
                            const isOpen = openSections[tax.id];
                            return (
                                <div key={tax.id} className="border-b border-[#f4e4e6] pb-6">
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(tax.id)}
                                        className="w-full flex items-center gap-4 text-left group cursor-pointer"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#3b3836] text-white flex items-center justify-center text-xs shrink-0 transition-transform">
                                            {isOpen ? <HiOutlineMinus size={11} /> : <HiOutlinePlus size={11} />}
                                        </span>
                                        <span className="font text-[12px] sm:text-[13px] tracking-[2px] uppercase text-[#333] group-hover:text-[#ea9393] transition">
                                            {tax.title}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="mt-4">
                                            {tax.type === 'text' && (
                                                <div className="dmsans text-[13px] sm:text-[14px] text-[#666] leading-relaxed space-y-3 pl-1">
                                                    {tax.paragraphs.map((p, pIdx) => (
                                                        <p key={pIdx}>{p}</p>
                                                    ))}
                                                </div>
                                            )}

                                            {tax.type === 'tax-table' && (
                                                <>
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full border-collapse text-left dmsans text-[13px] border border-[#f5e6e8]">
                                                            <thead>
                                                                <tr className="bg-[#fcf1f2] border-b border-[#f5e6e8]">
                                                                    {tax.headers.map((h, i) => (
                                                                        <th key={i} className="py-3 px-4 font text-[13px] text-[#333] font-medium">
                                                                            {h}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-[#f9ecee]">
                                                                {tax.rows.map((row, rIdx) => (
                                                                    <tr key={rIdx} className="hover:bg-[#fff9f9]">
                                                                        {row.map((cell, cIdx) => (
                                                                            <td key={cIdx} className="py-3 px-4 text-[#555]">
                                                                                {cell}
                                                                            </td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <p className="dmsans text-[12px] sm:text-[13px] text-[#666] leading-relaxed mt-4">
                                                        {tax.footerText}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ORDER NEVER ARRIVED */}
                <section>
                    <h2 className="font text-[20px] sm:text-[22px] text-[#212326] tracking-[0.5px] mb-3">
                        Order Never Arrived / Lost / Stolen Shipments
                    </h2>
                    <div className="dmsans text-[13px] sm:text-[14px] text-[#555] space-y-3 leading-relaxed">
                        <p>
                            Flower Knows Official cannot be held responsible for lost shipments. Should this occur, kindly reach out to us at{' '}
                            <a href="mailto:support@flowerknows.co" className="underline hover:text-[#ea9393] text-[#333]">
                                support@flowerknows.co
                            </a>
                            , and we will promptly file a claim on your behalf. Additionally, contacting local authorities is recommended.
                        </p>
                        <p>
                            The international claims process can take 30–45 business days. Refer to our Return Policy for full details.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default ShippingPolicy;