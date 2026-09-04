import React from 'react';
import { Link } from 'react-router';

function Error() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#fbfbfb] text-center">
            <span className="dmsans text-[14px] uppercase tracking-[3px] text-[#d5797b] mb-3">
                Error 404
            </span>
            <h1 className="font text-[38px] md:text-[56px] text-[#212326] leading-tight mb-4">
                Page Not Found
            </h1>
            <p className="font text-[15px] md:text-[17px] text-[#666] tracking-[1px] max-w-[450px] mb-8 leading-relaxed">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="bg-[#e8989a] text-white dmsans uppercase text-[12px] tracking-[2.5px] px-8 py-3.5 transition-colors duration-300 hover:bg-[#b9788a] cursor-pointer shadow-sm"
            >
                Back To Homepage
            </Link>
        </div>
    );
}

export default Error;