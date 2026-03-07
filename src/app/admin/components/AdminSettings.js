"use client";
import React from 'react';

const settingSections = [
    {
        title: 'General',
        icon: '⚙️',
        settings: [
            { label: 'Portal Name', value: 'Hutchinson Partnership Portal', type: 'text' },
            { label: 'Support Email', value: 'support@hutchinson.apac', type: 'text' },
            { label: 'Maintenance Mode', value: false, type: 'toggle' },
        ]
    },
    {
        title: 'Security',
        icon: '🔒',
        settings: [
            { label: 'Two-Factor Authentication', value: true, type: 'toggle' },
            { label: 'Session Timeout (minutes)', value: '30', type: 'text' },
            { label: 'Password Expiry (days)', value: '90', type: 'text' },
        ]
    },
    {
        title: 'Notifications',
        icon: '🔔',
        settings: [
            { label: 'Email Notifications', value: true, type: 'toggle' },
            { label: 'New User Alerts', value: true, type: 'toggle' },
            { label: 'System Error Alerts', value: false, type: 'toggle' },
        ]
    }
];

export default function AdminSettings() {
    return (
        <div className="w-full space-y-6 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">Configure portal settings and preferences.</p>
                </div>
                <button className="cursor-pointer px-5 py-2.5 rounded-lg bg-gradient-gold text-gray-900 font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                    Save Changes
                </button>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {settingSections.map((section) => (
                    <div key={section.title} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
                            <span className="text-xl">{section.icon}</span>
                            <h2 className="text-lg font-bold text-white">{section.title}</h2>
                        </div>
                        <div className="divide-y divide-gray-800">
                            {section.settings.map((setting) => (
                                <div key={setting.label} className="px-6 py-4 flex items-center justify-between">
                                    <span className="text-sm text-gray-300 font-medium">{setting.label}</span>
                                    {setting.type === 'toggle' ? (
                                        <button className={`cursor-pointer relative w-12 h-6 rounded-full transition-colors ${setting.value ? 'bg-gradient-gold' : 'bg-gray-700'}`}>
                                            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${setting.value ? 'left-[1.625rem]' : 'left-0.5'}`}></span>
                                        </button>
                                    ) : (
                                        <input
                                            type="text"
                                            defaultValue={setting.value}
                                            className="w-64 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm text-right focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Danger Zone */}
            <div className="bg-gray-900 rounded-xl border border-red-900/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-red-900/50 flex items-center gap-3">
                    <span className="text-xl">⚠️</span>
                    <h2 className="text-lg font-bold text-red-400">Danger Zone</h2>
                </div>
                <div className="px-6 py-5 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-300 font-medium">Reset All Settings</p>
                        <p className="text-xs text-gray-500 mt-0.5">This will restore all settings to their default values.</p>
                    </div>
                    <button className="cursor-pointer px-4 py-2 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm font-bold hover:bg-red-900/50 transition-colors">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
