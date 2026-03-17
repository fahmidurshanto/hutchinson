"use client";
import React from 'react';

const tiers = [
    {
        name: 'Private Elite',
        status: 'Active',
        benefits: ['Dedicated Relationship Manager', 'Priority Trade Execution', 'Global Concierge Access', 'Exclusive Insight Reports'],
        color: 'from-[#D4AF37] via-[#A67C00] to-[#D4AF37]'
    },
    {
        name: 'Hutchinson Legacy',
        status: 'Available',
        benefits: ['Generational Trust Planning', 'Family Office Integration', 'Venture Capital Access', 'Estate Tax Optimization'],
        color: 'from-gray-300 via-gray-400 to-gray-300'
    }
];

export default function MembershipsPage() {
    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible">
            {/* Global Watermark - Premium Shimmering Gold */}
            <div className="absolute left-0 top-1/2 -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
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
                        Memberships
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg font-medium">
                        Explore exclusive tiers and bespoke benefit programs.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-5xl px-4 flex flex-col md:flex-row gap-8 animate__animated animate__fadeInUp relative z-10">
                {tiers.map((tier, idx) => (
                    <div key={idx} className="flex-1 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform duration-300">
                        <div className={`h-3 bg-gradient-to-r ${tier.color}`}></div>
                        <div className="p-8 pb-12 flex-1">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{tier.name}</h3>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${tier.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                    {tier.status}
                                </span>
                            </div>
                            
                            <ul className="space-y-6">
                                {tier.benefits.map((benefit, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-600 font-bold text-sm tracking-tight">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-8 pt-0 mt-auto">
                            <button className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-md
                                ${tier.status === 'Active' 
                                    ? 'bg-black text-white hover:bg-gray-900' 
                                    : 'bg-gradient-gold text-black hover:shadow-lg'}`}>
                                {tier.status === 'Active' ? 'Manage Benefits' : 'Request Upgrade'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="w-full text-center py-12 mt-8">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Hutchinson APAC Limited • Privilege Redefined</p>
            </div>
        </div>
    );
}
