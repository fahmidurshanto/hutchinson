"use client";
import React, { useState } from 'react';

const activitiesData = {
    present: [
        { id: 1, title: 'Annual Review with CEO', date: 'Mar 15, 2026', time: '10:30 AM', status: 'In Progress', description: 'Annual strategic planning and performance review.' },
        { id: 2, title: 'Network Expansion Briefing', date: 'Mar 17, 2026', time: '02:00 PM', status: 'Pending', description: 'Discussion on new APAC market entries.' },
        { id: 3, title: 'Corporate Compliance Audit', date: 'Mar 19, 2026', time: '11:00 AM', status: 'Scheduled', description: 'Routine verification of corporate governance standards.' },
    ],
    future: [
        { id: 4, title: 'Q2 Financial Planning', date: 'Apr 05, 2026', time: '09:00 AM', status: 'Planned', description: 'Quarterly budget allocation and resource management.' },
        { id: 5, title: 'Legal Team Synchronization', date: 'Apr 12, 2026', time: '03:30 PM', status: 'Planned', description: 'Regulatory update and policy alignment session.' },
    ],
    past: [
        { id: 6, title: 'Asset Management Strategy', date: 'Feb 28, 2026', time: '11:00 AM', status: 'Completed', description: 'Review of the previous quarter\'s asset distribution.' },
        { id: 7, title: 'Global Liaison Summit', date: 'Feb 20, 2026', time: '01:00 PM', status: 'Completed', description: 'Meeting with international partners for regional updates.' },
    ]
};

export default function ActivitiesPage() {
    const [activeTab, setActiveTab] = useState('present');

    const tabs = [
        { id: 'present', label: 'Present Week' },
        { id: 'future', label: 'Future Week' },
        { id: 'past', label: 'Past Week' }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible">
            {/* Global Watermark - Premium Shimmering Gold */}
            <div className="absolute left-0 top-[240px] -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
                <img
                    src="/lion.png"
                    alt=""
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] saturate-[2] brightness-[1.1] sepia-[0.5]"
                />
            </div>

            {/* Header Section */}
            <div className="w-full text-center py-8 md:py-14 mb-6 animate__animated animate__fadeIn relative flex flex-col items-center justify-center min-h-[20vh]">
                <div className="relative z-10 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide text-gradient-gold bg-clip-text uppercase">
                        Admin Activities Panel
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg font-medium">
                        Monitor and oversee all historical, current, and upcoming corporate engagements.
                    </p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="w-full max-w-4xl mb-12 flex justify-center animate__animated animate__fadeIn">
                <div className="bg-white p-2 rounded-2xl border-2 border-gray-50 flex gap-2 shadow-2xl overflow-hidden relative">
                    {/* Active tab slide background effect could be added here for extra polish */}
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 relative z-10
                                ${activeTab === tab.id
                                    ? 'bg-gradient-gold text-black shadow-lg scale-[1.05]'
                                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activities List Section */}
            <div className="w-full max-w-4xl animate__animated animate__fadeInUp pb-24">
                <div className="space-y-8">
                    {activitiesData[activeTab].map((activity) => (
                        <div key={activity.id} className="group bg-white shadow-2xl border border-gray-50 overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 hover:scale-[1.01] flex flex-col sm:flex-row rounded-[2rem]">
                            {/* Metallic Edge Accent */}
                            <div className="sm:w-3 bg-gradient-to-b from-[#fcfcfc] via-[#cecece] to-[#8a8a8a] shadow-inner"></div>

                            <div className="flex-1 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="px-4 py-1.5 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-green-100 flex items-center gap-2 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            {activity.status}
                                        </div>
                                        <div className="text-[10px] text-[#A67C00] font-black uppercase tracking-[0.2em]">{activity.time}</div>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-950 tracking-tight group-hover:text-[#A67C00] transition-colors mb-2 uppercase">
                                        {activity.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-bold italic leading-relaxed">
                                        "{activity.description}"
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-3 shrink-0">
                                    <div className="text-right bg-gray-50/50 px-4 py-2 rounded-xl border border-gray-50">
                                        <div className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Assigned Date</div>
                                        <div className="text-gray-950 font-black text-sm tracking-tight">{activity.date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {activitiesData[activeTab].length === 0 && (
                    <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-gray-100 uppercase">
                        <p className="text-gray-400 font-black tracking-[0.3em] text-xs">No activities documented for this period</p>
                    </div>
                )}
            </div>
        </div>
    );
}
