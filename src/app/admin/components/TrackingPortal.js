"use client";
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '@/lib/error-utils';
import DashboardModal from '../../../components/ui/DashboardModal';

const initialStages = [
    {
        id: 1,
        title: "Hutchinson Ascrow trust fund - London",
        status: "PROCESSED",
        date: "Past, 01, 2026",
        time: "02:56 PM",
        icon: "🛡️",
        remark: "Initial Funding: £2.5M GBP received. Documentation verified. Funds moved to domestic sterling account.",
        remarkLabel: "AML check complete and approved."
    },
    {
        id: 2,
        title: "Fidelity Ascrow Limited - Bristol",
        status: "PROCESSED",
        date: "Past, 30, 2026",
        time: "02:56 PM",
        icon: "🏦",
        remark: "Currency Conversion: Conversion from GBP to CHF initiated. Hedging contract executed. Funds transfer to Swiss bank confirmed.",
        remarkLabel: "Standard conversion rate applied."
    },
    {
        id: 3,
        title: "Ascrow Swiss Limited",
        status: "PROCESSED",
        date: "Past, 30, 2026",
        time: "03:21 PM",
        icon: "📦",
        remark: "CHF Ingestion: Funds arrived in CHF account. Cross-border conversion. Cross-border fees applied. Funds consolidated.",
        remarkLabel: "Swiss-specific reporting form 109 filed."
    },
    {
        id: 4,
        title: "Dominica Republic Ascrow Trust",
        status: "PROCESSED",
        date: "Past, 01, 2026",
        time: "03:21 PM",
        icon: "💰",
        remark: "Onshore to Offshore Transfer: Funds moved to tax-neutral domicile. Legal structure check completed.",
        remarkLabel: "Ascrow agreement amendment #1 applied."
    },
    {
        id: 5,
        title: "Hutchinson (India)",
        status: "PROCESSED",
        date: "Past, 01, 2026",
        time: "02:56 PM",
        icon: "⚖️",
        remark: "Sub-Project Allocation: Funds allocated for Bangalore tech center expansion. Compliance with Indian FEMA regulations confirmed.",
        remarkLabel: "Local director approval received."
    },
    {
        id: 6,
        title: "Ascrow (UAE) Limited",
        status: "PROCESSED",
        date: "Past, 30, 2026",
        time: "02:56 PM",
        icon: "🏢",
        remark: "Final Allocation: Funds moved to UAE Ascrow for real estate JV project in Dubai. Final stage before BVI consolidation.",
        remarkLabel: "UAE Central Bank clearance obtained."
    },
    {
        id: 7,
        title: "BVI Ascrow Limited",
        status: "ACTIVE",
        label: "LIVE",
        date: "MAR 30, 2026",
        time: "02:56 PM",
        icon: "🏛️",
        current: true,
        remark: "Current Balance: 2.15M AED. Pending allocation for Dubai real estate JV. Final KYC verification for new partners in progress.",
        remarkLabel: "Urgent action needed - Signator update required."
    }
];

