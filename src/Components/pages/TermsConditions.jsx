import React from 'react';
import { Link } from 'react-router';

function TermsConditions() {
    return (
        <div className="w-full bg-white text-[#212326]">

            {/* 1. HERO BANNER */}
            <div
                className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] bg-cover bg-center flex items-center justify-center "
                style={{
                    backgroundImage: `url('https://flowerknows.co/cdn/shop/files/2_bfdbc16b-1361-4f0e-a56d-32f233df815a.png?v=1684921254&width=3000')`,
                    backgroundColor: '#e7c6cb'
                }}
            >
                <div className="absolute inset-0 bg-[#deb9bd]/40 pointer-events-none" />

                <div className="relative z-10 text-center px-4">
                    <h1 className="font text-[38px] sm:text-[48px] md:text-[56px] text-white tracking-[2px] leading-tight select-none">
                        Terms & Conditions
                    </h1>
                </div>
            </div>

            {/* 2. MƏZMUN BÖLMƏSİ */}
            <div className="w-[90%] max-w-[850px] mx-auto py-14 md:py-20 text-[#444] dmsans text-[13px] sm:text-[14px] leading-relaxed space-y-8">

                {/* Acceptance of the Terms and Conditions */}
                <section className="space-y-4">
                    <h2 className="font text-[22px] sm:text-[26px] text-[#212326] tracking-[0.5px]">
                        Acceptance of the Terms and Conditions
                    </h2>
                    <p>
                        This website is operated by Flower Knows. These terms and conditions are entered into by and between you and Hangzhou Flower Knows Electronic Commerce co., Ltd. (“Company,” “we,” or “us”). Flower Knows offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                    </p>
                    <p>
                        By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service” or “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, whether as a guest or a registered user, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                    </p>
                    <p>
                        Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the website, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                    </p>
                    <p>
                        Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes. You are expected to check this page from time to time so you are aware of any changes, as they are binding on you.
                    </p>
                    <p>
                        Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.
                    </p>
                    <p>
                        Your submission of personal information through the store is governed by our Privacy Policy. To view our{' '}
                        <Link to="/pages/privacy-policy" className="underline hover:text-[#ea9393] text-[#212326]">
                            Privacy Policy
                        </Link>.
                    </p>
                </section>

                {/* SECTION 1 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 1 - ONLINE STORE TERMS
                    </h2>
                    <p>
                        You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature.
                    </p>
                    <p>
                        A breach or violation of any of the Terms will result in an immediate termination of your Services.
                    </p>
                </section>

                {/* SECTION 2 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 2 - GENERAL CONDITIONS
                    </h2>
                    <p>
                        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
                    </p>
                    <p>
                        You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                    </p>
                    <p>
                        We reserve the right to withdraw or amend this website, and any service or material we provide on the website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the website is unavailable at any time or for any period.
                    </p>
                    <p>You are responsible for both:</p>
                    <ul className="list-disc pl-5 space-y-1 text-[#555]">
                        <li>Making all arrangements necessary for you to have access to the website.</li>
                        <li>Ensuring that all persons who access the website through your internet connection are aware of these Terms of Service and comply with them.</li>
                    </ul>
                    <p>
                        If you choose, or are provided with, a username, password, or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity.
                    </p>
                </section>

                {/* SECTION 3 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
                    </h2>
                    <p>
                        We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.
                    </p>
                    <p>
                        This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only.
                    </p>
                </section>

                {/* SECTION 4 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
                    </h2>
                    <p>
                        Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                    </p>
                    <p>
                        We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                    </p>
                </section>

                {/* SECTION 5 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 5 - PRODUCTS OR SERVICES (if applicable)
                    </h2>
                    <p>
                        Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to our{' '}
                        <Link to="/pages/return-policy" className="underline hover:text-[#ea9393] text-[#212326]">
                            Refund Policy
                        </Link>.
                    </p>
                    <p>
                        We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                    </p>
                </section>

                {/* SECTION 6 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
                    </h2>
                    <p>
                        We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
                    </p>
                </section>

                {/* SECTION 7 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 7 - OPTIONAL TOOLS
                    </h2>
                    <p>
                        We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations or conditions of any kind.
                    </p>
                </section>

                {/* SECTION 8 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 8 - THIRD-PARTY LINKS
                    </h2>
                    <p>
                        Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy.
                    </p>
                </section>

                {/* SECTION 9 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
                    </h2>
                    <p>
                        You agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any User Contributions. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
                    </p>
                </section>

                {/* SECTION 10 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 10 - INTELLECTUAL PROPERTY RIGHTS
                    </h2>
                    <p>
                        The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    </p>
                </section>

                {/* SECTION 11 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS
                    </h2>
                    <p>
                        Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions without prior notice.
                    </p>
                </section>

                {/* SECTION 12 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 12 - PROHIBITED USES
                    </h2>
                    <p>
                        In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; (f) to submit false or misleading information.
                    </p>
                </section>

                {/* SECTION 13 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
                    </h2>
                    <p>
                        We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. The service and all products and services delivered to you through the service are provided “as is” and “as available” for your use, without any representation, warranties or conditions of any kind.
                    </p>
                </section>

                {/* SECTION 14 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 14 - INDEMNIFICATION
                    </h2>
                    <p>
                        You agree to indemnify, defend and hold harmless Flower Knows and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand.
                    </p>
                </section>

                {/* SECTION 15 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 15 - SEVERABILITY
                    </h2>
                    <p>
                        In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service.
                    </p>
                </section>

                {/* SECTION 16 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 16 - TERMINATION
                    </h2>
                    <p>
                        The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you or us.
                    </p>
                </section>

                {/* SECTION 17 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 17 - ENTIRE AGREEMENT
                    </h2>
                    <p>
                        These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service.
                    </p>
                </section>

                {/* SECTION 18 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 18 - GOVERNING LAW
                    </h2>
                    <p>
                        These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of United States.
                    </p>
                </section>

                {/* SECTION 19 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 19 - CHANGES TO TERMS OF SERVICE
                    </h2>
                    <p>
                        You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.
                    </p>
                </section>

                {/* SECTION 20 */}
                <section className="space-y-2 pt-6 border-t border-[#f2e6e8]">
                    <h2 className="font text-[17px] sm:text-[19px] text-[#212326] tracking-[0.5px]">
                        SECTION 20 - CONTACT INFORMATION
                    </h2>
                    <p>
                        Questions about the Terms of Service should be sent to us at{' '}
                        <a href="mailto:support@flowerknows.co" className="underline hover:text-[#ea9393] text-[#212326]">
                            support@flowerknows.co
                        </a>.
                    </p>
                </section>

            </div>
        </div>
    );
}

export default TermsConditions;