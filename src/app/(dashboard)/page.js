"use client";
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import DashboardHero from './components/DashboardHero';
import UserDashboardCards from './components/cards/UserDashboardCards';

export default function DashboardHomePage() {
    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible">
            {/* Global Watermark - Premium Shimmering Gold */}
            <div className="absolute left-0 top-[260px] -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
                <img 
                    src="/lion.png" 
                    alt="" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] saturate-[2] brightness-[1.1] sepia-[0.5]" 
                />
            </div>

            <DashboardHero />
            <UserDashboardCards />
        </div>
    );
}
