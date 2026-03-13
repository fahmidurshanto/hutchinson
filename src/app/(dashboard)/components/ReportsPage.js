"use client";
import React, { useState } from 'react';
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

const dummyData = {
    "2021": [
        { month: 'Jan', amount: 45000 },
        { month: 'Feb', amount: 52000 },
        { month: 'Mar', amount: 48000 },
        { month: 'Apr', amount: 61000 },
        { month: 'May', amount: 55000 },
        { month: 'Jun', amount: 67000 },
    ],
    "2022": [
        { month: 'Jan', amount: 55000 },
        { month: 'Feb', amount: 58000 },
        { month: 'Mar', amount: 62000 },
        { month: 'Apr', amount: 75000 },
        { month: 'May', amount: 82000 },
        { month: 'Jun', amount: 95000 },
    ],
    "2023": [
        { month: 'Jan', amount: 95000 },
        { month: 'Feb', amount: 110000 },
        { month: 'Mar', amount: 105000 },
        { month: 'Apr', amount: 125000 },
        { month: 'May', amount: 140000 },
        { month: 'Jun', amount: 160000 },
    ],
    "2024": [
        { month: 'Jan', amount: 160000 },
        { month: 'Feb', amount: 175000 },
        { month: 'Mar', amount: 190000 },
        { month: 'Apr', amount: 210000 },
        { month: 'May', amount: 230000 },
        { month: 'Jun', amount: 250000 },
    ],
    "2025": [
        { month: 'Jan', amount: 250000 },
        { month: 'Feb', amount: 270000 },
        { month: 'Mar', amount: 240000 },
        { month: 'Apr', amount: 290000 },
        { month: 'May', amount: 310000 },
        { month: 'Jun', amount: 350000 },
    ]
};

const years = Object.keys(dummyData);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-sm p-3 border-2 border-brand-primary rounded-lg shadow-xl">
                <p className="font-bold text-gray-800">{label}</p>
                <p className="text-brand-primary font-bold">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

export default function ReportsPage() {
    const [selectedYear, setSelectedYear] = useState("2024");

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
                
                {/* Left Column: Year Selection */}
                <div className="w-full md:w-48 flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-brand-primary/20 pb-2">
                        Select Year
                    </h3>
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-6 py-4 rounded-xl font-bold text-sm tracking-widest transition-all duration-300 shadow-sm
                                ${selectedYear === year 
                                    ? 'bg-gradient-gold text-white scale-105 shadow-gold-glow' 
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-brand-primary/30'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Right Column: Chart */}
                <div className="flex-1 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
                    {/* Subtle Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Investment Analysis <span className="text-brand-primary">{selectedYear}</span>
                                </h2>
                                <p className="text-gray-500 mt-1">Monthly performance and capital allocation</p>
                            </div>
                            <div className="hidden sm:block text-right">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Growth Rate</span>
                                <div className="text-green-500 font-bold text-lg">+12.5%</div>
                            </div>
                        </div>

                        <div className="flex-1 min-h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={dummyData[selectedYear]}
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
                                        {dummyData[selectedYear].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
