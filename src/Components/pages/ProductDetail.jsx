import { useParams, Link, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import { toSlug } from '../service/slug';
import { useProducts } from '../context/ProductContext';
import { getProductPriceDetails } from '../service/price';
import { useBasket } from '../context/BasketContext';
import { useCurrency } from '../context/CurrencyContext';

const TAG_ICONS = {
    'Vegan': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M4 19c8-1 13-6 15-14C11 6 5 10 4 19z" />
            <path d="M4 19c3-6 7-9 12-12" />
        </svg>
    ),
    'Cruelty-free': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M12 21c-4-2-7-5-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4-3 7-7 9z" />
            <circle cx="7" cy="7" r="1.6" />
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="17" cy="7" r="1.6" />
            <circle cx="19" cy="11" r="1.6" />
        </svg>
    ),
    'Gluten-free': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9 9l6 6M15 9l-6 6" />
        </svg>
    ),
    'Soy-free': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <rect x="5" y="4" width="14" height="17" rx="1" />
            <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
    ),
};

function ProductDetail() {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const { products, loading } = useProducts();
    const { formatPrice } = useCurrency();

    const [product, setProduct] = useState(null);
    const [activeVariant, setActiveVariant] = useState(0);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [isGiftWrap, setIsGiftWrap] = useState(false);
    const [openSection, setOpenSection] = useState('description');
    const { addToBasket } = useBasket();

    useEffect(() => {
        if (products && products.length > 0) {
            const found = products.find((p) => toSlug(p.title) === slug);
            setProduct(found || null);

            // URL-dən gələn variant parametrinə görə ilkin variantı tapırıq:
            const variantParam = searchParams.get('variant');
            if (found && variantParam && found.variants?.length > 0) {
                const foundIndex = found.variants.findIndex(
                    (v, index) => toSlug(v.name) === toSlug(variantParam) || String(index) === variantParam
                );
                setActiveVariant(foundIndex !== -1 ? foundIndex : 0);
            } else {
                setActiveVariant(0);
            }

            setActiveImg(0);
            setQty(1);
        }
    }, [slug, products, searchParams]);

    // Variant dəyişdikdə şəkil indeksini 0-a qaytarırıq
    useEffect(() => {
        setActiveImg(0);
    }, [activeVariant]);

    if (loading) return <p className="text-center py-20 font text-gray-500">Loading...</p>;
    if (!product) return <p className="text-center py-20 font text-gray-500">Product not found.</p>;

    const variants = product.variants ?? [];
    const tags = product.tags ?? [];
    const currentVariant = variants[activeVariant];

    // Qiymət və endirim hesablanması (service/price-dən)
    const { finalPrice, originalPrice, discountPercent } = getProductPriceDetails(product, activeVariant);

    // Şəkillər
    const currentImages = (currentVariant?.images && currentVariant.images.length > 0)
        ? currentVariant.images
        : (product.images && product.images.length > 0)
            ? product.images
            : (product.img ? [product.img] : []);

    const mainImg = currentImages[activeImg] || currentImages[0] || '';

    // Məlumat Accordionları
    const currentDescription = currentVariant?.description || product.description;
    const currentIncludes = currentVariant?.includes || product.includes;
    const currentIngredients = currentVariant?.ingredients || product.ingredients;
    const currentNetWeight = currentVariant?.netWeight || product.netWeight;

    return (
        <section className="w-[92%] max-w-[1200px] mx-auto py-8 lg:py-12">
            {/* Breadcrumb */}
            <div className="dmsans text-[13px] text-[#888] mb-6">
                <Link to="/" className="hover:text-[#c78a99] transition">Home</Link> / {product.title}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr] gap-6 lg:gap-10">

                {/* THUMBNAIL SÜTUNU */}
                {currentImages.length > 1 && (
                    <div className="hidden lg:flex flex-col gap-3 order-1 sticky top-8 max-h-[calc(100vh-80px)] overflow-y-auto pr-1">
                        {currentImages.map((img, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveImg(i)}
                                className={`w-[70px] h-[70px] aspect-square overflow-hidden border transition cursor-pointer ${activeImg === i ? 'border-[#c78a99] ring-1 ring-[#c78a99]' : 'border-[#eee]'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* ƏSAS BÖYÜK ŞƏKİL */}
                <div className="order-2 relative lg:sticky lg:top-8">
                    <div className="aspect-[5/6] bg-[#f3f1f9] overflow-hidden">
                        <img
                            src={mainImg}
                            alt={product.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Mobil üçün üfüqi qalereya */}
                    {currentImages.length > 1 && (
                        <div className="flex lg:hidden gap-3 overflow-x-auto mt-3 pb-2">
                            {currentImages.map((img, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={`w-16 h-16 flex-shrink-0 overflow-hidden border transition cursor-pointer ${activeImg === i ? 'border-[#c78a99]' : 'border-[#eee]'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* MƏHSUL DETALLARI */}
                <div className="order-3 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-4">
                    <h1 className="font text-[24px] lg:text-[28px] text-[#212326] mb-2 leading-tight">
                        {product.title}
                    </h1>

                    {product.subtitle && (
                        <p className="dmsans text-[14px] text-[#888] mb-4">{product.subtitle}</p>
                    )}

                    {/* Qiymət */}
                    <div className="font text-[22px] mb-1 flex items-center gap-3">
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="text-[#999] line-through text-[18px]">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <span className="text-[#c78a99]">
                            {formatPrice(finalPrice)}
                        </span>
                        {originalPrice !== null && originalPrice > finalPrice && (
                            <span className="border border-[#c78a99] text-[#c78a99] text-[11px] px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                                {discountPercent > 0 ? `${discountPercent}% OFF` : 'SALE'}
                            </span>
                        )}
                    </div>

                    <p className="dmsans text-[12px] text-[#999] mb-4">
                        <span className="underline">Shipping</span> calculated at checkout.
                    </p>

                    {/* Teqlər */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6 pb-6 border-b border-[#eee]">
                            {tags.map((t, i) => (
                                <div key={i} className="flex items-center gap-2 text-[#3f3c39]">
                                    {TAG_ICONS[t] || null}
                                    <span className="dmsans text-[13px]">{t}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Variantlar (Rəng swatch və ya Mətn düymələri) */}
                    {variants.length > 0 && (
                        <div className="mb-6">
                            <p className="dmsans text-[12px] uppercase tracking-[1px] text-[#505050] mb-2.5 font-bold">
                                {variants.some(v => v.color) ? 'Color' : 'Option'}:{' '}
                                <span className="font-normal text-[#212326]">
                                    {currentVariant?.name}
                                </span>
                            </p>

                            <div className="flex flex-wrap gap-2.5 items-center">
                                {variants.map((v, i) => {
                                    if (v.color) {
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setActiveVariant(i)}
                                                title={v.name}
                                                className={`w-7 h-7 rounded-full p-[2px] border transition-all duration-200 cursor-pointer ${activeVariant === i
                                                        ? 'border-[#c78a99] scale-110'
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
                                            onClick={() => setActiveVariant(i)}
                                            className={`px-4 py-2 text-[13px] border transition font-medium cursor-pointer ${activeVariant === i
                                                    ? 'border-[#c78a99] bg-[#c78a99] text-white'
                                                    : 'border-[#ddd] text-[#3f3c39] hover:border-[#c78a99]'
                                                }`}
                                        >
                                            {v.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Say və Add to Cart */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center border border-[#ddd]">
                            <button
                                type="button"
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-11 flex items-center justify-center text-[#3f3c39] hover:bg-[#f5f5f5] transition text-lg cursor-pointer"
                            >
                                −
                            </button>
                            <span className="w-12 text-center dmsans text-[15px] text-[#212326] select-none">
                                {qty}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQty(qty + 1)}
                                className="w-10 h-11 flex items-center justify-center text-[#3f3c39] hover:bg-[#f5f5f5] transition text-lg cursor-pointer"
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => addToBasket(product, activeVariant, qty, isGiftWrap)}
                            className="flex-1 bg-[#e8989a] text-white font uppercase text-[13px] tracking-[3px] py-4 transition-colors duration-300 hover:bg-[#b9788a] cursor-pointer"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Accordion Hissələri */}
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
                            {currentNetWeight && <p className="mb-2 font-medium">{currentNetWeight}</p>}
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
                        <p>Free shipping on orders over {formatPrice(100)}. For any order changes or cancellations,
                            contact us at support@flowerknows.co immediately after placing your order.</p>
                        <p className="mt-2">If your product is incorrect, damaged, or missing, contact us within 15 days.</p>
                    </AccordionItem>
                </div>
            </div>
        </section>
    );
}

function AccordionItem({ title, open, onToggle, children }) {
    return (
        <div className="border-t border-[#eee]">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 cursor-pointer"
            >
                <span className="dmsans uppercase text-[13px] tracking-[1.5px] text-[#212326]">{title}</span>
                <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {open && (
                <div className="dmsans text-[14px] text-[#666] leading-relaxed pb-4">
                    {children}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;