# Use Case 03: Option Volatility Screeners & Fundamental Checklist Screener

## 1. Overview
This module handles market-wide screening across options volatility metrics (IV Rank, options flow) and fundamental health scorecards (10-point checklist). It includes:
1. **Standard IV Screener** (`buildScreener()`)
2. **Mega-Cap IV Screener** (`buildMegacap()`)
3. **Fundamental Checklist Screener** (`buildChecklistScreener()` — Multi-Stock View)
4. **Authentication & Access Strategy** (Basic Auth start → Email/SMS OTP future)
5. **Interactive Preview Mockups & Demo Conversion** (Landing & Login Teasers)
6. **Pure Educational & Non-Monetized Positioning** (100% Free, $0 Cost, Legal Guardrails)

---

## 2. Target Files & Code Locations
- `app/app.html`
  - Sidebar nav item under Markets: `<div class="nav-item" onclick="showTab('checklist',this)"><span class="nav-icon">✅</span>Fundamental Screener</div>`
  - `buildScreener()` — Standard IV Screener tab (`#tab-screener`)
  - `buildMegacap()` — Mega-Cap IV Screener tab (`#tab-megacap`)
  - `buildChecklistScreener()` — Fundamental Screener tab (`#tab-checklist`)
  - `runChecklistScreen(tickers)` — Processing logic reusing `scoreStock(sym)`
  - Data sources: `FUNDAMENTALS` object (24 tickers) & `MEGACAP_DATA` array (20 tickers)
  - Modal integration: `openScorecard(sym, 'analyze')` / `scorecardOverlay`
- `app/login.html` — Login page with interactive preview mockups & demo entry
- `app/index.html` — Educational marketing landing page

---

## 3. Functional Requirements

### 3.1 Standard IV Screener (`buildScreener()`)
- Sortable table of optionable tickers sorted by IV Rank.
- Column headers: Ticker, Price, IV %, IV Rank (0-100), Put/Call Ratio, Earnings Date, Suggested Action.
- Filter controls: Min IV Rank slider/dropdown, Sector filter, Directional Bias (Bullish/Bearish/Neutral).

### 3.2 Mega-Cap IV Screener (`buildMegacap()`)
- **Universe:** 20 companies with Market Cap > $200B (`NVDA`, `AAPL`, `MSFT`, `AMZN`, `GOOGL`, `META`, `TSLA`, `BRK.B`, `AVGO`, `JNJ`, `LLY`, `WMT`, `JPM`, `UNH`, `V`, `XOM`, `MA`, `PG`, `COST`, `HD`).
- **Default Sort:** IV Rank descending.
- **Visual Features:**
  - Colored "IV Ring" badge per row:
    - 🔴 Red: IV Rank ≥ 80 (High Premium / Premium Selling Zone)
    - 🟡 Amber: IV Rank 60–79 (Elevated IV)
    - 🔵 Cyan: IV Rank < 60 (Low IV / Option Buying Zone)
  - Earnings Proximity Badges:
    - 🚨 `≤7 days` → High IV-crush risk warning
    - ⚠️ `≤14 days` → Moderate earnings risk caution
- **Summary Footer:** Count of stocks in high-premium zones (IV Rank ≥60), average universe IV rank, total earnings-risk count, and bullish-bias count.
- **Action Items per Row:**
  - `Analyze` button → navigates directly to Ticker Analyzer (`tab-ticker`) preloaded with that symbol.
  - `Score →` button → opens Stock Health Scorecard modal overlay pre-loaded with ticker data.

---

### 3.3 Fundamental Screener (Multi-Stock Checklist View) — `buildChecklistScreener()`

#### Problem Being Solved
Traders want to answer *"Which of these stocks has the healthiest fundamentals?"* or *"Which mega-caps pass the most check points?"* side-by-side. The existing single-ticker Scorecard modal only checks one stock at a time; this dedicated tab provides a ranked multi-stock checklist view built on top of the existing `scoreStock(sym)` logic.

