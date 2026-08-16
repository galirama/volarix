# Use Case 04: Ticker Analyzer, Options Chain & Options Profit Calculator

## 1. Overview
This module provides in-depth security analysis for individual tickers, full options chain breakdown with Greeks visualization, and an interactive options P&L calculator.

---

## 2. Target Files & Builders
- `app/app.html`
  - `buildTickerAnalyzer()` — Ticker Analyzer tab (`#tab-ticker`)
  - `drawCandleChart()`, `drawRSI()`, `drawIVHistory()` — Canvas chart functions
  - `buildOptions()` — Options Chain tab (`#tab-options`)
  - `openCalc()`, `buildCalcContent()`, `drawCalcChart()`, `updateCalcSlider()` — Profit Calculator modal (`calcOverlay`)

---

## 3. Functional Requirements

### 3.1 Ticker Analyzer (`buildTickerAnalyzer()`)
- **Ticker Search Bar:** Instant lookup across supported watchlist & fundamentals universe.
- **Fundamentals Grid:** Key metrics (P/E, P/B, Debt/Equity, Revenue Growth, Margin, ROE).
- **Interactive Canvas Charts:**
  - Candlestick price chart with moving averages (SMA 20/50).
  - RSI indicator chart (sub-canvas).
  - 52-week IV Rank Historical Trend chart (sub-canvas, feature P5).
- **Moat & Health Score Bars:** Visual breakdown of fundamental strength.
- **AI Summary Text:** Dynamic analysis narrative generated based on fundamental & technical metrics.

### 3.2 Options Chain (`buildOptions()`)
- Ticker selector & Expiration Date selector.
- Calls / Puts split table (Strike, Bid, Ask, Volume, Open Interest, Implied Volatility).
- Greeks Summary (Delta, Gamma, Theta, Vega, IV).
- **View Toggle:**
  - `Full Chain` view: Numerical tabular data.
  - `Greek Visual` view: Bar charts visualizing Delta profile and Theta decay across strikes.
- "Calculate P&L" action button on strike row → launches Options Profit Calculator overlay.

### 3.3 Options Profit Calculator Overlay (`calcOverlay` — P2 Feature)
- **Modal Trigger:** Click "Calculate P&L" on Options Chain or manual launch.
- **Inputs:** Ticker, Strategy Type (Long Call, Long Put, Cash-Secured Put, Covered Call, Iron Condor), Strike, Premium, Days to Expiration (DTE).
- **Interactive Price Slider:** Range ±30% from current underlying price. Updates outputs dynamically on drag without button press.
- **Dynamic Outputs:**
  - Max Profit ($)
  - Max Loss ($)
  - Breakeven Price(s)
  - Probability of Profit (POP %, derived from Delta)
  - Projected P&L at slider position ($ and %)
- **Canvas P&L Curve:** Interactive chart with zero-line, profit zone (cyan), loss zone (red), and underlying price marker.
- **Theta Erosion Schedule:** Table projecting option value decay over remaining DTE.

---

## 4. Acceptance Criteria & Verification

- [x] Ticker Analyzer renders candlestick, RSI, and 52-week IV historical charts smoothly on HTML5 Canvas.
- [x] Options Chain switches between tabular chain view and Greek visualizer.
- [x] Options Profit Calculator slider dynamically updates Max Profit, Max Loss, POP %, and Canvas P&L chart in real-time.
- [x] All modal overlays close properly via close button, `Esc` key, or background click.

---

## 5. Current Implementation Status
- **Status:** ✅ Fully Built & Verified in `app/app.html`.
