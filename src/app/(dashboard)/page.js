"use client";
import { useAppContext } from '../../context/AppContext';
import DashboardHero from './components/DashboardHero';
import PerformanceCard from './components/cards/PerformanceCard';
import MapCard from './components/cards/MapCard';
import ServicesCard from './components/cards/ServicesCard';
import ServiceApplicationsPage from './components/ServiceApplicationsPage';

export default function DashboardHomePage() {
    const { activeTab } = useAppContext();

    // Render content based on active tab
    if (activeTab === 'SERVICE APPLICATIONS') {
        return <ServiceApplicationsPage />;
    }

    // Default: Dashboard view
    return (
        <div className="w-full h-full flex flex-col items-center">
            <DashboardHero />

            {/* Responsive Grid for the 3 main cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[24rem]">
                <PerformanceCard />
                <MapCard />
                <ServicesCard />
            </div>
        </div>
    );
}
