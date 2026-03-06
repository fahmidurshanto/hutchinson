import Link from 'next/link';
import HomeHero from './components/HomeHero'; // Example of page-specific component

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <HomeHero />
            <p className="mt-4 text-gray-600">Hutchinson APAC</p>
            <Link href="/login" className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition">
                Go to Login Page
            </Link>
        </div>
    );
}
