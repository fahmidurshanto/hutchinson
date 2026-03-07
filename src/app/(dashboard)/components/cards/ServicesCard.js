import React from 'react';

export default function ServicesCard() {
    const services = [
        { id: 1, title: 'Global Services', desc: 'Convenoutom and services' },
        { id: 2, title: 'Global Services', desc: 'Business and services' },
        { id: 3, title: 'Global Services', desc: 'Manager-and services' },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 animate__animated animate__fadeInUp animate__delay-2s flex flex-col h-full w-full group cursor-pointer relative">
            {/* Lion logo overlay - shown on hover over entire card */}
            <div className="absolute inset-0 bg-black hover:bg-opacity-25 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <img src="/lion.png" alt="" className="w-64 h-64 object-contain" />
            </div>
            <div className="flex items-center justify-between mb-6 relative z-20">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-white duration-200">Latest Services</h3>
            </div>
            <div className="flex-1 flex flex-col space-y-6 group-hover:opacity-0 transition-opacity duration-200">
                {services.map((svc) => (
                    <div key={svc.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                            </div>
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
