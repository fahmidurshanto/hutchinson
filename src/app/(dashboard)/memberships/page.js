"use client";
import React from 'react';

const primaryTiers = [
    { 
        name: 'AMIHAN DEL SOL', 
        status: 'Active', 
        color: 'from-[#D4AF37] via-[#A67C00] to-[#D4AF37]',
        benefits: ['Dedicated Asset Management', 'Direct Private Equity Access', 'Exclusive Concierge Services']
    },
    { 
        name: 'MTF (IAC)', 
        status: 'Inactive', 
        color: 'from-gray-300 via-gray-400 to-gray-300',
        benefits: ['Institutional Advisory', 'Trade Compliance Support', 'Risk Allocation Reports']
    },
    { 
        name: 'VACATION DOWN UNDER', 
        status: 'Inactive', 
        color: 'from-gray-300 via-gray-400 to-gray-300',
        benefits: ['Luxury Travel Desk', 'Global Resort Access', 'Premium Leisure Planning']
    },
    { 
        name: 'NIXDORF – AX VENTURES LIMITED', 
        status: 'Inactive', 
        color: 'from-gray-300 via-gray-400 to-gray-300',
        benefits: ['Venture Capital Insight', 'Seed Phase Opportunities', 'Strategic Tech Integration']
    },
    { 
        name: 'ASIAN TRAVEL CLUB', 
        status: 'Inactive', 
        color: 'from-gray-300 via-gray-400 to-gray-300',
        benefits: ['Regional Network Perks', 'Exclusive Gateway Access', 'Bespoke Itinerary Curation']
    }
];

const thirdPartyTiers = [
    { 
        name: 'TEMPLETON TRUSTEE', 
        status: 'Inactive', 
        color: 'from-gray-200 via-gray-300 to-gray-200',
        benefits: ['Asset Liquidation Planning', 'Trustee Oversight', 'Fiduciary Compliance']
    },
    { 
        name: 'AX HOLDINGS LIMITED', 
        status: 'Inactive', 
        color: 'from-gray-200 via-gray-300 to-gray-200',
        benefits: ['Portfolio Management', 'Holding Optimization', 'Group Strategy Access']
    },
    { 
        name: 'ASIALINX PTE LTD', 
        status: 'Inactive', 
        color: 'from-gray-200 via-gray-300 to-gray-200',
        benefits: ['Cross-Border Facilitation', 'Logistics Optimization', 'Regional Trade Advisory']
    },
    { 
        name: 'AX VENTURES LIMITED', 
        status: 'Inactive', 
        color: 'from-gray-200 via-gray-300 to-gray-200',
        benefits: ['Emerging Market Access', 'Direct Investment Rounds', 'Innovation Mentorship']
    },
    { 
        name: 'NIXDORF PTE LTD', 
        status: 'Inactive', 
        color: 'from-gray-200 via-gray-300 to-gray-200',
        benefits: ['Market Intelligence', 'Operations Consulting', 'Local Implementation Support']
    },
    { 
        name: 'NIXDAX PTE LTD', 
        status: 'Inactive', 
        color: 'from-gray-200 via-gray-300 to-gray-200',
        benefits: ['Digital Asset Strategy', 'Platform Synergies', 'Next-Gen FinTech Access']
    }
];

export default function MembershipsPage() {
    const renderTierCard = (tier, idx) => (
        <div key={idx} className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col group hover:scale-[1.03] transition-all duration-500 w-full mb-8">
            <div className={`h-3 bg-gradient-to-r ${tier.color}`}></div>
            <div className="p-8 pb-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-6">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight uppercase">{tier.name}</h3>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0 ${tier.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                        {tier.status}
                    </span>
                </div>
                
                <ul className="space-y-5 flex-1">
                    {tier.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-4 animate__animated animate__fadeIn" style={{ animationDelay: `${bIdx * 0.1}s` }}>
                            <div className="mt-1 w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center shrink-0 shadow-sm">
                                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-600 font-bold text-sm tracking-tight">{benefit}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">Hutchinson Excellence</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible pb-20">
            {/* Global Watermark - Premium Shimmering Gold */}
            <div className="absolute left-0 top-1/2 -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
                <img 
                    src="/lion.png" 
                    alt="" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] saturate-[2] brightness-[1.1] sepia-[0.5]" 
                />
            </div>

            {/* Header Section */}
            <div className="w-full text-center py-8 md:py-14 mb-10 animate__animated animate__fadeIn relative flex flex-col items-center justify-center min-h-[30vh]">
                <div className="relative z-10 w-full px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-gradient-gold bg-clip-text uppercase">
                        Partnerships
                    </h1>
                    <p className="text-gray-500 text-base md:text-xl font-medium max-w-2xl mx-auto">
                        A dual-categorized overview of your primary entities and strategic third-party alliances.
                    </p>
                </div>
            </div>

            {/* Side-by-Side Content Section */}
            <div className="w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 animate__animated animate__fadeInUp relative z-10">
                
                {/* Primary Column */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="h-[3px] w-12 bg-[#D4AF37] rounded-full"></div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-[0.2em] uppercase">
                            Primary
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    <div className="flex flex-col">
                        {primaryTiers.map((tier, idx) => renderTierCard(tier, idx))}
                    </div>
                </div>

                {/* 3rd Party Column */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="h-[3px] w-12 bg-gray-400 rounded-full"></div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-[0.2em] uppercase">
                            3rd Party
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    <div className="flex flex-col">
                        {thirdPartyTiers.map((tier, idx) => renderTierCard(tier, idx))}
                    </div>
                </div>
            </div>
            
            <div className="w-full text-center py-20 mt-10">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.4em] opacity-60">Hutchinson APAC Limited • Privilege Redefined • Since 2025</p>
            </div>
        </div>
    );
}
