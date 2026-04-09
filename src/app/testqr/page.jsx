"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestQRPage() {
    const [qrCode, setQrCode] = useState(null);
    const [qrUrl, setQrUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchQRCode = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:4000/api/v1/stage/qrcode/get');
            if (response.data.success) {
                setQrCode(response.data.qrCodeImage);
                setQrUrl(response.data.qrCodeUrl);
            }
        } catch (err) {
            console.error("Error fetching QR code:", err);
            setError("Failed to fetch QR code. Check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQRCode();
    }, []);

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
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">QR Code Test</h1>

                {loading && (
                    <div className="flex flex-col items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-500">Wait a moment...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                        <button 
                            onClick={fetchQRCode}
                            className="block w-full mt-2 font-bold underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {qrCode && !loading && (
                    <div className="flex flex-col items-center">
                        <div className="p-3 bg-white border-2 border-gray-100 rounded-xl mb-4">
                            <img 
                                src={qrCode} 
                                alt="QR Code" 
                                className="w-64 h-64 shadow-sm"
                            />
                        </div>
                        
                        <div className="w-full text-left bg-gray-50 p-3 rounded-lg overflow-hidden mb-6">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Encoded URL:</p>
                            <p className="text-xs text-gray-600 break-all font-mono leading-relaxed">{qrUrl}</p>
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <button 
                                onClick={downloadQRCode}
                                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95"
                            >
                                Download QR Code
                            </button>
                            
                            <button 
                                onClick={fetchQRCode}
                                className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Refresh QR Code
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <p className="mt-6 text-gray-400 text-sm">
                Route: /api/v1/stage/qrcode/get
            </p>
        </div>
    );
}
