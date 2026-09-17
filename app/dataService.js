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
      return await this.fetchWithRetry(primaryFn);
    } catch (err) {
      console.warn("Primary fetch failed, trying secondary...", err);
      try {
        return await this.fetchWithRetry(secondaryFn);
      } catch (err2) {
        console.error("All fetch attempts failed", err2);
        throw err2;
      }
    }
  },

  async getMarketData() {
    return typeof MEGACAP_DATA !== 'undefined' ? MEGACAP_DATA : [];
  },

  async getTickerDetails(ticker) {
    // Phase 2 implementation will use the fallbacks here
    const data = await this.getMarketData();
    return data.find(d => d.ticker === ticker);
  },

  async getOptionsChain(ticker) {
    return []; 
  }
};

window.dataService = dataService;
