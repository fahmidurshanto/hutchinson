"use client";

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Centralized state
    const [user, setUser] = useState({
        name: 'Alexander Reed',
        role: 'Admin',
        avatar: null // Will use a placeholder or icon
    });

    const [activeTab, setActiveTab] = useState('DASHBOARD');

    // Centralized Theme State (Monochrome)
    const [theme, setTheme] = useState({
        primary: '#000000',
        secondary: '#ffffff',
        text: '#171717',
        muted: '#666666'
    });

    return (
        <AppContext.Provider value={{ user, setUser, activeTab, setActiveTab, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
