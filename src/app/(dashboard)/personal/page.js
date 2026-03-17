"use client";
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function PersonalPage() {
    const { user, changePassword } = useAppContext();
    const [isChangingPass, setIsChangingPass] = useState(false);
    const [passData, setPassData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const handlePassChange = async (e) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            return Swal.fire('Error', 'New passwords do not match', 'error');
        }

        try {
            await changePassword({ 
                oldPassword: passData.oldPassword, 
                newPassword: passData.newPassword 
            }, user?.role === 'user' || user?.role === 'client');
            
            Swal.fire('Success', 'Password changed successfully', 'success');
            setIsChangingPass(false);
            setPassData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
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
                                    <span className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500">NRIC: {user.nric || 'N/A'}</span>
                                    <span className="px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-[10px] font-black uppercase tracking-widest text-green-600">Active Status</span>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Email Address</p>
                                <p className="text-lg font-bold text-gray-900">{user.email}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Contact Number</p>
                                <p className="text-lg font-bold text-gray-900">{user.phone || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Nationality</p>
                                <p className="text-lg font-bold text-gray-900">{user.nationality || 'N/A'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-[#A67C00] uppercase tracking-[0.2em]">Address</p>
                                <p className="text-sm font-bold text-gray-900 leading-relaxed">{user.address || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Hutchinson APAC Limited • Precision & Trust</p>
                        <button 
                            onClick={() => setIsChangingPass(true)}
                            className="text-xs font-black text-[#A67C00] uppercase tracking-widest hover:underline cursor-pointer"
                        >
                            Security Settings & Password
                        </button>
                    </div>
                </div>

                {/* Password Change Form */}
                {isChangingPass && (
                    <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden animate__animated animate__fadeInUp">
                        <div className="bg-[#1A1A1A] px-8 py-5 flex items-center justify-between border-b border-gray-800">
                            <h2 className="text-[#D4AF37] font-black text-sm tracking-widest uppercase">Update Security Key</h2>
                            <button onClick={() => setIsChangingPass(false)} className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handlePassChange} className="p-8 md:p-12 flex flex-col items-center gap-8">
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Current Security Key</label>
                                    <input 
                                        required
                                        type="password" 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={passData.oldPassword}
                                        onChange={(e) => setPassData({...passData, oldPassword: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">New Security Key</label>
                                    <input 
                                        required
                                        type="password" 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={passData.newPassword}
                                        onChange={(e) => setPassData({...passData, newPassword: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Confirm New Key</label>
                                    <input 
                                        required
                                        type="password" 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={passData.confirmPassword}
                                        onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="px-12 py-4 bg-gradient-gold text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-gold-500/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                Verify & Update
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
