import TopNav from '../../components/layout/TopNav';
import Footer from '../../components/layout/Footer';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f4f6f8] flex flex-col overflow-x-hidden">
            <TopNav />
            <main className="pt-24 md:pt-32 lg:pt-[100px] transition-all duration-300 flex-1">
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
