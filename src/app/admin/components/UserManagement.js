"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { initialUsers } from '@/data/users';

import { useAppContext } from '@/context/AppContext';

const statusStyles = {
    active: 'bg-green-50 text-green-600 border border-green-100',
    pending: 'bg-amber-50 text-amber-600 border border-amber-100',
    suspended: 'bg-red-50 text-red-600 border border-red-100',
};

export default function UserManagement() {
    const router = useRouter();
    const { userList, setUserList, registerUser, updateUser, deleteUser } = useAppContext();
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        Phone: '', 
        gender: 'male', 
        nric: '', 
        address: '', 
        nationality: '',
        status: 'active' 
    });

    const filtered = userList.filter(u =>
        (u.firstName + ' ' + u.lastName).toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({ 
                firstName: user.firstName || user.name.split(' ')[0], 
                lastName: user.lastName || user.name.split(' ').slice(1).join(' '), 
                email: user.email, 
                password: '', 
                Phone: user.Phone || '', 
                gender: user.gender || 'male', 
                nric: user.nric || '', 
                address: user.address || '', 
                nationality: user.nationality || '',
                status: user.status 
            });
        } else {
            setEditingUser(null);
            setFormData({ 
                firstName: '', 
                lastName: '', 
                email: '', 
                password: '', 
                Phone: '', 
                gender: 'male', 
                nric: '', 
                address: '', 
                nationality: '',
                status: 'active' 
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (editingUser) {
            try {
                const response = await updateUser(editingUser._id || editingUser.id, formData);
                if (response.success) {
                    Swal.fire({
                        title: 'User Updated',
                        text: 'User details have been synchronized with the server.',
                        icon: 'success',
                        confirmButtonColor: '#D4AF37'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Update Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#D33'
                });
            }
        } else {
            try {
                await registerUser(formData);
                // fetchAllUsers is called in AppContext via useEffect on userList change or manually
                Swal.fire({
                    title: 'User Registered',
                    text: 'A new partner has been registered successfully in the backend.',
                    icon: 'success',
                    confirmButtonColor: '#D4AF37'
                });
            } catch (error) {
                Swal.fire({
                    title: 'Registration Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#D33'
                });
            }
        }
        handleCloseModal();
    };

    const handleDelete = (id, name) => {
        Swal.fire({
            title: 'Remove Partner?',
            text: `Are you sure you want to delete ${name}? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#D4AF37',
            confirmButtonText: 'Yes, Remove Partner',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(id);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'User has been removed from the server.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Delete Failed',
                        text: error.message,
                        icon: 'error',
                        confirmButtonColor: '#D33'
                    });
                }
            }
        });
    };

    const toggleStatus = (user) => {
        if (user.role === 'admin') return; // Only one admin allowed, status locked
        const statuses = ['active', 'pending', 'suspended'];
        const currentIndex = statuses.indexOf(user.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        
        setUserList(userList.map(u => u.id === user.id ? { ...u, status: nextStatus } : u));
    };

    return (
        <div className="w-full space-y-6 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">Users</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage partner accounts and permissions.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-gold text-black font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-gold-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Register User
                </button>
            </div>

            {/* Search */}
            <div className="relative group">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search partners by name or email..."
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-gray-50 text-gray-950 font-bold text-sm placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-all shadow-xl"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/50">
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Partner</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Joined</th>
                                <th className="text-right px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((u) => (
                                <tr 
                                    key={u._id || u.id} 
                                    className="hover:bg-gray-50/80 transition-colors group"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-silver text-gray-700 flex items-center justify-center font-black text-xs flex-shrink-0 shadow-sm border border-gray-100 uppercase">
                                                {u.firstName ? (u.firstName[0] + (u.lastName ? u.lastName[0] : '')) : (u.name ? u.name[0] : 'U')}
                                            </div>
                                            <div>
                                                <p className="text-gray-950 font-bold group-hover:text-[#A67C00] transition-colors">{u.firstName ? `${u.firstName} ${u.lastName}` : u.name}</p>
                                                <p className="text-gray-400 text-[11px] font-medium">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => toggleStatus(u)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 ${statusStyles[u.status]}`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                            {u.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-bold">{u.joined || new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleOpenModal(u)}
                                                className="cursor-pointer text-gray-400 hover:text-[#A67C00] transition-colors p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 shadow-sm hover:shadow"
                                                title="Edit User"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(u._id || u.id, u.firstName || u.name)}
                                                className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 shadow-sm hover:shadow"
                                                title="Delete User"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate__animated animate__fadeIn">
                    <div className="bg-white rounded-[2rem] shadow-2xl border-2 border-[#D4AF37]/30 w-full max-w-2xl overflow-hidden animate__animated animate__zoomIn flex flex-col max-h-[90vh]">
                        <div className="bg-gradient-gold py-5 px-8 flex items-center justify-between shrink-0">
                            <h3 className="text-black font-black uppercase tracking-widest text-sm">
                                {editingUser ? 'Edit Partner Details' : 'Register Corporate Partner'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-black hover:scale-110 transition-transform cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto custom-scrollbar p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Personal Info */}
                                    <div className="space-y-6">
                                        <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Identity Details</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">First Name</label>
                                                <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Last Name</label>
                                                <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Gender</label>
                                            <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black cursor-pointer" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">NRIC / Passport No.</label>
                                            <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black" placeholder="S1234567A" value={formData.nric} onChange={(e) => setFormData({...formData, nric: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Nationality</label>
                                            <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black" placeholder="Singaporean" value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} />
                                        </div>
                                    </div>

                                    {/* Contact & Security */}
                                    <div className="space-y-6">
                                        <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Corporate Contact</h4>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Corporate Email</label>
                                            <input required type="email" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black" placeholder="partner@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Phone Number</label>
                                            <input required type="tel" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black" placeholder="+65 8888 8888" value={formData.Phone} onChange={(e) => setFormData({...formData, Phone: e.target.value})} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Address</label>
                                            <textarea required rows="2" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black resize-none" placeholder="Enter full address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                                        </div>
                                        {!editingUser && (
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Security Key (Password)</label>
                                                <input required type="password" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black" placeholder="Min. 6 characters" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-gradient-gold text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-gold-500/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer mt-4"
                                >
                                    {editingUser ? 'Synchronize Details' : 'Finalize Registration'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
