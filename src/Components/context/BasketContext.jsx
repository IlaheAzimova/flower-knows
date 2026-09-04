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
    const addToBasket = (product, variantIndex = 0, quantity = 1, isGiftWrap = false) => {
        const variants = product.variants || [];
        const currentVariant = variants[variantIndex] || null;

        // Qiymət və şəkili götürürük
        const { finalPrice } = getProductPriceDetails(product, variantIndex);
        const image = currentVariant?.images?.[0] || product.images?.[0] || product.img || '';

        // Eyni məhsulun fərqli variantları qarışmasın deyə xüsusi açar (key) yaradırıq
        const itemKey = `${product.id}-${currentVariant?.name || 'default'}-${isGiftWrap}`;

        setBasketItems((prevItems) => {
            // Məhsul artıq səbətdə varmı?
            const existingIndex = prevItems.findIndex((item) => item.key === itemKey);

            if (existingIndex !== -1) {
                // Varsa sayını artırırıq
                const updatedItems = [...prevItems];
                updatedItems[existingIndex].quantity += quantity;
                return updatedItems;
            }

            // Yoxdursa yeni element kimi əlavə edirik
            const newItem = {
                key: itemKey,
                id: product.id,
                title: product.title,
                variantName: currentVariant?.name || null,
                variantColor: currentVariant?.color || null,
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