# VolariX Feature Audit

## How to use this file

This is the chronological, resumable record for every material feature. Read it
after `CODEX.md` and `docs/HANDOFF.md`. Before ending work, update the active
entry with what changed, verification performed, blockers, and the exact next
action. Never claim an external setting has changed unless it was visibly
verified in the provider dashboard.

## Active feature — P0: Private Supabase Authentication

**Status:** Code cutover complete; owner dashboard settings still required  
**Owner decision:** Use Supabase Auth for private, single-user access; remove
all demo and public-registration flows.

### Completed

- Owner created Supabase project `ifixqeuxvfsxzkxlytqm` on September 4, 2026.
- Project URL and publishable key were stored locally in
  `app/supabase.config.js`; this file is ignored by Git.
- Added `app/supabase.config.example.js`, `.gitignore`, and
  `docs/SUPABASE_PRIVATE_AUTH.md`.
- In the Supabase dashboard, Email Auth was visibly enabled and anonymous
  sign-ins were visibly disabled.
- `app/login.html` signs in with `supabase.auth.signInWithPassword` only.
- `app/app.html` requires `volarixAuth.requireUser()` before showing the
  dashboard and signs out with `supabase.auth.signOut()`.
- Shared helper: `app/volarix-auth.js`.
- Landing CTAs no longer open a registration or demo path.
- BDD coverage updated: private login page, authorized sign-in, screener uses
  the test auth stub instead of demo `sessionStorage`.
- Resolved async race condition in `app/app.html`: `loadSession()` now triggers
  reliably once `volarixAuth.requireUser()` resolves over real network latency.
- Added `/app.js` to `app/sw.js` cached assets list.

### Not completed

- `Allow new users to sign up` was last seen enabled and must be disabled, then
  saved in Supabase Authentication > Sign In / Providers. This was not
  re-checked in the dashboard during the code cutover.
- Authentication URL configuration must be set to the final deployed VolariX
  domain.
- `app/supabase.config.js` must be present on the Netlify (or local) host; it
  is not in Git.

### Resume steps

1. Owner confirms `Allow new users to sign up` is disabled and saved.
2. Set Site URL and Redirect URLs for https://volarix.netlify.app (and local
   `http://localhost:8080` if used).
3. Deploy `app/` including a host-local `supabase.config.js` (never commit it).
4. Sign in with the owner account and confirm logout blocks `app.html`.
5. After those checks, mark P0 complete and resume P1.

### Security constraints

- Never add a Supabase secret/service-role key to code, configuration, a commit,
  or an agent message.
- Never ask for or store the owner's password.
- Do not treat the live site as private until the remaining dashboard checks
  pass and the gitignored config is on the host.

## Next feature — P1: Market-data integration

P1 Yahoo Finance quotes and Alternative.me Fear & Greed remain in place with
cached static-data fallback. Finnhub, FRED, and any options-data provider must
use server-side handling for secrets and must first have a defined UI consumer.
