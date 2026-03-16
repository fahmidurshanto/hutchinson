import TopNav from '../../components/layout/TopNav';
import Footer from '../../components/layout/Footer';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f4f6f8] flex flex-col">
            <TopNav />
            <main className="pt-[100px] transition-all duration-300 flex-1">
                <div className="p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
