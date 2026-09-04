import React from 'react';
import { Link } from 'react-router';
import { FiCheck } from 'react-icons/fi';
import {
    HiOutlineShoppingBag,
    HiOutlineUser,
    HiOutlineCake,
    HiOutlineMail,
    HiOutlineSpeakerphone
} from 'react-icons/hi';

const TIERS_DATA = [
    { name: "Seed", spend: "$0", rate: "5", offers: true, earlyAccess: false, gift: "" },
    { name: "Seedling", spend: "$100", rate: "5", offers: true, earlyAccess: true, gift: "$10 OFF Code" },
    { name: "Bud", spend: "$400", rate: "6", offers: true, earlyAccess: true, gift: "$20 OFF Code" },
    { name: "Flower", spend: "$700", rate: "8", offers: true, earlyAccess: true, gift: "$50 OFF Code" },
];

const EARN_POINTS_CARDS = [
    {
        icon: <HiOutlineShoppingBag className="text-4xl text-[#ea9393]" />,
        title: "Make a purchase",
        desc: "5 points per $1"
    },
    {
        icon: <HiOutlineUser className="text-4xl text-[#ea9393]" />,
        title: "Create an account",
        desc: "100 points"
    },
    {
        icon: <HiOutlineCake className="text-4xl text-[#ea9393]" />,
        title: "Happy Birthday",
        desc: "100 points"
    },
    {
        icon: <HiOutlineMail className="text-4xl text-[#ea9393]" />,
        title: "Subscribe Newsletter",
        desc: "100 points"
    },
    {
        icon: <HiOutlineSpeakerphone className="text-4xl text-[#ea9393]" />,
        title: "Refer friends",
        desc: "500 points"
    }
];

