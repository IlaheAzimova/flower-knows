import React from 'react';

function PrivacyPolicy() {
    return (
        <div className="w-full bg-white text-[#212326]">

            {/* 1. HERO BANNER */}
            <div
                className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://flowerknows.co/cdn/shop/files/2_bfdbc16b-1361-4f0e-a56d-32f233df815a.png?v=1684921254&width=3000')`,
                    backgroundColor: '#e7c6cb'
                }}
            >
                <div className="absolute inset-0 bg-[#deb9bd]/40 pointer-events-none" />

                <div className="relative z-10 text-center px-4">
                    <h1 className="font text-[38px] sm:text-[48px] md:text-[56px] text-white tracking-[2px] leading-tight select-none">
                        Privacy Policy
                    </h1>
                </div>
            </div>

            {/* 2. MƏZMUN BÖLMƏSİ */}
            <div className="w-[90%] max-w-[850px] mx-auto py-14 md:py-20 text-[#444] dmsans text-[13px] sm:text-[14px] leading-relaxed space-y-8">

                {/* Giriş mətni */}
                <div className="space-y-4">
                    <p>
                        Hangzhou Flower Knows Electronic Commerce co., Ltd. (“Company” or “We”) respects your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website Flower Knows (our “Website” or “Site”) and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                    </p>
                    <p>
                        Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Website. By accessing or using this Website, you agree to this privacy policy. This policy may change from time to time. Your continued use of this Website after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
                    </p>
                </div>

                {/* SECTION 1 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 1 - INFORMATION THAT WE COLLECT ABOUT YOU
                    </h2>
                    <ul className="list-disc pl-5 space-y-3 text-[#555]">
                        <li>
                            <strong>Information Provided by You Upon Registration, Making a Purchase Online or Request for Services.</strong> We may use personal information, including information by which you may be personally identified, such as name, postal address, email address, telephone number or any other identifier by which you may be contacted online or offline (“Personal Information”), to administer your access to a Site, verify your identity, and provide our products or services to you. This includes information provided at the time of registering to use our Website, making a purchase online, posting material, or requesting further services. We may also ask you for information when you enter a contest or promotion sponsored by us, and when you report a problem with our Website.
                        </li>
                        <li>
                            <strong>Information Provided When You Contact Us.</strong> Records and copies of your correspondence (including email addresses), if you contact us. We may use this Personal Information to understand and respond to your question or comment.
                        </li>
                        <li>
                            <strong>Information Collected Automatically.</strong> Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses, operating system, browser type, and information collected through cookies. The technologies we use for automatic data collection may include:
                            <ul className="list-circle pl-5 mt-2 space-y-2">
                                <li>
                                    <strong>Cookies (or browser cookies):</strong> A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website.
                                </li>
                                <li>
                                    <strong>Web Beacons:</strong> Pages of our Website and our emails may contain small electronic files known as web beacons that permit the Company to count users who have visited those pages or opened an email and for other related website statistics.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>User Contributions.</strong> You also may provide information to be published or displayed on public areas of the Website, or transmitted to other users of the Website or third parties (“User Contributions”). Your User Contributions are posted on and transmitted to others at your own risk.
                        </li>
                        <li>
                            <strong>General Uses.</strong> We may also use your Personal Information to improve and personalize your experience with us, store information about your preferences, and keep you informed of our other products and services.
                        </li>
                        <li>
                            <strong>Aggregate data.</strong> We may use your information to create aggregate data which does not include any Personal Information and which cannot be used to identify you.
                        </li>
                        <li>
                            <strong>Email marketing.</strong> With your permission, we may send you emails about our store, new products, and other updates.
                        </li>
                    </ul>
                </section>

                {/* SECTION 2 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 2 - USE AND CONSENT
                    </h2>
                    <p className="font-semibold text-[#212326]">How do you use my information?</p>
                    <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#555]">
                        <li>To present our Website and its contents to you.</li>
                        <li>To provide you with information, products, or services that you request from us.</li>
                        <li>To fulfill any other purpose for which you provide it.</li>
                        <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
                        <li>To notify you about changes to our Website or any products or services we offer.</li>
                    </ul>

                    <p className="font-semibold text-[#212326] pt-3">How do you get my consent?</p>
                    <p>
                        When you provide us with Personal Information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
                    </p>

                    <p className="font-semibold text-[#212326] pt-3">How do I withdraw my consent?</p>
                    <p>
                        If after you opt-in, you change your mind, you may withdraw your consent for us to contact you at any time by contacting us at{' '}
                        <a href="mailto:support@flowerknows.co" className="underline hover:text-[#ea9393] text-[#212326]">
                            support@flowerknows.co
                        </a>.
                    </p>
                </section>

                {/* SECTION 3 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 3 - DISCLOSURE
                    </h2>
                    <p>We may disclose your Personal Information that we collect or you provide as described in this privacy policy:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#555]">
                        <li>To our subsidiaries and affiliates.</li>
                        <li>To contractors, service providers, and other third parties we use to support our business.</li>
                        <li>To comply with any court order, law, or legal process.</li>
                        <li>To enforce or apply our Terms of Service and other agreements.</li>
                        <li>If we believe disclosure is necessary to protect the rights, property, or safety of the Company, our customers, or others.</li>
                    </ul>
                </section>

                {/* SECTION 4 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 4 - SHOPIFY
                    </h2>
                    <p>
                        Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you. Your data is stored through Shopify’s data storage, databases, and the general Shopify application on a secure server behind a firewall.
                    </p>
                    <p>
                        <strong>Payment:</strong> If you choose a direct payment gateway to complete your purchase, Shopify stores your credit card data encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction.
                    </p>
                </section>

                {/* SECTION 5 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 5 - THIRD-PARTY SERVICES
                    </h2>
                    <p>
                        In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies.
                    </p>
                    <p>
                        <strong>Google Analytics:</strong> To help facilitate the delivery of relevant content, we use Google Analytics and have implemented Google Advertising Features such as Remarketing and Demographics Reporting.
                    </p>
                </section>

                {/* SECTION 6 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 6 - SECURITY
                    </h2>
                    <p>
                        To protect your personal information, we take reasonable precautions and follow industry best practices. Credit card information is encrypted using secure socket layer technology (SSL) and stored with AES-256 encryption.
                    </p>
                </section>

                {/* SECTION 7 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 7 - COOKIES
                    </h2>
                    <p>Here is a list of cookies that we use:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#555]">
                        <li><code>session_id</code>: Unique token, allows Shopify to store information about your session.</li>
                        <li><code>shopify_visit</code>: Persistent for 30 minutes from last visit, records number of visits.</li>
                        <li><code>cart</code>: Unique token, persistent for 2 weeks, stores information about your cart contents.</li>
                        <li><code>secure_session_id</code>: Unique token, sessional.</li>
                    </ul>
                </section>

                {/* SECTION 8 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 8 - YOUR STATE PRIVACY RIGHTS
                    </h2>
                    <p>
                        State consumer privacy laws (such as California, Colorado, Connecticut, Virginia, etc.) provide their residents with rights to confirm processing, access, delete, and correct their personal information, as well as opt out of targeted advertising and data sales.
                    </p>
                </section>

                {/* SECTION 9 */}
                <section className="space-y-3 pt-4">
                    <h2 className="font text-[18px] sm:text-[20px] text-[#212326] tracking-[1px] uppercase">
                        SECTION 9 - CHANGES TO THIS PRIVACY POLICY
                    </h2>
                    <p>
                        We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting on the website.
                    </p>
                </section>

                {/* QUESTIONS AND CONTACT */}
                <section className="pt-6 border-t border-[#f2e6e8] space-y-2">
                    <h2 className="font text-[17px] sm:text-[19px] text-[#212326] tracking-[0.5px]">
                        QUESTIONS AND CONTACT INFORMATION
                    </h2>
                    <p>
                        If you would like to access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, contact our privacy compliance officer at{' '}
                        <a href="mailto:support@flowerknows.co" className="underline hover:text-[#ea9393] text-[#212326]">
                            support@flowerknows.co
                        </a>.
                    </p>
                </section>

            </div>
        </div>
    );
}

export default PrivacyPolicy;