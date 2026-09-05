// Qiymət mətnini təmizləyib rəqəmə çevirir 
export const parseMoney = (val) => {
    if (!val) return null;
    const clean = String(val).split('-')[0].replace(/[^0-9.]/g, '').trim();
    const num = Number(clean);
    return isNaN(num) ? null : num;
};

// endirimli) qiymət
export const getProductFinalPrice = (product) => {
    if (!product) return 0;
    const firstVariant = product.variants?.[0];
    const explicitPrice = parseMoney(firstVariant?.price ?? product.price);
    const explicitCompareAt = parseMoney(firstVariant?.compareAt ?? product.compareAt);
    const rawDiscount = firstVariant?.discount ?? product.discount;
    const discountPercent = rawDiscount
        ? (Number(String(rawDiscount).replace(/[^0-9.]/g, '')) || 0)
        : 0;

    if (explicitPrice !== null) return explicitPrice;
    if (explicitCompareAt !== null) {
        return discountPercent > 0
            ? Math.round(explicitCompareAt * (1 - discountPercent / 100))
            : explicitCompareAt;
    }
    return 0;
};

// Məhsulun kartda göstəriləcək bütün qiymət detallarını çıxarır
export const getProductPriceDetails = (product, activeVariantIndex = 0) => {
    const variants = product?.variants ?? [];
    const currentVariant = variants[activeVariantIndex];

    const explicitPrice = parseMoney(currentVariant?.price ?? product?.price);
    const explicitCompareAt = parseMoney(currentVariant?.compareAt ?? product?.compareAt);
    const rawDiscount = currentVariant?.discount ?? product?.discount;
    const discountPercent = rawDiscount
        ? (Number(String(rawDiscount).replace(/[^0-9.]/g, '')) || 0)
        : 0;

    let finalPrice = 0;
    let originalPrice = null;

    if (explicitPrice !== null) {
        finalPrice = explicitPrice;
        if (explicitCompareAt !== null && explicitCompareAt > explicitPrice) {
            originalPrice = explicitCompareAt;
        }
    } else if (explicitCompareAt !== null) {
        originalPrice = explicitCompareAt;
        finalPrice = discountPercent > 0
            ? Math.round(originalPrice * (1 - discountPercent / 100))
            : originalPrice;
    }

    const calculatedDiscount = discountPercent > 0
        ? discountPercent
        : (originalPrice && finalPrice < originalPrice
            ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
            : 0);

    // API-dən gələn product.from dəyərini yoxlayırıq (
    const isFromPrice = Boolean(product?.from);

    return {
        finalPrice,
        originalPrice,
        discountPercent: calculatedDiscount,
        isFromPrice
    };
};