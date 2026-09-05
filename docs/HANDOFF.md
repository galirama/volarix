# VolariX Continuation Handoff

## Latest update — September 4, 2026

- Continued P0 from the uncommitted `login.html` rewrite: dashboard guard,
  sign-out, landing CTAs, and BDD tests now use private Supabase Auth.
- Added `app/volarix-auth.js` as the shared browser client wrapper.
- Fixed session resolution in `app/app.html` so `appShell` renders reliably
  when Supabase returns over real network latency.
- Added `/app.js` to `app/sw.js` cache manifest.
- Demo credentials, 1-click demo login, and `?mode=register` paths are removed
  from the live HTML. `app/supabase.config.js` remains gitignored.
- Remaining P0 work is owner-side: disable public sign-ups, set Site/Redirect
  URLs, and copy the local config onto the deploy host.

## Read this first

This file is the current implementation snapshot for humans and agents. Read it
after `CODEX.md` and `FEATURE_AUDIT.md`, then inspect the named code before
changing anything. Update this file, `FEATURE_AUDIT.md`, `PROJECT_STATUS.md`,
and `TASK_QUEUE.md` when a task changes scope or completion state.

## Product and runtime

- The product is a static, educational options-analysis prototype. It has no
  backend and must not present signals as financial advice.
- Deploy the `app/` directory to Netlify. `vercel.json` also supports a static
  Vercel deployment. Include a host-local `supabase.config.js` that is never
  committed.
- Authentication is Supabase email/password. The dashboard calls
  `volarixAuth.requireUser()` before render. Logout calls `volarixAuth.signOut()`.
- Persistent user state is client-side `localStorage`. Runtime market state is
  the `MKT` object in `app/app.html`.

## Source layout and load order

- `app/app.html` contains the page structure, styles, primary runtime, market
  fetching, and app initialization. Keep it below 200,000 bytes.
- `app/volarix-auth.js` loads after the Supabase SDK and before the auth guard.
- `app/app.js` contains fundamental-scorecard and mega-cap data. It is loaded
  at the end of `app.html`, after the inline runtime declares `$`.
- `app/index.html` is the public landing page; `app/login.html` is private
  sign-in only.
- `app/sw.js` and `app/manifest.json` provide PWA support.

## Current work state

P0 code is in the tree. P1 quote/Fear & Greed fetching remains in
`syncMarketData()`. Do not add Finnhub or FRED keys to browser code.

## Private-access work queue

Follow `docs/SUPABASE_PRIVATE_AUTH.md` and `docs/FEATURE_AUDIT.md`. Do not
accept a password, secret key, or service-role key from the owner or put one
in code.

## Verification

Run `npm ci`, `npx playwright install chromium`, and `npm test` on a machine
with Node.js 20+. Cucumber covers private login, stubbed authorized sign-in,
and the fundamental screener. Also run `wc -c app/app.html`.

## Guardrails

- Preserve the legal disclaimer on signal-generating UI.
- Keep the static-data fallback when changing market data.
- Avoid broad refactors of the dashboard's sequential function overrides.
- Update this handoff with the exact feature state, changed files, verification
  performed, and remaining risks before a task ends.