function Membership() {
    return (
        <div className="w-full bg-white text-[#212326]">

            {/* 1. HERO BANNER BÖLMƏSİ (RESPONSIVE) */}
            <div>
                {/* ŞƏKİL: Mobildə ayrıca şəkil kimi açılır, Desktop-da arxa fon olur */}
                <div className="md:hidden w-full h-[380px] bg-[#3a060a] overflow-hidden">
                    <img
                        src="//flowerknows.co/cdn/shop/files/1_1_bbb74d52-55ec-4cc9-acd0-a09b40bca6db.jpg?v=1784182180&width=352 352w, //flowerknows.co/cdn/shop/files/1_1_bbb74d52-55ec-4cc9-acd0-a09b40bca6db.jpg?v=1784182180&width=832 832w, //flowerknows.co/cdn/shop/files/1_1_bbb74d52-55ec-4cc9-acd0-a09b40bca6db.jpg?v=1784182180&width=1200 1200w, //flowerknows.co/cdn/shop/files/1_1_bbb74d52-55ec-4cc9-acd0-a09b40bca6db.jpg?v=1784182180&width=1500 1500w"
                        alt="Flower Knows Loyalty"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* DESKTOP HERO (Böyük ekranda şəkil arxada qalır) */}
                <div
                    className="hidden md:flex relative w-full h-[700px] bg-cover bg-center items-center justify-center "
                    style={{
                        backgroundImage: `url('https://flowerknows.co/cdn/shop/files/20250811-165826.jpg?v=1754902804&width=1500')`,
                        backgroundColor: '#3a060a'
                    }}
                >
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                    <div className="relative z-10 text-center px-4 max-w-[800px] text-white">
                        <h1 className="font text-[48px] tracking-[1px] leading-tight mb-4">
                            Flower Knows Loyalty Program
                        </h1>
                        <p className="text-[13px] tracking-[0.5px] text-white/90 mb-3">
                            Limited-Time: Redeem Rewards for Fewer Points--Higher tiers unlock bigger point savings
                        </p>
                        <p className="font text-[15px] tracking-[0.5px] text-white/95 mb-8 max-w-[620px] mx-auto">
                            Join Flower Knows Loyalty Program and get rewarded while you shop. You'll get <span className="font-bold">100 points</span> for signing up. What are you waiting for?
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Link
                                to="/account/login"
                                className="w-[150px] py-3 bg-[#e8989a] hover:bg-[#d97c7e] text-white text-[12px] font tracking-[2px] uppercase transition text-center shadow-xs"
                            >
                                Join Now
                            </Link>
                            <Link
                                to="/account/login"
                                className="w-[150px] py-3 bg-[#e8989a] hover:bg-[#d97c7e] text-white text-[12px] font tracking-[2px] uppercase transition text-center shadow-xs"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>

                {/* MOBİL MƏTN HİSSƏSİ (Şəkildəki kimi ağ fonda) */}
                <div className="md:hidden px-6 py-10 text-center bg-white">
                    <h1 className="font text-[28px] sm:text-[34px] tracking-[0.5px] text-[#212326] leading-snug mb-4">
                        Flower Knows Loyalty<br />Program
                    </h1>
                    <p className="dmsans text-[12px] text-[#555] leading-relaxed mb-4 px-2">
                        Limited-Time: Redeem Rewards for Fewer Points--Higher tiers unlock bigger point savings
                    </p>
                    <p className="font text-[14px] text-[#333] leading-relaxed mb-8 px-1">
                        Join Flower Knows Loyalty Program and get rewarded while you shop. You'll get <span className="font-bold">100 points</span> for signing up. What are you waiting for?
                    </p>

                    <div className="flex items-center justify-center gap-3">
                        <Link
                            to="/account/login"
                            className="flex-1 py-3 bg-[#e8989a] text-white text-[12px] font uppercase tracking-[2px] rounded-sm text-center"
                        >
                            Join Now
                        </Link>
                        <Link
                            to="/account/login"
                            className="flex-1 py-3 bg-[#e8989a] text-white text-[12px] font uppercase tracking-[2px] rounded-sm text-center"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-10 md:py-16">

                {/* 2. PROGRESS BAR */}
                <div className="text-center mb-16">
                    <Link to="/account/login" className="underline text-[12px] md:text-[13px] text-[#666] hover:text-[#e8989a] transition inline-block mb-8">
                        Log in
                    </Link>
                    <span className="text-[12px] md:text-[13px] text-[#666]"> to see your tier progress</span>

                    <div className="relative max-w-[650px] mx-auto mt-2 px-2">
                        <div className="absolute top-[8px] left-6 right-6 h-[4px] bg-[#f0f0f0] -z-0 rounded-full" />

                        <div className="flex justify-between items-center relative z-10">
                            {TIERS_DATA.map((t, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-[#e8989a]' : 'bg-[#e8e8e8]'}`} />
                                    <span className="text-[11px] text-[#888] mt-3 font">{t.spend}</span>
                                    <span className="text-[13px] font text-[#212326] font-medium">{t.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. TIERS BAŞLIQ */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[1px] bg-[#f3d3d5] w-20 sm:w-36" />
                    <h2 className="font text-[22px] sm:text-[26px] tracking-[3px] text-[#e8989a] uppercase">
                        Tiers
                    </h2>
                    <div className="h-[1px] bg-[#f3d3d5] w-20 sm:w-36" />
                </div>

                {/* TIERS CƏDVƏLİ */}
                <div className="bg-[#fff9f9] border border-[#fae8e8] rounded-2xl p-4 sm:p-8 mb-20 overflow-x-auto shadow-2xs">
                    <table className="w-full min-w-[580px] text-center border-collapse">
                        <thead>
                            <tr className="border-b border-[#fae4e5]">
                                <th className="text-left font text-[13px] text-[#666] pb-5 font-normal">Tiers</th>
                                {TIERS_DATA.map((t, idx) => (
                                    <th key={idx} className="pb-5 font-normal">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xl mb-1 text-[#e8989a]">
                                                {idx === 0 && "🌱"}
                                                {idx === 1 && "🌿"}
                                                {idx === 2 && "🌷"}
                                                {idx === 3 && "🌸"}
                                            </span>
                                            <span className="font text-[13px] text-[#333]">{t.name}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#fae8e8] text-[13px] font">
                            <tr>
                                <td className="text-left py-3.5 text-[#555]">Points per $1 spent</td>
                                {TIERS_DATA.map((t, idx) => (
                                    <td key={idx} className="py-3.5 text-[#444] font-medium">{t.rate}</td>
                                ))}
                            </tr>
                            <tr className="bg-[#fff4f5]/40">
                                <td className="text-left py-3.5 text-[#555]">Exclusive Member Offers</td>
                                {TIERS_DATA.map((t, idx) => (
                                    <td key={idx} className="py-3.5">
                                        {t.offers && <FiCheck className="mx-auto text-[#e8989a] text-[16px]" />}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="text-left py-3.5 text-[#555]">Early Access To Sales</td>
                                {TIERS_DATA.map((t, idx) => (
                                    <td key={idx} className="py-3.5">
                                        {t.earlyAccess && <FiCheck className="mx-auto text-[#e8989a] text-[16px]" />}
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-[#fff4f5]/40">
                                <td className="text-left py-3.5 text-[#555]">Upgrade Gifts</td>
                                {TIERS_DATA.map((t, idx) => (
                                    <td key={idx} className="py-3.5 text-[#333] font-medium text-[12px]">
                                        {t.gift || "—"}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. EARN POINTS BAŞLIQ */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[1px] bg-[#f3d3d5] w-20 sm:w-36" />
                    <h2 className="font text-[22px] sm:text-[26px] tracking-[3px] text-[#e8989a] uppercase">
                        Earn Points
                    </h2>
                    <div className="h-[1px] bg-[#f3d3d5] w-20 sm:w-36" />
                </div>

                {/* EARN POINTS KARTLARI */}
                <div className="bg-[#fff9f9] border border-[#fae8e8] rounded-2xl p-4 sm:p-6 mb-20 shadow-2xs">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                        {EARN_POINTS_CARDS.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl border border-[#fae8e8] p-4 flex flex-col items-center justify-center text-center h-[170px] shadow-xs"
                            >
                                <div className="mb-3">
                                    {card.icon}
                                </div>
                                <h3 className="font text-[13px] text-[#333] mb-1 leading-snug">
                                    {card.title}
                                </h3>
                                <p className="text-[12px] text-[#888] font">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Membership;