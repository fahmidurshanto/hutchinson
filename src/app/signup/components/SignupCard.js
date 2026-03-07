import React from 'react';
import SignupForm from './SignupForm';

export default function SignupCard() {
    return (
        <div className="bg-white rounded-lg w-full max-w-md overflow-hidden animate__animated animate__zoomIn animate__fast relative shadow-2xl border border-gray-200">
            <div className="p-8 sm:p-10 lg:p-12 pb-6 lg:pb-8 relative z-10 bg-white">
                <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 mb-3 mt-2 flex items-center justify-center lg:hidden">
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-white drop-shadow-sm p-1">
                            <img src="/hutchinson-logo.png" alt="Hutchinson APAC Ltd." className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center text-gradient-gold mb-1 px-4 mt-2">
                        CREATE YOUR<br />PARTNER ACCOUNT
                    </h1>
                    <p className="text-sm text-center text-gray-900 font-medium mt-1">
                        Register to access the Hutchinson APAC Partnership Portal.
                    </p>
                </div>
                <SignupForm />
                <div className="mt-6 mb-2 flex justify-center items-center text-sm">
                    <span className="text-white w-4 h-4 mr-2 rounded-full bg-gradient-gold text-xs flex justify-center items-center font-bold">?</span>
                    <span className="text-gray-900 font-medium">Need help? <a href="#" className="font-bold text-gradient-gold">Contact Support</a></span>
                </div>
            </div>
            <div className="p-2 text-center text-xs text-white bg-gradient-gold font-semibold relative z-10">
                Powered by Hutchinson APAC Ltd.
            </div>
        </div>
    )
}
