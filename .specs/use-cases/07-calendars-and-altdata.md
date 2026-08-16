# Use Case 07: Calendars, Unusual Options Activity, Flow Heatmap & Alt Data

## 1. Overview
This module aggregates macro-economic data, earnings announcements, institutional options order flow, sector-level capital flow heatmaps, and alternative data (Congressional trading disclosures & insider transactions).

---

## 2. Target Files & Builders
- `app/app.html`
  - `buildEarnings()` — Earnings Calendar tab (`#tab-earnings`)
  - `buildEconomic()` — Economic Calendar tab (`#tab-economic` — P8 Feature)
  - `buildUOA()` — Unusual Options Activity tab (`#tab-uoa`)
  - `buildHeatmap()` — Options Flow Heatmap tab (`#tab-heatmap` — P9 Feature)
  - `buildCongress()` — Congressional & Insider Trading tab (`#tab-congress`)
  - `buildSectors()` — Sector Rotation Matrix tab (`#tab-sectors`)

---

## 3. Functional Requirements

### 3.1 Earnings Calendar (`buildEarnings()`)
- Monthly/weekly grid view of upcoming corporate earnings.
- IV Crush Risk Score per ticker (High/Medium/Low).
- Filter by Watchlist tickers only vs. Market Universe.

### 3.2 Economic Calendar (`buildEconomic()` — P8 Feature)
- Hardcoded/live macro events (FOMC Fed Meetings, CPI Inflation Data, Jobs Reports/NFP, GDP Growth).
- Impact Severity Tagging: 🔴 High Impact | 🟡 Medium Impact | 🔵 Low Impact.
- Chronological date sorting with countdown/past event flags.

### 3.3 Unusual Options Activity Scanner (`buildUOA()`)
- Real-time institutional options flow scanner.
- Filter criteria: Minimum 2.5× average daily volume threshold, sweep orders, block trades.
- Indicators: Bullish/Bearish sentiment tag, strike, expiration, premium total.

### 3.4 Options Flow Heatmap (`buildHeatmap()` — P9 Feature)
- Sector-level visual grid (Tech, Financials, Healthcare, Consumer, Energy, Industrial).
- Color-coded by Net Call vs. Put volume flow (derived from mega-cap data).
- Click-through on sector tile filters Mega-Cap Screener.

### 3.5 Alt Data — Congressional & Insider Trading (`buildCongress()`)
- **Congressional Tab:** Senate/House politician stock & options transaction disclosures (Representative, Ticker, Type [Buy/Sell], Amount range, Disclosure lag days).
- **Insider Trading Tab:** C-suite & Director transactions (Officer title, Shares bought/sold, Transaction value).

### 3.6 Sector Rotation Matrix (`buildSectors()`)
- 4-Quadrant Capital Flow Matrix: Leading, Improving, Weakening, Lagging.
- Dynamic sector node placement based on relative strength & momentum.
- AI-generated rotation summary commentary.

---

## 4. Acceptance Criteria & Verification

- [x] Economic Calendar displays macro events with color-coded impact badges.
- [x] Flow Heatmap accurately summarizes sector call vs. put flow.
- [x] Alt Data sub-tabs switch between Congressional trades and Corporate Insider filings.
- [x] Sector Rotation quadrant chart renders 11 sector ETFs correctly.

---

## 5. Current Implementation Status
- **Status:** ✅ Fully Built & Verified in `app/app.html`.
