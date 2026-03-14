import AdminTopNav from '../../components/layout/AdminTopNav';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-950">
            <AdminTopNav />
            <main className="pt-20 transition-all duration-300">
                <div className="p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
