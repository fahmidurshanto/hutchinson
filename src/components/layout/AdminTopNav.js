"use client";
import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

export default function AdminTopNav() {
    const { user, adminTab, setAdminTab } = useAppContext();
    const tabs = ['OVERVIEW', 'USER MANAGEMENT', 'SETTINGS'];

    return (
        <header className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center z-50 px-4 md:px-8 shadow-lg"
            style={{ paddingLeft: 'calc(4rem + 2rem)' }}>

            {/* Brand Area */}
            <div className="absolute left-0 top-0 h-[120%] w-48 md:w-64 bg-gray-950 shadow-lg flex items-center justify-center shadow-white/20 rounded-br-[3rem]  border-transparent z-50"
                style={{ borderImage: 'var(--gradient-gold) 1', borderImageSlice: '1' }}>
                <div className="flex flex-col items-center justify-center mt-2">
                    <img src="/hutchinson-logo.png" alt="Hutchinson APAC Ltd." className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-md" />
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex flex-1 ml-48 lg:ml-64 space-x-1 lg:space-x-6 h-full items-end">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setAdminTab(tab)}
                        className={`cursor-pointer h-full px-6 flex items-center justify-center font-bold text-xs lg:text-sm tracking-wide transition-colors border-b-4 ${adminTab === tab
                            ? 'bg-gradient-gold text-gray-900 border-transparent'
                            : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            {/* Right side: Admin Badge + User + Logout */}
            <div className="ml-auto flex items-center space-x-4">
                {/* Admin Badge */}
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-gold text-gray-900 text-xs font-bold tracking-wide shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L22 6v6.5C22 17.74 17.65 22.53 12 24 6.35 22.53 2 17.74 2 12.5V6l10-4z" />
                    </svg>
                    ADMIN
                </span>

                <div className="hidden sm:flex items-center space-x-2 text-gray-300 font-medium">
                    <span>{user.name}</span>
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 bg-gradient-gold shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Logout */}
                <Link href="/login" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors" title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                </Link>
            </div>
        </header>
    );
}
