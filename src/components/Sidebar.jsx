'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 z-40" />}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      
      {/* Logo */}
      <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-6 hover:opacity-80 transition">
        <img src="https://i.pinimg.com/736x/62/5f/3e/625f3e212851746ad3e0181bc71ec5ed.jpg" alt="E-Arena" className="h-10 w-10 rounded-full object-cover" />
        <span className="font-bold text-xl text-gray-900">E-Arena</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link href="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive('/') ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'}`}>
          <span className="text-xl">🏠</span>
          <span className="font-medium">Home</span>
        </Link>

        <Link href="/tournaments" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive('/tournaments') ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'}`}>
          <span className="text-xl">🏆</span>
          <span className="font-medium">Tournaments</span>
        </Link>

        {user && (
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive('/dashboard') ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'}`}>
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </Link>
        )}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        {user ? (
          <div className="space-y-3">
            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.email?.split('@')[0]}</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </Link>
            <button onClick={handleLogout} className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 rounded-lg bg-red-600 text-white text-center font-medium hover:bg-red-700 transition">
            Sign In
          </Link>
        )}
      </div>
    </aside>
    </>
  );
}
