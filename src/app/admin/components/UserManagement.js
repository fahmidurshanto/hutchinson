"use client";
import React, { useState } from 'react';

const users = [
    { id: 1, name: 'Alexander Reed', email: 'alexander@hutchinson.apac', role: 'admin', status: 'active', joined: '15 Jan 2025' },
    { id: 2, name: 'Sarah Chen', email: 'sarah.chen@hutchinson.apac', role: 'client', status: 'active', joined: '22 Feb 2025' },
    { id: 3, name: 'James Wilson', email: 'james.w@partner.com', role: 'client', status: 'pending', joined: '10 Mar 2025' },
    { id: 4, name: 'Maria Garcia', email: 'maria.g@globalcorp.com', role: 'client', status: 'active', joined: '05 Apr 2025' },
    { id: 5, name: 'Robert Kim', email: 'r.kim@techventures.io', role: 'client', status: 'suspended', joined: '18 May 2025' },
    { id: 6, name: 'Lisa Thompson', email: 'lisa.t@hutchinson.apac', role: 'admin', status: 'active', joined: '01 Jun 2025' },
];

const statusStyles = {
    active: 'bg-green-900/50 text-green-400',
    pending: 'bg-amber-900/50 text-amber-400',
    suspended: 'bg-red-900/50 text-red-400',
};

const roleStyles = {
    admin: 'bg-gradient-gold text-gray-900',
    client: 'bg-gray-700 text-gray-300',
};

export default function UserManagement() {
    const [search, setSearch] = useState('');

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full space-y-6 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                    <p className="text-gray-400 mt-1">Manage partner accounts and permissions.</p>
                </div>
                <button className="cursor-pointer px-5 py-2.5 rounded-lg bg-gradient-gold text-gray-900 font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add User
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users by name or email..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
            </div>

            {/* Users Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/50">
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                                <th className="text-right px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filtered.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gradient-gold font-bold text-xs flex-shrink-0">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <p className="text-gray-500 text-xs">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${roleStyles[user.role]}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[user.status]}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{user.joined}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="cursor-pointer text-gray-400 hover:text-white transition-colors p-1">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
