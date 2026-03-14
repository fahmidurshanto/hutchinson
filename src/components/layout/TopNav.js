"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';

export default function TopNav() {
    const pathname = usePathname();
    const { user, activeTab, setActiveTab } = useAppContext();
    const tabs = ['DASHBOARD', 'REPORTS', 'SERVICES', 'SCHEDULE', 'ADMIN'];

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-gradient-silver-horizontal shadow-xl">

            {/* ══════════════════════════════════════════════════════
                CONTAINER 1 — Branding (logo) + User Info
                White curved band. Logo is absolute inside, overflows below.
            ══════════════════════════════════════════════════════ */}
            <div className="relative w-full flex items-center h-12 bg-white shadow-lg overflow-visible">

                {/* Logo Panel — overflows below Container 1 into Container 2 */}
                <div className="absolute left-0 top-0 w-[180px] h-[102px] bg-white rounded-br-[2.5rem] flex items-center justify-center shadow-lg z-50">
                    <img
                        src="/hutchinson-logo.png"
                        alt="Hutchinson APAC Ltd."
                        className="w-[120px] h-[90px] object-contain"
                    />
                </div>

                {/* User Info — pushed right of logo */}
                <div className="ml-[180px] flex-1 flex items-center justify-end pr-6 gap-3 h-full">



                    {/* Shield icon + name */}
                    <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-[#D4AF37] drop-shadow-sm">
                            <path d="M12 1L3 5v6.09c0 5.05 3.41 9.76 9 10.91 5.59-1.15 9-5.86 9-10.91V5l-9-4zm0 2.18l7 3.12V11c0 3.94-2.6 7.6-7 8.79-4.4-1.19-7-4.85-7-8.79V6.3l7-3.12z" />
                        </svg>
                        <span className="font-semibold text-sm text-[#3a3a3a]">{user.name}</span>
                    </div>

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md shrink-0 bg-gradient-gold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>


                    {/* Login Button */}
                    <Link href="/login" className="px-5 py-1.5 rounded-full bg-gradient-gold text-gray-900 text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all mr-2">
                        Login
                    </Link>
                    {/* Logout */}
                    <Link
                        href="/login"
                        title="Logout"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                CONTAINER 2 — Navigation Links
                Silver bar, tabs start after the logo width.
            ══════════════════════════════════════════════════════ */}
            <div className="w-full bg-gradient-to-r from-[#939391] via-[#b7b8b2] to-[#a4a39f]">
                <nav className="flex items-stretch h-11 ml-[180px] md:ml-[12%]">
                    {tabs.map((tab) => {
                        const isReportRoute = tab === 'REPORTS';
                        const isAdminRoute = tab === 'ADMIN';
                        const isServicesRoute = tab === 'SERVICES';
                        const isRoute = isReportRoute || isAdminRoute || isServicesRoute;

                        let href = '/';
                        if (isReportRoute) href = '/reports';
                        if (isAdminRoute) href = '/admin';
                        if (isServicesRoute) href = '/services';
                        if (tab === 'SCHEDULE') href = '/schedule';

                        // Active logic: 
                        // 1. If it's a dedicated route, check pathname
                        // 2. If it's a home tab (only DASHBOARD now), check if we are on home AND activeTab matches
                        const isActive = isRoute
                            ? pathname.startsWith(href)
                            : (pathname === '/' && activeTab === tab);

                        const tabContent = (
                            <span className={`flex items-center h-full px-6 font-bold text-xs tracking-[0.08em] whitespace-nowrap border-b-[3px] transition-colors cursor-pointer select-none
                                ${isActive
                                    ? 'bg-[linear-gradient(180deg,#1e232d_100%,#2a303c_0%)] text-white border-[#D4AF37]'
                                    : 'text-[#4a4a4a] border-transparent hover:bg-black/5'
                                }`}
                            >
                                {tab}
                            </span>
                        );

                        return (
                            <Link
                                key={tab}
                                href={href}
                                className="flex items-stretch"
                                onClick={() => {
                                    if (!isRoute) setActiveTab(tab);
                                }}
                            >
                                {tabContent}
                            </Link>
                        );
                    })}
                </nav>
            </div>

        </header>
    );
}
