// app/dataService.js

const dataService = {
  // Retry helper: attempts a fetch operation N times
  async fetchWithRetry(fn, retries = 2, delay = 1000) {
    try {
      return await fn();
    } catch (err) {
      if (retries <= 0) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.fetchWithRetry(fn, retries - 1, delay * 2);
    }
  },

  // Fallback helper: tries primary, then secondary
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

  async getTickerDetails(ticker) {
    // Phase 2: Implement fallback logic
    const primary = async () => {
      // Simulate primary fetch (currently just static data)
      const data = await this.getMarketData();
      const item = data.find(d => d.ticker === ticker);
      if (!item) throw new Error("Ticker not found in primary source");
      return item;
    };

    const secondary = async () => {
      // Secondary fallback (e.g., local backup or secondary API)
      console.warn("Fallback triggered for", ticker);
      const data = await this.getMarketData();
      return data.find(d => d.ticker === ticker);
    };

    return await this.fetchWithFallback(primary, secondary);
  },

  async getOptionsChain(ticker) {
    return []; 
  }
};

window.dataService = dataService;
