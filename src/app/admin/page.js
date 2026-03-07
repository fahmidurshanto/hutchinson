"use client";
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import AdminOverview from './components/AdminOverview';
import UserManagement from './components/UserManagement';
import AdminSettings from './components/AdminSettings';

export default function AdminPage() {
    const { adminTab } = useAppContext();

    if (adminTab === 'USER MANAGEMENT') return <UserManagement />;
    if (adminTab === 'SETTINGS') return <AdminSettings />;
    return <AdminOverview />;
}
