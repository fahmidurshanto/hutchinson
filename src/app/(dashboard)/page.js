import DashboardHero from './components/DashboardHero';
import PerformanceCard from './components/cards/PerformanceCard';
import MapCard from './components/cards/MapCard';
import ServicesCard from './components/cards/ServicesCard';

export default function DashboardHomePage() {
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
