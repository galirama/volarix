# Use Case 05: Strategy Builder, Position Sizing & Risk Shield

## 1. Overview
This module handles pre-trade construction, capital sizing models (Kelly Criterion), and portfolio-wide risk gating (Risk Shield modal) to uphold VolariX's core principle: *Protect capital before maximizing gains*.

---

## 2. Target Files & Builders
- `app/app.html`
  - `buildStrategy()` — Strategy Builder tab (`#tab-strategy`)
  - `buildSizingCalc()`, `refreshSizing()` — Position Sizing Calculator tab (`#tab-sizing` — P6 Feature)
  - `openRiskModal()`, `buildRiskContent()` — Risk Shield modal overlay (`riskModal`)

---

## 3. Functional Requirements

### 3.1 Strategy Builder (`buildStrategy()`)
- Multi-leg options strategy constructor (Leg 1..4: Action [Buy/Sell], Option Type [Call/Put], Strike, Expiration, Contracts).
- Preset Strategy Selector: Iron Condor, Credit Spread, Debit Spread, Straddle, Strangle, Covered Call, Cash-Secured Put.
- Canvas P&L Payoff Diagram: Renders theoretical profit/loss curve at expiration across underlying price spectrum.
- Trade Metrics Summary: Net Premium (Debit/Credit), Max Profit, Max Loss, Risk/Reward Ratio.

### 3.2 Position Sizing Calculator (`buildSizingCalc()` — P6 Feature)
- **Inputs (Real-time update on change):** Account Size ($), Risk per Trade (%), Option Premium per Contract ($).
- **Calculations:**
  - Recommended Contracts = `floor((Account Size × Risk %) / (Premium × 100))`
  - Quarter-Kelly Contracts = `floor((Account Size × Risk % × 0.25) / (Premium × 100))`
  - Maximum Dollar Loss ($) & Account Exposure (%)
- **Warning Guard:** Displays amber alert banner if recommended contracts > 5.

### 3.3 Risk Shield Modal Overlay (`riskModal`)
- **Trigger:** "🛡️ Risk" button on topbar or position rows.
- **Pre-trade & Portfolio Checks:**
  1. **Concentration Check:** `(Position Value / Total Portfolio) × 100` — Red alert if > `thresholds.maxConcentration` (default 20%).
  2. **Net Portfolio Delta:** Sum of position deltas — Red alert if > `thresholds.maxDelta` (default 100).
  3. **Theta Burn:** Daily time decay decay dollar amount vs portfolio size.
  4. **Earnings Proximity Alert:** Red warning if any underlying asset has earnings within 7 days.
- **Output:** Severity-coded alert breakdown + mandatory exit plan guidelines (Profit Target %, Stop Loss %, Max DTE hold rule).

---

## 4. Acceptance Criteria & Verification

- [x] Strategy Builder payoff diagram updates on strike or leg adjustment.
- [x] Position Sizing calculator automatically updates recommended contracts & Kelly criterion numbers as inputs change.
- [x] Risk Shield modal correctly evaluates portfolio concentration and delta limits against user thresholds.

---

## 5. Current Implementation Status
- **Status:** ✅ Fully Built & Verified in `app/app.html`.
