"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { initialUsers } from '@/data/users';

const statusStyles = {
    active: 'bg-green-50 text-green-600 border border-green-100',
    pending: 'bg-amber-50 text-amber-600 border border-amber-100',
    suspended: 'bg-red-50 text-red-600 border border-red-100',
};

export default function UserManagement() {
    const router = useRouter();
    const [userList, setUserList] = useState(initialUsers);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', status: 'active' });

    const filtered = userList.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({ name: user.name, email: user.email, password: '', status: user.status });
        } else {
            setEditingUser(null);
            setFormData({ name: '', email: '', password: '', status: 'active' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'client', status: 'active' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingUser) {
            setUserList(userList.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
            Swal.fire({
                title: 'User Updated',
                text: 'The partner information has been successfully updated.',
                icon: 'success',
                confirmButtonColor: '#D4AF37'
            });
        } else {
            const newUser = {
                id: Date.now(),
                ...formData,
                role: 'client',
                joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            };
            setUserList([newUser, ...userList]);
            Swal.fire({
                title: 'User Added',
                text: 'A new partner has been registered successfully.',
                icon: 'success',
                confirmButtonColor: '#D4AF37'
            });
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
        }).then((result) => {
            if (result.isConfirmed) {
                setUserList(userList.filter(u => u.id !== id));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'User has been removed from the portal.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
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
                    Add User
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
                    placeholder="Search users by name or email..."
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-gray-50 text-gray-950 font-bold text-sm placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-all shadow-xl"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/50">
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">User</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Joined</th>
                                <th className="text-right px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((user) => (
                                <tr 
                                    key={user.id} 
                                    onClick={() => router.push(`/admin/users/${user.id}`)}
                                    className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-silver text-gray-700 flex items-center justify-center font-black text-xs flex-shrink-0 shadow-sm border border-gray-100 uppercase">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-gray-950 font-bold group-hover:text-[#A67C00] transition-colors">{user.name}</p>
                                                <p className="text-gray-400 text-[11px] font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => toggleStatus(user)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 ${statusStyles[user.status]}`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                            {user.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-bold">{user.joined}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleOpenModal(user)}
                                                className="cursor-pointer text-gray-400 hover:text-[#A67C00] transition-colors p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 shadow-sm hover:shadow"
                                                title="Edit User"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
                    <div className="bg-white rounded-[2rem] shadow-2xl border-2 border-[#D4AF37]/30 w-full max-w-lg overflow-hidden animate__animated animate__zoomIn flex flex-col max-h-[90vh]">
                        <div className="bg-gradient-gold py-5 px-8 flex items-center justify-between shrink-0">
                            <h3 className="text-black font-black uppercase tracking-widest text-sm">
                                {editingUser ? 'Edit Partner Account' : 'Register New Partner'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-black hover:scale-110 transition-transform cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="p-10 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Full Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        placeholder="Enter partner name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Email Address</label>
                                    <input 
                                        required
                                        type="email" 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Password</label>
                                    <input 
                                        required={!editingUser}
                                        type="password" 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black"
                                        placeholder={editingUser ? "Leave blank to keep current" : "Enter password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Initial Status</label>
                                    <select 
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] outline-none transition-all font-bold text-black cursor-pointer"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 mt-4 bg-gradient-gold text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-gold-500/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                {editingUser ? 'Update Account' : 'Register Partner'}
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
