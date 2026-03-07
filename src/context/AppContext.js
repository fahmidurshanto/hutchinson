"use client";

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Centralized state
    const [user, setUser] = useState({
        name: 'Alexander Reed',
        role: 'admin', // 'admin' or 'client'
        avatar: null
    });

    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [adminTab, setAdminTab] = useState('OVERVIEW');

    // Centralized Theme State (Monochrome)
    const [theme, setTheme] = useState({
        primary: '#000000',
        secondary: '#ffffff',
        text: '#171717',
        muted: '#666666'
    });

    return (
        <AppContext.Provider value={{ user, setUser, activeTab, setActiveTab, adminTab, setAdminTab, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
