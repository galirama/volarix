# Use Case 02: P1 — Real-Time Data APIs Integration

## 1. Overview
Replace the hardcoded simulated market data (`MKT` object, 8-second artificial price drift) with live free financial data APIs. Implement client-side caching to respect rate limits, prevent redundant network requests, and provide smooth fallbacks.

---

## 2. Target Files & Code Locations
- `app/app.html` — `MKT` object, market ticker functions, fetch logic
- `docs/TASK_QUEUE.md` — Sprint tracking & acceptance criteria

---

## 3. Data Sources & Free APIs

| Data Point | Provider / API Endpoint | Notes / Auth Requirements |
|---|---|---|
| Stock Prices & Quotes | **Yahoo Finance API**<br>`https://query1.finance.yahoo.com/v8/finance/chart/{ticker}` | Free, no API key required |
| Real-Time Quotes | **Finnhub API**<br>`https://finnhub.io/api/v1/quote?symbol={ticker}&token={key}` | Free key required |
| Fear & Greed Index | **Alternative.me API**<br>`https://api.alternative.me/fng/` | Free, no key required |
| Economic Indicators | **FRED API**<br>`https://api.stlouisfed.org/fred/series/observations?series_id=DGS10` | Free key required |

---

## 4. Technical Specification & Implementation Pattern

### 4.1 Client-Side Caching (`fetchWithCache`)
To prevent hitting API rate limits and ensure snappy UI loading, all external API calls must pass through a 60-second local cache handler:

```javascript
async function fetchWithCache(key, fetchFn, ttlSeconds = 60) {
  const cacheKey = 'volarix_cache_' + key;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttlSeconds * 1000) {
        return data;
      }
    } catch (e) {
      console.warn('Cache parse error for key:', key, e);
    }
  }
  
  try {
    const data = await fetchFn();
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
  } catch (err) {
    console.error('Fetch failed for key:', key, err);
    // Return cached data even if expired if fetch fails
    if (cached) {
      const { data } = JSON.parse(cached);
      return data;
    }
    throw err;
  }
}
```

### 4.2 Fallback Strategy
If network requests fail, API limits are reached, or no connection is available, the app must gracefully fall back to the existing simulated `MKT` object values without throwing unhandled exceptions or breaking the UI.

---

## 5. Detailed Steps to Build

1. **Step 1:** Create `fetchWithCache` utility in `app.html` `<script>` section.
2. **Step 2:** Build `fetchYahooPrice(ticker)` wrapper function.
3. **Step 3:** Build `fetchFearAndGreed()` wrapper function for Alternative.me.
4. **Step 4:** Integrate API calls into `refreshMarketData()` / ticker banner updater.
5. **Step 5:** Test price updates on watchlist sidebar and main overview tab.
6. **Step 6:** Verify zero console errors when switching tabs or loading offline.

---

## 6. Acceptance Criteria

- [ ] NVDA, AAPL, MSFT, and VIX prices in Watchlist and Ticker Marquee display real data from Yahoo Finance.
- [ ] Fear & Greed gauge reflects real value from Alternative.me API.
- [ ] LocalStorage cache operates with 60-second TTL (verified via browser DevTools Network tab).
- [ ] Clean fallback to simulated data if an API request fails or is blocked.
- [ ] Zero unhandled promise rejections or console errors.

---

## 7. Current Implementation Status
- **Status:** 🔴 Not Started — Planned as Next Sprint Priority.
