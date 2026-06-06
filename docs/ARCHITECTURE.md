# VolariX System Architecture

## Current State (Prototype)
3 static HTML files deployed on Netlify. No backend. All data simulated.
Live at: https://volarix.netlify.app

## Target Stack (Production — Next.js Migration)

### Frontend
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Recharts + Canvas API for charts

### Backend
- Next.js API Routes (serverless)
- Supabase (Auth + PostgreSQL + Realtime + RLS)
- Upstash Redis (free tier, 60s cache)

### Infrastructure
- Vercel (hosting + cron jobs)
- Netlify (current prototype — free)

### Payments & Notifications
- Stripe (subscriptions)
- Web Push API (free, browser-native)
- Twilio (SMS, Premium users only)
- Resend.com (email digest, 3K/month free)

---

## Free Data Sources

| Data | Provider | Limit | Delay |
|---|---|---|---|
| Stock quotes | Yahoo Finance wrapper | Unlimited | 15min |
| Options chain | Tradier sandbox | 1 req/s | 15min |
| Fear & Greed | Alternative.me | Unlimited | Daily |
| Fundamentals | Finnhub free | 60 req/min | EOD |
| Insider trades | Finnhub free | 60 req/min | Daily |
| Economic data | FRED API | 120 req/min | Official |
| IV/options data | Finnhub free | 60 req/min | EOD |
| Congressional | quiverquant.com | Public | Daily |

---

## Client-Side Cache Pattern (localStorage, 60s TTL)

```javascript
async function fetchWithCache(key, fetchFn, ttlSeconds = 60) {
  const cached = localStorage.getItem('volarix_cache_' + key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < ttlSeconds * 1000) return data;
  }
  const data = await fetchFn();
  localStorage.setItem('volarix_cache_' + key, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}

// Usage:
const price = await fetchWithCache('NVDA_quote', () => fetchYahooQuote('NVDA'), 60);
```

---

## Data Flow

```
User Action (e.g. open Ticker Analyzer for NVDA)
  → Check localStorage cache (key: 'NVDA_quote', TTL: 60s)
  → Cache HIT: return cached data instantly
  → Cache MISS:
      → fetch('https://query1.finance.yahoo.com/v8/finance/chart/NVDA')
      → Normalize response to { price, change, changePct, volume }
      → Store in localStorage with timestamp
      → Update MKT.prices['NVDA'] and MKT.changes['NVDA']
      → Call buildTickerAnalyzer('NVDA') to re-render
```

---

## Risk Shield Calculation

```javascript
function runRiskShield(proposedTrade) {
  const alerts = [];

  // 1. Concentration check
  const newNotional = proposedTrade.premium * proposedTrade.qty * 100;
  const totalPortfolio = STATE.positions.reduce((s,p) => s + p.entryPremium * p.qty * 100, 0);
  const concentration = (newNotional / totalPortfolio) * 100;
  if (concentration > STATE.thresholds.maxConcentration) {
    alerts.push({ level: 'red', msg: `Concentration ${concentration.toFixed(1)}% exceeds ${STATE.thresholds.maxConcentration}% max` });
  }

  // 2. Net delta check
  const newDelta = proposedTrade.delta * proposedTrade.qty * 100;
  const currentDelta = STATE.positions.reduce((s,p) => s + p.delta * p.qty * 100, 0);
  if (Math.abs(currentDelta + newDelta) > STATE.thresholds.maxDelta) {
    alerts.push({ level: 'red', msg: `Net delta ${(currentDelta+newDelta).toFixed(0)} exceeds ${STATE.thresholds.maxDelta} limit` });
  }

  // 3. Earnings proximity
  const fund = FUNDAMENTALS[proposedTrade.ticker];
  if (fund && fund.earningsDate <= 7) {
    alerts.push({ level: 'red', msg: `Earnings in ${fund.earningsDate} days — IV crush risk` });
  }

  return { alerts, severity: alerts.some(a=>a.level==='red') ? 'red' : alerts.length ? 'amber' : 'green' };
}
```

---

## Position Sizing Calculator

```javascript
function calcPositionSize(accountSize, riskPct, premium) {
  const maxRisk = accountSize * (riskPct / 100);
  const costPerContract = premium * 100;
  const recommended = Math.floor(maxRisk / costPerContract);
  const kelly = Math.floor((maxRisk * 0.25) / costPerContract); // Quarter Kelly
  return {
    recommended,
    kelly,
    maxLossDollars: recommended * costPerContract,
    maxLossPct: (recommended * costPerContract / accountSize * 100).toFixed(1)
  };
}
```

---

## PWA Implementation

### manifest.json
```json
{
  "name": "VolariX",
  "short_name": "VolariX",
  "description": "Risk-First Options Intelligence",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0D0F1A",
  "theme_color": "#8B7FFF",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### sw.js (Service Worker)
```javascript
const CACHE = 'volarix-v1';
const FILES = ['/', '/index.html', '/login.html', '/app.html'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)))
);
self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
```

---

## Migration Path: Prototype → Production

| Phase | What | When |
|---|---|---|
| 1 ✅ | Static HTML + Netlify + simulated data | Done |
| 2 🔄 | Wire real APIs (Yahoo, Finnhub, Alternative.me) | Next |
| 3 | localStorage persistence + PWA | After P2 |
| 4 | Next.js 14 + Supabase Auth migration | Q3 2026 |
| 5 | Stripe subscriptions + premium gating | Q3 2026 |
| 6 | Live brokerage (SnapTrade) | Q4 2026 |

---

## Brokerage Adapter Interface (Future)

```typescript
interface BrokerAdapter {
  getPortfolio(): Promise<Position[]>;
  placeOrder(order: Order): Promise<OrderResult>;
  cancelOrder(orderId: string): Promise<void>;
  getPositions(): Promise<Position[]>;
  getAccountBalance(): Promise<number>;
}
// Planned: SnapTrade, IBKR, Webull, Tastytrade
```
