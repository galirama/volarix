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

  // Phase 4: Finnhub API implementation
  async fetchFinnhubTicker(ticker) {
    if (this.testMode) throw new Error("Simulated primary API failure");
    
    // Replace 'YOUR_API_KEY' with your actual key
    const apiKey = 'YOUR_API_KEY'; 
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Finnhub API failed");
    const json = await response.json();
    
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
      return data.find(d => d.ticker === ticker) || null;
    };
    return await this.fetchWithFallback(primary, secondary);
  },

  async getOptionsChain(ticker) {
    return []; 
  }
};

window.dataService = dataService;
