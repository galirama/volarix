# Use Case 01: Auth & Global Application Shell

## 1. Overview
This module covers user authentication (Basic Auth start, Email/SMS OTP future roadmap, 1-click Demo mode, Login page preview mockups), educational positioning (100% free, $0 cost, non-monetized), and the global application shell (Ticker Banner, Command Palette, Toast Notifications, Theme Toggle, Onboarding Wizard, Watchlist Sidebar, and PWA setup).

---

## 2. Target Files
- `app/login.html` — Login page, Register flow, MFA, Feature Teaser Preview Mockups, 1-Click Demo (~20KB)
- `app/app.html` — Dashboard Shell, Sidebar, Topbar, Modals (~192KB)
- `app/index.html` — Educational marketing landing page (~23KB)
- `app/netlify.toml` — Netlify routing & security headers
- `app/manifest.json` — Web app manifest (PWA)
- `app/sw.js` — Service worker (PWA)

---

## 3. Functional Requirements

### 3.1 Authentication Strategy & Progression
1. **Phase 1: Basic Authentication (Start With):**
   - Simple client-side email/password authentication.
   - Credentials stored in `sessionStorage` key `volarix_auth`, 8-hour expiry.
   - Demo accounts for instant access:
     - `trader@example.com` / `Password123` (Pro preview)
     - `demo@volarix.com` / `Demo1234` (Free preview)
   - Inline Auth Guard at top of `<head>` in `app.html` — redirects unauthenticated visitors to `login.html`.

2. **Phase 2: Passwordless OTP Login Expansion (Roadmap):**
   - Support for Email OTP and SMS Text Message OTP via Supabase Auth / Twilio.
   - User inputs Email Address or Mobile Phone Number → receives 6-digit text message code → auto-logs in.
   - Removes password barrier for prospective traders.

3. **1-Click "Try Live Demo" Access:**
   - Prominent button on `login.html` and `index.html` allowing immediate entry into `app.html` as a demo user without typing credentials.

### 3.2 Login Page Preview Mockups & Feature Teasers
To attract and convert visitors, `login.html` must include visual interactive preview mockups showcasing platform capabilities before login:
- **Mini IV Screener Widget:** Shows top 3 high volatility options opportunities.
- **Mini Stock Health Scorecard:** Shows sample 10-point check badge (`NVDA 85/100 🟢 Strong Buy`).
- **Mini Options P&L Calculator:** Shows thumbnail of interactive P&L curve.
- **Mini Risk Shield Widget:** Shows mini portfolio risk gauge.

### 3.3 Purely Educational & Non-Monetized Positioning ($0 Cost)
- **100% Free Platform ($0 Cost):** All features, screeners, tools, and signals are free.
- **No Monetization / Commercial Risk Avoidance:** No payment gateways, no subscription plans, no paywalls, avoiding financial advisory / regulatory licensing compliance requirements.
- **Prominent Disclaimers:** Displayed across login page, landing page, and app shell footers:
  > *"VolariX is a 100% free educational and analytical platform. All signals, screeners, and metrics are for learning purposes only and do not constitute financial advice."*

### 3.4 Application Shell Components
- **Ticker Banner:** Scrolling marquee showing VIX, Fear & Greed Index, and major tickers (auto-refreshing).
- **Command Palette (`cmdPalette` overlay):** Triggered via `⌘K` / `Ctrl+K` or `/`. Fuzzy search across all tabs, tickers, and commands; keyboard navigable (`↑`, `↓`, `Enter`, `Esc`).
- **Toast Notifications:** 5 types (`cyan`, `red`, `amber`, `purple`, `blue`), auto-dismiss, periodic simulated market alerts.
- **Theme Toggle:** Dark/Light theme, persisted in `localStorage` (`volarix_state.theme`).
- **Onboarding Wizard (`onboardOverlay`):** 3-step first-run flow triggered on first login.
- **Watchlist Sidebar (`watchlistSidebar`):** Persistent list of tickers with live price + % change.
- **State Persistence:** `saveState()` / `loadState()`, key `volarix_state` in `localStorage`.

### 3.5 Progressive Web App (PWA)
- Create `app/manifest.json` with app icons, theme color (`#0D0F1A`), display mode `standalone`.
- Create `app/sw.js` service worker for basic offline asset caching.
- Link manifest in `app/app.html` `<head>` and handle `beforeinstallprompt`.

---

## 4. Acceptance Criteria & Verification

- [x] Login page validates basic credentials and sets `sessionStorage`.
- [x] Auth guard redirects to `login.html` if `volarix_auth` is missing or expired.
- [ ] 1-Click "Try Live Demo" button logs user in instantly.
- [ ] Login page displays interactive preview mockups of screener & scorecard features.
- [ ] Clear educational disclaimers present on login page and landing page.
- [ ] Theme toggle switches between dark and light themes and persists.
- [ ] PWA `manifest.json` and `sw.js` created and linked.

---

## 5. Current Implementation Status
- **Auth & Shell UI:** ✅ Basic Auth built & working.
- **Preview Mockups & 1-Click Demo:** 🔴 Specification Updated — Ready to Build.
- **PWA Setup (P7):** 🔄 JS listeners exist; `manifest.json` and `sw.js` need creation.
