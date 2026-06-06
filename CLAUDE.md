# VolariX — Start Here
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
├── CLAUDE.md              ← YOU ARE HERE — read every session
├── README.md              ← Deploy steps for humans
├── app/
│   ├── index.html         ← Landing page (~23KB)
│   ├── login.html         ← Auth + MFA (~20KB)
│   ├── app.html           ← Full dashboard (~192KB, LIMIT 200KB)
│   └── netlify.toml       ← Netlify config
└── docs/
    ├── ARCHITECTURE.md    ← System architecture + data flows
    ├── DB_SCHEMA.md       ← PostgreSQL + RLS schema
    ├── LEGAL.md           ← Disclaimer requirements
    ├── PRODUCT.md         ← Vision + phase roadmap
    ├── PROJECT_STATUS.md  ← What's done / in progress / todo
    ├── TASK_QUEUE.md      ← Prioritised backlog + acceptance criteria
    ├── TOKEN_GUIDELINES.md ← Coding rules + efficiency patterns
    └── UI_GUIDELINES.md   ← Design system + component patterns
```

---

## THE #1 RULE — Never Break This
**No JavaScript template literals or .map() calls in raw HTML.**

```html
<!-- ❌ WRONG — renders ${...} as visible text -->
<div id="tab">${items.map(i => `<span>${i}</span>`).join('')}</div>

<!-- ✅ CORRECT — inject via JS only -->
<div id="tab"></div>
<script>
  function buildTab() {
    document.getElementById('tab').innerHTML =
      items.map(i => `<span>${i}</span>`).join('');
  }
</script>
```

---

## app.html Key Architecture

### Helpers (always use these)
```javascript
const $ = id => document.getElementById(id);
const set = (id, html) => { const el=$(id); if(el) el.innerHTML=html; };
const badge = (text, color) => `<span class="badge badge-${color}">${text}</span>`;
const lbl = text => `<div class="stat-label">${text}</div>`;
```

### State (single source of truth)
```javascript
STATE        → { theme, watchlist, positions, paperTrades, thresholds }
MKT          → { prices, changes, fg }        // swap for real API
FUNDAMENTALS → { AAPL:{pe,pb,...}, ... }       // 24 tickers
MEGACAP_DATA → [{ ticker, iv, ivRank, ... }]   // 20 companies
```

### Adding a New Tab (all 4 steps required)
1. Nav item:  `<div class="nav-item" onclick="showTab('id',this)">...</div>`
2. Page div:  `<div class="page" id="tab-id"></div>`
3. Builder:   `function buildId() { set('tab-id', \`...html...\`); }`
4. showTab:   add `id: buildId` to the B{} map in showTab()

### Adding a New Modal (all 3 steps required)
1. HTML before `<!-- ══ APP SHELL ══ -->`
2. CSS before `</style>`
3. open/close JS + click-outside handler

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

### ❌ Not Started
- P1: Real-time data APIs (Yahoo Finance, Finnhub, Alternative.me, FRED)
- P10: Weekly Email Digest (Resend.com + Netlify function)

---

## Next Priority
**P1 — Real-Time Data APIs**
Replace MKT{} simulator with real fetch() calls.
Full spec + acceptance criteria: see docs/TASK_QUEUE.md

---

## Workflow Rules
1. Read this file first — every session
2. One feature per turn — complete + audit before next
3. Propose in bullets before building
4. Run audit script before presenting any file
5. Update PROJECT_STATUS.md + TASK_QUEUE.md after every feature
6. Never refactor working code
7. Check file size: `wc -c app/app.html` (limit 200KB)

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

## Legal (on every signal-generating tab)
> ⚠️ VolariX provides educational and analytical tools only. Not financial advice. Trade at your own risk.
