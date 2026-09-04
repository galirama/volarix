# VolariX Continuation Handoff

## Latest update — September 3, 2026

- Fixed the `app.js` load-order error by moving its script tag below the inline
  dashboard runtime in `app/app.html`.
- Reconciled `CODEX.md`, `README.md`, `PROJECT_STATUS.md`, `TASK_QUEUE.md`,
  `DEVELOPER_GUIDE.md`, and `TOKEN_GUIDELINES.md` with the current code.
- Static checks passed: `app/app.html` is below its 200,000-byte budget and no
  merge-conflict markers were found in source or documentation.
- Runtime tests remain unverified locally because Node.js and macOS Command
  Line Tools are unavailable on this workstation.

## Read this first

This file is the current implementation snapshot for humans and agents. Read it
after `CODEX.md`, then inspect the named code before changing anything. Update
this file, `PROJECT_STATUS.md`, and `TASK_QUEUE.md when a task changes scope or
completion state.

## Product and runtime

- The product is a static, educational options-analysis prototype. It has no
  backend and must not present signals as financial advice.
- Deploy the `app/` directory to Netlify. `vercel.json` also supports a static
  Vercel deployment.
- Authentication is a demo-only `sessionStorage` guard; do not treat it as
  production authentication.
- Persistent user state is client-side `localStorage`. Runtime market state is
  the `MKT` object in `app/app.html`.

## Source layout and load order

- `app/app.html` contains the page structure, styles, primary runtime, market
  fetching, and app initialization. It is currently 187,725 bytes and must
  stay below 200,000 bytes.
- `app/app.js` contains fundamental-scorecard and mega-cap data. It is loaded
  at the end of `app.html`, after the inline runtime declares `$`; moving it to
  the document head causes a runtime error.
- `app/index.html` is the landing page; `app/login.html` implements demo login.
- `app/sw.js` and `app/manifest.json` provide PWA support.

## Current work state

P1 is partially complete. `syncMarketData()` fetches Yahoo Finance chart data
for displayed/watchlist symbols and Alternative.me Fear & Greed. `fetchWithCache`
uses `localStorage`; price TTL is 60 seconds and Fear & Greed TTL is one hour.
Both return to the static `MKT` values on failure.

Do not add Finnhub or FRED keys directly to browser code. First identify a UI
consumer, then introduce a server-side proxy or a provider approach appropriate
for a production migration. P10 (the scheduled Resend digest) has not started.

## Verification

Run `npm ci`, `npx playwright install chromium`, and `npm test` on a machine
with Node.js 20+ installed. The Cucumber suite is intentionally small: login
and fundamental-screener smoke coverage. Also check the browser console after
login and run `wc -c app/app.html` before handing off a dashboard change.

The current local workstation does not have Node.js or macOS Command Line Tools
available, so this checkout has not been test-run or Git-inspected locally.

## Guardrails

- Preserve the legal disclaimer on signal-generating UI.
- Keep the static-data fallback when changing market data.
- Avoid broad refactors of the dashboard's sequential function overrides.
- Update this handoff with the exact feature state, changed files, verification
  performed, and remaining risks before a task ends.
