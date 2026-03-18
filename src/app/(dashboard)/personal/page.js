"use client";
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function PersonalPage() {
    const { user } = useAppContext();
    const [isRequestingUpdate, setIsRequestingUpdate] = useState(false);
    const [updateData, setUpdateData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        email: '',
        nric: '',
        nationality: '',
        address: ''
    });

    useEffect(() => {
        if (user) {
            setUpdateData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                gender: user.gender || '',
                phone: user.phone || '',
                email: user.email || '',
                nric: user.nric || '',
                nationality: user.nationality || '',
                address: user.address || ''
            });
        }
    }, [user]);



    const handleRequestSubmit = async (e) => {
        e.preventDefault();

        // Dynamic loading state for premium feel
        Swal.fire({
            title: 'Verifying Identity...',
            text: 'Preparing your update request for strategic review.',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        // Simulate API call to send request to admin
        setTimeout(() => {
            Swal.fire({
                title: 'Request Transmitted',
                text: 'Your profile update request has been successfully transmitted to the Strategic Administrator. You will be notified once the changes are verified and applied.',
                icon: 'success',
                confirmButtonColor: '#D4AF37'
            });
            setIsRequestingUpdate(false);
        }, 2000);
    };

    if (!user) return <div className="p-20 text-center font-bold text-gradient-gold">Loading Profile...</div>;

    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible">
            {/* Global Watermark - Premium Shimmering Gold */}
            <div className="absolute left-0 top-1/2 -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.25] pointer-events-none z-0 flex items-center justify-center">
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
                        Personal Profile
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg font-medium">
                        Manage your individual identity and personal preferences.
                    </p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-4xl animate__animated animate__fadeInUp relative z-10 space-y-8">
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden">
                    <div className="bg-gradient-gold px-8 py-5 flex items-center justify-between border-b border-[#b38b22]/30">
                        <h2 className="text-black font-black text-sm tracking-widest uppercase text-center w-full">Identity Details</h2>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        {/* Summary Section */}
                        <div className="flex flex-col md:flex-row items-center gap-8 pb-12 border-b border-gray-100">
                            <div className="w-32 h-32 rounded-full bg-gradient-gold p-1 flex items-center justify-center shadow-xl">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-[#D4AF37]">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">{user.name}</h3>
                                <p className="text-sm font-black text-[#A67C00] uppercase tracking-[0.2em] mb-4">{user.role === 'admin' ? 'Strategic Administrator' : 'Elite Private Client'}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <span className="px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-[10px] font-black uppercase tracking-widest text-green-600">Active Status</span>
                                    <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600">Verified Profile</span>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">First Name</p>
                                <p className="text-lg font-bold text-gray-900">{user.firstName || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Last Name</p>
                                <p className="text-lg font-bold text-gray-900">{user.lastName || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Gender</p>
                                <p className="text-lg font-bold text-gray-900">{user.gender || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Contact Number</p>
                                <p className="text-lg font-bold text-gray-900">{user.phone || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Email Address</p>
                                <p className="text-lg font-bold text-gray-900">{user.email}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">NRIC</p>
                                <p className="text-lg font-bold text-gray-900">{user.nric || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Nationality</p>
                                <p className="text-lg font-bold text-gray-900">{user.nationality || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Registered Address</p>
                                <p className="text-sm font-bold text-gray-900 leading-relaxed">{user.address || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
                        <div className="flex gap-6 items-center">
                            <button
                                onClick={() => setIsRequestingUpdate(true)}
                                className="text-xs font-black text-[#A67C00] uppercase tracking-widest hover:underline cursor-pointer flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Request Information Update
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Hutchinson APAC Limited • Precision & Trust</p>
                    </div>
                </div>

                {/* Information Update Request Modal */}
                {isRequestingUpdate && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate__animated animate__fadeIn">
                        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                            <div className="bg-gradient-gold px-8 py-6 flex items-center justify-between border-b border-[#b38b22]/30">
                                <div>
                                    <h2 className="text-black font-black text-lg tracking-widest uppercase">Request Profile Update</h2>
                                    <p className="text-[10px] text-black/60 font-black uppercase tracking-widest mt-1">Changes are subject to verification by the Strategic Administrator</p>
                                </div>
                                <button onClick={() => setIsRequestingUpdate(false)} className="bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-black group-hover:scale-110 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleRequestSubmit} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                            value={updateData.firstName}
                                            onChange={(e) => setUpdateData({ ...updateData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                            value={updateData.lastName}
                                            onChange={(e) => setUpdateData({ ...updateData, lastName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Gender</label>
                                        <select
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black appearance-none"
                                            value={updateData.gender}
                                            onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Contact Number</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                            value={updateData.phone}
                                            onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                            value={updateData.email}
                                            onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">NRIC</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                            value={updateData.nric}
                                            onChange={(e) => setUpdateData({ ...updateData, nric: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Nationality</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                            value={updateData.nationality}
                                            onChange={(e) => setUpdateData({ ...updateData, nationality: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Registered Address</label>
                                        <textarea
                                            rows={2}
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black resize-none"
                                            value={updateData.address}
                                            onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col md:flex-row gap-6">
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-gradient-gold text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-gold-500/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        Submit Request to Admin
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsRequestingUpdate(false)}
                                        className="px-12 py-4 bg-gray-100 text-gray-500 font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}
