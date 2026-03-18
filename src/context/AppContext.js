"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { initialUsers } from '@/data/users';
import api from '@/lib/api';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Centralized state
    const [currentUser, setCurrentUser] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

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
        const userLogout = async () => {
           try {
            const response = await api.get('/auth/logout');
            const data = response.data;
            console.log(data);
           } catch (error) {
            console.error(error);
           } finally {
            setCurrentUser(null);
            router.push('/login');
           }
        }
        userLogout();
    };

    const logActivity = (userId, title, description) => {
        const now = new Date();
        const newActivity = {
            id: Date.now(),
            title,
            description,
            date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };

        setUserList(prev => prev.map(u => {
            if (String(u._id || u.id) === String(userId)) {
                return {
                    ...u,
                    activities: [newActivity, ...(u.activities || [])]
                };
            }
            return u;
        }));
    };

    // API: Upload Document
    const addDocument = async (file, targetUserId = null) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', targetUserId || currentUser?.id || '69b2fe0f9f780f4730036dc5');

            const response = await api.post('/document/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const data = response.data;
            if (data.success) {
                const newDoc = {
                    id: data.document._id,
                    userId: targetUserId || currentUser?.id,
                    name: data.document.name,
                    date: new Date(data.document.createdAt).toISOString().split('T')[0],
                    size: 'N/A',
                    category: 'Recent Uploads',
                    viewedBy: data.document.hasUserSeen ? [data.document.user] : []
                };
                setDocuments(prev => [newDoc, ...prev]);

                // Log Activity
                logActivity(targetUserId || currentUser?.id, 'Document Uploaded', `File "${file.name}" was added to the vault.`);

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
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    name: `${data.user.firstName} ${data.user.lastName}`,
                    email: data.user.email,
                    role: data.user.role || data.user.Role,
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

    // API: Fetch All Users (Admin Only)
    const fetchAllUsers = async () => {
        try {
            const response = await api.get('/auth/users');
            const data = response.data;
            if (data.success) {
                setUserList(data.users);
                return data.users;
            }
            throw new Error(data.message || 'Could not fetch users');
        } catch (error) {
            console.error('Fetch users error:', error);
            throw error;
        }
    };

    // API: Update User Details (Admin Only)
    const updateUser = async (id, userData) => {
        try {
            const response = await api.patch(`/auth/user/${id}`, userData);
            const data = response.data;
            if (data.success) {
                setUserList(prev => prev.map(u => u._id === id ? { ...u, ...data.user } : u));
                
                // Log Activity
                logActivity(id, 'Profile Updated', 'User account information was modified by admin.');
                
                return data;
            }
            throw new Error(data.message || 'Update failed');
        } catch (error) {
            console.error('Update user error:', error);
            throw error;
        }
    };

    // API: Delete User (Admin Only)
    const deleteUser = async (id) => {
        try {
            const response = await api.delete(`/auth/user/${id}`);
            const data = response.data;
            if (data.success) {
                setUserList(prev => prev.filter(u => u._id !== id));
                return data;
            }
            throw new Error(data.message || 'Delete failed');
        } catch (error) {
            console.error('Delete user error:', error);
            throw error;
        }
    };

    // API: Profile Data Fetchers
    const fetchFinancialSummary = async (userId) => {
        try {
            const response = await api.get(`/user/financial-summary/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Financial summary error:', error);
            throw error;
        }
    };

    const fetchEntities = async (userId) => {
        try {
            const response = await api.get(`/user/entities/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Entities error:', error);
            throw error;
        }
    };

    const fetchServiceStatus = async (userId) => {
        try {
            const response = await api.get(`/user/services/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Service status error:', error);
            throw error;
        }
    };

    const fetchInvestmentReports = async (userId) => {
        try {
            const response = await api.get(`/user/investment-reports/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Investment reports error:', error);
            throw error;
        }
    };

    useEffect(() => {
        // Initial load of user if session exists and not on login page
        if (pathname !== '/login') {
            fetchCurrentUser().catch(() => { });
        }
    }, [pathname]);

    useEffect(() => {
        if (currentUser?.role === 'admin') {
            fetchAllUsers().catch(() => { });
        }
    }, [currentUser]);

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
            fetchAllUsers,
            updateUser,
            deleteUser,
            fetchFinancialSummary,
            fetchEntities,
            fetchServiceStatus,
            fetchInvestmentReports,
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
