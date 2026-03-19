"use client";
import React, { useState } from 'react';

const initialPrimaryTiers = [
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

const initialThirdPartyTiers = [
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

// Edit Status Popup Modal
function EditStatusModal({ tier, group, onClose, onConfirm }) {
    const newStatus = tier.status === 'Active' ? 'Inactive' : 'Active';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal card */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm mx-4 p-7 flex flex-col gap-5 animate-fadeInScale"
                onClick={e => e.stopPropagation()}
            >
                {/* Icon + title */}
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${newStatus === 'Active' ? 'bg-green-50' : 'bg-gray-100'}`}>
                        {newStatus === 'Active' ? (
                            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{group}</p>
                        <h3 className="text-sm font-black text-gray-900 tracking-tight uppercase leading-tight">{tier.name}</h3>
                    </div>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    Change membership status from{' '}
                    <span className={`font-bold ${tier.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                        {tier.status}
                    </span>{' '}
                    to{' '}
                    <span className={`font-bold ${newStatus === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                        {newStatus}
                    </span>
                    ?
                </p>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(newStatus)}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 shadow-sm ${newStatus === 'Active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                    >
                        Set {newStatus}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0); }
                }
                .animate-fadeInScale {
                    animation: fadeInScale 0.18s ease-out both;
                }
            `}</style>
        </div>
    );
}

export default function MembershipsPage() {
    const [primaryTiers, setPrimaryTiers] = useState(initialPrimaryTiers);
    const [thirdPartyTiers, setThirdPartyTiers] = useState(initialThirdPartyTiers);
    const [editTarget, setEditTarget] = useState(null); // { tier, idx, group }

    // Called when user confirms the status change in the popup
    const handleStatusChange = (newStatus) => {
        const { idx, group } = editTarget;

        if (group === 'Primary') {
            const updated = primaryTiers.map((t, i) =>
                i === idx ? { ...t, status: newStatus } : t
            );
            setPrimaryTiers(updated);
            console.log('[Membership Status Change]', {
                group: 'Primary',
                name: primaryTiers[idx].name,
                oldStatus: primaryTiers[idx].status,
                newStatus,
            });
        } else {
            const updated = thirdPartyTiers.map((t, i) =>
                i === idx ? { ...t, status: newStatus } : t
            );
            setThirdPartyTiers(updated);
            console.log('[Membership Status Change]', {
                group: '3rd Party',
                name: thirdPartyTiers[idx].name,
                oldStatus: thirdPartyTiers[idx].status,
                newStatus,
            });
        }

        setEditTarget(null);
    };

    const renderTierCard = (tier, idx, group) => (
        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex items-center justify-between px-6 py-5 w-full mb-4 hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
            <h3 className="text-sm font-black text-gray-900 tracking-tight uppercase leading-tight">{tier.name}</h3>

            {/* Status badge + edit icon */}
            <div className="flex items-center gap-2 shrink-0">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${tier.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                    {tier.status}
                </span>

                {/* Edit pencil icon */}
                <button
                    onClick={() => setEditTarget({ tier, idx, group })}
                    title="Change status"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-[#D4AF37] hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all duration-200"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l-4 1 1-4 9.293-9.293a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L9 13z" />
                    </svg>
                </button>
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
                        {primaryTiers.map((tier, idx) => renderTierCard(tier, idx, 'Primary'))}
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
                        {thirdPartyTiers.map((tier, idx) => renderTierCard(tier, idx, '3rd Party'))}
                    </div>
                </div>
            </div>
            
            <div className="w-full text-center py-20 mt-10">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.4em] opacity-60">Hutchinson APAC Limited • Privilege Redefined • Since 2025</p>
            </div>

            {/* Edit Status Modal */}
            {editTarget && (
                <EditStatusModal
                    tier={editTarget.tier}
                    group={editTarget.group}
                    onClose={() => setEditTarget(null)}
                    onConfirm={handleStatusChange}
                />
            )}
        </div>
    );
}
