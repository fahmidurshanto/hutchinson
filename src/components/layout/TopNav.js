"use client";
import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function TopNav() {
    const { user, activeTab, setActiveTab } = useAppContext();
    const tabs = ['DASHBOARD', 'REPORTS', 'SERVICE APPLICATIONS', 'ADMIN'];

    return (
        <header className="fixed top-0 left-0 w-full h-20 bg-gradient-silver-horizontal flex items-center z-50 px-4 md:px-8 shadow-sm"
            style={{ paddingLeft: 'calc(4rem + 2rem)' }}> {/* 4rem for sidebar + 2rem padding */}

            {/* Brand Area */}
            <div className="absolute left-0 top-0 h-[120%] w-48 md:w-64 bg-white shadow-lg flex items-center justify-center rounded-br-[3rem] border-b-4 border-r-4 border-transparent z-50"><div className="flex flex-col items-center justify-center mt-2">
                <img src="/hutchinson-logo.png" alt="Hutchinson APAC Ltd." className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-md" />
            </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex flex-1 ml-48 lg:ml-64 space-x-1 lg:space-x-8 h-full items-end">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer h-full px-6 flex items-center justify-center font-bold text-xs lg:text-sm tracking-wide transition-colors border-b-4 ${activeTab === tab
                            ? 'bg-[#2a303c] text-white border-gradient-gold'
                            : 'text-gray-700 border-transparent hover:bg-gray-200/50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            {/* Right side: User Profile */}
            <div className="ml-auto flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 text-gray-700 font-medium">
                    {/* Shield icon */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gradient-gold drop-shadow-sm">
                        <path d="M12 2L22 6v6.5C22 17.74 17.65 22.53 12 24 6.35 22.53 2 17.74 2 12.5V6l10-4zM12 4.2L4 7.4v5.1C4 16.58 7.35 20.4 12 21.8c4.65-1.4 8-5.22 8-9.3V7.4l-8-3.2z" />
                        <path d="M11 7h2v5h-2z" />
                        <path d="M11 13h2v2h-2z" />
                    </svg>
                    <span>{user.name}</span>
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-gold shadow-md">
                    {/* User icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

        </header>
    );
}
