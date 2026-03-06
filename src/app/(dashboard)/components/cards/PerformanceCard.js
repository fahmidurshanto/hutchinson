import React from 'react';

export default function PerformanceCard() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 animate__animated animate__fadeInUp flex flex-col h-full w-full" style={{ borderColor: 'rgba(184, 155, 94, 0.2)' }}>
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-gray-800">Performance Overview</h3>
                <div className="text-yellow-600 w-6 h-6" style={{ color: '#b89b5e' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.44 3.59 2.97 1.9.48 2.5 1.13 2.5 1.92 0 .53-.35 1.54-2.28 1.54-1.76 0-2.34-.88-2.42-1.71H7.86c.1 1.62 1.32 2.76 3.04 3.14V19h2.33v-1.67c1.47-.31 2.88-1.28 2.88-3.14 0-1.88-1.4-2.55-3.8-3.05z" />
                    </svg>
                </div>
            </div>

            {/* Pseudo Chart Box */}
            <div className="flex-1 relative mt-4 h-48 w-full border-b border-l border-gray-200">
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
                    <path d="M0 80 Q 20 60, 40 80 T 80 50 T 100 20" fill="none" stroke="#b89b5e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <path d="M0 100 L 0 80 Q 20 60, 40 80 T 80 50 T 100 20 L 100 100 Z" fill="url(#grad)" opacity="0.2" />
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#b89b5e" stopOpacity="1" />
                            <stop offset="100%" stopColor="#b89b5e" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Plot Points */}
                    <circle cx="20" cy="70" r="3" fill="#fff" stroke="#b89b5e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <circle cx="40" cy="80" r="3" fill="#fff" stroke="#b89b5e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <circle cx="60" cy="65" r="3" fill="#fff" stroke="#b89b5e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <circle cx="80" cy="50" r="3" fill="#fff" stroke="#b89b5e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
                {/* X-Axis labels */}
                <div className="absolute -bottom-6 left-0 w-full flex justify-between text-[10px] text-gray-500 px-2">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
            </div>
        </div>
    )
}
