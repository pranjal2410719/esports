'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@e-arena/ui';
import { formatDate } from '@e-arena/utils';

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
        {tournaments.map(t => (
          <Card key={t.id}>
            <h3 className="font-bold text-xl">{t.name}</h3>
            <p className="text-gray-600">{formatDate(t.start_date)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
