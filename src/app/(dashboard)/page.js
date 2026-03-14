"use client";
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import DashboardHero from './components/DashboardHero';
import UserDashboardCards from './components/cards/UserDashboardCards';

export default function DashboardHomePage() {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <DashboardHero />
            <UserDashboardCards />
        </div>
    );
}
