# 🚀 Deployment Guide

## ✅ Supabase Setup Complete

Credentials configured in `apps/shell/.env.local`

## 📊 Setup Database

1. Go to https://pwilfvavyyxwfnwcyprx.supabase.co
2. Click **SQL Editor**
3. Copy contents of `SUPABASE_SETUP.sql`
4. Paste and run

This creates:
- `users` table with roles
- `tournaments` table
- `teams` table
- `team_members` table
- `registrations` table
- RLS policies
- 3 sample tournaments

## 🔥 Run App

```bash
cd apps/shell
npm run dev
```

Visit http://localhost:3000/tournaments to see sample tournaments.

## 🎯 Next Steps

**1️⃣ Full Tailwind CSS + Animations**
- Parallax effects
- Neon glow
- Smooth transitions
- Mobile responsive

**2️⃣ Component Refactor**
- Extract Hero.jsx
- Extract TournamentCard.jsx
- Move to packages/ui

**3️⃣ Add More Routes**
- /teams (create/join)
- /dashboard (stats)
- /admin (panel)

**4️⃣ Auth Flow**
- Google OAuth
- Discord OAuth
- Session management

Reply with: **1 / 2 / 3 / 4**
