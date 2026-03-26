"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import NotFound from '@/components/ui/NotFound';
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

export default function ReportsPage() {
    const { user, fetchInvestmentReports } = useAppContext();
    const [reportsData, setReportsData] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [years, setYears] = useState([new Date().getFullYear().toString()]);
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (user?.id) {
            setLoading(true);
            fetchInvestmentReports(user.id)
                .then(res => {
                    if (res.success && res.data) {
                        setReportsData(res.data);
                        const availableYears = Object.keys(res.data);
                        if (availableYears.length > 0) {
                            setYears(availableYears.sort((a, b) => b - a)); // descending
                            if (!availableYears.includes(selectedYear)) {
                                setSelectedYear(availableYears[availableYears.length - 1]);
                            }
                        } else {
                            setYears([new Date().getFullYear().toString()]);
                        }
                    }
                })
                .catch(err => {
                    console.error('Error fetching reports:', err);
                    if (err.response?.status === 404) {
                        setIsNotFound(true);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [user?.id]);

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


    if (isNotFound) {
        return <NotFound title="Reports Unavailable" message="We were unable to retrieve your investment reports at this time." backLink="/" backText="Home" />;
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-8 animate__animated animate__fadeIn pb-12">
            {/* Header Section */}
            <div className="w-full text-center py-8 md:py-14 animate__animated animate__fadeIn relative flex flex-col items-center justify-center min-h-[15vh] md:min-h-[25vh]">
                <div className="relative z-10 w-full px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tight text-gradient-gold bg-clip-text uppercase leading-none">
                        Reports
                    </h1>
                    <p className="text-[10px] sm:text-xs md:text-base text-gray-400 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto opacity-70">
                        Strategic Investment Analytics • Allocation Performance
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-10 mt-4 md:mt-8">

                {/* Left Column: Year Selection - Horizontal scroll on mobile, Vertical on Desktop */}
                <div className="w-full lg:w-48 flex flex-row lg:flex-col gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-4 lg:pb-0 px-2 sm:px-0">
                    <h3 className="hidden lg:block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">
                        Strategic Period
                    </h3>
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-5 sm:px-6 py-2.5 sm:py-3.5 lg:py-4 rounded-xl font-black text-[10px] sm:text-xs tracking-widest transition-all duration-300 shadow-sm whitespace-nowrap border
                                ${selectedYear === year
                                    ? 'bg-gradient-gold text-black border-[#D4AF37] scale-105 z-10'
                                    : 'bg-white text-gray-400 hover:bg-gray-50 border-gray-100'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Right Column: Chart */}
                <div className="flex-1 bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-8 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden mx-2 sm:mx-0">
                    {/* Subtle Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 leading-tight uppercase tracking-tight">
                                    Allocation <span className="text-gradient-gold">{selectedYear}</span>
                                </h2>
                                <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-[0.2em] font-black opacity-70">Metric: Monthly Disbursement ($)</p>
                            </div>
                        </div>

                        <div className="w-full h-[350px] md:h-[450px]">
                            {isMounted && (
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
                                            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                                            dy={10}
                                            interval={0} // Show all months
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                            width={40}
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
        </div>
    );
}
