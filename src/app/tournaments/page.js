'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const featuredGames = [
  { title: 'BGMI Championship', game: 'BGMI', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', prize: '$50,000' },
  { title: 'Valorant Masters', game: 'Valorant', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', prize: '$75,000' },
  { title: 'Free Fire League', game: 'Free Fire', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', prize: '$30,000' },
];

export default function TournamentsApp() {
  const [tournaments, setTournaments] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user));
    supabase.from('tournaments').select('*').order('start_date', { ascending: false }).then(({ data }) => setTournaments(data || []));
    
    const interval = setInterval(() => setActiveSlide(prev => (prev + 1) % featuredGames.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input type="text" placeholder="Search for tournaments..." className="flex-1 w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-red-500 focus:outline-none transition" />
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition">❤️</button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition">🔔</button>
              {user && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">{user.email?.[0].toUpperCase()}</div>
                  <span className="text-sm hidden sm:block">{user.email?.split('@')[0]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Carousel */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 group">
          {featuredGames.map((game, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-600 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{game.title}</h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-4">Prize Pool: {game.prize}</p>
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition transform hover:scale-105">Join Tournament</button>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {featuredGames.map((_, idx) => (
              <button key={idx} onClick={() => setActiveSlide(idx)} className={`w-2 h-2 rounded-full transition ${idx === activeSlide ? 'bg-white w-8' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>

        {/* Tournaments Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-2xl sm:text-3xl font-bold">Active Tournaments</h3>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400">
              <p className="text-xl mb-2">No tournaments available</p>
              <p className="text-sm">Check back later for upcoming tournaments</p>
            </div>
          ) : (
            tournaments.slice(0, 6).map(t => (
              <div key={t.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/20">
                <div className="h-40 bg-gradient-to-br from-red-600 to-purple-600 relative">
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">{t.status}</div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-lg mb-2 line-clamp-1">{t.name}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>📅 {t.start_date ? formatDate(t.start_date) : 'TBA'}</span>
                    <span>👥 {Math.floor(Math.random() * 500 + 100)}</span>
                  </div>
                  <p className="text-red-400 font-bold text-lg mb-4">{t.prize_pool}</p>
                  <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95">Join Now</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
