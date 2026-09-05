import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router';
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';

const TAG_ICONS = {
    'Vegan': (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M4 19c8-1 13-6 15-14C11 6 5 10 4 19z" />
            <path d="M4 19c3-6 7-9 12-12" />
        </svg>
    ),
    'Cruelty-free': (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 21c-4-2-7-5-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4-3 7-7 9z" />
            <circle cx="7" cy="7" r="1.6" />
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="17" cy="7" r="1.6" />
            <circle cx="19" cy="11" r="1.6" />
        </svg>
    ),
    'Gluten-free': (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9 9l6 6M15 9l-6 6" />
        </svg>
    ),
    'Soy-free': (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="5" y="4" width="14" height="17" rx="1" />
            <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
    ),
};

function AccordionItem({ title, open, onToggle, children }) {
    return (
        <div className="border-t border-[#eee]">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 cursor-pointer text-left transition hover:text-[#ea9393]"
            >
                <span className="dmsans uppercase text-[12px] tracking-[1.5px] font-medium text-[#212326]">
                    {title}
                </span>
                <svg
                    className={`w-4 h-4 text-[#777] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {open && (
                <div className="dmsans text-[13.5px] text-[#666] leading-relaxed pb-5">
                    {children}
                </div>
            )}
        </div>
    );
}

function ProductDetail() {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, loading } = useProducts();
    const { formatPrice } = useCurrency();
    const { addToBasket } = useBasket();

    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [openSection, setOpenSection] = useState('description');

    // 1. Məhsulun tapılması
    const product = useMemo(() => {
        if (!products || products.length === 0) return null;
        return products.find((p) => toSlug(p.title) === slug) || null;
    }, [products, slug]);

    // 2. URL-dəki 'variant' parametrinə əsasən aktiv variantın təyin edilməsi
    const variants = product?.variants ?? [];
    const activeVariant = useMemo(() => {
        if (!product || variants.length === 0) return 0;

        const variantParam = searchParams.get('variant');
        if (variantParam === null) return 0;

        const numIdx = Number(variantParam);
        if (!isNaN(numIdx) && variants[numIdx]) {
            return numIdx;
        }

        const nameIdx = variants.findIndex((v) => toSlug(v.name) === toSlug(variantParam));
        return nameIdx !== -1 ? nameIdx : 0;
    }, [product, variants, searchParams]);

    // Variant dəyişdikdə böyük şəkli başlanğıc şəklə qaytar
    useEffect(() => {
        setActiveImg(0);
    }, [activeVariant]);

    // Səhifəyə və ya məhsula ilk dəfə girəndə sayğacı sıfırla
    useEffect(() => {
        setQty(1);
    }, [slug]);

    const handleVariantChange = (index) => {
        setSearchParams({ variant: index.toString() }, { replace: true });
    };

    if (loading) {
        return <p className="text-center py-28 font text-gray-400">Loading...</p>;
    }

    if (!product) {
        return (
            <div className="text-center py-28">
                <p className="font text-gray-500 text-lg mb-4">Product not found.</p>
                <Link
                    to="/collections/all"
                    className="border border-[#ea9393] text-[#ea9393] hover:bg-[#ea9393] hover:text-white px-6 py-2.5 text-[12px] uppercase tracking-widest font-medium transition"
                >
                    Back to Shop
                </Link>
            </div>
        );
    }

    const currentVariant = variants[activeVariant];
    const tags = product.tags ?? [];

    // Qiymət hesablamaları
    const { finalPrice, originalPrice, discountPercent } = getProductPriceDetails(product, activeVariant);

    // Qalereya şəkilləri
    const currentImages = (currentVariant?.images && currentVariant.images.length > 0)
        ? currentVariant.images
        : (product.images && product.images.length > 0)
            ? product.images
            : (product.img ? [product.img] : []);

    const mainImg = currentImages[activeImg] || currentImages[0] || '';

    // Accordion detalları
    const currentDescription = currentVariant?.description || product.description;
    const currentIncludes = currentVariant?.includes || product.includes;
    const currentIngredients = currentVariant?.ingredients || product.ingredients;
    const currentNetWeight = currentVariant?.netWeight || product.netWeight;

    return (
        <section className="w-[92%] max-w-[1200px] mx-auto py-8 lg:py-12">
            {/* BREADCRUMB */}
            <nav aria-label="Breadcrumb" className="dmsans text-[12.5px] text-[#888] mb-8">
                <Link to="/" className="hover:text-[#ea9393] transition">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-[#333] font-medium">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[90px_1fr_1fr] gap-6 lg:gap-10">

                {/* THUMBNAIL SÜTUNU (DESKTOP) */}
                {currentImages.length > 1 && (
                    <div className="hidden lg:flex flex-col gap-3 order-1 sticky top-8 max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pr-1">
                        {currentImages.map((img, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveImg(i)}
                                className={`w-[75px] h-[90px] overflow-hidden border transition cursor-pointer ${activeImg === i ? 'border-[#ea9393] ring-1 ring-[#ea9393]' : 'border-[#eee] hover:border-[#ccc]'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${i + 1}`}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* ƏSAS ŞƏKİL */}
                <div className="order-2 relative lg:sticky lg:top-8">
                    <div className="aspect-[4/5] bg-[#faf9f8] overflow-hidden">
                        <img
                            src={mainImg}
                            alt={product.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Mobil üfüqi qalereya */}
                    {currentImages.length > 1 && (
                        <div className="flex lg:hidden gap-2.5 overflow-x-auto mt-3 pb-2 no-scrollbar">
                            {currentImages.map((img, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={`w-16 h-20 flex-shrink-0 overflow-hidden border transition cursor-pointer ${activeImg === i ? 'border-[#ea9393] ring-1 ring-[#ea9393]' : 'border-[#eee]'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${i + 1}`}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* MƏHSULUN SAĞ DETALLARI */}
                <div className="order-3 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-4">
                    <h1 className="font text-[26px] lg:text-[30px] text-[#212326] mb-2 leading-tight">
                        {product.title}
                    </h1>

                    {product.subtitle && (
                        <p className="dmsans text-[14px] text-[#777] mb-4 leading-normal">{product.subtitle}</p>
                    )}

                    {/* QİYMƏT VƏ ENDİRİM */}
                    <div className="font text-[22px] mb-2 flex items-center gap-3">
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="text-[#999] line-through text-[18px]">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <span className="text-[#ea9393] font-medium">
                            {formatPrice(finalPrice)}
                        </span>
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="bg-[#ea9393] text-white text-[10px] px-2 py-0.5 uppercase tracking-wider font-medium">
                                {discountPercent > 0 ? `${discountPercent}% OFF` : 'SALE'}
                            </span>
                        )}
                    </div>

                    <p className="dmsans text-[12px] text-[#888] mb-6">
                        <Link to="/shipping-policy" className="underline hover:text-[#212326]">Shipping</Link> calculated at checkout.
                    </p>

                    {/* TEQLƏR */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6 pb-6 border-b border-[#eee]">
                            {tags.map((tag, i) => (
                                <div key={i} className="flex items-center gap-2 text-[#444]">
                                    {TAG_ICONS[tag] || null}
                                    <span className="dmsans text-[12.5px]">{tag}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* VARİANTLAR */}
                    {variants.length > 0 && (
                        <div className="mb-6">
                            <p className="dmsans text-[12px] uppercase tracking-[1px] text-[#555] mb-3 font-semibold">
                                {variants.some((v) => v.color) ? 'Color' : 'Option'}:{' '}
                                <span className="font-normal text-[#212326]">{currentVariant?.name}</span>
                            </p>

                            <div className="flex flex-wrap gap-2.5 items-center">
                                {variants.map((v, i) => {
                                    if (v.color) {
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => handleVariantChange(i)}
                                                title={v.name}
                                                className={`w-7 h-7 rounded-full p-[2px] border transition cursor-pointer ${activeVariant === i
                                                        ? 'border-[#ea9393] scale-110'
                                                        : 'border-transparent hover:border-[#ddd]'
                                                    }`}
                                            >
                                                <span
                                                    className="block w-full h-full rounded-full border border-black/10"
                                                    style={{ backgroundColor: v.color }}
                                                />
                                            </button>
                                        );
                                    }

                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => handleVariantChange(i)}
                                            className={`px-4 py-2 text-[12.5px] border transition font-medium cursor-pointer ${activeVariant === i
                                                    ? 'border-[#ea9393] bg-[#ea9393] text-white'
                                                    : 'border-[#ddd] text-[#333] hover:border-[#ea9393]'
                                                }`}
                                        >
                                            {v.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* SAY VƏ SƏBƏTƏ ƏLAVƏ ET */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center border border-[#ddd]">
                            <button
                                type="button"
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-11 flex items-center justify-center text-[#333] hover:bg-[#f9f9f9] transition text-base cursor-pointer"
                            >
                                −
                            </button>
                            <span className="w-12 text-center dmsans text-[14px] text-[#212326] select-none font-medium">
                                {qty}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQty(qty + 1)}
                                className="w-10 h-11 flex items-center justify-center text-[#333] hover:bg-[#f9f9f9] transition text-base cursor-pointer"
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => addToBasket(product, activeVariant, qty, false)}
                            className="flex-1 bg-[#ea9393] text-white font uppercase text-[12px] tracking-[2.5px] py-4 transition hover:bg-[#d88080] font-medium cursor-pointer"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* ACCORDION BÖLMƏLƏRİ */}
                    {currentDescription && (
                        <AccordionItem
                            title="Description"
                            open={openSection === 'description'}
                            onToggle={() => setOpenSection(openSection === 'description' ? '' : 'description')}
                        >
                            <p className="whitespace-pre-line">{currentDescription}</p>
                        </AccordionItem>
                    )}

                    {currentIngredients && (
                        <AccordionItem
                            title="Ingredients"
                            open={openSection === 'ingredients'}
                            onToggle={() => setOpenSection(openSection === 'ingredients' ? '' : 'ingredients')}
                        >
                            {currentNetWeight && (
                                <p className="mb-2 font-medium text-[#212326]">{currentNetWeight}</p>
                            )}
                            <p className="whitespace-pre-line">{currentIngredients}</p>
                        </AccordionItem>
                    )}

                    {currentIncludes && (
                        <AccordionItem
                            title="Set Includes"
                            open={openSection === 'includes'}
                            onToggle={() => setOpenSection(openSection === 'includes' ? '' : 'includes')}
                        >
                            <p className="whitespace-pre-line">{currentIncludes}</p>
                        </AccordionItem>
                    )}

                    <AccordionItem
                        title="Shipping & Returns"
                        open={openSection === 'shipping'}
                        onToggle={() => setOpenSection(openSection === 'shipping' ? '' : 'shipping')}
                    >
                        <p>
                            Free shipping on orders over {formatPrice(100)}. For order changes or cancellations,
                            reach out to support@flowerknows.co immediately after placing the order.
                        </p>
                        <p className="mt-2">
                            If your item arrives damaged, missing, or incorrect, please notify us within 15 days of delivery.
                        </p>
                    </AccordionItem>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;