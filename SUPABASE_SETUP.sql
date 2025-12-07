-- Run this in Supabase SQL Editor

-- Users table with roles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  role TEXT DEFAULT 'player' CHECK (role IN ('player', 'admin', 'dopa')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  game TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'completed')),
  max_teams INTEGER DEFAULT 16,
  prize_pool TEXT,
  entry_fee INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  tag TEXT,
  captain_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Tournament registrations
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  screenshot_url TEXT,
  payment_verified BOOLEAN DEFAULT FALSE,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tournament_id, team_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: can read own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Tournaments: anyone can read
CREATE POLICY "Anyone can read tournaments" ON tournaments FOR SELECT USING (true);

-- Teams: anyone can read
CREATE POLICY "Anyone can read teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Captain can update team" ON teams FOR UPDATE USING (auth.uid() = captain_id);

-- Team members: anyone can read
CREATE POLICY "Anyone can read team members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Members can leave team" ON team_members FOR DELETE USING (auth.uid() = user_id);

-- Registrations: anyone can read, team members can create
CREATE POLICY "Anyone can read registrations" ON registrations FOR SELECT USING (true);
CREATE POLICY "Team members can register" ON registrations FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_id = registrations.team_id 
    AND user_id = auth.uid()
  )
);

-- Insert sample tournaments
INSERT INTO tournaments (name, game, start_date, status, max_teams, prize_pool, entry_fee) VALUES
('BGMI Championship 2024', 'BGMI', NOW() + INTERVAL '7 days', 'upcoming', 16, '₹50,000', 500),
('Valorant League Season 1', 'Valorant', NOW() + INTERVAL '14 days', 'upcoming', 8, '₹30,000', 300),
('Free Fire Masters', 'Free Fire', NOW() + INTERVAL '3 days', 'upcoming', 12, '₹20,000', 200);
