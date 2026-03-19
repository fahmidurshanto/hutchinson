"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import NotFound from '@/components/ui/NotFound';

// No longer using hardcoded initialServices


// Edit Status Popup Modal
function EditStatusModal({ service, onClose, onConfirm }) {
    const newStatus = service.status === 'Valid' ? 'Invalid' : 'Valid';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal card */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm mx-4 p-7 flex flex-col gap-5 animate-fadeInScale"
                onClick={e => e.stopPropagation()}
            >
                {/* Icon + title */}
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${newStatus === 'Valid' ? 'bg-green-50' : 'bg-red-50'}`}>
                        {newStatus === 'Valid' ? (
                            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Service</p>
                        <h3 className="text-sm font-black text-gray-900 tracking-tight leading-tight">{service.name}</h3>
                    </div>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    Change service status from{' '}
                    <span className={`font-bold ${service.status === 'Valid' ? 'text-green-600' : 'text-red-500'}`}>
                        {service.status}
                    </span>{' '}
                    to{' '}
                    <span className={`font-bold ${newStatus === 'Valid' ? 'text-green-600' : 'text-red-500'}`}>
                        {newStatus}
                    </span>
                    ?
                </p>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(newStatus)}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 shadow-sm ${newStatus === 'Valid' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                        Set {newStatus}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0); }
                }
                .animate-fadeInScale {
                    animation: fadeInScale 0.18s ease-out both;
                }
            `}</style>
        </div>
    );
}

export default function ServicesPage() {
    const params = useParams();
    const userId = params.id;
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    const [editTarget, setEditTarget] = useState(null); // the service being edited

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get(`/user/user-services/${userId}`);
                if (response.data.success) {
                    setServices(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
                if (error.response?.status === 404) {
                    setIsNotFound(true);
                }
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchServices();
    }, [userId]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isNotFound) {
        return <NotFound title="User Not Found" message="The user whose services you are trying to manage is not registered in the system." />;
    }

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await api.patch(`/user/user-services/${userId}`, {
                serviceName: editTarget.name,
                status: newStatus
            });

            if (response.data.success) {
                setServices(response.data.data);
            }
        } catch (error) {
            console.error('[Service Status Change Error]', error);
        } finally {
            setEditTarget(null);
        }
    };

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
            <div className="w-full text-center py-8 md:py-14 mb-6 animate__animated animate__fadeIn relative flex flex-col items-center justify-center min-h-[25vh]">
                <div className="relative z-10 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide text-gradient-gold bg-clip-text uppercase">
                        Our Services
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg font-medium">
                        View the current status of your subscribed and available services.
                    </p>
                </div>
            </div>

            {/* Services List Section */}
            <div className="w-full max-w-4xl animate__animated animate__fadeInUp">
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden">
                    <div className="bg-gradient-gold px-8 py-5 flex items-center justify-between border-b border-[#b38b22]/30">
                        <h2 className="text-black font-black text-sm tracking-widest uppercase">Available Services</h2>
                        <span className="bg-black/10 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">
                            Total: {services.length}
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {services.map((service, idx) => (
                            <div key={idx} className="group p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-[#A67C00] transition-colors">
                                        {service.name}
                                    </h3>
                                </div>

                                {/* Status badge + edit icon */}
                                <div className="flex items-center gap-2">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border shadow-sm
                                        ${service.status === 'Valid'
                                            ? 'bg-green-50 text-green-600 border-green-100 shadow-green-900/5'
                                            : 'bg-red-50 text-red-600 border-red-100 shadow-red-900/5'}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${service.status === 'Valid' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                        {service.status}
                                    </span>

                                    {/* Edit pencil icon — always visible */}
                                    <button
                                        onClick={() => setEditTarget(service)}
                                        title="Change status"
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-[#D4AF37] hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all duration-200"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l-4 1 1-4 9.293-9.293a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L9 13z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 px-8 py-4 text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Hutchinson APAC Limited • Precision & Trust</p>
                    </div>
                </div>
            </div>

            {/* Edit Status Modal */}
            {editTarget && (
                <EditStatusModal
                    service={editTarget}
                    onClose={() => setEditTarget(null)}
                    onConfirm={handleStatusChange}
                />
            )}
        </div>
    );
}
