import TopNav from '../../components/layout/TopNav';
import Sidebar from '../../components/layout/Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f4f6f8]">
            <TopNav />
            <Sidebar />
            <main className="pt-[100px] pl-16 md:pl-20 transition-all duration-300">
                <div className="p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
