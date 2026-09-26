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
      
      const data = await fetchFn();
      localStorage.setItem(`volarix_screener_${key}`, JSON.stringify({ data, timestamp: Date.now() }));
      return data;
    },

    async fetchTickerFundamentals(symbol) {
      // 1. Basic Financials (metric)
      const metric = await fetch(`/api/quote?symbol=${symbol}&type=metric`).then(r => r.json());
      // 2. Price Target
      const target = await fetch(`/api/quote?symbol=${symbol}&type=price-target`).then(r => r.json());
      // 3. Current Quote
      const quote = await fetch(`/api/quote?symbol=${symbol}`).then(r => r.json());

      return {
        symbol,
        metrics: metric.metric || {},
        target: target || {},
        quote: quote || {}
      };
    },

    async getScreenerData(symbols) {
      const results = {};
      for (const symbol of symbols) {
        // Rate limiting: prevent spamming
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
          results[symbol] = await this.fetchWithCache(symbol, () => this.fetchTickerFundamentals(symbol));
        } catch (e) {
          console.error(`Error fetching ${symbol}:`, e);
          results[symbol] = { error: 'Failed to fetch' };
        }
      }
      return results;
    }
  };

  window.screenerService = screenerService;
})();
