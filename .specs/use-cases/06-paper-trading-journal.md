# Use Case 06: Paper Trading, Scorecard Gate & Journal Stats

## 1. Overview
This module provides a virtual trading sandbox ($100,000 capital), pre-trade stock health score gating, trade journaling with post-mortem logs, and detailed win-rate performance statistics.

---

## 2. Target Files & Builders
- `app/app.html`
  - `buildPaper()` — Paper Trading tab (`#tab-paper`)
  - `buildJournalStats()` — Journal Statistics sub-tab (`#tab-journal` — P4 Feature)
  - `scorecardOverlay` — Stock Health Scorecard modal overlay

---

## 3. Functional Requirements

### 3.1 Paper Trading Engine (`buildPaper()`)
- Virtual Account Balance: Starts at $100,000.
- Order Entry Form: Ticker, Strategy, Strike, Premium, Quantity, Trade Notes.
- Active Positions Table: Open trades with live P&L tracking (derived from `MKT` / live data).
- Closed Positions Log: Historical trades with AI Post-Mortem reasoning generated on trade close.

### 3.2 Pre-Trade Stock Health Scorecard Gate (`scorecardOverlay`)
Before any paper trade simulation executes, the order passes through a **10-Point Fundamental Health Check**:

| # | Metric | Green (Pass) | Yellow (Caution) | Red (Fail) |
|---|---|---|---|---|
| 1 | P/E Ratio | < 20× | 20–40× | > 40× |
| 2 | Price / Book | < 3× | 3–15× | > 15× |
| 3 | Price / Sales | < 5× | 5–15× | > 15× |
| 4 | Debt / Equity | < 0.5× | 0.5–1.5× | > 1.5× |
| 5 | Revenue Growth (YoY) | > 15% | 0–15% | Negative |
| 6 | EPS Growth (YoY) | > 20% | 0–20% | Negative |
| 7 | Gross Margin | > 50% | 25–50% | < 25% |
| 8 | Current Ratio | > 1.5× | 0.8–1.5× | < 0.8× |
| 9 | Return on Equity (ROE) | > 20% | 10–20% | < 10% |
| 10 | Insider Ownership | > 5% | 1–5% | < 1% |

- **Composite Score:** `(Greens × 10 + Yellows × 5) / 10` → 0–100 score.
- **Rating:** `≥70` 🟢 Strong Buy | `45–69` 🟡 Cautious | `<45` 🔴 Avoid.
- **Earnings Proximity Overlay:** Red warning if earnings ≤7 days; Amber if ≤14 days.
- **Pre-trade Gate Action:** Prompts `Trade Anyway`, `Adjust Trade`, or `Cancel`.

### 3.3 Journal Statistics (`buildJournalStats()` — P4 Feature)
Calculated from `STATE.paperTrades` saved in `localStorage`:
- Overall Win Rate %
- Total Realized P&L ($)
- Win Rate Breakdown per Strategy Type (Iron Condor, Long Call, Credit Spread, etc.)
- Best & Worst Trade summary cards
- Canvas Equity Curve: Cumulative P&L over time.

---

## 4. Acceptance Criteria & Verification

- [x] Paper trade simulation form prompts Stock Health Scorecard modal before execution.
- [x] Scorecard correctly scores 10 fundamental metrics and displays earnings warnings.
- [x] Closing a paper trade generates an AI Post-Mortem log entry.
- [x] Journal Statistics updates win rates and renders equity curve chart on Canvas.

---

## 5. Current Implementation Status
- **Status:** ✅ Fully Built & Verified in `app/app.html`.
