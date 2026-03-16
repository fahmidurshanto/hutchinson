"use client";

import { createContext, useContext, useState } from 'react';
import { initialUsers } from '@/data/users';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Centralized state
    const [currentUser, setCurrentUser] = useState({
        name: 'Alexander Reed',
        role: 'admin', // 'admin' or 'client'
        avatar: null
    });

    const [userList, setUserList] = useState(initialUsers);
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
        <AppContext.Provider value={{ 
            user: currentUser, 
            setUser: setCurrentUser, 
            userList, 
            setUserList,
            activeTab, 
            setActiveTab, 
            adminTab, 
            setAdminTab, 
            theme, 
            setTheme 
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
