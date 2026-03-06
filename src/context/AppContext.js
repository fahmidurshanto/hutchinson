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

    return (
        <AppContext.Provider value={{ user, setUser, activeTab, setActiveTab }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
