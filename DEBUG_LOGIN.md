# 🔍 Login Debug Guide

## Check These in Supabase Dashboard

### 1. **Enable Email Auth**
Go to: https://pwilfvavyyxwfnwcyprx.supabase.co/project/_/auth/providers

✅ Make sure **Email** provider is enabled
✅ Disable "Confirm email" if you want instant login (for testing)

### 2. **Create Test User**
Go to: https://pwilfvavyyxwfnwcyprx.supabase.co/project/_/auth/users

Click "Add user" → Create with:
- Email: test@example.com
- Password: test123456

### 3. **Check Auth Settings**
Go to: https://pwilfvavyyxwfnwcyprx.supabase.co/project/_/auth/url-configuration

Site URL: `http://localhost:3000`
Redirect URLs: `http://localhost:3000/**`

## Test Login

1. **First, create account via signup:**
   - Visit http://localhost:3000/signup
   - Enter email + password
   - Click "Sign Up"

2. **Then login:**
   - Visit http://localhost:3000/login
   - Use same email + password
   - Click "Login"

## Common Issues

### "Invalid login credentials"
- User doesn't exist → Sign up first
- Wrong password
- Email confirmation required → Disable in Auth settings

### "Email not confirmed"
Go to Auth → Settings → Disable "Enable email confirmations"

### No error but not redirecting
- Check browser console (F12)
- Check if Supabase URL/Key are correct in `.env.local`

## Test with Console

Open browser console (F12) on login page and run:

```javascript
// Test Supabase connection
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(
  'https://pwilfvavyyxwfnwcyprx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3aWxmdmF2eXl4d2Zud2N5cHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMzAyODQsImV4cCI6MjA4MDcwNjI4NH0.wpUY423yrqcr_lVuBrycsslQ0LTAkCv-KSTNFGcBjdY'
);

// Try login
const result = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'test123456'
});

console.log(result);
```

If you see `{data: {user: {...}}}` → Login works!
If you see `{error: {...}}` → Check the error message
