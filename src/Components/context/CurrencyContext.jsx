import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

// Valyuta məzənnələri və simvolları (USD bazasında)
export const CURRENCIES = {
    USD: {
        code: 'USD',
        symbol: '$',
        label: 'United States (USD $)',
        rate: 1.0,
    },
    EUR: {
        code: 'EUR',
        symbol: '€',
        label: 'Europe (EUR €)',
        rate: 0.92,
    },
    AZN: {
        code: 'AZN',
        symbol: '₼',
        label: 'Azerbaijan (AZN ₼)',
        rate: 1.70,
    },
    RUB: {
        code: 'RUB',
        symbol: '₽',
        label: 'Russia (RUB ₽)',
        rate: 90.0,
    }
};

export const CurrencyProvider = ({ children }) => {
    // İlkin olaraq localStorage-dən oxuyur və ya USD götürür
    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('selected_currency');
        return saved && CURRENCIES[saved] ? CURRENCIES[saved] : CURRENCIES.USD;
    });

    useEffect(() => {
        localStorage.setItem('selected_currency', currency.code);
    }, [currency]);

    // Qiyməti seçilmiş valyutaya çevirən funksiya
    const formatPrice = (priceInUsd) => {
        if (priceInUsd === null || priceInUsd === undefined || isNaN(priceInUsd)) return '';
        const converted = Number(priceInUsd) * currency.rate;
        return `${currency.symbol}${converted.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, CURRENCIES }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};