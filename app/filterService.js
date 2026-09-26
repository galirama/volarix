// app/filterService.js
(function() {
  const filterService = {
    // Presets for quick filtering
    presets: {
      CSP: {
        maxPe: 30,
        minEps: 0,
        minDiscount: 0.10, // 10% below 52wk high
        upsideRequired: false
      },
      LEAPS: {
        maxPe: 50,
        minEps: 5,
        minDiscount: 0.05,
        upsideRequired: true // Target price > current
      }
    },

    filterFundamentalStocks(dataMap, presetName) {
      const criteria = this.presets[presetName] || {};
      const results = [];

      Object.entries(dataMap).forEach(([symbol, data]) => {
        if (data.error) return; // Skip failed fetches

        // Handle missing data with safe defaults
        const pe = data.metrics?.pe || 999;
        const eps = data.metrics?.eps || 0;
        const currentPrice = data.quote?.c || 0;
        const high52 = data.metrics?.['52WeekHigh'] || 0;
        const targetPrice = data.target?.targetMean || 0;

        // Calculate metrics
        const discount = high52 > 0 ? (high52 - currentPrice) / high52 : 0;
        const hasUpside = targetPrice > currentPrice;

        // Apply filters
        let passes = true;
        if (criteria.maxPe && pe > criteria.maxPe) passes = false;
        if (criteria.minEps && eps < criteria.minEps) passes = false;
        if (criteria.minDiscount && discount < criteria.minDiscount) passes = false;
        if (criteria.upsideRequired && !hasUpside) passes = false;

        if (passes) {
          results.push({
            symbol,
            pe,
            eps,
            discount: (discount * 100).toFixed(1) + '%',
            target: targetPrice,
            price: currentPrice
          });
        }
      });

      return results;
    }
  };

  window.filterService = filterService;
})();
