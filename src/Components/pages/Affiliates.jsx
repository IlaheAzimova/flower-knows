import React from 'react';
import { Link } from 'react-router';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { RiCoinsLine } from 'react-icons/ri';
import { BsFileEarmarkText } from 'react-icons/bs';

const AFFILIATE_STEPS = [
    {
        icon: <HiOutlineMail className="text-[26px] text-[#9c5364]" />,
        title: "Join Us",
        desc: "It's free and easy to join.\n\nGet up and running today."
    },
    {
        icon: <HiOutlineDevicePhoneMobile className="text-[26px] text-[#9c5364]" />,
        title: "Advertise",
        desc: "Choose from our products to advertise to your customers.\n\nWe have simple linking tools to meet your advertising needs and help you monetize"
    },
    {
        icon: <RiCoinsLine className="text-[26px] text-[#9c5364]" />,
        title: "Earn",
        desc: "Get up to 5% in commissions on successful referrals.\n\nEarn commissions from all qualifying purchases, not just the products you advertised."
    },
    {
        icon: <BsFileEarmarkText className="text-[24px] text-[#9c5364]" />,
        title: "Terms & Conditions",
        customContent: (
            <p className="dmsans text-[13px] text-[#6d6666] leading-relaxed">
                Click to know our{' '}
                <Link to="/pages/terms-of-service" className="underline hover:text-[#c98f92] text-[#4d4747]">
                    Affiliate Program Operating Agreement
                </Link>
            </p>
        )
    }
];

function Affiliates() {
    return (
        <div className="w-full bg-white text-[#212326]">

            {/* 1. HERO BANNER */}
            <section
                className="relative w-full min-h-[480px] lg:min-h-[600px] bg-cover bg-center flex items-center justify-center"
                style={{
                    // Rəsmi mələk və çəhrayı lent fonu
                    backgroundImage: `url('https://flowerknows.co/cdn/shop/files/banner_a37afa95-f922-4021-9bf3-6b2dd71b910a.png?v=1663747394&width=1500')`,
                    backgroundColor: '#e7d3d7'
                }}
            >
                {/* Fon üzərində yumşaq pastel qat */}
                <div className="absolute inset-0 bg-[#29171a]/25 pointer-events-none" />

                <div className="relative z-10 w-[90%] max-w-[1140px] mx-auto py-12 flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* Sol: Mətn və Düymələr */}
                    <div className="text-white text-center md:text-left max-w-[500px]">
                        <h1 className="font text-[38px] sm:text-[46px] md:text-[52px] tracking-[1px] leading-tight mb-4 select-none">
                            Share, Refer, Earn
                        </h1>
                        <p className="dmsans text-[14px] sm:text-[15px] leading-relaxed text-white/95 mb-2">
                            From our experience, affiliates usually earn 5%+ commission with every referral.
                        </p>
                        <p className="dmsans text-[14px] sm:text-[15px] leading-relaxed text-white/90 mb-8">
                            Start today and unlock your earning potential!
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <Link
                                to="/account/login"
                                className="w-[140px] sm:w-[155px] py-3 bg-white text-[#212326] hover:bg-white/90 text-center font text-[12px] uppercase tracking-[2.5px] font-semibold transition shadow-xs"
                            >
                                Join Now
                            </Link>
                            <Link
                                to="/account/login"
                                className="w-[140px] sm:w-[155px] py-3 bg-white text-[#212326] hover:bg-white/90 text-center font text-[12px] uppercase tracking-[2.5px] font-semibold transition shadow-xs"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Sağ: QR Kod Kartı */}
                    <div className="flex flex-col items-center">
                        <p className="font text-white text-[15px] sm:text-[16px] tracking-[0.5px] mb-3 text-center drop-shadow-sm">
                            Or scan the QR code to join
                        </p>
                        <div className="bg-white p-4 sm:p-5 rounded-md shadow-lg flex items-center justify-center">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://flowerknows.co/pages/affiliates"
                                alt="Scan QR Code to join affiliate program"
                                className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] object-contain"
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* 2. ADVERTISE / STEPS BÖLMƏSİ */}
            <section className="w-[90%] max-w-[1140px] mx-auto py-16 md:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-center">
                    {AFFILIATE_STEPS.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            {/* Dairəvi İkon Çərçivəsi */}
                            <div className="w-14 h-14 rounded-full bg-[#faecee] flex items-center justify-center mb-5">
                                {step.icon}
                            </div>

                            {/* Başlıq */}
                            <h3 className="font text-[19px] sm:text-[20px] text-[#212326] tracking-[0.5px] mb-3">
                                {step.title}
                            </h3>

                            {/* Məzmun */}
                            {step.customContent ? (
                                step.customContent
                            ) : (
                                <p className="dmsans text-[13px] text-[#6d6666] leading-relaxed whitespace-pre-line">
                                    {step.desc}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Affiliates;