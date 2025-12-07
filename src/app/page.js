'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            COMPETE. WIN. DOMINATE.
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join India's premier esports tournament platform. Compete in BGMI, Valorant, Free Fire and more.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/tournaments" className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
              Browse Tournaments
            </a>
            <a href="/signup" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition">
              Sign Up Free
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-red-600 mb-2">10K+</p>
            <p className="text-gray-600">Active Players</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-red-600 mb-2">500+</p>
            <p className="text-gray-600">Tournaments</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-red-600 mb-2">₹50L+</p>
            <p className="text-gray-600">Prize Pool</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-red-600 mb-2">24/7</p>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Games</h2>
          <div className="grid grid-cols-3 gap-6">
            <a href="/tournaments?game=bgmi" className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">🎮</p>
                  <p className="text-2xl font-bold text-white">BGMI</p>
                </div>
              </div>
            </a>
            <a href="/tournaments?game=valorant" className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">🎯</p>
                  <p className="text-2xl font-bold text-white">Valorant</p>
                </div>
              </div>
            </a>
            <a href="/tournaments?game=freefire" className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">🔥</p>
                  <p className="text-2xl font-bold text-white">Free Fire</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Join Tournament</h3>
              <p className="text-gray-600">Browse and register for tournaments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Win Prizes</h3>
              <p className="text-gray-600">Compete and earn rewards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-purple-600 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of gamers competing for glory and prizes</p>
          <a href="/signup" className="inline-block px-10 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Create Free Account
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">E-Arena</h4>
            <p className="text-gray-400 text-sm">India's premier esports tournament platform</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/tournaments" className="hover:text-white">Tournaments</a></li>
              <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">f</a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">𝕏</a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">📷</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© 2024 E-Arena. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
