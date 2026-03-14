import AdminTopNav from '../../components/layout/AdminTopNav';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <AdminTopNav />
            <main className="pt-24 transition-all duration-300">
                <div className="p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
