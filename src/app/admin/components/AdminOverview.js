"use client";
import React from 'react';
import { useAppContext } from '@/context/AppContext';

export default function AdminOverview() {
    const { userList } = useAppContext();

    // Real computed stats
    const totalUsers = userList?.length ?? 0;
    const activeSessions = userList?.filter(u => (u.status || u.Status || '').toLowerCase() === 'active').length ?? 0;

    // Aggregate all activities from all users, sort newest first, take top 5
    const recentActivity = (userList || [])
        .flatMap(u =>
            (u.activities || []).map(act => ({
                user: u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
                action: act.description || act.title || 'Performed an action',
                time: act.time ? `${act.date} ${act.time}` : act.date || '',
                id: act.id || 0,
            }))
        )
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (
        <div className="w-full space-y-8 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">Welcome, here's what's happening today.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Online
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xl hover:border-[#D4AF37]/30 transition-all group hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xl sm:text-2xl">👥</span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">Live</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{totalUsers}</p>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xl hover:border-[#D4AF37]/30 transition-all group hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xl sm:text-2xl">🟢</span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">Live</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{activeSessions}</p>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">Active Users</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-50">
                    {recentActivity.length === 0 ? (
                        <div className="px-6 py-10 text-center text-gray-400 text-sm font-bold uppercase tracking-widest opacity-50">
                            No activity recorded yet
                        </div>
                    ) : (
                        recentActivity.map((item, idx) => (
                            <div key={idx} className="px-6 py-5 flex items-center gap-4 hover:bg-gray-50/80 transition-colors">
                                <div className="w-11 h-11 rounded-full bg-gradient-gold flex items-center justify-center text-black font-black text-sm flex-shrink-0 shadow-md">
                                    {item.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-950 font-bold truncate">
                                        <span className="text-[#A67C00]">{item.user}</span>
                                        <span className="text-gray-400 mx-1">—</span>
                                        {item.action}
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
