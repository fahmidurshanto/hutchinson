"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';

export default function TestQRPage() {
    const [qrCode, setQrCode] = useState(null);
    const [qrUrl, setQrUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');
    const searchParams = useSearchParams();

    const fetchQRCode = async () => {
        if (!userId) {
            setError('Please enter a user ID');
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(`/stage/generateqrcode/${userId}`);
            if (response.data.success) {
                setQrCode(response.data.qrCodeImage);
                setQrUrl(response.data.qrCodeUrl);
            }
        } catch (err) {
            console.error("Error generating QR code:", err);
            setError(err.response?.data?.message || "Failed to generate QR code. Check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const idFromUrl = searchParams.get('userId');
        if (idFromUrl) {
            setUserId(idFromUrl);
        }
    }, [searchParams]);

    const downloadQRCode = () => {
        if (!qrCode) return;
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = `qrcode-test.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">QR Code Generator</h1>
                <p className="text-sm text-gray-500 mb-6">Generate verification QR codes for users</p>

                <div className="space-y-4 mb-6">
                    <div className="text-left">
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">User ID</label>
                        <input 
                            type="text" 
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter MongoDB User ID..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                        />
                    </div>
                    <button 
                        onClick={fetchQRCode}
                        disabled={loading || !userId}
                        className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Generating...' : 'Generate QR Code'}
                    </button>
                </div>

                {loading && (
                    <div className="flex flex-col items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
                        <p className="mt-4 text-gray-500">Generating QR code...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-xl text-sm text-left">
                        <p className="font-bold mb-1">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {qrCode && !loading && (
                    <div className="flex flex-col items-center">
                        <div className="p-4 bg-white border-2 border-gray-100 rounded-2xl mb-4 shadow-lg">
                            <img 
                                src={qrCode} 
                                alt="QR Code" 
                                className="w-64 h-64"
                            />
                        </div>
                        
                        <div className="w-full text-left bg-gray-50 p-4 rounded-xl overflow-hidden mb-6">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Encoded URL:</p>
                            <p className="text-xs text-gray-600 break-all font-mono leading-relaxed">{qrUrl}</p>
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <button 
                                onClick={downloadQRCode}
                                className="w-full py-3 bg-gradient-gold text-black font-bold rounded-xl hover:brightness-110 transition-all shadow-md active:scale-95"
                            >
                                Download QR Code
                            </button>
                            
                            <button 
                                onClick={fetchQRCode}
                                className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Generate New
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <p className="mt-6 text-gray-400 text-xs">
                Endpoint: POST /api/v1/stage/generateqrcode/:userId
            </p>
        </div>
    );
}
