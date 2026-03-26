import AdminTopNav from '../../components/layout/AdminTopNav';
import Footer from '../../components/layout/Footer';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col overflow-x-hidden relative">
            <AdminTopNav />

            {/* Global Watermark - hidden on mobile/tablet to avoid overflow and prioritize performance */}
            <div className="hidden xl:block absolute left-0 top-1/2 -translate-x-[35%] -translate-y-1/2 w-[1400px] h-[1400px] opacity-[0.1] pointer-events-none z-[-1] flex items-center justify-center">
                <img
                    src="/lion.png"
                    alt=""
                    className="w-full h-full object-contain filter saturate-[0.5] brightness-[1.2]"
                />
            </div>

            <main className="pt-24 md:pt-32 lg:pt-[100px] transition-all duration-300 flex-1">
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
