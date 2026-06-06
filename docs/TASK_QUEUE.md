# VolariX Task Queue
**One task per session. Check off when done. Update PROJECT_STATUS.md after each.**

---

## 🔴 P1 — Real-Time Data APIs
**Status:** Not started  
**Files:** app/app.html (MKT object)  
**APIs (all free):**
- Yahoo Finance: `https://query1.finance.yahoo.com/v8/finance/chart/{ticker}`
- Alternative.me: `https://api.alternative.me/fng/` (Fear & Greed)
- Finnhub: `https://finnhub.io/api/v1/quote?symbol={ticker}&token={key}`
- FRED: `https://api.stlouisfed.org/fred/series/observations?series_id=DGS10`

**Pattern to use:**
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
```

**Acceptance criteria:**
- [ ] NVDA price in watchlist shows real number from Yahoo Finance
- [ ] Fear & Greed shows real value from Alternative.me
- [ ] 60-second localStorage cache works (no redundant calls)
- [ ] Graceful fallback to simulated data if fetch fails
- [ ] No console errors on load
- [ ] Ticker banner updates with real prices

---

## 🔴 P10 — Weekly Email Digest
**Status:** Not started  
**Files:** netlify/functions/weekly-digest.js (new file)  
**Service:** Resend.com (free: 3,000 emails/month)  
**Content:** Paper trade P&L this week, top 5 IV opportunities, upcoming earnings for watchlist  

**Acceptance criteria:**
- [ ] `netlify/functions/weekly-digest.js` exists and deploys
- [ ] Email sends with correct HTML template
- [ ] Resend API key stored in Netlify env var `RESEND_API_KEY`
- [ ] Scheduled via netlify.toml cron config (every Sunday 9am)
- [ ] Email includes legal disclaimer

---

## ✅ Completed

- [x] P2: Options Profit Calculator (openCalc, buildCalcContent, drawCalcChart)
- [x] P3: localStorage persistence (saveState, loadState, auto-save on changes)
- [x] P4: Trade Journal Statistics (buildJournalStats, equity curve chart)
- [x] P5: IV Rank Historical Chart (drawIVHistory in Ticker Analyzer)
- [x] P6: Position Sizing Calculator (buildSizingCalc, refreshSizing, Kelly formula)
- [x] P7: PWA (initPWA, installPWA, beforeinstallprompt handler)
- [x] P8: Economic Calendar (buildEconomic, 12 events, impact levels)
- [x] P9: Options Flow Heatmap (buildHeatmap, sector grid, call/put flow)
