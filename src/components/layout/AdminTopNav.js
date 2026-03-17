"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';

export default function AdminTopNav() {
    const pathname = usePathname();
    const { user } = useAppContext();
    
    const tabs = [
        { name: 'OVERVIEW', href: '/admin' },
        { name: 'USERS', href: '/admin/users' },
        { name: 'DOCUMENTS', href: '/admin/documents' },
        { name: 'ACTIVITIES', href: '/admin/activities' },
        { name: 'SCHEDULE', href: '/admin/schedule' }
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-gradient-silver-horizontal shadow-xl">

            {/* CONTAINER 1 — Branding + Admin Info */}
            <div className="relative w-full flex items-center h-12 bg-white shadow-lg overflow-visible">

                {/* Logo Panel */}
                <div className="absolute left-0 top-0 w-[180px] h-[102px] bg-white rounded-br-[2.5rem] flex items-center justify-center shadow-lg z-50">
                    <img
                        src="/hutchinson-logo.png"
                        alt="Hutchinson APAC Ltd."
                        className="w-[120px] h-[90px] object-contain"
                    />
                </div>

                {/* Admin Info */}
                <div className="ml-[180px] flex-1 flex items-center justify-end pr-6 gap-3 h-full">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-gold text-gray-900 text-[10px] font-black tracking-widest shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L22 6v6.5C22 17.74 17.65 22.53 12 24 6.35 22.53 2 17.74 2 12.5V6l10-4z" />
                        </svg>
                        ADMIN
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#3a3a3a]">{user.name}</span>
                    </div>

                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md bg-gradient-gold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Logout */}
                    <Link
                        href="/login"
                        title="Logout"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* CONTAINER 2 — Navigation Links */}
            <div className="w-full bg-gradient-to-r from-[#939391] via-[#b7b8b2] to-[#a4a39f]">
                <nav className="flex items-stretch h-11 ml-[180px] md:ml-[12%]">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;

                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className="flex items-stretch"
                            >
                                <span className={`flex items-center h-full px-6 font-bold text-xs tracking-[0.08em] whitespace-nowrap border-b-[3px] transition-colors cursor-pointer select-none
                                    ${isActive
                                        ? 'bg-[linear-gradient(180deg,#1e232d_100%,#2a303c_0%)] text-white border-[#D4AF37]'
                                        : 'text-[#4a4a4a] border-transparent hover:bg-black/5'
                                    }`}
                                >
                                    {tab.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
