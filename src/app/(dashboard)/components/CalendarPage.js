"use client";
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const upcomingSchedules = [
    { id: 1, title: 'Annual Review Meeting', date: 'Mar 15, 2026', time: '10:30 AM', type: 'Meeting' },
    { id: 2, title: 'Document Verification', date: 'Mar 18, 2026', time: '02:00 PM', type: 'Verification' },
    { id: 3, title: 'Financial Strategy Session', date: 'Mar 22, 2026', time: '11:00 AM', type: 'Consultation' },
];

const meetingSummaries = [
    { id: 1, title: 'Q1 Partnership Update', date: 'Feb 10, 2026', summary: 'Discussed global network expansion and new service application workflows.' },
    { id: 2, title: 'Legal Compliance Audit', date: 'Jan 25, 2026', summary: 'Verification of all entities completed. Minor edits requested for personal records.' },
];

export default function CalendarPage() {
    const [events] = useState([
        { title: 'Review Meeting', start: '2026-03-15T10:30:00', backgroundColor: '#10b981', borderColor: '#10b981' },
        { title: 'Doc Check', start: '2026-03-18T14:00:00', backgroundColor: 'transparent', borderColor: '#000000' },
        { title: 'Strategy Session', start: '2026-03-22T11:00:00', backgroundColor: '#10b981', borderColor: '#10b981' },
    ]);

    return (
        <div className="w-full h-full space-y-8 animate__animated animate__fadeIn relative overflow-visible">
            {/* Global Watermark - Premium Shimmering Gold */}
            <div className="absolute left-0 top-[220px] -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
                <img 
                    src="/lion.png" 
                    alt="" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] saturate-[2] brightness-[1.1] sepia-[0.5]" 
                />
            </div>

            {/* Header Section */}
            <div className="w-full text-center py-6 relative flex flex-col items-center justify-center min-h-[15vh]">
                <div className="relative z-10 w-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide text-gradient-gold bg-clip-text">
                        SCHEDULES
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">
                        Manage your appointments, meeting summaries, and upcoming schedules.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Calendar Component */}
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden">
                    <div className="bg-gradient-gold px-6 py-4 flex items-center justify-between border-b border-[#b38b22]/30">
                        <h2 className="text-black font-black text-sm tracking-widest uppercase">Monthly Schedule</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                                <span className="text-[10px] text-black font-bold uppercase">Meetings</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                                <span className="text-[10px] text-black font-bold uppercase">Tasks</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 calendar-container">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            events={events}
                            height="550px"
                            eventTextColor="#000000"
                            dayMaxEvents={true}
                        />
                    </div>
                </div>

                {/* Right Panel: Upcoming Sched & Summaries */}
                <div className="lg:col-span-4 space-y-6 flex flex-col">

                    {/* Instructions/Reminders Card */}
                    <div className="bg-gradient-gold p-6 rounded-2xl shadow-lg border border-[#b38b22]/30 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                        <div className="absolute right-[-10%] top-[-10%] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                            <svg className="w-32 h-32 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11 17l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className="text-black font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                            Instructions/Reminders
                        </h3>
                        <p className="text-black/80 text-sm font-bold leading-relaxed mb-4">
                            Please remember to bring your updated **NRIC/Passport** and **Proof of Address** for the "Document Verification" meeting on Mar 18.
                        </p>
                        <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-tighter uppercase">
                            Primary Requirement
                        </div>
                    </div>

                    {/* Upcoming Schedules Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                            <h3 className="text-gray-900 font-bold text-xs uppercase tracking-widest">Upcoming Schedules</h3>
                        </div>
                        <div className="p-4 space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar">
                            {upcomingSchedules.map(item => (
                                <div key={item.id} className="p-3 border border-gray-50 rounded-xl hover:border-[#D4AF37]/30 hover:bg-gray-50/50 transition-all group">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">{item.type}</span>
                                        <span className="text-[10px] text-[#D4AF37] font-black">{item.time}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-black group-hover:text-[#D4AF37] transition-colors line-clamp-1">{item.title}</h4>
                                    <p className="text-[10px] text-gray-800 font-medium mt-0.5">{item.date}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                            <button className="w-full text-center text-xs font-bold text-gray-500 hover:text-black transition-colors">View All Schedules</button>
                        </div>
                    </div>

                    {/* Meeting Summary Section */}
                    <div className="bg-gradient-gold rounded-2xl shadow-2xl border border-[#b38b22]/30 p-6 relative overflow-hidden group">
                        <div className="absolute right-[-5%] top-[-5%] opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                            <svg className="w-40 h-40 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                        </div>
                        <h3 className="text-black font-black text-xs uppercase tracking-widest mb-5 border-b border-black/10 pb-3">Recent Meeting Summaries</h3>
                        <div className="space-y-6 relative z-10">
                            {meetingSummaries.map(item => (
                                <div key={item.id} className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-2 before:h-2 before:bg-black before:rounded-full">
                                    <h4 className="font-black text-sm mb-1 text-black">{item.title}</h4>
                                    <p className="text-[10px] text-black/60 mb-2 font-bold">{item.date}</p>
                                    <p className="text-xs text-black/80 leading-relaxed font-bold bg-white/20 p-3 rounded-xl border border-white/30">{item.summary}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Global Style overrides for FullCalendar theme matching */}
            <style jsx global>{`
                .calendar-container .fc {
                    --fc-border-color: #f1f1f1;
                    --fc-daygrid-event-dot-width: 8px;
                    --fc-today-bg-color: #fffbeb;
                    font-family: inherit;
                }
                .calendar-container .fc-toolbar-title {
                    font-size: 1.1rem !important;
                    font-weight: 800 !important;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #A67C00;
                }
                .calendar-container .fc-button-primary {
                    background-color: #ffffff !important;
                    border-color: #D4AF37 !important;
                    color: #A67C00 !important;
                    text-transform: uppercase !important;
                    font-size: 0.7rem !important;
                    font-weight: 700 !important;
                    padding: 8px 12px !important;
                    transition: all 0.2s;
                }
                .calendar-container .fc-button-primary:hover {
                    background-color: #D4AF37 !important;
                    color: #fff !important;
                }
                .calendar-container .fc-button-active {
                    background-color: #A67C00 !important;
                    border-color: #A67C00 !important;
                    color: #fff !important;
                }
                .calendar-container .fc-col-header-cell {
                    background-color: #fffbeb;
                    padding: 10px 0 !important;
                    text-transform: uppercase;
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    color: #A67C00;
                    border-color: #f3e5ab !important;
                }
                .calendar-container .fc-daygrid-day-number {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #b38b22;
                    padding: 10px !important;
                }
                .calendar-container .fc-event {
                    border-radius: 4px;
                    padding: 2px 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    color: #000000 !important;
                }
                .calendar-container .fc-event-main,
                .calendar-container .fc-event-title,
                .calendar-container .fc-event-time {
                    color: #000000 !important;
                }
                .calendar-container .fc-daygrid-day.fc-day-today {
                    background-color: #fff9e6 !important;
                }
                .calendar-container .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
                    color: #000;
                    font-weight: 800;
                }
            `}</style>
        </div>
    );
}
