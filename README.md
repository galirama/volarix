# VolariX — Deploy Guide

## Files in this package
- `index.html`   — Public marketing landing page
- `login.html`   — Sign In / Register / MFA (2-step auth)
- `app.html`     — Full trading dashboard (auth-protected)
- `netlify.toml` — Netlify configuration

---

## Deploy in 30 seconds (Netlify Drop)
1. Go to **https://netlify.com/drop**
2. Drag the entire `volarix-site` folder onto the page
3. You get a live URL instantly — e.g. `https://volarix-abc123.netlify.app`
4. Rename it under Site Settings → Domain → `volarix.netlify.app`

---

## Demo login credentials
| Email | Password | Plan |
|---|---|---|
| trader@example.com | Password123 | Pro |
| demo@volarix.com | Demo1234 | Free |

MFA code: auto-fills in demo mode (replace with real TOTP in production)

---

## How auth works (demo)
1. User visits `index.html` (public — no auth required)
2. Clicks "Sign In" → goes to `login.html`
3. Enters credentials → checked against demo user list
4. 6-digit MFA code → auto-fills for demo
5. On success → `sessionStorage` stores session token → redirected to `app.html`
6. `app.html` has an auth guard that redirects to `login.html` if no valid session
7. Session expires after 8 hours or on sign out

---

## Production upgrade path
Replace the demo auth in `login.html` with:
```js
// Supabase Auth (recommended)
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const { data, error } = await supabase.auth.signInWithPassword({ email, password })
```

Then enable TOTP MFA in your Supabase dashboard under Authentication → MFA.

---

## Custom domain (Netlify)
1. Site Settings → Domain Management → Add custom domain
2. Add `CNAME` record at your DNS provider pointing to your Netlify URL
3. Netlify auto-provisions SSL certificate (Let's Encrypt)

---

⚠️ VolariX provides educational and analytical tools only. Not financial advice.
