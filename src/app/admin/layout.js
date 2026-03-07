import AdminTopNav from '../../components/layout/AdminTopNav';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-950">
            <AdminTopNav />
            <AdminSidebar />
            <main className="pt-20 pl-16 md:pl-20 transition-all duration-300">
                <div className="p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
