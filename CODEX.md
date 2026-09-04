# VolariX — AI Agent Codex (Start Here)
**Read this file first every session. Do not write code until you confirm state.**

---

## Step 1 — Confirm State First
After reading this file respond with exactly:
1. What is fully built and working
2. What is partially built or broken  
3. What the next priority task is

Then wait for human confirmation before writing any code.

---

## What VolariX Is
Risk-first options trading intelligence platform.
3 static HTML files on Netlify. No backend yet. All data simulated.
**Live:** https://volarix.netlify.app
**Login:** trader@example.com / Password123 (Pro) | demo@volarix.com / Demo1234 (Free)

---

## Repo Structure
```
volarix/
├── CODEX.md               ← Root AI memory bank & instructions (read first)
├── README.md              ← Deploy steps & human guide
├── app/                   ← Deploy this folder to Netlify
│   ├── index.html         ← Public landing page
│   ├── login.html         ← Auth + MFA
│   └── app.html           ← Full dashboard
├── tests/                 ← BDD automated UI test suite (Cucumber + Playwright)
└── docs/                  ← Architecture, schema, task queue, and handoff
```

---

## THE CORE RULES — Never Break These
1. **No JavaScript template literals or .map() calls in raw HTML.**
   Any dynamic list (like `items.map(i => \`<div...>\`)`) MUST be injected using JavaScript (`document.getElementById('div').innerHTML = ...`). 
2. **File Size Limit (Under 200KB)**
   `app/app.html` must remain under 204,800 bytes (200KB). You must run `wc -c app/app.html` to verify this before and after changes.
3. **Hoisting Traps (app.html)**
   When extending existing functions (e.g., `showTab`), NEVER use the `function name() {}` declaration syntax, as it will hoist and cause infinite recursion with the original reference. Always use `name = function() {}` to assign it sequentially.
4. **Legal Disclaimer**
   Every signal-generating tab must contain: `⚠️ VolariX provides educational and analytical tools only. Not financial advice. Trade at your own risk.`

---

## app.html Key Architecture

### Helpers (always use these)
```javascript
const $ = id => document.getElementById(id);
const set = (id, html) => { const el=$(id); if(el) el.innerHTML=html; };
const badge = (text, color) => `<span class="badge badge-${color}">${text}</span>`;
const lbl = text => `<div class="stat-label">${text}</div>`;
```

### State Management (single source of truth)
VolariX has no backend (yet). Everything relies on `sessionStorage` and `localStorage` to simulate the user journey:
```javascript
// LocalStorage Persistence
STATE        → { theme, watchlist, positions, paperTrades, thresholds }
// Session Storage
volarix_auth → { user: {email, plan}, expires, loginTime } // Mock JWT payload
volarix_onboarded → Flag for the welcome tutorial
// Runtime Data (swap for real APIs later)
MKT          → { prices, changes, fg }
FUNDAMENTALS → { AAPL:{pe,pb,...}, ... }
MEGACAP_DATA → [{ ticker, iv, ivRank, ... }]
```

---

## Test Suite (BDD with Cucumber & Playwright)
We use a Behavior-Driven Development (BDD) test suite to protect the integrity of VolariX.
- **Location**: `/tests` directory
- **Running Tests**: Run `npm test` locally. It automatically spawns `http-server` (port 8080) in the background and evaluates feature specifications against the live dashboard.
- Ensure all tests pass before completing a task.

---

## What Is Currently Built

### ✅ Complete
| Feature | Location |
|---|---|
| Auth guard + MFA + session | login.html → app.html |
| 21-tab dashboard | app.html sidebar |
| Live market simulator (8s) | MKT object |
| ⌘K Command Palette | cmdPalette overlay |
| Watchlist sidebar (live prices) | watchlistSidebar |
| Toast notifications | toastContainer |
| Dark/Light theme | toggleTheme() |
| 3-step onboarding wizard | onboardOverlay |
| Mobile responsive layout | @media 720px |
| Canvas candlestick + RSI charts | drawCandleChart, drawRSI |
| Stock Health Scorecard (10-point) | scorecardOverlay — pre-trade gate |
| Mega-Cap IV Screener (20 stocks) | tab-megacap |
| Options Chain + Greek Visual | tab-options |
| Strategy Builder + P&L canvas | tab-strategy |
| Earnings Calendar + IV crush | tab-earnings |
| Unusual Options Activity | tab-uoa |
| Alt Data (Congress + Insider) | tab-congress |
| Sector Rotation matrix | tab-sectors |
| Paper Trading + AI Post-Mortem | tab-paper |
| Exit Automation + AI recs | tab-exit |
| Portfolio Import (CSV + broker) | tab-import |
| Risk Shield modal | riskModal |
| Backtesting + equity curve | tab-backtest |
| Alerts (create + manage) | tab-alerts |
| Settings (full) | tab-settings |
| **P2 Profit Calculator** | calcOverlay — openCalc() |
| **P3 localStorage persistence** | saveState() / loadState() |
| **P4 Trade Journal Stats** | tab-journal — buildJournalStats() |
| **P5 IV Rank Historical Chart** | drawIVHistory() in Ticker Analyzer |
| **P6 Position Sizing Calc** | tab-sizing — buildSizingCalc() |
| **P7 PWA** | initPWA() / installPWA() |
| **P8 Economic Calendar** | tab-economic — buildEconomic() |
| **P9 Flow Heatmap** | tab-heatmap — buildHeatmap() |
| **P11 BDD Test Suite** | tests/ (Cucumber + Playwright) |

### 🔄 In Progress
- P1: Market-data integration. Yahoo Finance quotes and Alternative.me Fear & Greed
  are fetched client-side with localStorage caching and static-data fallback.
  Finnhub fundamentals and FRED economic data are not yet integrated.

### ❌ Not Started
- P10: Weekly Email Digest (Resend.com + Netlify function)

---

## Next Priority
**P1 — Complete the market-data integration**
Keep the existing Yahoo Finance and Alternative.me integration working, then add
Finnhub/FRED only where their data has a defined UI consumer. Preserve the
60-second client cache, graceful static fallback, and the educational-data
disclaimer. Full scope and acceptance criteria: see docs/TASK_QUEUE.md.

---

## Workflow Rules
1. Read this file first — every session
2. One feature per turn — complete + test + audit before next
3. Propose in bullets before building
4. Run audit script before presenting any file
5. Update PROJECT_STATUS.md + TASK_QUEUE.md after every feature
6. Never refactor working code
7. Read docs/HANDOFF.md before planning work; update it before ending a task.

## Audit Script (run before every present_files)
```python
with open('app/app.html', 'r') as f: html = f.read()
checks = {
  'No raw template literals': html[:html.find('<script>')].count('${') == 0,
  'Auth guard intact':        'volarix_auth' in html,
  'Legal disclaimer':         'not financial advice' in html,
  'Under 200KB':              len(html.encode()) < 200000,
}
failed = [k for k,v in checks.items() if not v]
print('PASSED' if not failed else 'FAILED: ' + str(failed))
```
