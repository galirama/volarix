# VolariX — Implementation Task Log
**Authoritative record of what has been built vs. what remains.** Cross-reference with `specs.md` (what it should do) and `CLAUDE.md` (how to build it). Update this file at the end of every work session.

---

## Status Legend
✅ Done and verified &nbsp;&nbsp; 🔄 Partially built &nbsp;&nbsp; ❌ Not started

---

## 1. Infrastructure & Auth

| Task | Status | Notes |
|---|---|---|
| 3-file static site structure | ✅ | `index.html`, `login.html`, `app.html` |
| Netlify deployment config | ✅ | `netlify.toml` with routing + security headers |
| sessionStorage auth + 8hr expiry | ❌ Replaced | Supabase session via `volarix-auth.js` |
| Auth guard on app.html | ✅ | `volarixAuth.requireUser()` in `<head>` |
| Simulated TOTP MFA (6-digit) | ❌ Removed | Private password sign-in only |
| Register flow with validation | ❌ Removed | Public registration disabled in product UI |
| Demo credentials | ❌ Removed | No demo accounts in the app |

---

## 2. Global UI Shell

| Task | Status | Notes |
|---|---|---|
| Scrolling ticker banner | ✅ | VIX, Fear & Greed, ~11 tickers |
| Command Palette (⌘K) | ✅ | Fuzzy search, keyboard nav (↑↓/Enter/Esc) |
| Toast notification system | ✅ | 5 types, auto-dismiss, periodic simulated alerts |
| Dark/Light theme toggle | ✅ | Persisted via localStorage |
| Mobile responsive layout | ✅ | Sidebar hides <720px, tables → cards |
| Keyboard shortcuts | ✅ | ⌘K / Ctrl+K, `/` |
| 3-step onboarding wizard | ✅ | Risk tolerance → watchlist → suggested trade |
| Watchlist sidebar | ✅ | Live prices, add/remove, click-through |
| Market price simulator | ✅ | `MKT` object, 8-second drift interval |
| localStorage state persistence | ✅ | `saveState()` / `loadState()`, key `volarix_state` |

---

## 3. Dashboard Tabs

| Tab | Builder Function | Status | Notes |
|---|---|---|---|
| Overview | `buildOverview()` | ✅ | P&L sparkline, F&G gauge, VIX, risk score, positions table |
| Ticker Analyzer | `buildTickerAnalyzer()` | ✅ | Candlestick + RSI Canvas charts, fundamentals, IV history |
| IV Screener | `buildScreener()` | ✅ | Sortable IV rank table |
| Mega-Cap IV Screener | `buildMegacap()` | ✅ | 20 companies >$200B, sorted by IV rank |
| Options Chain | `buildOptions()` | ✅ | Greeks grid, Greek Visual / Full Chain toggle |
| Strategy Builder | `buildStrategy()` | ✅ | Multi-leg constructor, presets, Canvas P&L diagram |
| Earnings Calendar | `buildEarnings()` | ✅ | Monthly grid, IV crush risk scores |
| Economic Calendar | `buildEconomic()` | ✅ | 12 hardcoded Fed/CPI/Jobs/GDP events, impact levels |
| Unusual Activity | `buildUOA()` | ✅ | Institutional flow scanner, 2.5x volume threshold |
| Flow Heatmap | `buildHeatmap()` | ✅ | Sector grid, derived from MEGACAP_DATA |
| Alt Data | `buildCongress()` | ✅ | Congressional + insider sub-tabs |
| Track Record | `buildSignals()` | ✅ | Public signal history table |
| Sector Rotation | `buildSectors()` | ✅ | 4-quadrant capital flow matrix, AI summary |
| Paper Trading | `buildPaper()` | ✅ | AI Post-Mortem log, simulate form, scorecard gate wired in |
| Journal Stats (sub-tab) | `buildJournalStats()` | ✅ | Win rate by strategy, equity curve |
| Live Trading | `buildLive()` | ✅ | UI-only — no real brokerage connection |
| Backtesting | `buildBacktest()` | ✅ | Config form, stats grid, Canvas equity curve |
| Exit Automation | `buildExit()` | ✅ | Default + per-position rules, AI recommendations |
| Import Portfolio | `buildImport()` | ✅ | CSV drop zone, manual entry, broker connect (UI only) |
| Position Sizing | `buildSizingCalc()` | ✅ | Live recalculation, Kelly Criterion formula |
| Alerts | `buildAlerts()` | ✅ | Create/manage form, delivery channel selection (UI only) |
| Settings | `buildSettings()` | ✅ | Thresholds, theme, MFA, subscription display, export |

---

## 4. Modals

| Modal | Status | Notes |
|---|---|---|
| Risk Shield | ✅ | `riskModal`, concentration/delta/theta checks |
| Stock Health Scorecard | ✅ | `scorecardOverlay`, 10-point gate, wired into Paper Trading pre-trade flow |
| Options Profit Calculator | ✅ | `calcOverlay`, live slider-driven P&L, Canvas chart |
| Onboarding | ✅ | `onboardOverlay`, 3 steps |
| Command Palette | ✅ | `cmdPalette` |

