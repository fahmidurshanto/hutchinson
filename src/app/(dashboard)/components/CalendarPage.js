"use client";
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';

const upcomingSchedules = [
    { id: 1, title: 'Annual Review Meeting', date: 'Mar 15, 2026', time: '10:30 AM', type: 'Meeting' },
    { id: 2, title: 'Document Verification', date: 'Mar 18, 2026', time: '02:00 PM', type: 'Verification' },
    { id: 3, title: 'Financial Strategy Session', date: 'Mar 22, 2026', time: '11:00 AM', type: 'Consultation' },
];


export default function CalendarPage({ isAdmin = false }) {
    const [events, setEvents] = useState([
        { id: '1', title: 'Review Meeting', start: '2026-03-15T10:30:00', backgroundColor: '#10b981', borderColor: '#10b981' },
        { id: '2', title: 'Doc Check', start: '2026-03-18T14:00:00', backgroundColor: 'transparent', borderColor: '#000000' },
        { id: '3', title: 'Strategy Session', start: '2026-03-22T11:00:00', backgroundColor: '#10b981', borderColor: '#10b981' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'Meeting' });

    const handleDateSelect = (selectInfo) => {
        if (!isAdmin) return;
        setNewEvent({ ...newEvent, date: selectInfo.startStr });
        setIsModalOpen(true);
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        const start = `${newEvent.date}T${newEvent.time || '00:00:00'}`;
        const color = newEvent.type === 'Meeting' ? '#10b981' : 'transparent';
        const borderColor = newEvent.type === 'Meeting' ? '#10b981' : '#000000';
        
        const newEv = {
            id: String(Date.now()),
            title: newEvent.title,
            start,
            backgroundColor: color,
            borderColor: borderColor
        };

        setEvents([...events, newEv]);
        setIsModalOpen(false);
        setNewEvent({ title: '', date: '', time: '', type: 'Meeting' });

        Swal.fire({
            title: 'Schedule Confirmed!',
            text: 'The new activity has been successfully added to the agenda.',
            icon: 'success',
            background: '#ffffff',
            confirmButtonColor: '#D4AF37',
            customClass: {
                title: 'text-black font-black uppercase tracking-widest text-lg',
                content: 'text-gray-600 font-bold',
                confirmButton: 'px-8 py-3 rounded-full font-black uppercase tracking-widest'
            }
        });
    };

    const handleEventClick = (clickInfo) => {
        if (!isAdmin) return;
        
        Swal.fire({
            title: 'Cancel Schedule?',
            text: `Are you sure you want to remove '${clickInfo.event.title}' from the agenda?`,
            icon: 'warning',
            showCancelButton: true,
            background: '#ffffff',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#D4AF37',
            confirmButtonText: 'Yes, Remove It',
            cancelButtonText: 'No, Keep It',
            reverseButtons: true,
            customClass: {
                title: 'text-black font-black uppercase tracking-widest text-lg',
                content: 'text-gray-600 font-bold',
                confirmButton: 'px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]',
                cancelButton: 'px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setEvents(events.filter(ev => ev.id !== clickInfo.event.id));
                Swal.fire({
                    title: 'Removed!',
                    text: 'The schedule has been successfully removed.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#ffffff',
                    customClass: {
                        title: 'text-black font-black uppercase tracking-widest text-sm',
                    }
                });
            }
        });
    };

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
                            selectable={isAdmin}
                            selectMirror={true}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            editable={isAdmin}
                        />
                    </div>
                </div>

                {/* Right Panel: Upcoming Sched & Summaries */}
                <div className="lg:col-span-4 space-y-6 flex flex-col">


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


                </div>
            </div>

            {/* Admin Management Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate__animated animate__fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/30 w-full max-w-md overflow-hidden animate__animated animate__zoomIn">
                        <div className="bg-gradient-gold py-4 px-6 flex items-center justify-between">
                            <h3 className="text-black font-black uppercase tracking-widest text-sm">Add New Schedule</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-black hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleAddEvent} className="p-8 space-y-5">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Event Title</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                    placeholder="e.g. Executive Meeting"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Time</label>
                                    <input 
                                        type="time" 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={newEvent.time}
                                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Type</label>
                                    <select 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={newEvent.type}
                                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                                    >
                                        <option value="Meeting">Meeting</option>
                                        <option value="Task">Task</option>
                                    </select>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-4 mt-2 bg-gradient-gold text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                            >
                                Confirm Schedule
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Global Style overrides */}
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
