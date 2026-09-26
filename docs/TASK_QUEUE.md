# VolariX Task Queue
**One task per session. Check off when done. Update PROJECT_STATUS.md after each.**

---

## 🟡 P0 — Private Supabase Authentication
**Status:** Code cutover complete; awaiting owner dashboard confirmation  
**Files:** `app/login.html`, `app/app.html`, `app/index.html`,
`app/volarix-auth.js`, `app/supabase.config.js` (local only), tests, and docs  
**Specification:** `docs/SUPABASE_PRIVATE_AUTH.md`
**Audit:** `docs/FEATURE_AUDIT.md`

**Acceptance criteria:**
- [ ] Owner project has email Auth enabled and public/anonymous signups disabled
- [x] Owner account exists in Supabase Auth (created by owner; not stored here)
- [x] Demo and registration paths are removed from the site
- [x] Dashboard requires a verified Supabase user session
- [x] Logout revokes the session
- [x] No password, secret key, or service-role key is in the repository
- [ ] Host deploy includes gitignored `app/supabase.config.js`
- [ ] Site URL / Redirect URLs match the live domain

---

## 🟢 P1 — Market-Data Integration
**Status:** Implemented & Verified (September 19, 2026)
**Files:** `app/app.html` (MKT object), `app/dataService.js`, `api/quote.js`, `tests/features/market_data.feature`
**Implemented:**
- Yahoo Finance / Finnhub: Integration via secure Vercel API proxy (`/api/quote`)
- Data Resilience Layer: `fetchWithRetry` (exponential backoff) and `fetchWithFallback` (static data fallback)
- Connection Status Indicator: Real-time Live/Degraded/Offline feedback badge
- Centralized Configuration: Moved all keys to `app/config.js`

**Acceptance criteria:**
- [x] NVDA price in watchlist shows real number from Finnhub (via proxy)
- [x] Fear & Greed shows real value from Alternative.me
- [x] Graceful fallback to simulated data if fetch fails
- [x] No console errors on load
- [x] Ticker banner updates with real prices
- [x] Finnhub proxy handles API keys securely via Vercel env vars

---

## 🔴 P10 — Weekly Email Digest
**Status:** Not started  
**Files:** netlify/functions/weekly-digest.js (new file)  
**Service:** Resend.com (free: 3,000 emails/month)  
**Content:** Paper trade P&L this week, top 5 IV opportunities, upcoming earnings for watchlist  

**Acceptance criteria:**
- [ ] `netlify/functions/weekly-digest.js` exists and deploys
- [ ] Email sends with correct HTML template
- [ ] Resend API key stored in Netlify env var `RESEND_API_KEY`
- [ ] Scheduled via netlify.toml cron config (every Sunday 9am)
- [ ] Email includes legal disclaimer

---

---

## 🟡 P11 — Fundamental Stock Screener (Phase 1: API Integration)
**Status:** In Progress
**Files:** `app/screenerService.js` (new), `app/app.js` (test hook)
**Requirements:**
- Create `screenerService.js` for Finnhub API interaction.
- Ticker list: AAPL, NVDA, AMZN, SOFI, MSFT, TSLA, SPY, MU.
- Endpoints: `/stock/metric`, `/stock/price-target`, `/quote`.
- Features: Error handling, rate limiting, caching (localStorage).

**Acceptance criteria:**
- [ ] `screenerService.js` exports clear data-fetching functions.

---

## 🟡 P12 — Fundamental Stock Screener (Phase 2: Filtering & Rules)
**Status:** In Progress
**Files:** `app/filterService.js` (new)
**Requirements:**
- Implement `filterFundamentalStocks` with customizable criteria (PE, EPS, Price/Target, 52wk discount).
- Define presets for "CSP Candidates" and "LEAPS Candidates".
- Add mock data fallback logic to ensure the UI doesn't break when APIs are missing data.

**Acceptance criteria:**
- [ ] `filterFundamentalStocks` function correctly sorts/filters the ticker dataset.
- [ ] Presets return logical subsets of data.
- [ ] Missing fields in Finnhub data are handled gracefully.

- [ ] Successful console verification of raw data for all tickers.
- [ ] Graceful handling of rate limits and API errors.
- [ ] Data correctly cached in `localStorage`.


## ✅ Completed

- [x] P2: Options Profit Calculator (openCalc, buildCalcContent, drawCalcChart)
- [x] P3: localStorage persistence (saveState, loadState, auto-save on changes)
- [x] P4: Trade Journal Statistics (buildJournalStats, equity curve chart)
- [x] P5: IV Rank Historical Chart (drawIVHistory in Ticker Analyzer)
- [x] P6: Position Sizing Calculator (buildSizingCalc, refreshSizing, Kelly formula)
- [x] P7: PWA (initPWA, installPWA, beforeinstallprompt handler)
- [x] P8: Economic Calendar (buildEconomic, 12 events, impact levels)
- [x] P9: Options Flow Heatmap (buildHeatmap, sector grid, call/put flow)
