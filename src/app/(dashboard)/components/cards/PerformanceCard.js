import React from 'react';

export default function PerformanceCard() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 animate__animated animate__fadeInUp flex flex-col h-full w-full group cursor-pointer relative">
            {/* Lion logo overlay - shown on hover over entire card */}
            <div className="absolute inset-0 bg-black hover:bg-opacity-25 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <img src="/lion.png" alt="" className="w-64 h-64 object-contain" />
            </div>
            <div className="flex justify-between items-start mb-6 relative z-20">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-white duration-200">Performance Analytics</h3>
            </div>

            {/* Pseudo Chart Box */}
            <div className="flex-1 relative mt-4 h-48 w-full border-b border-l border-gray-200 group-hover:opacity-0 transition-opacity duration-200">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[1000, 900, 600, 200, 0].map(val => (
                        <div key={val} className="flex border-t border-gray-100 h-0 text-[10px] text-gray-400 -ml-6 w-full relative">
                            <span className="absolute -top-2 left-0">{val}</span>
                        </div>
                    ))}
                </div>
                {/* Line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0 80 Q 20 60, 40 80 T 80 50 T 100 20" fill="none" stroke="#D4AF37" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <path d="M0 100 L 0 80 Q 20 60, 40 80 T 80 50 T 100 20 L 100 100 Z" fill="url(#grad)" opacity="0.3" />
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
                            <stop offset="100%" stopColor="#F3E5AB" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Plot Points */}
                    <circle cx="20" cy="70" r="3" fill="#fff" stroke="#D4AF37" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <circle cx="40" cy="80" r="3" fill="#fff" stroke="#D4AF37" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <circle cx="60" cy="65" r="3" fill="#fff" stroke="#D4AF37" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <circle cx="80" cy="50" r="3" fill="#fff" stroke="#D4AF37" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
                {/* X-Axis labels */}
                <div className="absolute -bottom-6 left-0 w-full flex justify-between text-[10px] text-gray-500 px-2">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
            </div>
        </div>
    )
}
