"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import AdminTopNav from '../../components/layout/AdminTopNav';
import Footer from '../../components/layout/Footer';

export default function AdminLayout({ children }) {
    const { user, isAuthChecked } = useAppContext();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Don't make any decision until auth check is complete
        if (!isAuthChecked) return;

        if (user?.role === 'admin' || user?.role === 'superadmin') {
            setIsAuthorized(true);
        } else {
            // Non-admin or not logged in → redirect to home
            router.replace('/');
        }
    }, [user, isAuthChecked, router]);

    // Show spinner while checking authorization
    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#D4AF37] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col overflow-x-hidden relative">
            <AdminTopNav />

            <main className="pt-24 md:pt-32 lg:pt-[100px] transition-all duration-300 flex-1">
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
