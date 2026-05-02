"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import api from '@/lib/api';
import NotFound from '@/components/ui/NotFound';

export default function MembershipsPage() {
    const { user } = useAppContext();
    const [tiers, setTiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        const fetchMemberships = async () => {
            if (!user?.id) return;
            try {
                const response = await api.get(`/user/memberships/${user.id}`);
                if (response.data.success) {
                    setTiers(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching memberships:', error);
                if (error.response?.status === 404) {
                    setIsNotFound(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMemberships();
    }, [user]);

    const renderTierCard = (tier, idx) => (
        <div key={idx} className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden flex items-center gap-4 px-5 py-4 w-full mb-3 hover:shadow-lg hover:border-gray-200 transition-all duration-300 shadow-sm">
            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300 ${tier.status === 'active' ? 'bg-gradient-to-b from-[#D4AF37] to-[#f0d060]' : 'bg-gray-200 group-hover:bg-gray-300'}`} />

            {/* Icon */}
            <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ml-1 ${tier.status === 'active' ? 'bg-[#D4AF37]/10' : 'bg-gray-100'}`}>
                <svg className={`w-4 h-4 ${tier.status === 'active' ? 'text-[#D4AF37]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
            </div>

            {/* Name + amount */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-black text-gray-900 tracking-wide uppercase leading-tight truncate">{tier.name}</h3>
                <div className='flex gap-2 text-[12px] font-medium'>
                    <span className="text-zinc-600">Amount:</span>
                    <span className="text-zinc-600">{tier.amount ?? '—'}</span>
                </div>
            </div>

            {/* Status badge */}
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border transition-all duration-200 shrink-0 ${tier.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                {tier.status === 'active' ? '● Active' : '○ Inactive'}
            </span>
        </div>
    );


    const primaryTiers = tiers.filter(t => t.type === 'primary');
    const thirdPartyTiers = tiers.filter(t => t.type === 'third_party');

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isNotFound) {
        return <NotFound title="Memberships Unavailable" message="We were unable to retrieve your membership data at this time." backLink="/" backText="Home" />;
    }

    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible pb-20">
            {/* Global Watermark - hidden on mobile/tablet to avoid overflow and prioritize performance */}
            <div className="hidden xl:block absolute left-0 top-1/2 -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
                <img
                    src="/lion.png"
                    alt=""
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] saturate-[2] brightness-[1.1] sepia-[0.5]"
                />
            </div>

            {/* Header Section */}
            <div className="w-full text-center py-8 md:py-14 animate__animated animate__fadeIn relative flex flex-col items-center justify-center min-h-[15vh] md:min-h-[25vh]">
                <div className="relative z-10 w-full px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tight text-gradient-gold bg-clip-text uppercase leading-none">
                        Strategic Partners
                    </h1>
                    <p className="text-[10px] sm:text-xs md:text-base text-gray-400 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto opacity-70">
                        Dual-Categorized Entity Overview • Excellence & Trust
                    </p>
                </div>
            </div>

            {/* Side-by-Side Content Section */}
            <div className="w-full max-w-7xl px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 animate__animated animate__fadeInUp relative z-10 pb-20">

                {/* Primary Column */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 sm:gap-6 mb-6 md:mb-10">
                        <div className="h-[2px] w-6 sm:w-10 bg-[#D4AF37] rounded-full"></div>
                        <h2 className="text-sm sm:text-lg font-black text-gray-900 tracking-[0.3em] uppercase">
                            Primary
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                        {primaryTiers.map((tier, idx) => renderTierCard(tier, idx))}
                        {primaryTiers.length === 0 && (
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center py-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">No primary entities recorded</p>
                        )}
                    </div>
                </div>

                {/* 3rd Party Column */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 sm:gap-6 mb-6 md:mb-10">
                        <div className="h-[2px] w-6 sm:w-10 bg-gray-400 rounded-full"></div>
                        <h2 className="text-sm sm:text-lg font-black text-gray-900 tracking-[0.3em] uppercase">
                            Marketing Agents
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                        {thirdPartyTiers.map((tier, idx) => renderTierCard(tier, idx))}
                        {thirdPartyTiers.length === 0 && (
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center py-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">No third-party alliances recorded</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full text-center py-20 mt-10">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.4em] opacity-60">Hutchinson APAC Limited • Privilege Redefined • Since 2025</p>
            </div>
        </div>
    );
}
