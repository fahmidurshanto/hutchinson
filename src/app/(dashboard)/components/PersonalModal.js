"use client";
import DashboardModal from '../../../components/ui/DashboardModal';

const personalData = [
    { label: 'First Name',   value: 'Saad' },
    { label: 'Last Name',    value: 'Salman' },
    { label: 'Phone Number', value: '8423525' },
    { label: 'Email',        value: 'saad@gmail.com' },
    { label: 'NRIC',         value: 'S12345678N' },
    { label: 'Address',      value: '96 Northumberland Road, Singapore 938221' },
    { label: 'Nationality',  value: 'Singaporean' },
];

const PersonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export default function PersonalModal({ isOpen, onClose }) {
    return (
        <DashboardModal
            isOpen={isOpen}
            onClose={onClose}
            title="Personal Information"
            icon={PersonIcon}
        >
            <div className="divide-y divide-gray-100">
                {personalData.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-3">
                        <span className="text-sm text-gray-500 font-medium w-36 shrink-0">{label}</span>
                        <span className="text-sm text-gray-900 font-semibold text-right">{value}</span>
                    </div>
                ))}
            </div>
        </DashboardModal>
    );
}