#### Input UI Modes (User selects one)
- **Mode A — Manual Tickers:** Free-text input accepting comma or space-separated ticker strings (e.g. `AAPL, MSFT NVDA`). Parse on submit — trim, uppercase, deduplicate, split on `/[,\s]+/`.
- **Mode B — Top-N by Market Cap:** Buttons or dropdown for Top 10 / Top 20 / Top 50, pulling tickers from `MEGACAP_DATA` sorted by `capN` descending.
- **Action:** A "Run Screener" button triggers the scoring pass.

#### Processing Logic (`runChecklistScreen(tickers)`)
```javascript
function runChecklistScreen(tickers) {
  return tickers.map(sym => {
    if (!FUNDAMENTALS[sym]) {
      return { sym, unavailable: true };
    }
    const result = scoreStock(sym); // reuse existing function, do not reimplement
    return { sym, ...result, unavailable: false };
  }).sort((a, b) => {
    if (a.unavailable) return 1;
    if (b.unavailable) return -1;
    return b.score - a.score || a.sym.localeCompare(b.sym); // best to worst, ties alphabetical
  });
}
```

#### Output — Ranked Table Specs
Render one row per ticker, sorted **best → worst** by composite score:
1. **Rank Number** (1, 2, 3...)
2. **Ticker Symbol** (monospace, bold)
3. **Composite Score (0–100):** Same color logic as single-ticker Scorecard (Green ≥70, Amber 45–69, Red <45).
4. **Composite Rating Badge:** Reuses `badge()` and `.composite-badge` styling (🟢 Strong Buy / 🟡 Cautious / 🔴 Avoid).
5. **10 Individual Metric Check Dots:** Compact row of small colored dots using `.score-dot` class in a **fixed, consistent order** (P/E, P/B, P/S, D/E, Rev Growth, EPS Growth, Gross Margin, Current Ratio, ROE, Insider Ownership).
6. **Tri-Color Summary Count:** e.g., `7 ✓ · 2 ~ · 1 ✗`.
7. **Earnings Badge:** Shown if earnings are ≤14 days away.
8. **Data Unavailable Row:** For tickers missing from `FUNDAMENTALS`, display an explicit "Data unavailable" row instead of fabricating a score or throwing an error.
9. **Row Click Action:** Clicking anywhere on a row opens the existing single-ticker Scorecard modal detail view (`openScorecard('${sym}', 'analyze')`). Do not duplicate detail logic.
10. **Table Re-Sorting:** Sortable by Composite Score (default descending), Ticker (A–Z), or Green-Check Count.
11. **Educational Disclaimer:** Prominently displayed footer notice.

---

### 3.4 Authentication & Onboarding Strategy

1. **Basic Auth (Phase 1 — Start With):**
   - Simple client-side authentication with email/password validation.
   - Demo credentials: `trader@example.com` / `Password123` or `demo@volarix.com` / `Demo1234`.
   - Session stored in `sessionStorage` key `volarix_auth` with 8-hour expiry.
   - Auth Guard redirects unauthenticated screener access to `login.html`.

2. **Passwordless OTP Login Roadmap (Phase 2 — Expansion):**
   - Support for Email OTP and SMS Text Message OTP (via Supabase Auth / Twilio API).
   - Frictionless sign-in: User enters Email or Mobile Phone Number → receives 6-digit text/email code → auto-logs in.

3. **Interactive Login Page Preview Mockups & Demo Entry:**
   - **Feature Teaser Carousel on `login.html`:** Displays live preview mockups of key tools before login:
     - *Mini IV Screener Widget:* Top 3 IV rank opportunities.
     - *Mini Fundamental Scorecard:* Sample 10-point check badge (`NVDA 85/100 🟢 Strong Buy`).
     - *Mini Options P&L Calculator:* Sample payoff curve thumbnail.
   - **1-Click "Try Live Demo" Button:** Allows prospective users to jump straight into the full application shell and screeners with pre-populated demo data without entering any credentials.

