'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(data);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-4xl font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile?.username || user?.email?.split('@')[0] || 'Gamer'}
              </h1>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex gap-3">
                <button className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
                  Edit Profile
                </button>
                <a href="/dashboard" className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                  Back to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
            <p className="text-gray-600 text-sm">Tournaments</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">5</p>
            <p className="text-gray-600 text-sm">Wins</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">₹15,000</p>
            <p className="text-gray-600 text-sm">Earnings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-8">
              <button className="py-4 border-b-2 border-red-600 text-red-600 font-medium">Overview</button>
              <button className="py-4 text-gray-600 hover:text-gray-900">Tournaments</button>
              <button className="py-4 text-gray-600 hover:text-gray-900">Teams</button>
              <button className="py-4 text-gray-600 hover:text-gray-900">Achievements</button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-purple-600"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">BGMI Championship 2024</p>
                  <p className="text-sm text-gray-600">Registered • 2 hours ago</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">Pending</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Valorant League Season 1</p>
                  <p className="text-sm text-gray-600">Completed • 1 day ago</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">Won</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
