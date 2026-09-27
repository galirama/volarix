// app/screenerService.js
(function() {
  const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache

  const screenerService = {
    async fetchWithCache(key, fetchFn) {
      const cached = localStorage.getItem(`volarix_screener_${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL_MS) return data;
      }
      
      try {
        const data = await fetchFn();
        localStorage.setItem(`volarix_screener_${key}`, JSON.stringify({ data, timestamp: Date.now() }));
        return data;
      } catch (e) {
        console.error(`Error fetching/caching ${key}:`, e);
        return { error: 'Failed to fetch', symbol: key }; // Fallback
      }
    },

    async fetchSafe(url) {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    },

    async fetchTickerFundamentals(symbol) {
      // Parallel fetch with individual error handling
      const [metric, target, quote, rsi, macd, earnings] = await Promise.all([
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=metric`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=price-target`),
        this.fetchSafe(`/api/quote?symbol=${symbol}`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=rsi`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=macd`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=earnings`)
      ]);

      return {
        symbol,
        metrics: metric?.metric || {},
        target: target || {},
        quote: quote || {},
        technical: {
            rsi: rsi?.rsi || 50,
            macd: macd?.macd || 0
        },
        earningsDate: earnings?.[0]?.date || 'N/A'
      };
    },

    async getScreenerData(symbols) {
      const results = {};
      for (const symbol of symbols) {
        // Rate limiting: 200ms delay as requested
        await new Promise(resolve => setTimeout(resolve, 200));
        
        try {
          results[symbol] = await this.fetchWithCache(symbol, () => this.fetchTickerFundamentals(symbol));
        } catch (e) {
          console.error(`Error fetching ${symbol}:`, e);
          results[symbol] = { error: 'Failed to fetch', symbol };
        }
      }
      return results;
    }
  };

  window.screenerService = screenerService;
})();
