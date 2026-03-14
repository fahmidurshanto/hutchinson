"use client";
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import AdminOverview from './components/AdminOverview';
import UserManagement from './components/UserManagement';
import AdminSettings from './components/AdminSettings';

export default function AdminPage() {
    const { adminTab } = useAppContext();

    if (adminTab?.toUpperCase() === 'USER MANAGEMENT' || adminTab === 'users') return <UserManagement />;
    if (adminTab?.toUpperCase() === 'SETTINGS' || adminTab === 'settings') return <AdminSettings />;
    
    return <AdminOverview />;
}
