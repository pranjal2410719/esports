'use client';

export default function HomeApp() {
  return (
    <main className="w-full flex flex-col items-center text-center">
      
      {/* HERO SECTION */}
      <section
        className="w-full h-[70vh] bg-cover bg-center relative flex flex-col justify-center items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')"
        }}
      >
        <h1 className="text-6xl font-extrabold uppercase tracking-wide text-white drop-shadow-lg">
          ONWARDS TO GLORY!
        </h1>
        <button className="mt-6 bg-red-600 px-8 py-3 rounded-lg text-white font-bold uppercase hover:bg-red-700 transition">
          Join Tournament
        </button>
        <div className="absolute bottom-8 right-8 bg-red-600 w-12 h-12 flex items-center justify-center rounded-full shadow-xl cursor-pointer hover:bg-red-700">
          🛒
        </div>
      </section>

      {/* CLAN ICON STRIP */}
      <section className="w-full bg-black py-8 flex justify-center gap-12 text-4xl text-gray-300">
        <span>🦅</span>
        <span>🛡️</span>
        <span>⚔️</span>
        <span>🐺</span>
        <span>🔥</span>
        <span>⛨</span>
      </section>

      {/* INFO SECTION */}
      <section className="w-full max-w-3xl py-16 px-4">
        <h2 className="text-4xl font-extrabold uppercase">
          AN <span className="text-red-600">OP</span> THEME JUST FOR GAMERS
        </h2>
        <p className="mt-6 text-gray-400 leading-relaxed">
          Welcome to E-Arena, the ultimate esports tournament platform. Join competitive gaming tournaments, 
          form teams, compete for glory, and climb the leaderboards. Experience real-time brackets, 
          live scoring, and seamless team management.
        </p>
      </section>

      {/* ESPORTS CARDS */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 py-12 px-4">
        <Card 
          title="BGMI CHAMPIONSHIP"
          date="Coming Soon"
          img="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800"
        />
        <Card 
          title="VALORANT LEAGUE"
          date="Registration Open"
          img="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
        />
        <Card 
          title="FREE FIRE MASTERS"
          date="Live Now"
          img="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
        />
      </section>

      {/* LIVE STREAM SECTION */}
      <section className="w-full max-w-5xl py-16 px-4 text-center">
        <h2 className="text-4xl font-extrabold uppercase">
          WATCH LIVE STREAMS
        </h2>
        <div className="w-full h-px bg-white mt-2"></div>

        {/* TABS */}
        <div className="flex justify-center gap-8 mt-6">
          <button className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition">Twitch</button>
          <button className="bg-gray-800 px-6 py-2 rounded hover:bg-gray-700 transition">YouTube</button>
          <button className="bg-gray-800 px-6 py-2 rounded hover:bg-gray-700 transition">Discord</button>
        </div>

        {/* THUMBNAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="bg-gray-900 h-40 rounded-lg flex items-center justify-center text-gray-600">Stream 1</div>
          <div className="bg-gray-900 h-40 rounded-lg flex items-center justify-center text-gray-600">Stream 2</div>
          <div className="bg-gray-900 h-40 rounded-lg flex items-center justify-center text-gray-600">Stream 3</div>
        </div>
      </section>
    </main>
  );
}

function Card({ img, title, date }) {
  return (
    <div
      className="relative h-80 bg-cover bg-center rounded-xl shadow-lg overflow-hidden group cursor-pointer"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${img})` }}
    >
      <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 text-sm uppercase font-bold">
        esports
      </div>
      <div className="absolute bottom-6 left-6 text-left">
        <h3 className="text-white text-2xl font-bold group-hover:text-red-500 transition">{title}</h3>
        <p className="text-gray-300 text-sm">{date}</p>
      </div>
    </div>
  );
}
