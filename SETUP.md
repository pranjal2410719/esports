# E-Arena MFE Setup

## Structure Created

```
e-arena/
├─ apps/
│  ├─ shell/              # Host app (Next.js) - runs on :3000
│  ├─ mfe-home/           # Home page micro-app - runs on :3002
│  └─ mfe-tournaments/    # Tournaments micro-app - runs on :3001
├─ packages/
│  ├─ ui/                 # Shared components (Button, Card)
│  ├─ utils/              # Shared utilities (formatDate, apiClient)
│  └─ types/              # Shared constants (USER_ROLES, etc)
```

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure Supabase:**
   - Update `apps/shell/.env.local`
   - Update `apps/mfe-tournaments/.env.local`
   - Add your Supabase URL and anon key

3. **Run dev servers:**
   ```bash
   pnpm dev
   ```
   - Shell: http://localhost:3000
   - Home MFE: http://localhost:3002
   - Tournaments MFE: http://localhost:3001

## Routes

- `/` → Loads mfe-home (Playrex-style gaming homepage)
- `/tournaments` → Loads mfe-tournaments

## Key Files

- **Shell auth endpoint:** `apps/shell/src/app/api/me/route.js`
- **Shell header:** `apps/shell/src/components/Header.jsx`
- **Shell loads home MFE:** `apps/shell/src/app/page.js`
- **Shell loads tournaments MFE:** `apps/shell/src/app/tournaments/page.js`
- **Home MFE:** `apps/mfe-home/src/app/page.js`
- **Tournaments MFE:** `apps/mfe-tournaments/src/app/page.js`
- **Shell config:** `apps/shell/next.config.mjs`

## Supabase Schema (Required)

```sql
-- Users table with roles
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'player' CHECK (role IN ('player', 'admin', 'dopa'))
);

-- Tournaments table
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'upcoming'
);

-- RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Anyone can read tournaments" ON tournaments FOR SELECT USING (true);
```

## Architecture

### Shell (Host)
- Global header/nav
- Auth management
- Route mounting points
- Loads MFEs via Module Federation

### MFE-Home (Port 3002)
- Hero section with CTA
- Clan icon strip
- Info section
- Esports tournament cards
- Live stream section

### MFE-Tournaments (Port 3001)
- Tournament list
- Filters
- Details view

## Next Steps

1. Add more MFEs: `mfe-team`, `mfe-dashboard`, `mfe-admin`
2. Implement Supabase auth flow in shell
3. Add shared event bus for MFE communication
4. Deploy each MFE to Vercel separately
5. Update shell remotes to production URLs
6. Add animations and responsive design to home MFE