export default function TrackingPortal() {
    const [viewMode, setViewMode] = useState('detailed'); // 'simple' or 'detailed'
    const [stages, setStages] = useState(initialStages);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStage, setEditingStage] = useState(null);
    const [globalStages, setGlobalStages] = useState([]);
    const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
    const [newGlobalName, setNewGlobalName] = useState('');
    const [editingGlobal, setEditingGlobal] = useState(null);

    const [transactionInfo, setTransactionInfo] = useState({
        id: "HAF-49382",
        total: "[Confidential]",
        lastUpdate: new Date().toLocaleString()
    });

    useEffect(() => {
        fetchGlobalStages();
    }, []);

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

    const handleAddGlobal = async () => {
        try {
            await api.post('/stage/add', { name: newGlobalName });
            Swal.fire('Added', 'Global stage created.', 'success');
            setNewGlobalName('');
            fetchGlobalStages();
        } catch (error) {
            Swal.fire('Error', getFriendlyErrorMessage(error), 'error');
        }
    };

    const handleEditGlobal = async (oldName) => {
        const { value: newName } = await Swal.fire({
            title: 'Edit Global Stage',
            input: 'text',
            inputValue: oldName,
            showCancelButton: true
        });

        if (newName && newName !== oldName) {
            try {
                await api.put('/stage/edit', { oldName, newName });
                Swal.fire('Updated', 'Global stage updated.', 'success');
                fetchGlobalStages();
            } catch (error) {
                Swal.fire('Error', getFriendlyErrorMessage(error), 'error');
            }
        }
    };

    const handleDeleteGlobal = async (name) => {
        const result = await Swal.fire({
            title: 'Delete Global Stage?',
            text: `Remove "${name}" from the system master list?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                await api.delete('/stage/delete', { data: { name } });
                Swal.fire('Deleted', 'Global stage removed.', 'success');
                fetchGlobalStages();
            } catch (error) {
                Swal.fire('Error', getFriendlyErrorMessage(error), 'error');
            }
        }
    };

    // Form state for Add/Edit
    const [formData, setFormData] = useState({
        title: '', status: 'PROCESSED', date: '', time: '', icon: '🛡️', remark: '', remarkLabel: '', label: '', current: false
    });

    const handleOpenModal = (stage = null) => {
        if (stage) {
            setEditingStage(stage);
            setFormData({ ...stage });
        } else {
            setEditingStage(null);
            setFormData({ title: '', status: 'PROCESSED', date: '', time: '', icon: '🛡️', remark: '', remarkLabel: '', label: '', current: false });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (editingStage) {
            setStages(prev => prev.map(s => s.id === editingStage.id ? { ...formData, id: s.id } : s));
        } else {
            const newId = stages.length > 0 ? Math.max(...stages.map(s => s.id)) + 1 : 1;
            setStages(prev => [...prev, { ...formData, id: newId }]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this stage?")) {
            setStages(prev => prev.filter(s => s.id !== id));
        }
    };

    return (
        <>
            <div className="w-full space-y-8 animate__animated animate__fadeIn">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-2">
                            Funds Tracking Portal
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">
                            Secure & Transparent Fund Flow Management
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <button 
                            onClick={() => setIsGlobalModalOpen(true)}
                            className="bg-white text-black border-2 border-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            ⚙️ Master List
                        </button>
                        <button 
                            onClick={() => handleOpenModal()}
                            className="bg-black text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            <span>+</span> Add Stage
                        </button>
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-lg border border-gray-100 transition-all">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse ring-4 ring-green-100"></span>
                            <span className="text-sm font-black text-gray-700 uppercase tracking-wider">System Online</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-bl-full -z-0 opacity-50"></div>
                    
                    <h2 className="text-xs font-black text-gray-950 uppercase tracking-[0.3em] mb-12 relative z-10 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-[#D4AF37]"></span>
                        Live Ascrow Trust Fund Tracking {viewMode === 'detailed' && '& Detailed Activity Log'}
                    </h2>

                    {/* Timeline Container - Horizontal Scroll */}
                    <div className="relative z-10 overflow-x-auto pb-12 no-scrollbar">
                        <div className="min-w-[1200px] flex items-start relative px-4 gap-4">
                            
                            {/* Connecting Line - Background */}
                            <div className="absolute top-[44px] left-0 w-full h-1 bg-gray-100 rounded-full"></div>
                            
                            {/* Connecting Line - Progress (Green Gradient) */}
                            <div 
                                className="absolute top-[44px] left-0 h-1.5 bg-gradient-to-r from-green-300 via-green-500 to-green-600 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)] z-0 transition-all duration-1000" 
                                style={{ width: `${Math.min(stages.length * 14.28, 95)}%` }}
                            ></div>

                            {/* Stages */}
                            {stages.map((stage, idx) => (
                                <div key={stage.id} className="flex flex-col items-center w-[160px] relative z-10 group/stage">
                                    
                                    {/* Icon Container with Action Overlay */}
                                    <div className="relative">
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-500 hover:scale-110 cursor-pointer shadow-lg
                                            ${stage.current ? 'bg-gradient-gold text-black animate-pulse ring-4 ring-[#D4AF37]/20 scale-110' : 'bg-gray-50 text-gray-400'}
                                        `}>
                                            {stage.icon}
                                        </div>
                                        
                                        {/* Action Buttons Overlay */}
                                        <div className="absolute -top-2 -right-2 flex flex-col gap-1 opacity-0 group-hover/stage:opacity-100 transition-opacity z-20">
                                            <button onClick={() => handleOpenModal(stage)} className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-xs hover:bg-gray-50">✏️</button>
                                            <button onClick={() => handleDelete(stage.id)} className="w-8 h-8 rounded-full bg-white shadow-md border border-red-50 flex items-center justify-center text-xs hover:bg-red-50 text-red-500">🗑️</button>
                                        </div>
                                    </div>

                                    {/* Title & Status */}
                                    <div className="text-center space-y-3 mb-6">
                                        <p className={`text-[13px] font-black leading-tight uppercase tracking-tight h-10 flex items-center justify-center px-2
                                            ${stage.current ? 'text-gray-950' : 'text-gray-600'}
                                        `}>
                                            {stage.title}
                                        </p>
                                        
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border tracking-widest
                                                ${stage.current ? 'bg-green-600 text-white border-green-500' : 'bg-gray-100 text-gray-400 border-gray-200'}
                                            `}>
                                                {stage.status}
                                            </span>
                                            {stage.label && (
                                                <span className="text-[9px] font-black uppercase px-3 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 tracking-widest">
                                                    {stage.label}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="w-[1px] h-8 bg-gray-200 mb-6"></div>

                                    {/* Date/Time */}
                                    <div className="text-center space-y-1">
                                        <p className={`text-[10px] font-black uppercase tracking-wider ${stage.current ? 'text-gray-950' : 'text-gray-400 opacity-80'}`}>
                                            {stage.date}
                                        </p>
                                        <p className={`text-[10px] font-black tracking-wider ${stage.current ? 'text-gray-950 text-xs' : 'text-gray-400 opacity-60'}`}>
                                            {stage.time}
                                        </p>
                                    </div>

                                    {/* Detailed Remark Card */}
                                    {viewMode === 'detailed' && (
                                        <div className={`mt-8 p-4 rounded-xl text-left border transition-all duration-300 w-full min-h-[160px] flex flex-col justify-between
                                            ${stage.current 
                                                ? 'bg-green-50/50 border-green-200 shadow-xl shadow-green-900/5' 
                                                : 'bg-white border-gray-100 border-dashed hover:border-gray-200'}
                                        `}>
                                            <div className="space-y-2">
                                                <p className={`text-[10px] leading-relaxed font-bold ${stage.current ? 'text-green-900' : 'text-gray-600'}`}>
                                                    {stage.remark}
                                                </p>
                                                <p className={`text-[9px] font-black uppercase tracking-tight ${stage.current ? 'text-green-700' : 'text-gray-400'}`}>
                                                    Remark: <span className="font-bold">{stage.remarkLabel}</span>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Section - Transaction Details */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
                        {/* Legend */}
                        <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex flex-col gap-3 min-w-[200px]">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Green = Active/Urgent</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                                <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Grey = Processed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-green-200"></span>
                                <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Light Green = Upcoming</span>
                            </div>
                            
                            <button 
                                onClick={() => setViewMode(v => v === 'simple' ? 'detailed' : 'simple')}
                                className="mt-4 text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity border-t border-gray-200 pt-3"
                            >
                                Toggle {viewMode === 'simple' ? 'Detailed' : 'Simple'} View
                            </button>
                        </div>

                        {/* Transaction Info Box */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl min-w-full md:min-w-[400px] flex flex-col gap-3 relative overflow-hidden group/info">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -z-0 rounded-bl-full"></div>
                            <div className="relative z-10 space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID:</span>
                                    <input 
                                        className="text-[11px] font-black text-gray-900 uppercase border-none focus:ring-0 p-0 text-right bg-transparent w-32 cursor-pointer"
                                        value={transactionInfo.id}
                                        onChange={(e) => setTransactionInfo({...transactionInfo, id: e.target.value})}
                                    />
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ascrow Total Amount:</span>
                                    <input 
                                        className="text-[11px] font-black text-gray-900 uppercase border-none focus:ring-0 p-0 text-right bg-transparent w-32 cursor-pointer"
                                        value={transactionInfo.total}
                                        onChange={(e) => setTransactionInfo({...transactionInfo, total: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Last Stage Update:</span>
                                    <p className="text-[11px] font-black text-gray-900 uppercase leading-snug">
                                        {stages.find(s => s.current)?.title || 'No Active Stage'} - 
                                        <span className="text-[#D4AF37] ml-1">{transactionInfo.lastUpdate}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stage Form Modal - Using Dynamic DashboardModal Component */}
            <DashboardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStage ? 'Edit Ascrow Stage' : 'Add New Ascrow Stage'}
                icon={<span>📑</span>}
                footer={
                    <div className="flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)} 
                            className="px-6 py-2 bg-gray-100 text-gray-500 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-6 py-2 bg-black text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg"
                        >
                            Save Stage
                        </button>
                    </div>
                }
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Stage Title</label>
                            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm font-bold text-black placeholder:text-gray-400" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Status</label>
                                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm font-bold text-black">
                                    <option>PROCESSED</option>
                                    <option>ACTIVE</option>
                                    <option>UPCOMING</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Icon (Emoji)</label>
                                <input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm font-bold text-black placeholder:text-gray-400" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Date</label>
                                <input placeholder="Past, 01, 2026" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm font-bold text-black placeholder:text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Time</label>
                                <input placeholder="02:56 PM" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm font-bold text-black placeholder:text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Main Remark</label>
                            <textarea rows={3} value={formData.remark} onChange={e => setFormData({...formData, remark: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm font-bold resize-none text-black placeholder:text-gray-400" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Remark Label</label>
                            <input value={formData.remarkLabel} onChange={e => setFormData({...formData, remarkLabel: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-sm font-bold text-black placeholder:text-gray-400" />
                        </div>
                        <div className="flex items-center gap-4 py-2">
                            <input type="checkbox" id="current" checked={formData.current} onChange={e => setFormData({...formData, current: e.target.checked})} className="w-5 h-5 rounded border-gray-100 text-[#D4AF37] focus:ring-[#D4AF37]/20" />
                            <label htmlFor="current" className="text-[11px] font-black text-gray-600 uppercase tracking-widest cursor-pointer">Set as Current Location</label>
                        </div>
                    </div>
                </div>
            </DashboardModal>

            {/* Global Stage Manager Modal */}
            <DashboardModal
                isOpen={isGlobalModalOpen}
                onClose={() => setIsGlobalModalOpen(false)}
                title="Master Stage List Configuration"
                icon={<span>⚙️</span>}
            >
                <div className="space-y-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                        Define the master global stages that can be assigned to partners. These serve as templates for user journeys.
                    </p>
                    
                    <div className="flex gap-2">
                        <input 
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-black focus:border-[#D4AF37] outline-none"
                            placeholder="New Stage Name..."
                            value={newGlobalName}
                            onChange={(e) => setNewGlobalName(e.target.value)}
                        />
                        <button 
                            onClick={handleAddGlobal}
                            className="px-4 py-2 bg-gradient-gold text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-md"
                        >
                            Add
                        </button>
                    </div>

                    <div className="space-y-2 mt-6">
                        <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">All Global Stages</h4>
                        <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                            {globalStages.length === 0 ? (
                                <p className="text-[10px] text-gray-300 italic py-4 text-center">No global stages defined.</p>
                            ) : (
                                globalStages.map((name, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-white border border-transparent hover:border-gray-100 transition-all group">
                                        <span className="text-xs font-black text-gray-800">{name}</span>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditGlobal(name)} className="text-gray-400 hover:text-[#D4AF37]">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button onClick={() => handleDeleteGlobal(name)} className="text-gray-400 hover:text-red-500">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </DashboardModal>

            {/* Custom Styles for hidden scrollbar */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}
