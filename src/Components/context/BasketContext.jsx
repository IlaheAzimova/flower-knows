import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getProductPriceDetails } from '../service/price';

const BasketContext = createContext();

export function BasketProvider({ children }) {
    // Səhifə yenilənəndə məhsullar itməsin deyə ilkin dəyəri localStoragedən oxuyuruq
    const savedBasket = localStorage.getItem('fk_basket');
    const [basketItems, setBasketItems] = useState(savedBasket ? JSON.parse(savedBasket) : []);

    const [isBasketOpen, setIsBasketOpen] = useState(false);

    // Səbət hər dəyişəndə localStorageni yeniləyirik
    useEffect(() => {
        localStorage.setItem('fk_basket', JSON.stringify(basketItems));
    }, [basketItems]);

    // Səbətə məhsul əlavə etmək
    // Səbətə məhsul əlavə etmək (Həm index, həm obyekt, həm də fərqli adları dəstəkləyir)
    const addToBasket = (product, variantParam = 0, quantity = 1, isGiftWrap = false) => {
        const variants = product.variants || [];

        let currentVariant = null;
        let variantIndex = 0;

        // 1. Əgər 2-ci parametr rəqəmdirsə (index)
        if (typeof variantParam === 'number') {
            variantIndex = variantParam;
            currentVariant = variants[variantIndex] || variants[0] || null;
        }
        // 2. Əgər 2-ci parametr birbaşa seçilmiş variant obyektidirsə
        else if (typeof variantParam === 'object' && variantParam !== null) {
            currentVariant = variantParam;
            variantIndex = variants.findIndex(
                (v) => (v.name && v.name === currentVariant.name) || (v.id && v.id === currentVariant.id)
            );
            if (variantIndex === -1) variantIndex = 0;
        }
        // 3. Əgər variant adı string kimi gəlibsə (məsələn: "01 Strawberry")
        else if (typeof variantParam === 'string') {
            const foundIdx = variants.findIndex((v) => v.name === variantParam || v.title === variantParam);
            variantIndex = foundIdx !== -1 ? foundIdx : 0;
            currentVariant = variants[variantIndex] || null;
        }

        // Əgər yenə də tapılmayıbsa və məhsulun tərkibində variantlar varsa, 1-cini götür
        if (!currentVariant && variants.length > 0) {
            currentVariant = variants[0];
        }

        // Qiymət və şəkili götürürük
        const { finalPrice } = getProductPriceDetails(product, variantIndex);

        // API-də şəklin fərqli adlarla gəlmə ehtimalını qarşılayırıq (img, image, images)
        const image =
            currentVariant?.images?.[0] ||
            currentVariant?.img ||
            currentVariant?.image ||
            product.images?.[0] ||
            product.img ||
            '';

        const variantIdentifier = currentVariant?.name || currentVariant?.title || currentVariant?.id || variantIndex;

        // Eyni məhsulun fərqli variantları qarışmasın deyə açar
        const itemKey = `${product.id}-${variantIdentifier}-${isGiftWrap}`;

        setBasketItems((prevItems) => {
            const existingIndex = prevItems.findIndex((item) => item.key === itemKey);

            if (existingIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingIndex].quantity += quantity;
                return updatedItems;
            }

            const newItem = {
                key: itemKey,
                id: product.id,
                title: product.title,
                variantName: currentVariant?.name || currentVariant?.title || null,
                variantColor: currentVariant?.color || currentVariant?.colorCode || null,
                price: finalPrice,
                image,
                quantity,
                isGiftWrap
            };

            return [...prevItems, newItem];
        });
    };

    // Miqdarı dəyişmək (+ və ya -)
    const updateQuantity = (key, change) => {
        setBasketItems((prevItems) => {
            return prevItems
                .map((item) => {
                    if (item.key === key) {
                        const newQuantity = item.quantity + change;
                        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                    }
                    return item;
                })
                .filter(Boolean); // Sayı 0 olanda avtomatik siyahıdan silir
        });
    };

    // Məhsulu səbətdən silmək
    const removeFromBasket = (key) => {
        setBasketItems((prevItems) => prevItems.filter((item) => item.key !== key));
    };

    // Səbətdəki ümumi məhsul sayı
    const totalCount = useMemo(() => {
        return basketItems.reduce((total, item) => total + item.quantity, 0);
    }, [basketItems]);

    // Ümumi məbləğ (əgər hədiyyə paketi seçilibsə +$4.99 əlavə olunur)
    const subtotal = useMemo(() => {
        return basketItems.reduce((total, item) => {
            const giftWrapPrice = item.isGiftWrap ? 4.99 : 0;
            return total + (item.price + giftWrapPrice) * item.quantity;
        }, 0);
    }, [basketItems]);

    return (
        <BasketContext.Provider
            value={{
                basketItems,
                isBasketOpen,
                setIsBasketOpen,
                addToBasket,
                updateQuantity,
                removeFromBasket,
                totalCount,
                subtotal
            }}
        >
            {children}
        </BasketContext.Provider>
    );
}

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};