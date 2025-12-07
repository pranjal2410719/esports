'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full bg-gray-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Panel */}
        <div className="relative bg-gradient-to-br from-red-600 to-purple-700 p-12 flex flex-col justify-between min-h-[600px]">
          <div>
            <img src="https://i.pinimg.com/736x/62/5f/3e/625f3e212851746ad3e0181bc71ec5ed.jpg" alt="E-Arena" className="h-20 w-20 rounded-full object-cover mb-4" />
            <p className="text-white/80">Selected Works</p>
          </div>
          
          <div className="absolute top-8 right-8 flex gap-3">
            <a href="/signup" className="bg-white/20 backdrop-blur px-6 py-2 rounded-full text-white hover:bg-white/30 transition">Sign Up</a>
            <a href="/signup" className="bg-white px-6 py-2 rounded-full text-red-600 font-bold hover:bg-gray-100 transition">Join Us</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur"></div>
            <div>
              <p className="text-white font-bold">Esports.arena</p>
              <p className="text-white/70 text-sm">Gaming & Tournaments</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30">←</button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30">→</button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-12 flex flex-col justify-center">
          <div className="absolute top-8 right-8">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
              🌐 EN
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Hi Gamer</h2>
            <p className="text-gray-400">Welcome to E-ARENA</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-red-500 text-sm hover:text-red-400">Forgot password?</a>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            <button type="button" onClick={handleGoogleLogin} className="w-full py-3 rounded-lg bg-white text-gray-900 font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <span className="text-xl">G</span>
              Login with Google
            </button>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Don't have an account? <a href="/signup" className="text-red-500 hover:text-red-400">Sign up</a>
            </p>
          </form>

          <div className="flex justify-center gap-4 mt-8">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600">f</a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600">𝕏</a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600">in</a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600">📷</a>
          </div>
        </div>
      </div>
    </div>
  );
}
