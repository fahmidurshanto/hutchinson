"use client";
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import UserDocuments from '../../admin/components/UserDocuments';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function PersonalPage() {
    const router = useRouter();
    const { user } = useAppContext();
    const [isRequestingUpdate, setIsRequestingUpdate] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
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

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const [errors, setErrors] = useState({});

    // SVG Icons
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.311 4.5 12 4.5c4.689 0 8.601 3.549 9.964 7.178.07.186.07.39 0 .576-1.363 3.63-5.275 7.178-12 7.178-4.689 0-8.601-3.549-9.964-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    );

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

        try {
            const response = await api.post('/profile-updates', updateData);
            
            if (response.data.success) {
                Swal.fire({
                    title: 'Request Transmitted',
                    text: 'Your profile update request has been successfully transmitted to the Strategic Administrator. You will be notified once the changes are verified and applied.',
                    icon: 'success',
                    confirmButtonColor: '#D4AF37'
                });
                setIsRequestingUpdate(false);
            }
        } catch (error) {
            console.error('Profile update request error:', error);
            const errorMessage = error.response?.data?.message || 'Strategic update failed. Please try again later.';
            Swal.fire({
                title: 'Transmission Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#D4AF37'
            });
        }
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        let newErrors = {};
        if (!passwordData.oldPassword) newErrors.oldPassword = 'Current password is required';
        if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
        if (!passwordData.confirmPassword) newErrors.confirmPassword = 'Confirmation is required';
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Dynamic loading state for premium feel
        Swal.fire({
            title: 'Encrypting...',
            text: 'Securing your new credentials with institutional-grade protocols.',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        try {
            const response = await api.post('/user/change-password', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });

            if (response.data.success) {
                Swal.fire({
                    title: 'Security Updated',
                    text: 'Your security credentials have been successfully re-encrypted and updated in our strategic core.',
                    icon: 'success',
                    confirmButtonColor: '#D4AF37'
                });
                setIsChangingPassword(false);
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            console.error('Password change error:', error);
            const errorMessage = error.response?.data?.message || 'Strategic update failed. Please try again later.';
            Swal.fire({
                title: 'Update Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#D4AF37'
            });
        }
    };

    if (!user) return <div className="p-20 text-center font-bold text-gradient-gold">Loading Profile...</div>;

    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-visible">
            {/* Header Section */}
            <div className="w-full text-center py-6 md:py-10 mb-2 animate__animated animate__fadeIn relative flex flex-col items-center justify-center">
                <div className="relative z-10 w-full px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 tracking-tight text-gradient-gold bg-clip-text uppercase">
                        Personal Profile
                    </h1>
                    <p className="text-[10px] md:text-base text-gray-500 font-bold uppercase tracking-widest opacity-70">
                        Strategic Identity Management • Precision & Trust
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="w-full animate__animated animate__fadeInUp relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">

                    {/* Left Column - Summary & Overview */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl flex flex-col items-center text-center">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-gold flex items-center justify-center text-black font-black text-2xl sm:text-4xl shadow-2xl mb-6 uppercase border-4 border-white">
                                {user.firstName ? (user.firstName[0] + (user.lastName ? user.lastName[0] : '')) : (user.name ? user.name[0] : 'U')}
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight">
                                {user.firstName ? `${user.firstName} ${user.lastName}` : user.name}
                            </h2>
                            <p className="text-gray-400 font-bold mt-1 text-xs sm:text-sm">{user.email}</p>

                            <div className="w-full flex justify-center mt-6 sm:mt-8">
                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 min-w-[120px] sm:min-w-[140px]">
                                    <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                    <span className="text-xs font-black text-green-600 uppercase border-b border-green-100">Active</span>
                                </div>
                            </div>
                        </div>
{/* 
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl">
                            <h3 className="text-[10px] sm:text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-4 sm:mb-6 border-b border-gray-50 pb-2">Quick Overview</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-bold">Member Since</span>
                                    <span className="text-gray-950 font-black">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : (user.joined || 'Jan 2025')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-bold">Last Updates</span>
                                    <span className="text-gray-950 font-black">
                                        {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently'}
                                    </span>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Right Column - Detailed Info & Activity */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                            <div className="px-6 sm:px-8 py-5 sm:py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-[10px] sm:text-[11px] font-black text-gray-900 uppercase tracking-widest">Personal Information</h3>
                                <div className='flex gap-2
                                '>
                                    <button
                                        onClick={() => setIsChangingPassword(true)}
                                        className="text-[9px] sm:text-[10px] font-black text-[#D4AF37] border-b border-[#D4AF37]/30 uppercase tracking-widest hover:text-[#A67C00] transition-colors"
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        onClick={() => setIsRequestingUpdate(true)}
                                        className="text-[9px] sm:text-[10px] font-black text-[#D4AF37] border-b border-[#D4AF37]/30 uppercase tracking-widest hover:text-[#A67C00] transition-colors"
                                    >
                                        Request Update
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                <div>
                                    <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">First Name</label>
                                    <p className="text-sm sm:text-base text-gray-950 font-bold border-b border-gray-50 pb-1">{user.firstName || user.name?.split(' ')[0]}</p>
                                </div>
                                <div>
                                    <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Last Name</label>
                                    <p className="text-sm sm:text-base text-gray-950 font-bold border-b border-gray-50 pb-1">{user.lastName || user.name?.split(' ').slice(1).join(' ')}</p>
                                </div>
                                <div>
                                    <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Email Address</label>
                                    <p className="text-sm sm:text-base text-gray-950 font-bold border-b border-gray-50 pb-1 truncate">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Contact Number</label>
                                    <p className="text-sm sm:text-base text-gray-950 font-bold border-b border-gray-50 pb-1">{user.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">NRIC / Passport</label>
                                    <p className="text-sm sm:text-base text-gray-950 font-bold border-b border-gray-50 pb-1">{user.nric || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Nationality</label>
                                    <p className="text-sm sm:text-base text-gray-950 font-bold border-b border-gray-50 pb-1">{user.nationality || 'N/A'}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-2">Residential Address</label>
                                    <p className="text-sm sm:text-base text-gray-950 font-bold border-b border-gray-50 pb-1">{user.address || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                            <div className="px-6 sm:px-8 py-5 sm:py-6 bg-gray-50/50 border-b border-gray-100">
                                <h3 className="text-[10px] sm:text-[11px] font-black text-gray-900 uppercase tracking-widest">Account Activity</h3>
                            </div>
                            <div className="p-6 sm:p-8">
                                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                    {user.activities && user.activities.length > 0 ? (
                                        user.activities.map(activity => (
                                            <div key={activity.id} className="flex gap-4 group">
                                                <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0 group-hover:scale-125 transition-all shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>
                                                <div>
                                                    <p className="text-sm text-gray-950 font-bold group-hover:text-[#D4AF37] transition-colors uppercase tracking-tight">{activity.title}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-widest">
                                                        {activity.date} • {activity.time}
                                                    </p>
                                                    {activity.description && (
                                                        <p className="text-[11px] text-gray-500 mt-1 italic leading-relaxed border-l-2 border-gray-50 pl-2">
                                                            {activity.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No activity recorded for this period</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <UserDocuments
                            targetUserId={user._id || user.id}
                            userName={user.firstName ? `${user.firstName} ${user.lastName}` : user.name}
                        />
                    </div>
                </div>
            </div>



            {/* Information Update Request Modal - Moved outside to prevent stacking context traps */}
            {isRequestingUpdate && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-100 flex items-center justify-center p-4 animate__animated animate__fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate__animated animate__zoomIn">
                        <div className="bg-gradient-gold px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-[#b38b22]/30">
                            <div>
                                <h2 className="text-black font-black text-sm sm:text-base md:text-lg tracking-widest uppercase">Request Update</h2>
                                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-black/60 font-black uppercase tracking-widest mt-0.5 md:mt-1">Strategic verification active</p>
                            </div>
                            <button onClick={() => setIsRequestingUpdate(false)} className="bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:rotate-90 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleRequestSubmit} className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 space-y-6 sm:space-y-8 md:space-y-10 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 sm:gap-x-6 gap-y-1 sm:gap-y-2 md:gap-y-3 mb-0">
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={updateData.firstName}
                                        onChange={(e) => setUpdateData({ ...updateData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={updateData.lastName}
                                        onChange={(e) => setUpdateData({ ...updateData, lastName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Gender</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black appearance-none"
                                            value={updateData.gender}
                                            onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Contact Number</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={updateData.phone}
                                        onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={updateData.email}
                                        onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">NRIC</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={updateData.nric}
                                        onChange={(e) => setUpdateData({ ...updateData, nric: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Nationality</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        value={updateData.nationality}
                                        onChange={(e) => setUpdateData({ ...updateData, nationality: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Registered Address</label>
                                    <textarea
                                        rows={2}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black resize-none"
                                        value={updateData.address}
                                        onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                                <button
                                    type="submit"
                                    className="flex-1 py-4 sm:py-5 bg-gradient-gold text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-gold-500/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer text-[10px] sm:text-xs md:text-sm"
                                >
                                    Submit Profile Update Request
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsRequestingUpdate(false)}
                                    className="px-6 md:px-12 py-4 sm:py-5 bg-gray-100 text-gray-500 font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all cursor-pointer text-[10px] sm:text-xs md:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {isChangingPassword && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-100 flex items-center justify-center p-4 animate__animated animate__fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 w-full max-w-2xl overflow-hidden flex flex-col animate__animated animate__zoomIn">
                        <div className="bg-gradient-gold px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-[#b38b22]/30">
                            <div>
                                <h2 className="text-black font-black text-sm sm:text-base md:text-lg tracking-widest uppercase">Change Password</h2>
                                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-black/60 font-black uppercase tracking-widest mt-0.5 md:mt-1">Institutional security protocol</p>
                            </div>
                            <button onClick={() => setIsChangingPassword(false)} className="bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:rotate-90 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleChangePasswordSubmit} className="p-6 sm:p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Current Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.old ? "text" : "password"}
                                            required
                                            className={`w-full bg-gray-50 border-2 ${errors.oldPassword ? 'border-red-400' : 'border-gray-100'} rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black pr-12`}
                                            placeholder="••••••••"
                                            value={passwordData.oldPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword({ ...showPassword, old: !showPassword.old })}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                                        >
                                            {showPassword.old ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                    {errors.oldPassword && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight ml-1 animate__animated animate__headShake">{errors.oldPassword}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.new ? "text" : "password"}
                                            required
                                            className={`w-full bg-gray-50 border-2 ${errors.newPassword ? 'border-red-400' : 'border-gray-100'} rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black pr-12`}
                                            placeholder="••••••••"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                                        >
                                            {showPassword.new ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                    {errors.newPassword && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight ml-1 animate__animated animate__headShake">{errors.newPassword}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] sm:text-[10px] font-black text-[#A67C00] uppercase tracking-widest">Confirm New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.confirm ? "text" : "password"}
                                            required
                                            className={`w-full bg-gray-50 border-2 ${errors.confirmPassword ? 'border-red-400' : 'border-gray-100'} rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black pr-12`}
                                            placeholder="••••••••"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                                        >
                                            {showPassword.confirm ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight ml-1 animate__animated animate__headShake">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-gradient-gold text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer text-xs"
                                >
                                    Confirm Security Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsChangingPassword(false)}
                                    className="px-8 py-4 bg-gray-100 text-gray-500 font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all cursor-pointer text-xs"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
