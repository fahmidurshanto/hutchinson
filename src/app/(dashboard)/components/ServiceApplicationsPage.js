"use client";
import React, { useState } from 'react';

const serviceCategories = [
    { id: 'global', label: 'Global Network Services', icon: '🌐' },
    { id: 'report', label: 'Report Services', icon: '📄' },
    { id: 'advisory', label: 'Advisory Services', icon: '🧑‍💼' },
];

const activeApplications = [
    { id: 'APAC-001', type: 'Global Services', date: '22 Jun', status: 'Pending Approval', statusColor: '#3b82f6' },
    { id: 'APAC-002', type: 'Report Services', date: '20 Jun', status: 'under Review', statusColor: '#eab308' },
    { id: 'APAC-003', type: 'Advisory Services', date: '15 Jun', status: 'Completed', statusColor: '#9ca3af' },
];

export default function ServiceApplicationsPage() {
    const [selectedCategory, setSelectedCategory] = useState('global');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [details, setDetails] = useState('');

    const selectedLabel = serviceCategories.find(c => c.id === selectedCategory)?.label || '';

    return (
        <div className="w-full h-full flex flex-col items-center">
            {/* Hero Section */}
            <div className="w-full text-center py-8 md:py-14 mb-6 animate__animated animate__fadeIn relative overflow-hidden flex flex-col items-center justify-center min-h-[28vh]">
                {/* Watermark Logo */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[20%] w-[500px] h-[500px] opacity-[0.12] pointer-events-none z-0 mix-blend-multiply flex items-center justify-center">
                    <img src="/hutchinson-logo.png" alt="" className="w-full h-full object-contain filter drop-shadow-2xl" />
                </div>

                <div className="relative z-10 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide text-gradient-gold bg-clip-text">
                        SERVICE APPLICATIONS PORTAL
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg font-medium">
                        Select and track your service applications from our extensive menu.
                    </p>
                </div>
            </div>

            {/* Main Content: Two-panel layout */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 animate__animated animate__fadeInUp">

                {/* Left Panel: New Application */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                    {/* Header with gold gradient */}
                    <div className="bg-gradient-gold px-6 py-3">
                        <h2 className="text-sm font-bold text-gray-900 tracking-widest text-center uppercase">New Application</h2>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-5">New Application Submission</h3>

                        {/* Select Service Category */}
                        <label className="text-sm font-semibold text-gray-800 mb-2">Select Service Category</label>
                        <div className="relative mb-5">
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium text-gray-800 hover:border-[#D4AF37] transition-colors focus:outline-none focus:border-[#D4AF37]"
                            >
                                <span>{selectedLabel}</span>
                                <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate__animated animate__fadeIn animate__faster">
                                    {serviceCategories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => { setSelectedCategory(cat.id); setDropdownOpen(false); }}
                                            className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${selectedCategory === cat.id
                                                ? 'bg-gradient-gold text-gray-900 font-bold'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="text-base">{cat.icon}</span>
                                            <span>{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Application Details */}
                        <label className="text-sm font-semibold text-gray-800 mb-2">Application Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border-2 border-gray-200 p-3 text-sm text-gray-800 resize-none focus:outline-none focus:border-[#D4AF37] transition-colors mb-5"
                            placeholder="Describe your application requirements..."
                        />

                        {/* Upload Documents */}
                        <label className="text-sm font-semibold text-gray-800 mb-2">Upload Documents</label>
                        <button className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            Upload Documents
                        </button>

                        {/* Submit Button */}
                        <button className="cursor-pointer mt-6 w-full py-3 rounded-lg bg-gradient-gold text-gray-900 font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                            SUBMIT APPLICATION
                        </button>
                    </div>
                </div>

                {/* Right Panel: Active Applications Table */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 pb-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Your Active Applications</h2>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gray-200 bg-gray-50">
                                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs tracking-wide uppercase">Application ID</th>
                                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs tracking-wide uppercase">Service Type</th>
                                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs tracking-wide uppercase">Submitted Date</th>
                                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs tracking-wide uppercase">Current Status</th>
                                    <th className="text-right px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeApplications.map((app, idx) => (
                                    <tr key={app.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${idx === activeApplications.length - 1 ? 'border-b-0' : ''}`}>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{app.id}</td>
                                        <td className="px-6 py-4 text-gray-700">{app.type}</td>
                                        <td className="px-6 py-4 text-gray-500">{app.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: app.statusColor }}></span>
                                                <span className="text-gray-700 font-medium">{app.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button className="cursor-pointer text-[#D4AF37] font-semibold text-sm hover:underline">View Details</button>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer: Flags Bar */}
            <div className="mt-10 mb-4 flex items-center justify-center gap-3 bg-gray-100 px-8 py-3 rounded-full shadow-sm">
                <span className="text-xl" title="Spain">🇪🇸</span>
                <span className="text-xl" title="France">🇫🇷</span>
                <span className="text-xl" title="Germany">🇩🇪</span>
                <span className="text-xl" title="United Kingdom">🇬🇧</span>
                <span className="text-xl" title="Global">🌐</span>
            </div>
        </div>
    );
}
