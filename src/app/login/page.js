import LoginCard from './components/LoginCard';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-4 bg-white overflow-hidden">

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat"
        style={{
          backgroundImage: "url('/lion.png')",
          backgroundPosition: "right -15% bottom -15%",
          backgroundSize: "70% auto",
          opacity: 0.1,
          filter: "sepia(0.3) hue-rotate(5deg)"
        }}
      ></div>

      <div className="z-20 w-full flex justify-center items-center">
        <LoginCard />
      </div>
    </div>
  )
}


