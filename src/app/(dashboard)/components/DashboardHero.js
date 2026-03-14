export default function DashboardHero() {
    return (
        <div className="w-full text-center py-8 md:py-16 mb-8 animate__animated animate__fadeIn relative overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
            {/* Watermark Logo */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[30%] w-[1200px] h-[1200px] opacity-[0.1] pointer-events-none z-0 mix-blend-multiply flex items-center justify-center">
                <img src="/lion.png" alt="" className="w-full h-full object-contain filter drop-shadow-3xl" />
            </div>

            <div className="relative z-10 w-full">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide text-gradient-gold bg-clip-text">
                    GLOBAL PARTNERSHIP PORTAL
                </h1>
                <p className="text-gray-600 text-lg md:text-xl font-medium mb-8">
                    Ensure the data with your premium online portal.
                </p>

                <button className="cursor-pointer px-8 py-3 rounded-full text-gray-900 bg-gradient-gold font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.6)] hover:scale-105 transition-all flex items-center justify-center mx-auto border border-transparent">
                    EXPLORE NEW OPPORTUNITIES
                    {/* Cursor icon mockup as seen in design */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 -mb-1 animate-bounce text-gray-900 drop-shadow-sm">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.141-7.312m2.369 5.087l-2.275-6.22m0 0l-3.262 4.315-1.99-6.93" /> {/* Hand pointer roughly */}
                    </svg>
                </button>
            </div>
        </div>
    )
}
