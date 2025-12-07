# E-Arena Esports Platform

Modern esports tournament platform built with Next.js and Supabase.

## Features

- 🎮 Tournament browsing and registration
- 🔐 Authentication (Email/Password + Google OAuth)
- 📊 Gamified user dashboard
- 👤 User profiles
- 🎯 Real-time tournament updates

## Tech Stack

- **Framework**: Next.js 16.0.7
- **Database**: Supabase
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pranjal2410719/esports)

1. Click the button above or go to [Vercel](https://vercel.com)
2. Import your repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Project Structure

```
e-arena/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   └── lib/             # Utilities and configs
├── public/              # Static assets
└── vercel.json          # Vercel configuration
```
