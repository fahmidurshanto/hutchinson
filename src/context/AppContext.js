"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '@/data/users';
import api from '@/lib/api';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Centralized state
    const [currentUser, setCurrentUser] = useState({
        id: 'u-admin-1',
        name: 'Alexander Reed',
        role: 'admin', // 'admin' or 'client'
        avatar: null
    });

    const [documents, setDocuments] = useState([
        { id: 1, name: 'Monthly Performance - Sept 2025', date: '2025-10-01', size: '2.4 MB', category: 'Recent Reports', viewedBy: [] },
        { id: 2, name: 'Annual Strategy Review', date: '2025-09-15', size: '15.8 MB', category: 'Recent Reports', viewedBy: [] },
        { id: 3, name: 'Updated KYC Documents', date: '2025-10-14', size: '1.2 MB', category: 'Legal & Identity', viewedBy: [] },
        { id: 4, name: 'Trust Declaration', date: '2025-01-20', size: '4.5 MB', category: 'Legal & Identity', viewedBy: [] }
    ]);

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

    const logout = () => {
        setCurrentUser(null);
    };

    // API: Upload Document
    const addDocument = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', currentUser?.id || '69b2fe0f9f780f4730036dc5');

            const response = await api.post('/document/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const data = response.data;
            if (data.success) {
                const newDoc = {
                    id: data.document._id,
                    name: data.document.name,
                    date: new Date(data.document.createdAt).toISOString().split('T')[0],
                    size: 'N/A',
                    category: 'Recent Uploads',
                    viewedBy: data.document.hasUserSeen ? [data.document.user] : []
                };
                setDocuments(prev => [newDoc, ...prev]);
                return data;
            }
            throw new Error(data.message || 'Upload failed');
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    // API: Delete Document (Admin only)
    const deleteDocument = async (docId) => {
        try {
            const response = await api.delete(`/document/delete/${docId}`);
            const data = response.data;
            if (data.success) {
                setDocuments(prev => prev.filter(doc => doc.id !== docId));
                return data;
            }
            throw new Error(data.message || 'Deletion failed');
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    };

    // API: View Document
    const viewDocument = async (docId) => {
        try {
            // Note: window.open might be better for binary stream if backend serves file directly
            // But we need to handle the "already seen" 403 response
            const response = await api.get(`/document/view/${docId}`, {
                responseType: 'blob'
            });
            
            if (response.status === 403) {
                const data = await response.json();
                throw new Error(data.message || 'Access Denied');
            }

            if (response.status === 200) {
                const blob = response.data;
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');
                
                // Mark as viewed locally if user is not admin
                if (currentUser.role !== 'admin') {
                    markAsViewedLocally(docId);
                }
                return true;
            }
            throw new Error('Could not open document');
        } catch (error) {
            console.error('View error:', error);
            throw error;
        }
    };

    const markAsViewedLocally = (docId) => {
        setDocuments(prev => prev.map(doc => {
            if (doc.id === docId && !doc.viewedBy.includes(currentUser.id)) {
                return { ...doc, viewedBy: [...doc.viewedBy, currentUser.id] };
            }
            return doc;
        }));
    };

    // API: Register User (Admin Only)
    const registerUser = async (userData) => {
        try {
            const response = await api.post('/auth/user/register', userData);
            const data = response.data;
            if (data.success) {
                // Refresh user list if needed, or just return
                return data;
            }
            throw new Error(data.message || 'Registration failed');
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    // API: Fetch My Profile
    const fetchCurrentUser = async () => {
        try {
            const response = await api.get('/auth/me');
            const data = response.data;
            if (data.success) {
                setCurrentUser({
                    id: data.user.id,
                    name: `${data.user.firstName} ${data.user.lastName}`,
                    email: data.user.email,
                    role: data.user.role,
                    phone: data.user.Phone,
                    gender: data.user.gender,
                    nric: data.user.nric,
                    address: data.user.address,
                    nationality: data.user.nationality
                });
                return data.user;
            }
            throw new Error(data.message || 'Could not fetch profile');
        } catch (error) {
            console.error('Fetch profile error:', error);
            throw error;
        }
    };

    // API: Change Password
    const changePassword = async (passwordData, isUserSpecific = false) => {
        const endpoint = isUserSpecific 
            ? '/auth/user/changepassword' 
            : '/auth/admin/changepassword';
        
        try {
            const response = await api.post(endpoint, passwordData);
            const data = response.data;
            if (data.success) return data;
            throw new Error(data.message || 'Password change failed');
        } catch (error) {
            console.error('Password change error:', error);
            throw error;
        }
    };

    return (
        <AppContext.Provider value={{ 
            user: currentUser, 
            setUser: setCurrentUser, 
            logout,
            documents,
            addDocument,
            deleteDocument,
            viewDocument,
            registerUser,
            fetchCurrentUser,
            changePassword,
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
