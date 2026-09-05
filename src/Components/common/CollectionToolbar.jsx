import React, { useState } from 'react';
import CollectionFilter from './CollectionFilter';
import { FiColumns } from "react-icons/fi";
import { LuColumns3, LuColumns4 } from "react-icons/lu";

export default function CollectionToolbar({
    products,
    selectedTypes,
    setSelectedTypes,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    getPrice,
    sortBy,
    setSortBy,
    gridCols,
    setGridCols
}) {
    const [isSortOpen, setIsSortOpen] = useState(false);

    return (
        <div className="relative pb-6 border-b border-[#f0f0f0]">
            <div className="flex items-center justify-between">
                {/* SOL: Filter və Sort By */}
                <div className="flex items-center gap-3">
                    <CollectionFilter
                        products={products}
                        selectedTypes={selectedTypes}
                        setSelectedTypes={setSelectedTypes}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        getPrice={getPrice}
                    />

                    <div className="relative inline-block text-left">
                        <button
                            type="button"
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="bg-white border border-[#ea9393] text-[#ea9393] hover:bg-[#faf0f0] text-[12px] tracking-[2px] uppercase font-medium px-4 py-2 flex items-center gap-3 transition cursor-pointer"
                        >
                            <span>SORT BY</span>
                            <svg
                                className={`w-3 h-3 text-[#ea9393] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isSortOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-20"
                                    onClick={() => setIsSortOpen(false)}
                                />

                                <div className="absolute left-0 top-full mt-1.5 w-56 bg-white border border-[#ea9393] shadow-lg py-2.5 z-30 flex flex-col font">
                                    {[
                                        { id: 'featured', label: 'Featured' },
                                        { id: 'price-low', label: 'Price, low to high' },
                                        { id: 'price-high', label: 'Price, high to low' },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => {
                                                setSortBy(item.id);
                                                setIsSortOpen(false);
                                            }}
                                            className={`text-left px-5 py-2 text-[14px] tracking-[0.5px] transition flex items-center gap-2 cursor-pointer ${sortBy === item.id ? 'text-[#ea9393] font-medium' : 'text-[#333] hover:text-[#ea9393]'
                                                }`}
                                        >
                                            {sortBy === item.id && <span>—</span>} {item.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* SAĞ: Sütun Düymələri */}
                <div className="hidden sm:flex items-center gap-3 text-[#999]">
                    <button
                        type="button"
                        onClick={() => setGridCols(2)}
                        className={`flex items-center gap-0.5 text-[12px] cursor-pointer ${gridCols === 2 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                    >
                        <span><FiColumns /></span> 2
                    </button>
                    <button
                        type="button"
                        onClick={() => setGridCols(3)}
                        className={`flex items-center gap-0.5 text-[12px] cursor-pointer ${gridCols === 3 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                    >
                        <span><LuColumns3 /></span> 3
                    </button>
                    <button
                        type="button"
                        onClick={() => setGridCols(4)}
                        className={`flex items-center gap-0.5 text-[12px] cursor-pointer ${gridCols === 4 ? 'text-[#ea9393] font-bold' : 'hover:text-[#212326]'}`}
                    >
                        <span><LuColumns4 /></span> 4
                    </button>
                </div>
            </div>
        </div>
    );
}