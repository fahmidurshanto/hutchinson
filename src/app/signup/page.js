import SignupCard from './components/SignupCard';
import Link from 'next/link';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">

            {/* Auth Toggle - Top Right */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-1">
                <Link href="/login" className="px-4 py-2 rounded-full text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                    Login
                </Link>
                <span className="px-4 py-2 rounded-full bg-gradient-gold text-gray-900 text-sm font-bold shadow-sm">
                    Sign Up
                </span>
            </div>

            {/* Left side: Branding (Hidden on mobile/tablet, Visible on desktop) */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative bg-black items-center justify-center p-12 overflow-hidden shadow-2xl z-20">
                {/* Background gradient/decoration for desktop */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-full h-full flex items-end justify-end">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[80%] h-[80%] translate-x-1/4 translate-y-1/4" fill="#ffffff">
                        <path d="M42.7,-74.6C54.1,-67.2,61.3,-53.4,69.5,-40.4C77.7,-27.4,86.9,-15.1,87.6,-2.4C88.3,10.3,80.5,23.3,71.7,35.4C62.9,47.5,53,58.7,40.9,65.3C28.8,71.9,14.4,73.9,0.7,72.7C-13,71.5,-26,67.1,-38.4,60.3C-50.8,53.5,-62.6,44.3,-71.4,32.3C-80.2,20.3,-86,5.6,-84.9,-8.5C-83.8,-22.6,-75.8,-36,-65.4,-47.5C-55,-59,-42.2,-68.6,-29.3,-74.8C-16.4,-81,-2.9,-83.8,10.6,-81.9C24.1,-80,31.3,-82,42.7,-74.6Z" transform="translate(100 100)" />
                    </svg>
                </div>

                {/* Desktop Brand Content */}
                <div className="relative z-10 text-gray-300 max-w-lg text-center animate__animated animate__fadeInLeft animate__slow">
                    <div className="w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                        <img src="/hutchinson-logo.png" alt="Hutchinson APAC Ltd." className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 mt-4 text-gradient-silver">Join the Partnership</h2>
                    <p className="text-gray-400 text-lg lg:text-xl leading-relaxed font-medium">
                        Create your account and gain exclusive access to the <span className="font-bold text-gradient-gold">Hutchinson APAC</span> enterprise network.
                    </p>
                </div>
            </div>

            {/* Right side: Signup Form */}
            <div className="w-full lg:w-1/2 xl:w-5/12 min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10"
                style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>

                {/* Mobile/Tablet background ornament */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none w-3/4 h-3/4 max-w-3xl overflow-hidden flex justify-end items-end lg:hidden">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120%] h-[120%] translate-x-1/4 translate-y-1/4" fill="#000000">
                        <path d="M42.7,-74.6C54.1,-67.2,61.3,-53.4,69.5,-40.4C77.7,-27.4,86.9,-15.1,87.6,-2.4C88.3,10.3,80.5,23.3,71.7,35.4C62.9,47.5,53,58.7,40.9,65.3C28.8,71.9,14.4,73.9,0.7,72.7C-13,71.5,-26,67.1,-38.4,60.3C-50.8,53.5,-62.6,44.3,-71.4,32.3C-80.2,20.3,-86,5.6,-84.9,-8.5C-83.8,-22.6,-75.8,-36,-65.4,-47.5C-55,-59,-42.2,-68.6,-29.3,-74.8C-16.4,-81,-2.9,-83.8,10.6,-81.9C24.1,-80,31.3,-82,42.7,-74.6Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="z-20 w-full max-w-md xl:max-w-lg">
                    <SignupCard />
                </div>
            </div>
        </div>
    )
}
