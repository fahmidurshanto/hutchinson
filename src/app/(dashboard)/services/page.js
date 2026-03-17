"use client";
import React from 'react';

const services = [
    { id: 1, name: 'Termination', status: 'Valid' },
    { id: 2, name: 'Capital Gain tax', status: 'Valid' },
    { id: 3, name: 'Trustee fees', status: 'Valid' },
    { id: 4, name: 'Anti Money laundering', status: 'Valid' },
    { id: 5, name: 'Remittance', status: 'Valid' },
    { id: 6, name: 'Custody & services fees', status: 'Valid' },
];

export default function ServicesPage() {
    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible">
            {/* Global Watermark - Premium Shimmering Gold */}
            <div className="absolute left-0 top-[240px] -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
                <img 
                    src="/lion.png" 
                    alt="" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] saturate-[2] brightness-[1.1] sepia-[0.5]" 
                />
            </div>

            {/* Header Section */}
            <div className="w-full text-center py-8 md:py-14 mb-6 animate__animated animate__fadeIn relative flex flex-col items-center justify-center min-h-[25vh]">

                <div className="relative z-10 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide text-gradient-gold bg-clip-text uppercase">
                        Our Services
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg font-medium">
                        View the current status of your subscribed and available services.
                    </p>
                </div>
            </div>

            {/* Services List Section */}
            <div className="w-full max-w-4xl animate__animated animate__fadeInUp">
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden">
                    <div className="bg-gradient-gold px-8 py-5 flex items-center justify-between border-b border-[#b38b22]/30">
                        <h2 className="text-black font-black text-sm tracking-widest uppercase">Available Services</h2>
                        <span className="bg-black/10 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">
                            Total: {services.length}
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {services.map((service) => (
                            <div key={service.id} className="group p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-[#A67C00] transition-colors">
                                        {service.name}
                                    </h3>
                                </div>

                                <div className="flex items-center">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border shadow-sm
                                        ${service.status === 'Valid' 
                                            ? 'bg-green-50 text-green-600 border-green-100 shadow-green-900/5' 
                                            : 'bg-red-50 text-red-600 border-red-100 shadow-red-900/5'}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${service.status === 'Valid' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                        {service.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 px-8 py-4 text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Hutchinson APAC Limited • Precision & Trust</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
