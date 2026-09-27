// app/screenerService.js
(function() {
  const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache
  window.USE_MOCK_DATA = window.USE_MOCK_DATA || false; // Toggle for mock data

  const screenerService = {
    async fetchWithCache(key, fetchFn) {
      const cached = localStorage.getItem(`volarix_screener_${key}`);
      if (cached && !window.USE_MOCK_DATA) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL_MS) return data;
      }
      
      try {
        const data = await fetchFn();
        if (!data.error) {
           localStorage.setItem(`volarix_screener_${key}`, JSON.stringify({ data, timestamp: Date.now() }));
        }
        return data;
      } catch (e) {
        console.error(`Error fetching/caching ${key}:`, e);
        return { error: 'Failed to fetch', symbol: key, isMock: true };
      }
    },

    async fetchSafe(url) {
      try {
        const res = await fetch(url);
        if (res.status === 429) {
            console.warn("Rate limit hit (429). Switching to mock data if enabled.");
            return { error: 'Rate limit' };
        }
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    },

    async fetchTickerFundamentals(symbol) {
      if (window.USE_MOCK_DATA) {
        return {
          symbol,
          price: (Math.random() * 100).toFixed(2),
          high52: (Math.random() * 150).toFixed(2),
          discount: '15%',
          technical: { rsi: 55, macd: 'Bullish' },
          target: { targetHigh: 120 },
          earningsDate: '2023-10-15',
          isMock: true
        };
      }

      // Parallel fetch with individual error handling
      const [metric, target, quote, rsi, macd, earnings] = await Promise.all([
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=metric`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=price-target`),
        this.fetchSafe(`/api/quote?symbol=${symbol}`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=rsi`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=macd`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=earnings`)
      ]);

      // Check for rate limiting
      if (metric?.error === 'Rate limit' || quote?.error === 'Rate limit') {
          return { symbol, error: 'Rate limit', isMock: false };
      }

      // Fix Price Source
      const rawPrice = quote?.c || quote?.currentPrice || quote?.price || window.MKT?.prices?.[symbol] || 0;
      const price = parseFloat(rawPrice);
      
      const high52 = metric?.metric?.['52WeekHigh'] || 0;
      
      let discount = 0;
      if (price > 0 && high52 > 0) {
        discount = ((high52 - price) / high52) * 100;
      }

      return {
        symbol,
        metrics: metric?.metric || {},
        target: target || {},
        quote: quote || {},
        technical: {
            rsi: rsi?.rsi !== undefined ? rsi.rsi : '--',
            macd: macd?.macd !== undefined ? macd.macd : '--'
        },
        price: price,
        high52: high52,
        discount: (price === 0 || high52 === 0 || high52 <= price) ? 0 : parseFloat(discount.toFixed(1)),
        earningsDate: earnings?.[0]?.date || 'N/A'
      };
    },

    async getScreenerData(symbols) {
      const results = {};
      for (const symbol of symbols) {
        // Rate limiting: 200ms delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        try {
          const data = await this.fetchWithCache(symbol, () => this.fetchTickerFundamentals(symbol));
          if (data.error === 'Rate limit' || window.USE_MOCK_DATA) {
             // If rate limited or forcing mock, return a safe mock object for the UI
             results[symbol] = {
                 symbol,
                 price: '--',
                 high52: '--',
                 discount: '0%',
                 technical: { rsi: '--', macd: '--' },
                 earningsDate: 'N/A',
                 isMock: true
             };
          } else {
             results[symbol] = data;
          }
        } catch (e) {
          console.error(`Error fetching ${symbol}:`, e);
          results[symbol] = { symbol, error: 'Failed to fetch' };
        }
      }
      return results;
    }
  };

  window.screenerService = screenerService;
})();
