'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TournamentsApp() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    supabase
      .from('tournaments')
      .select('*')
      .order('start_date', { ascending: false })
      .then(({ data }) => setTournaments(data || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tournaments</h1>
      <div className="grid gap-4">
        {tournaments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl mb-2">No tournaments available</p>
            <p className="text-sm">Check back later for upcoming tournaments</p>
          </div>
        ) : (
          tournaments.map(t => (
            <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{t.name}</h3>
                  <p className="text-gray-600 text-sm">{t.start_date ? formatDate(t.start_date) : 'TBA'}</p>
                  <p className="text-red-600 font-bold mt-2">{t.prize_pool}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  {t.status}
                </span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                  View Details
                </button>
                <a href="/dashboard" className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-center">
                  Register Now
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
