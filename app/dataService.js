// app/dataService.js
const dataService = {
  testMode: false, // Set to true in browser console to simulate API failure

  async fetchWithRetry(fn, retries = 2, delay = 1000) {
    try {
      return await fn();
    } catch (err) {
      if (retries <= 0) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.fetchWithRetry(fn, retries - 1, delay * 2);
    }
  },

  async fetchWithFallback(primaryFn, secondaryFn) {
    try {
      const data = await this.fetchWithRetry(primaryFn);
      if (typeof updateDataStatus === 'function') updateDataStatus('live');
      return data;
    } catch (err) {
      console.warn("Primary fetch failed, trying secondary...", err);
      try {
        const data = await this.fetchWithRetry(secondaryFn);
        if (typeof updateDataStatus === 'function') updateDataStatus('degraded');
        return data;
      } catch (err2) {
        console.error("All fetch attempts failed", err2);
        if (typeof updateDataStatus === 'function') updateDataStatus('offline');
        throw err2;
      }
    }
  },

  async getMarketData() {
    return (typeof window.MEGACAP_DATA !== 'undefined') ? window.MEGACAP_DATA : [];
  },

  async fetchYahooTicker(ticker) {
    if (this.testMode) throw new Error("Simulated primary API failure");

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Yahoo Finance API failed");
    const json = await response.json();
    
    const result = json.chart.result[0];
    const quote = result.meta.regularMarketPrice;
    
    const staticData = await this.getMarketData();
    const existing = staticData.find(d => d.ticker === ticker);
    
    return {
      ticker: ticker,
      price: quote.toFixed(2),
      ...(existing || {})
    };
  },

  // Phase 4: Fetch via secure Netlify Proxy
  async fetchFinnhubTicker(ticker) {
    if (this.testMode) throw new Error("Simulated primary API failure");
    
    // Call our serverless proxy function instead of the direct API
    const url = `/.netlify/functions/quote?symbol=${ticker}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Proxy fetch failed");
    const json = await response.json();
    
    // Validate response (Finnhub returns 0 for price if symbol is invalid)
    if (!json.c) throw new Error("Invalid ticker data from Finnhub");

    return {
      ticker: ticker,
      price: json.c.toFixed(2),
      ...(await this.getMarketData()).find(d => d.ticker === ticker) || {}
    };
  },


  async getTickerDetails(ticker) {
    const primary = async () => await this.fetchFinnhubTicker(ticker);
    const secondary = async () => {
      const data = await this.getMarketData();
      const found = data.find(d => d.ticker === ticker);
      // Fallback: If not found, return a default object to keep the UI functional
      return found || { 
        ticker: ticker, name: ticker, cap: 'N/A', capN: 0, price: '0.00', 
        chg: 0, iv: 0, ivRank: 0, earningsIn: 99, bias: 'NEUTRAL' 
      };
    };
    return await this.fetchWithFallback(primary, secondary);
  },

  // Phase 4: Primary fetcher - Finnhub for Market Data (Batch/Loop)
  async fetchLiveMarketData(symbols) {
    if (this.testMode) throw new Error("Simulated primary API failure");

    // Finnhub quote API is per symbol, so we map to an array of promises
    const promises = symbols.map(async (s) => {
        const url = `/.netlify/functions/quote?symbol=${s}`;
        const response = await fetch(url);
        if (!response.ok) return null;
        const json = await response.json();
        return { ticker: s, price: json.c, change: json.d };
    });

    const results = await Promise.all(promises);
    return results.filter(r => r !== null);
  },
  async getOptionsChain(ticker) {
    return []; 
  }
};

window.dataService = dataService;


window.dataService = dataService;
