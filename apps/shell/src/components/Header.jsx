'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Categories */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <img src="https://i.pinimg.com/736x/62/5f/3e/625f3e212851746ad3e0181bc71ec5ed.jpg" alt="E-Arena" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-bold text-xl text-gray-900">E-Arena</span>
          </Link>
          
          <div className="flex gap-3">
            <Link href="/tournaments" className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition">All Tournaments</Link>
            <Link href="/tournaments?game=bgmi" className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">🎮 BGMI</Link>
            <Link href="/tournaments?game=valorant" className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">🎯 Valorant</Link>
            <Link href="/tournaments?game=freefire" className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">🔥 Free Fire</Link>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tournaments..."
              className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</button>
          </div>
        </div>

        {/* User Actions */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-6 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition">
              📊 Dashboard
            </Link>
            <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 text-sm">Logout</button>
            <Link href="/profile" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold hover:bg-red-700 transition">
              {user.email?.[0].toUpperCase()}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Sign In</a>
          </div>
        )}
      </nav>
    </header>
  );
}
