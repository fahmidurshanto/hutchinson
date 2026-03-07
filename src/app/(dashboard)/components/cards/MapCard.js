import React from 'react';

export default function MapCard() {
    return (
        <div className="bg-white hover:text-white rounded-xl p-6 shadow-md border border-gray-200 animate__animated animate__fadeInUp animate__delay-1s flex flex-col h-full w-full group cursor-pointer relative">
            {/* Lion logo overlay - shown on hover over entire card */}
            <div className="absolute inset-0 bg-black hover:bg-opacity-25 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <img src="/lion.png" alt="" className="w-64 h-64 object-contain" />
            </div>
            <div className="flex items-center justify-between mb-4 relative z-20">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-white duration-200">Global Reach Map</h3>
            </div>
            <div className="flex-1 relative flex items-center justify-center w-full min-h-[12rem] bg-gray-50 rounded-lg overflow-hidden border border-gray-100 group-hover:opacity-0 transition-opacity duration-200">
                {/* SVG Map mock */}
                <svg viewBox="0 0 1000 500" className="w-[120%] h-[120%] opacity-20 absolute" fill="currentColor" style={{ color: '#4b5563' }}>
                    {/* Abstract map shapes to represent continents */}
                    <path d="M200 150 Q 250 100 300 200 T 250 400 Z" />
                    <path d="M400 120 Q 500 80 600 150 T 550 300 T 450 250 Z" />
                    <path d="M650 100 Q 800 50 900 150 T 800 350 T 700 250 Z" />
                    <path d="M750 300 Q 850 400 900 450 T 700 400 Z" />
                </svg>

                {/* Map Pins */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 animate-pulse">
                    <PinIcon color="#6b7280" />
                </div>

                <div className="absolute top-1/3 right-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gradient-gold">
                    <PinIcon color="#D4AF37" />
                </div>

                <div className="absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center">
                    <PinIcon color="#D4AF37" />
                    <div className="ml-1 text-black text-xs font-bold whitespace-nowrap">APAC</div>
                </div>

                <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center">
                    <PinIcon color="#1e3a8a" />
                    <div className="ml-1 text-black text-xs font-bold whitespace-nowrap">Global</div>
                </div>

                {/* APAC highlight circle */}
                <div className="absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-900/10 rounded-full animate-ping"></div>
            </div>
        </div>
    )
}

function PinIcon({ color }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-6 h-6 drop-shadow-md">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
    )
}
