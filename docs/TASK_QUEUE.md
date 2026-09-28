## 🟢 P16 — Screener: Interactive Table Sorting & Column Customization
**Status:** Not Started
**Files:** `app/app.js`, `app/screenerService.js`

**Acceptance criteria:**
- [ ] Sort State in Table Component: Add state for sortColumn and sortDirection.
- [ ] Header Click Handles: Clickable headers with ▲ / ▼ visual indicators.
- [ ] Smart Default Sort: Discount % (Desc) or RSI (Asc) default.
- [ ] Sorting Logic: Robust handling for numerical and string fields (no NaN errors).
- [ ] Loading State: Sorting must persist/operate during loading spinner states.

---


# VolariX Task Queue
**One task per session. Check off when done. Update PROJECT_STATUS.md after each.**

---
## 🟢 P15 — Screener Enhancements (52W Range & Moving Averages)
**Status:** In Progress
**Files:** `app/screenerService.js`, `app/app.js`

**Acceptance criteria:**
- [ ] 52-Week High/Low integrated into `fetchTickerFundamentals`
- [ ] SMA 7/20/200 calculated/fetched and passed to UI
- [ ] UI Table renders 52W Range column
- [ ] UI Table renders Moving Averages with conditional color coding (Price vs SMA)
- [ ] Batching queue maintained to prevent 429 errors

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
**Files:** `app/screenerService.js`, `api/quote.js`
**Requirements:**
- [x] Create/Update `screenerService.js` for Finnhub API interaction.
- [x] Ticker list: AAPL, NVDA, AMZN, SOFI, MSFT, TSLA, SPY, MU, GOOGL, META, AMD, PLTR, NFLX, BABA, INTC.
- [x] Endpoints: `/stock/metric`, `/stock/price-target`, `/quote`, `/indicator/rsi`, `/indicator/macd`, `/calendar/earnings`.
- [x] Features: Error handling, rate limiting, caching (localStorage, 1h TTL).

**Acceptance criteria:**
- [ ] `screenerService.js` exports `fetchScreenerData` with batch processing.
- [ ] `api/quote.js` supports all required endpoints.
- [ ] Fallback to mock data on API failure.

---

## 🟢 P12 — Fundamental Stock Screener (Phase 2: Filtering & Rules)
**Status:** Completed
**Files:** `app/filterService.js` (new)

---

## 🟢 P13 — Fundamental Stock Screener (Phase 3: UI Table & Filters)
**Status:** Completed
**Files:** `app/app.html`, `app/app.js`
**Details:** Implemented UI table with summary stats, filters, and skeleton loading animation.

**Verification:**
- Verified UI table renders correctly.
- Filter presets (All, CSP, LEAPS) toggle correctly.
- Skeleton loading animation triggers before data load.
- "Analyze" button functionality stubbed.

---

## 🟡 P14 — AI Assistant & Trade Setup Integration
**Status:** In Progress
**Files:** `app/app.js` (integration logic), `app/screenerService.js`

**Requirements (Step 3: Unified Dynamic Data Table):**
- [ ] Implement single shared Table component that dynamically adjusts columns based on Tab.
- [ ] Shared Columns: Ticker, Current Price, Strategy Badge, Action Button ('Analyze Setup' / 'Checklist').
- [ ] Tab 1 (Fundamental): Adds P/E & EPS, RSI badge, MACD status, Analyst Upside %, Earnings Date.
- [ ] Tab 2 (CSP): Adds IV Rank, IV Status %, Checklist criteria (✓✓✓), Delta guidance, Target Strike.
- [ ] Tab 3 (LEAPS): Adds Golden Rule Setup status (✓✓✗ pass/fail breakdown), Status (WAITING / READY), Target Expiry / Delta (~0.80 Delta).

**Requirements (Step 4: Integration with Local AI Assistant & Sidebar):**
- [x] Clicking 'Analyze'/'Checklist' in any row transfers full ticker data (Price, RSI, MACD, IV Rank, Strategy) to the Local AI Trade Assistant chat prompt at the bottom.
- [x] Update left sidebar navigation to point only to 'Fundamental Screener' (the unified hub). CSP Bargains and LEAPS Bargains are sub-views inside the Fundamental Screener view.
- [ ] Clean up redundant component files once the unified component is working and tested.


## ✅ Completed

- [x] P2: Options Profit Calculator (openCalc, buildCalcContent, drawCalcChart)
- [x] P3: localStorage persistence (saveState, loadState, auto-save on changes)
- [x] P4: Trade Journal Statistics (buildJournalStats, equity curve chart)
- [x] P5: IV Rank Historical Chart (drawIVHistory in Ticker Analyzer)
- [x] P6: Position Sizing Calculator (buildSizingCalc, refreshSizing, Kelly formula)
- [x] P7: PWA (initPWA, installPWA, beforeinstallprompt handler)
- [x] P8: Economic Calendar (buildEconomic, 12 events, impact levels)
- [x] P9: Options Flow Heatmap (buildHeatmap, sector grid, call/put flow)
