export default function DashboardHero() {
    return (
        <div className="w-full text-center py-8 md:py-16 mb-8 animate__animated animate__fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #a0814c, #e0cd86, #887b4b)' }}>
                GLOBAL PARTNERSHIP PORTAL
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium mb-8">
                Ensure the data with your premium online portal.
            </p>

            <button className="cursor-pointer px-8 py-3 rounded-full text-gray-900 font-bold shadow-lg shadow-yellow-900/20 hover:scale-105 transition-transform flex items-center justify-center mx-auto"
                style={{ background: 'linear-gradient(to right, #c5af72, #e0cd86, #a0814c)', border: '1px solid #c5af72' }}>
                EXPLORE NEW OPPORTUNITIES
                {/* Cursor icon mockup as seen in design */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 -mb-1 animate-bounce">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.141-7.312m2.369 5.087l-2.275-6.22m0 0l-3.262 4.315-1.99-6.93" /> {/* Hand pointer roughly */}
                </svg>
            </button>
        </div>
    )
}