---

## 5. Feature Backlog (P1–P10)

These were the 10 critical features identified for post-launch enhancement.

| ID | Feature | Status | Detail |
|---|---|---|---|
| P1 | Real-time data APIs | ❌ **Not started** | Requires: Yahoo Finance wrapper, Finnhub free tier key, Alternative.me (F&G), FRED API. Blocked on: obtaining free API keys. Pattern specified in `ARCHITECTURE.md` (`fetchWithCache`). |
| P2 | Options Profit Calculator | ✅ Done | `openCalc()`, `buildCalcContent()`, `drawCalcChart()`, `updateCalcSlider()` |
| P3 | localStorage persistence | ✅ Done | `saveState()`, `loadState()`, auto-save wrapped around watchlist/theme mutations |
| P4 | Trade Journal Statistics | ✅ Done | `buildJournalStats()`, nested in Paper Trading tab |
| P5 | IV Rank Historical Chart | ✅ Done | `drawIVHistory()`, injected into Ticker Analyzer, 52 simulated weekly readings |
| P6 | Position Sizing Calculator | ✅ Done | `buildSizingCalc()`, `refreshSizing()`, own sidebar tab |
| P7 | PWA | ✅ Partial | `initPWA()` / `installPWA()` listen for `beforeinstallprompt` — **no `manifest.json` or `sw.js` file has been created yet**, so install prompt will not actually fire in a real browser. See open item below. |
| P8 | Economic Calendar | ✅ Done | `buildEconomic()`, 12 hardcoded events for June 2026 |
| P9 | Options Flow Heatmap | ✅ Done | `buildHeatmap()`, sector grid from MEGACAP_DATA |
| P10 | Weekly Email Digest | ❌ **Not started** | Requires: Resend.com account + API key, Netlify scheduled function. Not buildable without external account. |

### ⚠️ Known Gap: P7 PWA is incomplete
The JS event listeners exist (`initPWA`, `installPWA`) but the two files that make a site actually installable are missing:
- `manifest.json` — not created
- `sw.js` (service worker) — not created
- `<link rel="manifest">` tag — not added to `app.html` `<head>`

**To finish P7:** create these two files at the repo root of the deployed `app/` folder and link the manifest in `app.html`. Spec for both files is in `ARCHITECTURE.md` under "PWA Implementation."

---

## 6. Documentation

| File | Status | Notes |
|---|---|---|
| `CLAUDE.md` (root) | ✅ | Agent entry point, read first every session |
| `README.md` (root) | ✅ | Human deploy instructions |
| `docs/specs.md` | ✅ | This session — full functional specification |
| `docs/tasks.md` | ✅ | This session — this file |
| `docs/ARCHITECTURE.md` | ✅ | System design, migration path, data flow patterns |
| `docs/DB_SCHEMA.md` | ✅ | Full PostgreSQL schema with RLS policies (for future Supabase migration) |
| `docs/LEGAL.md` | ✅ | Disclaimer requirements |
| `docs/PRODUCT.md` | ✅ | Vision, phases, monetization tiers |
| `docs/PROJECT_STATUS.md` | ✅ | Snapshot of build state — update every session |
| `docs/TASK_QUEUE.md` | ✅ | Prioritized backlog with acceptance criteria (P1/P10 remain open) |
| `docs/TOKEN_GUIDELINES.md` | ✅ | Coding efficiency rules, the "no template literals in HTML" rule |
| `docs/UI_GUIDELINES.md` | ✅ | Design system reference |

---

## 7. Known Issues / Technical Debt

1. **P7 PWA incomplete** — see section 5 above. `manifest.json` and `sw.js` must be created and linked.
2. **app.html approaching size limit** — currently ~192KB against a 200KB soft limit. Any further feature additions should split JS into a separate `app.js` file rather than continuing to grow the single HTML file.
3. **All market/fundamental data is simulated** — `MKT`, `FUNDAMENTALS`, and `MEGACAP_DATA` are hardcoded objects, not live feeds. This is P1 and is the single most impactful remaining task for making the product real.
4. **Brokerage connect buttons are non-functional** — Live Trading and Import Portfolio show OAuth-style "Connect" buttons for Tastytrade/IBKR/Webull/Schwab that only fire a toast notification; no real OAuth flow exists.
5. **No backend / database** — everything runs client-side. `STATE` resets fully (except what's in `localStorage`) on a hard refresh in a new browser or after clearing site data.

---

## 8. Next Session Priorities (in order)

1. **Finish P0 owner settings** — disable public sign-ups, set Site/Redirect URLs, deploy gitignored config.
2. **P1 remaining providers** — Finnhub/FRED only after a defined UI consumer and server-side key handling.
3. **P10 Weekly Email Digest** — needs a Resend account + API key.

Anything beyond these three should come from a fresh prioritization conversation, not be assumed.
