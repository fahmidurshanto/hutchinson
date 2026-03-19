"use client";
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell
} from 'recharts';
import Swal from 'sweetalert2';
import api from '@/lib/api';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-sm p-3 border-2 border-[#D4AF37] rounded-lg shadow-xl">
                <p className="font-bold text-gray-800">{label}</p>
                <p className="text-[#D4AF37] font-bold">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

export default function AdminUserReportsPage({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const userId = resolvedParams.id;

    const [reportsData, setReportsData] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [years, setYears] = useState([new Date().getFullYear().toString()]);
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(true);

    const [editingMonth, setEditingMonth] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const fetchUserReports = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/user/investment-reports/${userId}`);
            if (res.data.success) {
                const data = res.data.data;
                setReportsData(data);
                
                const availableYears = Object.keys(data);
                if (availableYears.length > 0) {
                    setYears(availableYears.sort((a,b) => b-a)); // descending
                    if (!availableYears.includes(selectedYear)) {
                        setSelectedYear(availableYears[availableYears.length - 1]);
                    }
                } else {
                    setYears([new Date().getFullYear().toString()]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch reports:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        if (userId) {
            fetchUserReports();
        }
    }, [userId]);

    const handleEditClick = (monthStr, currentAmount) => {
        setEditingMonth(monthStr);
        setEditAmount(currentAmount.toString());
    };

    const handleSaveAmount = async (monthStr) => {
        if (editAmount === "" || isNaN(editAmount)) {
            Swal.fire('Invalid Amount', 'Please enter a valid number.', 'warning');
            return;
        }

        try {
            setIsSaving(true);
            const res = await api.post(`/user/investment-reports/${userId}`, {
                year: Number(selectedYear),
                month: monthStr,
                amount: editAmount
            });

            if (res.data.success) {
                // Instantly update UI without waiting for full refetch
                setReportsData(prev => {
                    const yearData = prev[selectedYear] || [];
                    const existingIndex = yearData.findIndex(d => d.month === monthStr);
                    const newData = [...yearData];
                    if (existingIndex >= 0) {
                        newData[existingIndex] = { ...newData[existingIndex], amount: Number(editAmount) };
                    } else {
                        newData.push({ month: monthStr, amount: Number(editAmount) });
                        // Sort by month index to keep chart ordered
                        newData.sort((a, b) => MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month));
                    }
                    return { ...prev, [selectedYear]: newData };
                });
                
                setEditingMonth(null);
                setEditAmount("");
                
                Swal.fire({
                    title: 'Saved!',
                    text: `${monthStr} ${selectedYear} amount has been updated to $${Number(editAmount).toLocaleString()}.`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

                // Background refetch to ensure perfect sync
                fetchUserReports();
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to save investment amount.', 'error');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    // Prepare chart data filled with 0s for missing months to keep the 12-month axis consistent
    const getChartData = () => {
        const yearData = reportsData[selectedYear] || [];
        return MONTHS.map(month => {
            const found = yearData.find(d => d.month === month);
            return {
                month,
                amount: found ? found.amount : 0
            };
        });
    };

    const displayData = getChartData();

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <button 
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">Investment Reports</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage and edit monthly investment reporting data.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
                {/* Left Column: Year Selection */}
                <div className="w-full md:w-48 flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-[#D4AF37]/20 pb-2 flex justify-between items-center">
                        Select Year
                        <button 
                            className="text-[#D4AF37] hover:text-[#b38b22] p-1 rounded-full hover:bg-[#D4AF37]/10 transition-colors"
                            onClick={() => {
                                const newYear = prompt("Enter a new year to track (e.g., 2026):");
                                if (newYear && !isNaN(newYear) && newYear.length === 4) {
                                    if (!years.includes(newYear)) {
                                        setYears(prev => [...prev, newYear].sort((a,b) => b-a));
                                    }
                                    setSelectedYear(newYear);
                                }
                            }}
                            title="Add Year"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </h3>
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-6 py-4 rounded-xl font-bold text-sm tracking-widest transition-all duration-300 shadow-sm
                                ${selectedYear === year 
                                    ? 'bg-gradient-gold text-white scale-105' 
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-[#D4AF37]/30'
                                }`}
                                style={{
                                    background: selectedYear === year ? 'linear-gradient(135deg, #e6c875 0%, #d4af37 50%, #b38b22 100%)' : ''
                                }}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Right Column: Chart */}
                <div className="flex-1 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Investment Analysis <span className="text-[#D4AF37]">{selectedYear}</span>
                                </h2>
                                <p className="text-gray-500 mt-1">Review the charted performance below.</p>
                            </div>
                        </div>

                        <div className="flex-1 min-h-[350px]">
                            {loading ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-gray-200 border-t-[#D4AF37] rounded-full animate-spin"></div>
                                </div>
                            ) : isMounted && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={displayData}
                                        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#e6c875" />
                                                <stop offset="100%" stopColor="#b38b22" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                                            tickFormatter={(value) => `$${value/1000}k`}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                                        <Bar 
                                            dataKey="amount" 
                                            radius={[10, 10, 0, 0]}
                                            animationDuration={1500}
                                        >
                                            {displayData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Editor Grid */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Edit Monthly Data — {selectedYear}</h2>
                    <p className="text-gray-500 text-sm mt-1">Set the specific investment values for each month. The chart will update automatically.</p>
                </div>
                
                {loading ? (
                    <div className="w-full py-12 flex items-center justify-center">
                        <div className="w-6 h-6 border-4 border-gray-200 border-t-[#D4AF37] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {displayData.map((data) => (
                            <div key={data.month} className="p-5 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-gray-100/50 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-lg font-black text-gray-900 uppercase tracking-widest">{data.month}</span>
                                    {editingMonth !== data.month && (
                                        <button 
                                            onClick={() => handleEditClick(data.month, data.amount)}
                                            className="text-gray-400 hover:text-[#D4AF37] transition-colors p-1"
                                            title="Edit Amount"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                
                                {editingMonth === data.month ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                            <input 
                                                type="number"
                                                value={editAmount}
                                                onChange={(e) => setEditAmount(e.target.value)}
                                                className="w-full pl-7 pr-3 py-2 rounded-xl border-2 border-[#D4AF37] focus:outline-none focus:ring-0 text-sm font-bold text-gray-900 shadow-inner"
                                                placeholder="Amount"
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleSaveAmount(data.month);
                                                    if (e.key === 'Escape') setEditingMonth(null);
                                                }}
                                            />
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <button 
                                                onClick={() => handleSaveAmount(data.month)}
                                                disabled={isSaving}
                                                className="flex-1 bg-[#D4AF37] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#b38b22] transition-colors disabled:opacity-50"
                                            >
                                                {isSaving ? 'Saving...' : 'Save'}
                                            </button>
                                            <button 
                                                onClick={() => setEditingMonth(null)}
                                                disabled={isSaving}
                                                className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-end gap-1">
                                        <span className="text-xs text-gray-500 font-bold mb-1">$</span>
                                        <span className={`text-2xl font-black tracking-tight ${data.amount > 0 ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                                            {data.amount.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
