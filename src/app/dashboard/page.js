'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setUser(user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Overview</h1>

        <div className="grid grid-cols-12 gap-6">
          
          {/* Avatar & Points */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <a href="/profile" className="block">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold cursor-pointer hover:opacity-90 transition">
                  {user?.email?.[0].toUpperCase()}
                </div>
              </a>
              <a href="/profile" className="block w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-center">
                View Profile
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-500 text-sm mb-2">Your Points</h3>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mb-4">3,456</p>
              <button className="text-red-600 text-sm hover:text-red-700 mb-4">How to earn more points?</button>
              
              <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-xs font-semibold">Recent Transactions</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">+20</div>
                  <p className="text-sm text-gray-700">Won BGMI Tournament</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">+15</div>
                  <p className="text-sm text-gray-700">Completed Daily Quest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Level & Rewards */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900 font-semibold">My Level</h3>
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input type="checkbox" className="rounded" />
                  Pro Mode
                </label>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">80</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-red-600">74%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-red-500 to-purple-500"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">2,030 to next level</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-900 font-semibold mb-4">Daily Reward</h3>
              <div className="text-center">
                <div className="text-6xl mb-3">☕</div>
                <p className="text-gray-700 mb-3">Morning Boost</p>
                <div className="flex justify-center gap-3 mb-4">
                  <span className="text-blue-600">⚡+1</span>
                  <span className="text-yellow-600">⭐+1</span>
                  <span className="text-red-600">💎+1</span>
                </div>
                <button className="w-full py-3 rounded-lg bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition">
                  Collect
                </button>
              </div>
            </div>
          </div>

          {/* Trophies & Quests */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-900 font-semibold mb-4">Latest Trophy</h3>
              <div className="text-center">
                <div className="text-6xl mb-3">🏆</div>
                <p className="text-yellow-600 font-bold mb-1">Tournament Winner</p>
                <p className="text-gray-500 text-sm mb-3">Won 5 tournaments</p>
                <div className="flex justify-center gap-3">
                  <span className="text-blue-600 text-sm">⚡1</span>
                  <span className="text-yellow-600 text-sm">⭐2</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900 font-semibold">Next Quests</h3>
                <button className="text-red-600 text-sm hover:text-red-700">See all</button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Join a tournament</span>
                  <span className="text-red-600 text-sm font-bold">+20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Win a match</span>
                  <span className="text-red-600 text-sm font-bold">+50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Create a team</span>
                  <span className="text-red-600 text-sm font-bold">+15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Invite a friend</span>
                  <span className="text-red-600 text-sm font-bold">+100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="col-span-4 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Tournaments Played</h3>
            <div className="flex items-center justify-between">
              <button className="text-gray-400 hover:text-gray-600">←</button>
              <p className="text-4xl font-bold text-gray-900">345</p>
              <button className="text-gray-400 hover:text-gray-600">→</button>
            </div>
          </div>

          <div className="col-span-4 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-2">Your Tokens</h3>
            <p className="text-3xl font-bold text-yellow-600 mb-2">34</p>
            <p className="text-gray-500 text-xs mb-4">Exchange tokens for rewards</p>
            <button className="w-full py-2 rounded-lg bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition">
              Spend Tokens
            </button>
          </div>

          <div className="col-span-4 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-2">Energy</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">⚡ 10</p>
            <p className="text-gray-500 text-xs mb-4">Use energy to boost performance</p>
            <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
              Use Energy
            </button>
          </div>

          {/* Endorsements */}
          <div className="col-span-12 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-4">Recent Stats</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Win Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">345</p>
                  <span className="text-green-600 text-sm">+4</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Team Play</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">452</p>
                  <span className="text-green-600 text-sm">+2</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">MVP Awards</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">212</p>
                  <span className="text-green-600 text-sm">+1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
