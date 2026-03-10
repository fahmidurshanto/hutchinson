"use client";
import DashboardModal from '../../../components/ui/DashboardModal';

const primaryEntities = [
    { name: 'REALTY ACCESS LIMITED', status: 'Active' },
    { name: 'CONCEPTS VACATION CLUB', status: 'Active' },
    { name: 'CLUB EMPEROR', status: 'Active' },
];

const thirdPartyEntities = [
    { name: 'ASIAN TRAVEL CLUB', status: 'Active' },
    { name: 'CONCORD DEVELOPMENT PTE LTD', status: 'Active' },
];

const EntitiesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

export default function EntitiesModal({ isOpen, onClose }) {
    return (
        <DashboardModal
            isOpen={isOpen}
            onClose={onClose}
            title="Entities"
            icon={EntitiesIcon}
        >
            <div className="space-y-8 py-2">
                {/* Primary Section */}
                <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">Primary</h4>
                    <div className="space-y-3">
                        {primaryEntities.map((entity) => (
                            <div key={entity.name} className="flex items-start justify-between">
                                <span className="text-sm text-gray-700 font-medium uppercase leading-tight w-2/3">{entity.name}</span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="text-gray-400 font-medium">:</span>
                                    <span className="text-sm font-bold text-emerald-600">{entity.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3rd Party Section */}
                <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">3rd Party Entities/ Marketing Agents</h4>
                    <div className="space-y-3">
                        {thirdPartyEntities.map((entity) => (
                            <div key={entity.name} className="flex items-start justify-between">
                                <span className="text-sm text-gray-700 font-medium uppercase leading-tight w-2/3">{entity.name}</span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="text-gray-400 font-medium">:</span>
                                    <span className="text-sm font-bold text-emerald-600">{entity.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardModal>
    );
}
