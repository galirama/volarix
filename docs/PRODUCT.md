# VolariX Product Specification

## Vision
VolariX protects retail options traders from losing money through ignorance. It combines institutional-grade risk intelligence, alternative data, and AI-powered analysis — delivered for free or near-free.

**Core principle: Protect capital before maximizing gains.**

---

## Target Users

| User | Description | Primary Need |
|---|---|---|
| Beginner options trader | Just started, doesn't understand Greeks | Education + guardrails |
| Intermediate premium seller | Sells covered calls/CSPs, wants to scale | IV screening + risk management |
| Swing trader | Trades directional moves, uses options as leverage | Technical analysis + signals |
| Risk-conscious retail investor | Understands risk, wants institutional tools | Portfolio risk engine |

---

## Current Phase: Phase 2 — Real Data + Persistence

### ✅ Phase 1 — Complete (HTML Prototype)
- [x] Secure login with MFA (TOTP)
- [x] Responsive dashboard (19 tabs)
- [x] Stock ticker search with candlestick chart
- [x] Technical indicators (RSI, MACD signals)
- [x] Fundamental analysis (10-point scorecard)
- [x] Bullish/Bearish signal generation
- [x] Paper trading with AI Post-Mortem
- [x] Global ticker banner (VIX, Fear & Greed)
- [x] Options chain with Greek Visualizer
- [x] Strategy Builder (multi-leg, P&L diagram)
- [x] Earnings Calendar with IV crush risk
- [x] Unusual Options Activity scanner
- [x] Congressional + Insider tracking
- [x] Sector Rotation capital flow matrix
- [x] Mega-Cap IV Screener (20 companies >$200B)
- [x] Stock Health Scorecard (pre-trade gate)
- [x] Risk Shield (pre-trade alerts)
- [x] Exit Automation (profit targets + stop losses)
- [x] Portfolio Import (CSV + brokerage connect)
- [x] ⌘K Command Palette + keyboard shortcuts
- [x] Toast notifications system
- [x] Dark/Light theme
- [x] Mobile responsive layout
- [x] Netlify deployment

### 🔄 Phase 2 — In Progress
- [ ] Real-time data APIs (Yahoo Finance, Finnhub, Alternative.me)
- [ ] localStorage persistence (watchlist, settings, trades)
- [ ] Options Profit Calculator (interactive modal)
- [ ] Trade Journal Statistics (win rate, equity curve)
- [ ] IV Rank Historical Chart (52-week)
- [ ] Position Sizing Calculator
- [ ] PWA (installable mobile app)
- [ ] Economic Calendar (Fed, CPI, jobs)
- [ ] Options Flow Heatmap (by sector)
- [ ] Weekly Email Digest (Resend.com)

### 📋 Phase 3 — Next.js Migration
- [ ] Next.js 14 + TypeScript frontend
- [ ] Supabase Auth (replace sessionStorage)
- [ ] Supabase PostgreSQL (replace STATE object)
- [ ] Vercel hosting + Cron jobs
- [ ] Real-time WebSocket price updates

### 💳 Phase 4 — Monetization
- [ ] Stripe subscription integration
- [ ] Free vs Premium feature gating
- [ ] Usage analytics (Posthog free tier)
- [ ] Referral system

### 🔌 Phase 5 — Brokerage Integration
- [ ] SnapTrade OAuth adapter
- [ ] IBKR API adapter
- [ ] Live order routing
- [ ] P&L sync from real account

---

## Monetization Structure

### Free Tier
- Basic stock search + charts
- Paper trading (stocks + options)
- Ticker banner + market data
- Backtesting engine (2 years)
- Push + in-app alerts
- Watchlist (up to 5 tickers)
- Economic Calendar
- Earnings Calendar

### Premium — $29/month
- Everything in Free +
- Risk Shield pre-trade AI
- Greek Visualizer full access
- Congressional & Insider data
- AI Post-Mortem analysis
- Sector Rotation (PRO badge)
- Mega-Cap IV Screener (full)
- Stock Health Scorecard (full)
- IV Rank Historical Charts
- Position Sizing Calculator
- SMS real-time alerts
- Live brokerage integration
- Unlimited watchlist
- Weekly email digest
- Options Flow Heatmap
- Export to PDF

---

## Legal Requirement
All signal-generating components must display:
> "VolariX provides educational and analytical tools only. All signals, risk metrics, and data points are not financial advice. Trade at your own risk."
