"use client";
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '@/lib/error-utils';
import DashboardModal from '@/components/ui/DashboardModal';

export default function UserStageManagement({ userId, userName }) {
    const [stages, setStages] = useState([]);
    const [globalStages, setGlobalStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStage, setEditingStage] = useState(null);

    const [formData, setFormData] = useState({
        stage: '',
        sequence: 1,
        description: '',
        remark: '',
        remarkLabel: '',
        status: 'upcoming',
        time: new Date().toISOString()
    });

    useEffect(() => {
        if (userId) {
            fetchUserStages();
            fetchGlobalStages();
        }
    }, [userId]);

    const fetchUserStages = async () => {
        try {
            const res = await api.get(`/stage/user/${userId}`);
            if (res.data.success) {
                setStages(res.data.stage || []);
            }
        } catch (err) {
            console.error('Failed to fetch user stages:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchGlobalStages = async () => {
        try {
            const res = await api.get('/stage/getall');
            if (res.data.success) {
                setGlobalStages(res.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch global stages:', err);
        }
    };

    const handleOpenModal = (stage = null) => {
        if (stage) {
            setEditingStage(stage);
            setFormData({
                stage: stage.name || '',
                sequence: stage.sequence || 1,
                description: stage.description || '',
                remark: stage.remark || '',
                remarkLabel: stage.remarkLabel || '',
                status: stage.status || 'upcoming',
                time: stage.time ? new Date(stage.time).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
            });
        } else {
            setEditingStage(null);
            setFormData({
                stage: globalStages[0] || '',
                sequence: stages.length + 1,
                description: '',
                remark: '',
                remarkLabel: '',
                status: 'upcoming',
                time: new Date().toISOString().slice(0, 16)
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingStage) {
                // Edit existing stage
                await api.put(`/stage/user/${userId}?stage=${editingStage._id}`, formData);
                Swal.fire('Updated', 'User stage has been updated.', 'success');
            } else {
                // Add new stage
                await api.post(`/stage/user/${userId}`, formData);
                Swal.fire('Added', 'New stage assigned to user.', 'success');
            }
            fetchUserStages();
            setIsModalOpen(false);
        } catch (error) {
            Swal.fire('Error', getFriendlyErrorMessage(error), 'error');
        }
    };

    const handleDelete = async (stageId) => {
        const result = await Swal.fire({
            title: 'Delete Stage?',
            text: 'Are you sure you want to remove this stage from the user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/stage/user/${userId}?stage=${stageId}`);
                Swal.fire('Deleted', 'Stage removed.', 'success');
                fetchUserStages();
            } catch (error) {
                Swal.fire('Error', getFriendlyErrorMessage(error), 'error');
            }
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-5 sm:py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-[10px] sm:text-xs font-black text-gray-950 uppercase tracking-widest">User Journey Stages</h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Manage lifecycle for {userName}</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md"
                >
                    + Assign Stage
                </button>
            </div>

            <div className="p-6 sm:p-8">
                {loading ? (
                    <div className="flex justify-center py-6">
                        <div className="w-6 h-6 border-2 border-gray-200 border-t-[#D4AF37] rounded-full animate-spin"></div>
                    </div>
                ) : stages.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No stages assigned yet</p>
                        <button onClick={() => handleOpenModal()} className="mt-4 text-[10px] font-black text-[#D4AF37] uppercase tracking-widest hover:underline">
                            Assign your first stage
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stages.sort((a,b) => a.sequence - b.sequence).map((s) => (
                            <div key={s._id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#D4AF37]/30 transition-all gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-black text-[10px] text-gray-400">
                                        {s.sequence}
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm font-black text-gray-950 group-hover:text-[#A67C00] transition-colors">{s.name}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                                s.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' :
                                                s.status === 'processed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                'bg-gray-100 text-gray-400 border-gray-200'
                                            }`}>
                                                {s.status}
                                            </span>
                                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">
                                                {new Date(s.time).toLocaleDateString()} {new Date(s.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2 self-end sm:self-center">
                                    <button onClick={() => handleOpenModal(s)} className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </button>
                                    <button onClick={() => handleDelete(s._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <DashboardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStage ? 'Edit Journey Stage' : 'Assign New Stage'}
                footer={
                    <div className="flex gap-3">
                        <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-100 text-gray-500 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-gray-200">Cancel</button>
                        <button onClick={handleSave} className="px-6 py-2 bg-black text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-gray-800 shadow-lg">Save Stage</button>
                    </div>
                }
            >
                <form className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Stage Name</label>
                        <select 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-black"
                            value={formData.stage}
                            onChange={e => setFormData({...formData, stage: e.target.value})}
                        >
                            {globalStages.map(gs => <option key={gs} value={gs}>{gs}</option>)}
                            {!globalStages.includes(formData.stage) && formData.stage && <option value={formData.stage}>{formData.stage}</option>}
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Sequence</label>
                            <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-black" value={formData.sequence} onChange={e => setFormData({...formData, sequence: parseInt(e.target.value)})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Status</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-black" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                                <option value="processed">Processed</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Date & Time</label>
                        <input type="datetime-local" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-black" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Description</label>
                        <textarea rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-black resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Main details about this stage..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Remark Label</label>
                            <input className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-black" value={formData.remarkLabel} onChange={e => setFormData({...formData, remarkLabel: e.target.value})} placeholder="e.g. KYC Status" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Remark</label>
                            <input className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-black" value={formData.remark} onChange={e => setFormData({...formData, remark: e.target.value})} placeholder="Additional notes..." />
                        </div>
                    </div>
                </form>
            </DashboardModal>
        </div>
    );
}
