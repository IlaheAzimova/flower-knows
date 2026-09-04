import React, { useState } from 'react';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Sadə və təmiz submit
        setSubmitted(true);
    };

    return (
        <div className="w-full bg-white text-[#212326] min-h-screen">

            {/* 1. HERO BANNER */}
            <div
                className="relative w-full h-[110px] sm:h-[100px] md:h-[405px] bg-[#fae8eb] bg-cover bg-center flex items-center justify-center  border-b border-[#ebd3d7]"
                style={{
                    // Rəsmi naxışlı fon və ya layihəndəki çəhrayı fon
                    backgroundImage: `url('https://flowerknows.co/cdn/shop/files/1_c2861a1e-c7df-4fc7-85ca-ded06d2c35d9.png?v=1694594473&width=1500')`,

                }}
            >
                {/* Vintage overlay */}
                <div className="absolute inset-0 bg-[#fdeef0]/60 pointer-events-none" />

                <div className="relative z-10 text-center px-4">
                    <h1 className="font text-[38px] sm:text-[48px] md:text-[54px] text-[#86a7c4] tracking-[1.5px] select-none drop-shadow-xs">
                        Contact Us
                    </h1>
                </div>
            </div>

            {/* 2. FORMA VƏ DƏSTƏK BLOKU */}
            <div className="w-[90%] max-w-[1140px] mx-auto py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Sol: Əlaqə Forması */}
                    <div className="lg:col-span-7">
                        <h2 className="font text-[22px] sm:text-[24px] text-[#212326] tracking-[2px] uppercase mb-8">
                            Contact Us
                        </h2>

                        {submitted ? (
                            <div className="p-6 bg-[#fff7f8] border border-[#f3cfd2] rounded-xs text-[#212326] space-y-2">
                                <h3 className="font text-[18px] text-[#c98f92]">Thank you!</h3>
                                <p className="dmsans text-[13px] text-[#666]">
                                    Your message has been sent. We will get back to you within 3 business days.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-[#e8b5b8] bg-white px-4 py-3 text-[13px] text-[#333] placeholder-[#888] outline-none focus:border-[#c97a7e] transition rounded-xs"
                                    />
                                </div>

                                <div>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-[#e8b5b8] bg-white px-4 py-3 text-[13px] text-[#333] placeholder-[#888] outline-none focus:border-[#c97a7e] transition rounded-xs"
                                    />
                                </div>

                                <div>
                                    <textarea
                                        required
                                        rows={6}
                                        name="comment"
                                        placeholder="Comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        className="w-full border border-[#e8b5b8] bg-white px-4 py-3 text-[13px] text-[#333] placeholder-[#888] outline-none focus:border-[#c97a7e] transition rounded-xs resize-none"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="px-10 py-3.5 bg-[#e8989a] hover:bg-[#d97f82] text-white font text-[12px] uppercase tracking-[2.5px] font-semibold transition cursor-pointer shadow-2xs rounded-xs"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Sağ: Customer & PR Support */}
                    <div className="lg:col-span-5 space-y-10 lg:pl-6">

                        {/* Customer Support */}
                        <div>
                            <h3 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[0.5px] mb-3">
                                Customer Support
                            </h3>
                            <p className="dmsans text-[13px] text-[#555] leading-relaxed">
                                Please send emails to{' '}
                                <a href="mailto:support@flowerknows.co" className="underline hover:text-[#c98f92] text-[#333]">
                                    support@flowerknows.co
                                </a>{' '}
                                or submit the form, we will reply within 3 business days.
                            </p>
                        </div>

                        {/* PR Support */}
                        <div>
                            <h3 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[0.5px] mb-3">
                                PR Support
                            </h3>
                            <p className="dmsans text-[13px] text-[#555] leading-relaxed">
                                You can send your PR proposal and the social media link to{' '}
                                <a href="mailto:creatorpr@flowerknows.co" className="underline hover:text-[#c98f92] text-[#333]">
                                    creatorpr@flowerknows.co
                                </a>
                                , we are happy to receive your beautiful shows.
                            </p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default ContactUs;