import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen bg-blue-950 flex flex-col">
      {/* Top Section (1/5 height) */}
      <section className="h-1/5 flex-col text-white font-serif  flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center ">
          Welcome to Movie Date
        </h1>
        <p className="text-center mt-4">
          Discover and plan your next movie night!
        </p>
      </section>

      {/* Bottom Section (4/5 height) */}
      <section className="h-4/5 flex-row text-white px-10 flex relative">
        {/* Left Section */}
        <div className="w-1/2 bg-red-950 flex items-center justify-center">
          <p className="text-lg">MOVIE Section</p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-green-950 flex items-center justify-center">
          <p className="text-lg">DINNER Section</p>
        </div>

        {/* Middle Button */}
        <button className="absolute top-1/2 left-1/2 h-28 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-white text-blue-950 font-bold rounded-lg hover:bg-gray-200">
          Start Planning
        </button>
      </section>
    </main>
  );
}
