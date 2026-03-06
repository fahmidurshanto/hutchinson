import React from 'react';

export default function ServicesCard() {
    const services = [
        { id: 1, title: 'Global Services', desc: 'Convenoutom and services' },
        { id: 2, title: 'Global Services', desc: 'Business and services' },
        { id: 3, title: 'Global Services', desc: 'Manager-and services' },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 animate__animated animate__fadeInUp animate__delay-2s flex flex-col h-full w-full" style={{ borderColor: 'rgba(184, 155, 94, 0.2)' }}>
            <h3 className="text-lg font-bold text-gray-800 mb-6">Latest Services</h3>

            <div className="flex-1 flex flex-col space-y-6">
                {services.map((svc) => (
                    <div key={svc.id} className="flex items-center space-x-4">
                        {/* Lion icon mockup */}
                        <div className="text-yellow-600 flex-shrink-0" style={{ color: '#c5af72' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 drop-shadow-md">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                            </svg>
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
