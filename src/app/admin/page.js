"use client";
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import AdminOverview from './components/AdminOverview';
import UserManagement from './components/UserManagement';
import AdminSettings from './components/AdminSettings';
import CalendarPage from '../(dashboard)/components/CalendarPage';

export default function AdminPage() {
    const { adminTab } = useAppContext();

    if (adminTab?.toUpperCase() === 'USER MANAGEMENT' || adminTab === 'users') return <UserManagement />;
    if (adminTab?.toUpperCase() === 'SETTINGS' || adminTab === 'settings') return <AdminSettings />;
    if (adminTab?.toUpperCase() === 'CALENDAR' || adminTab === 'calendar') return <CalendarPage />;
    
    return <AdminOverview />;
}
