import React from 'react';

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
                <button
                    key={cat}
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className={`px-3 py-1.5 text-[11px] tracking-[1.5px] uppercase border transition cursor-pointer ${selectedCategory === cat
                            ? 'border-[#212326] text-[#212326] font-semibold bg-[#faf9f8]'
                            : 'border-[#ddd] text-[#777] hover:border-[#212326] hover:text-[#212326]'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}