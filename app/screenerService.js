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
      const [metric, target, quote, rsi, macd, earnings, sma7, sma20, sma200] = await Promise.all([
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=metric`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=price-target`),
        this.fetchSafe(`/api/quote?symbol=${symbol}`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=rsi`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=macd`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=earnings`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=sma&period=7`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=sma&period=20`),
        this.fetchSafe(`/api/quote?symbol=${symbol}&type=sma&period=200`)
      ]);

      // Check for rate limiting
      if (metric?.error === 'Rate limit' || quote?.error === 'Rate limit') {
          return { symbol, error: 'Rate limit', isMock: false };
      }

      // Fix Price Source
      const price = Number(quote?.c || quote?.price || window.MKT?.prices?.[symbol] || 0);
      
      const high52 = parseFloat(metric?.metric?.['52WeekHigh'] || 0);
      
      let discountVal = '0.0';
      if (price > 0 && high52 > price) {
        discountVal = (((high52 - price) / high52) * 100).toFixed(1);
      }
      
      const targetPrice = parseFloat(target?.targetHigh || target?.priceTarget || 0);
      let upsideVal = '--';
      if (price > 0 && targetPrice > price) {
          upsideVal = (((targetPrice - price) / price) * 100).toFixed(1) + '%';
      }

      let earningsDisplay = 'N/A';
      if (earnings && earnings[0] && earnings[0].date) {
          const eDate = new Date(earnings[0].date);
          const now = new Date();
          const diffDays = Math.ceil((eDate - now) / (1000 * 60 * 60 * 24));
          earningsDisplay = diffDays >= 0 ? `${diffDays}d` : 'N/A';
      }

      return {
        symbol,
        metrics: metric?.metric || {},
        target: target || {},
        quote: quote || {},
        technical: {
            rsi: rsi?.rsi !== undefined ? rsi.rsi : '--',
            macd: macd?.macd !== undefined ? macd.macd : '--',
            sma7: sma7?.sma ? parseFloat(sma7.sma[0]).toFixed(2) : '--',
            sma20: sma20?.sma ? parseFloat(sma20.sma[0]).toFixed(2) : '--',
            sma200: sma200?.sma ? parseFloat(sma200.sma[0]).toFixed(2) : '--'
        },
        price: price,
        high52: high52,
        low52: low52,
        discount: discountVal,
        upside: upsideVal,
        earningsDate: earningsDisplay
      };

      return {
        symbol,
        metrics: metric?.metric || {},
        target: target || {},
        quote: quote || {},
        technical: {
            rsi: rsi?.rsi !== undefined ? rsi.rsi : '--',
            macd: macd?.macd !== undefined ? macd.macd : '--',
            sma7: sma7?.sma ? parseFloat(sma7.sma[0]).toFixed(2) : '--',
            sma20: sma20?.sma ? parseFloat(sma20.sma[0]).toFixed(2) : '--',
            sma200: sma200?.sma ? parseFloat(sma200.sma[0]).toFixed(2) : '--'
        },
        price: price,
        high52: high52,
        low52: low52,
        discount: discountVal,
        upside: upsideVal,
        earningsDate: earningsDisplay
      };
    },

    async getScreenerData(symbols, onProgress) {
      const results = {};
      // Process in chunks of 2
      const chunkSize = 2;
      for (let i = 0; i < symbols.length; i += chunkSize) {
        const chunk = symbols.slice(i, i + chunkSize);
        
        // Notify progress for chunk
        if (onProgress) {
            chunk.forEach(s => onProgress(s, 'loading'));
        }

        const promises = chunk.map(symbol => this.fetchWithCache(symbol, () => this.fetchTickerFundamentals(symbol)));
        const chunkResults = await Promise.all(promises);

        chunk.forEach((symbol, index) => {
            results[symbol] = chunkResults[index];
            if (onProgress) onProgress(symbol, 'done');
        });

        // 300ms delay between chunks
        if (i + chunkSize < symbols.length) {
            await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      return results;
    },
  };

  window.screenerService = screenerService;
})();