---

### 3.5 Educational & Non-Monetized Platform Requirements ($0 Cost)

1. **100% Free & Open Access ($0 Cost):**
   - Platform operates purely as an educational learning tool.
   - No payment processing, no credit card requirements, no subscription tiers, and no monetary transactions ($0 cost).
   - Eliminates commercial monetization risk, SEC/FINRA investment adviser registration compliance issues, and payment processor overhead.

2. **Mandatory Educational Disclaimers:**
   - **Login Page & Landing Page Header:**
     > *"VolariX is a 100% free educational and analytical platform. All signals, screeners, and metrics are for learning purposes only and do not constitute financial or investment advice."*
   - **Screener Tabs & Export Tools Footer:**
     > *"⚠️ Educational tool only. VolariX does not provide financial advice. All data and scores are simulated or historical."*

---

### 3.6 Suggested Beneficial Enhancements

1. **Preset Screener Filter Buttons:**
   - `🔥 High IV Sellers` — Filter tickers with IV Rank ≥ 80.
   - `🛡️ Fundamental Moats` — Filter tickers with Scorecard score ≥ 75.
   - `🚨 Earnings Risk Zone` — Filter tickers with earnings ≤ 7 days.
   - `🚀 High Growth` — Filter tickers with Revenue Growth > 15% & EPS Growth > 20%.

2. **CSV Export & Share Analysis:**
   - Button to download screened stock list as CSV (`volarix_screener_export.csv`).
   - "Copy Educational Summary" button for study groups and notes.

3. **Educational Hover Tooltips:**
   - Interactive hover tooltips over table column headers explaining financial metrics:
     - *P/E Ratio:* Price to Earnings — Valuation relative to per-share profits (<20x Green).
     - *Debt/Equity:* Financial leverage indicator (<0.5x Green).
     - *IV Rank:* Implied Volatility relative to 52-week high/low.

---

## 4. Constraints (Non-Negotiable)

1. **No template literals or `.map()` calls in raw HTML markup.** All dynamic HTML must be injected inside JS functions using `innerHTML`.
2. **Reuse existing CSS & helpers:** Use `$()`, `set()`, `badge()`, `.score-dot`, `.composite-badge`, `--cyan`, `--red`, `--amber`, `--green`, `--blue`.
3. **Do not modify `scoreStock()`, 10 metric thresholds, or composite score formula.**
4. **Keep `app.html` total file size under 200KB.**
5. **Mobile responsive:** Viewport support down to 375px / 720px breakpoint.

---

## 5. Acceptance Criteria & Test Verification

- [x] Standard IV Screener renders sortable table with working filter controls.
- [x] Mega-Cap Screener displays 20 companies sorted by IV Rank descending.
- [x] Colored IV rings accurately reflect IV Rank thresholds.
- [x] New "Fundamental Screener" nav item visible in sidebar under Markets.
- [x] Manual ticker input accepts `AAPL, MSFT NVDA` and correctly parses tickers.
- [x] Top-N mode pulls N tickers from `MEGACAP_DATA` sorted by market cap.
- [x] Screener table renders 10 colored check dots in consistent order.
- [x] Unknown tickers show "Data unavailable" row gracefully.
- [x] Clicking a row opens existing Scorecard modal (`openScorecard(sym, 'analyze')`).
- [x] Basic Auth login functional with 1-click "Try Live Demo" button.
- [x] Login page displays interactive preview mockups for feature teasers.
- [x] Clear educational disclaimers present on login page and screener tabs.

---

## 6. Current Implementation Status
- **IV Screener & Mega-Cap Screener:** ✅ Fully Built & Verified.
- **Fundamental Screener (`#tab-checklist`):** ✅ Fully Built & Verified (BDD test coverage active).
