import React from 'react';
import LoginForm from './LoginForm';

export default function LoginCard() {
    return (
        <div className="bg-white rounded-lg w-full max-w-md overflow-hidden animate__animated animate__zoomIn animate__fast relative"
            style={{
                boxShadow: '0 10px 40px -10px rgba(184, 155, 94, 0.4), 0px 0px 3px 0px rgba(184, 155, 94, 0.7)',
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
            }}>
            {/* Pseudo-element for gradient border if needed, relying on shadow and bottom bar now */}
            <div className="p-10 pb-6 relative z-10 bg-white">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 mb-4 mt-2 flex items-center justify-center">
                        {/* Temporary logo styling matching the design layout */}
                        <div className="w-full h-full rounded-full border-2 text-yellow-700 flex flex-col justify-center items-center text-[10px] leading-tight font-bold" style={{ borderColor: '#c5af72', color: '#b89b5e' }}>
                            <span className="tracking-widest">HUTCHINSON</span>
                            <span className="text-xl">🦁</span>
                            <span className="tracking-widest">APAC LTD.</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center text-black mb-1 px-4 mt-2">
                        WELCOME TO THE<br />PARTNERSHIP PORTAL
                    </h1>
                    <p className="text-sm text-center text-gray-900 font-medium mt-1">
                        Please enter your corporate credentials to continue.
                    </p>
                </div>
                <LoginForm />
                <div className="mt-8 mb-2 flex justify-center items-center text-sm">
                    <span className="text-yellow-700 w-4 h-4 mr-2 rounded-full border border-yellow-700 text-xs flex justify-center items-center font-bold" style={{ borderColor: '#887b4b', color: '#887b4b' }}>?</span>
                    <span className="text-gray-900 font-medium">Having trouble logging in? <a href="#" className="underline font-semibold" style={{ color: '#887b4b' }}>Contact Support</a></span>
                </div>
            </div>
            <div className="p-2 text-center text-xs text-black font-semibold relative z-10 border-t" style={{ background: 'linear-gradient(to right, #a0814c, #e0cd86, #a0814c)', borderColor: '#c5af72' }}>
                Powered by Hutchinson APAC Ltd.
            </div>
        </div>
    )
}
