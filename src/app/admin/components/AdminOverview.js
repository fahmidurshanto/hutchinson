"use client";
import React from 'react';

const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: '👥', color: 'from-blue-500 to-blue-600' },
    { label: 'Active Sessions', value: '89', change: '+5%', icon: '🟢', color: 'from-green-500 to-green-600' },
    { label: 'Pending Approvals', value: '23', change: '-3%', icon: '⏳', color: 'from-amber-500 to-amber-600' },
    { label: 'Total Revenue', value: '$2.4M', change: '+18%', icon: '💰', color: 'from-purple-500 to-purple-600' },
];

const recentActivity = [
    { user: 'Sarah Chen', action: 'Submitted new service application', time: '2 min ago', type: 'application' },
    { user: 'James Wilson', action: 'Account approved by admin', time: '15 min ago', type: 'approval' },
    { user: 'Maria Garcia', action: 'Updated company profile', time: '1 hour ago', type: 'update' },
    { user: 'Robert Kim', action: 'Password reset requested', time: '2 hours ago', type: 'security' },
    { user: 'Lisa Thompson', action: 'New document uploaded', time: '3 hours ago', type: 'document' },
];

export default function AdminOverview() {
    return (
        <div className="w-full space-y-8 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 font-medium mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Online
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl hover:border-[#D4AF37]/30 transition-all group hover:scale-[1.02]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100">
                        <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentActivity.map((item, idx) => (
                            <div key={idx} className="px-6 py-5 flex items-center gap-4 hover:bg-gray-50/80 transition-colors">
                                <div className="w-11 h-11 rounded-full bg-gradient-gold flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-md">
                                    {item.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-950 font-bold truncate">
                                        <span className="text-[#A67C00]">{item.user}</span> <span className="text-gray-400 mx-1">—</span> {item.action}
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 flex flex-col">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Quick Actions</h2>
                    <div className="space-y-3 flex-1">
                        {[
                            { label: 'Add New User', icon: '➕' },
                            { label: 'Review Applications', icon: '📋' },
                            { label: 'Generate Report', icon: '📊' },
                            { label: 'System Logs', icon: '🔍' },
                        ].map((action) => (
                            <button key={action.label} className="cursor-pointer w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-gray-50 text-xs text-gray-600 font-black uppercase tracking-widest hover:bg-gradient-gold hover:text-black transition-all hover:scale-[1.02] border border-gray-100 shadow-sm">
                                <span className="text-lg">{action.icon}</span>
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
