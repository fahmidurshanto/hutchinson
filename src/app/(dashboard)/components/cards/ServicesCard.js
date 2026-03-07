import React from 'react';

export default function ServicesCard() {
    const services = [
        { id: 1, title: 'Global Services', desc: 'Convenoutom and services' },
        { id: 2, title: 'Global Services', desc: 'Business and services' },
        { id: 3, title: 'Global Services', desc: 'Manager-and services' },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 animate__animated animate__fadeInUp animate__delay-2s flex flex-col h-full w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Latest Services</h3>

            <div className="flex-1 flex flex-col space-y-6">
                {services.map((svc) => (
                    <div key={svc.id} className="flex items-center space-x-4">
                        {/* Lion icon image */}
                        <div className="flex-shrink-0 w-10 h-10">
                            <img src="/hutchinson-logo.png" alt="" className="w-full h-full object-contain drop-shadow-md" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">{svc.title}</h4>
                            <p className="text-xs text-gray-500">{svc.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
