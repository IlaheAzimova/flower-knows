import React, { useState, useMemo } from 'react';
import { useCurrency } from '../context/CurrencyContext';

export const FILTER_KEYS = ['EYES', 'FACE', 'LIPS', 'FRAGRANCE', 'ALL-IN', 'ACCESSORIES&TOOLS'];

function CollectionFilter({
    products = [],
    selectedTypes = [],
    setSelectedTypes,
    minPrice = 0,
    maxPrice = null,
    setMinPrice,
    setMaxPrice,
    getPrice
}) {
    const { formatPrice } = useCurrency();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Təhlükəsiz qiymət oxuyucusu
    const resolvePrice = (p) => {
        if (typeof getPrice === 'function') return Number(getPrice(p)) || 0;
        return Number(p?.price ?? p?.finalPrice ?? 0) || 0;
    };

    // Dinamik maksimal baza qiyməti (USD/baza dəyəri ilə)
    const maxPossiblePrice = useMemo(() => {
        if (!products.length) return 200;
        const prices = products.map(resolvePrice);
        return Math.ceil(Math.max(...prices, 150));
    }, [products, getPrice]);

    // Kateqoriya sayğacları
    const categoryCounts = useMemo(() => {
        const counts = { 'EYES': 0, 'FACE': 0, 'LIPS': 0, 'FRAGRANCE': 0, 'ALL-IN': 0, 'ACCESSORIES&TOOLS': 0 };

        products.forEach(p => {
            const cleanCat = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const title = (p.title || '').toLowerCase();

            if (cleanCat.includes('eye')) counts['EYES']++;
            else if (cleanCat.includes('face')) counts['FACE']++;
            else if (cleanCat.includes('lip')) counts['LIPS']++;
            else if (cleanCat.includes('fragrance')) counts['FRAGRANCE']++;
            else if (cleanCat.includes('access') || cleanCat.includes('tool')) counts['ACCESSORIES&TOOLS']++;

            if (!title.includes('setting') && !cleanCat.includes('setting')) {
                if (cleanCat === 'allin' || cleanCat === 'all-in' || title.includes('all-in') || title.includes('set') || title.includes('box')) {
                    counts['ALL-IN']++;
                }
            }
        });

        return counts;
    }, [products]);

    // Yalnız sayı 0-dan çox olan kateqoriyalar
    const availableKeys = useMemo(() => {
        return FILTER_KEYS.filter(key => (categoryCounts[key] || 0) > 0);
    }, [categoryCounts]);

    const toggleType = (key) => {
        setSelectedTypes(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const handleClearFilter = () => {
        setSelectedTypes([]);
        setMinPrice(0);
        setMaxPrice(null);
    };

    return (
        <div className="relative inline-block text-left">
            {/* FILTER DÜYMƏSİ */}
            <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-[#ea9393] hover:bg-[#d88080] text-white text-[12px] tracking-[2px] uppercase font-medium px-4 py-2 flex items-center gap-1.5 transition cursor-pointer"
            >
                <span>FILTER</span>
                <span className="font-mono text-[13px]">{isFilterOpen ? '−' : '+'}</span>
            </button>

            {/* AÇILAN FILTER PANELİ */}
            {isFilterOpen && (
                <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsFilterOpen(false)} />

                    <div className={`absolute left-0 top-full mt-1.5 z-30 ${availableKeys.length > 0 ? 'w-[310px] sm:w-[480px]' : 'w-[260px] sm:w-[300px]'} bg-white border border-[#ebdada] shadow-xl p-5`}>
                        <div className={`grid ${availableKeys.length > 0 ? 'grid-cols-1 sm:grid-cols-2 gap-6' : 'grid-cols-1'} text-[13px] text-[#4d4a47]`}>

                            {/* 1. Sütun: Product type */}
                            {availableKeys.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between border-b border-[#f2e6e8] pb-1.5 mb-3">
                                        <span className="font-semibold text-[#212326]">Product type</span>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedTypes([])}
                                            className="text-[11px] text-[#888] hover:text-[#ea9393] underline cursor-pointer"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {availableKeys.map((key) => (
                                            <label key={key} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(key)}
                                                    onChange={() => toggleType(key)}
                                                    className="w-3.5 h-3.5 accent-[#ea9393] rounded-xs cursor-pointer"
                                                />
                                                <span className="dmsans text-[12px] group-hover:text-[#212326] transition">
                                                    {key} <span className="text-[#999]">({categoryCounts[key]})</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 2. Sütun: Price Slider */}
                            <div>
                                <div className="flex items-center justify-between border-b border-[#f2e6e8] pb-1.5 mb-3">
                                    <span className="font-semibold text-[#212326]">Price</span>
                                    <button
                                        type="button"
                                        onClick={() => { setMinPrice(0); setMaxPrice(null); }}
                                        className="text-[11px] text-[#888] hover:text-[#ea9393] underline cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className="pt-3">
                                    <div className="relative h-5 flex items-center">
                                        <div className="absolute w-full h-1 bg-[#e0deda] rounded-full" />
                                        <div
                                            className="absolute h-1 bg-[#212326] rounded-full pointer-events-none"
                                            style={{
                                                left: `${Math.min(100, Math.max(0, (minPrice / (maxPossiblePrice || 1)) * 100))}%`,
                                                right: `${Math.min(100, Math.max(0, 100 - ((maxPrice ?? maxPossiblePrice) / (maxPossiblePrice || 1)) * 100))}%`
                                            }}
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max={maxPossiblePrice}
                                            value={minPrice}
                                            onChange={(e) => {
                                                const currentMax = maxPrice ?? maxPossiblePrice;
                                                const val = Math.min(Number(e.target.value), currentMax - 1);
                                                setMinPrice(val);
                                            }}
                                            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#212326] [&::-webkit-slider-thumb]:cursor-pointer"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max={maxPossiblePrice}
                                            value={maxPrice ?? maxPossiblePrice}
                                            onChange={(e) => {
                                                const val = Math.max(Number(e.target.value), minPrice + 1);
                                                setMaxPrice(val);
                                            }}
                                            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#212326] [&::-webkit-slider-thumb]:cursor-pointer"
                                        />
                                    </div>

                                    {/* DİNAMİK VALYUTA FORMATI */}
                                    <div className="mt-2 text-[12px] text-[#666] dmsans">
                                        Price: <span className="text-[#212326] font-medium">{formatPrice(minPrice)} — {formatPrice(maxPrice ?? maxPossiblePrice)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-5 pt-3 border-t border-[#f4e6e8] flex justify-end">
                            <button
                                type="button"
                                onClick={handleClearFilter}
                                className="dmsans text-[12px] text-[#777] hover:text-[#ea9393] underline cursor-pointer"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CollectionFilter;