"use client";
import { useAppContext } from '../../context/AppContext';
import DashboardHero from './components/DashboardHero';
import ServiceApplicationsPage from './components/ServiceApplicationsPage';
import CalendarPage from './components/CalendarPage';
import UserDashboardCards from './components/cards/UserDashboardCards';

export default function DashboardHomePage() {
    const { activeTab, user, adminTab } = useAppContext();
    const isCalendarActive = activeTab === 'CALENDAR' || adminTab === 'calendar';

    // Render content based on active tab
    if (isCalendarActive) {
        return <CalendarPage />;
    }

    if (activeTab === 'SERVICE APPLICATIONS') {
        return <ServiceApplicationsPage />;
    }

    // Default: Dashboard view
    return (
        <div className="w-full h-full flex flex-col items-center">
            <DashboardHero />
            <UserDashboardCards />
        </div>
    );
}

