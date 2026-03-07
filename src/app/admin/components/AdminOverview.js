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
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-gray-400 mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Online
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800">
                        <h2 className="text-lg font-bold text-white">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-gray-800">
                        {recentActivity.map((item, idx) => (
                            <div key={idx} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-800/50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gradient-gold font-bold text-sm flex-shrink-0">
                                    {item.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white font-medium truncate"><span className="text-gradient-gold">{item.user}</span> — {item.action}</p>
                                    <p className="text-xs text-gray-500">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex flex-col">
                    <h2 className="text-lg font-bold text-white mb-5">Quick Actions</h2>
                    <div className="space-y-3 flex-1">
                        {[
                            { label: 'Add New User', icon: '➕' },
                            { label: 'Review Applications', icon: '📋' },
                            { label: 'Generate Report', icon: '📊' },
                            { label: 'System Logs', icon: '🔍' },
                        ].map((action) => (
                            <button key={action.label} className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 text-sm text-gray-300 font-medium hover:bg-gray-700 hover:text-white transition-colors">
                                <span>{action.icon}</span>
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
