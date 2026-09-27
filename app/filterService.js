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

        // Handle missing data with safe defaults and fallback to hardcoded FUNDAMENTALS
        const fallback = (window.FUNDAMENTALS && window.FUNDAMENTALS[symbol]) ? window.FUNDAMENTALS[symbol] : {};
        
        const pe = data.metrics?.pe || data.metrics?.peNormalizedAnnual || fallback.pe || 999;
        const eps = data.metrics?.eps || data.metrics?.epsNormalizedAnnual || fallback.eps || 0;
        const currentPrice = data.price || 0; // Use the price from our service
        const high52 = data.metrics?.['52WeekHigh'] || 0;
        const targetPrice = data.target?.targetMean || 0;

        // Calculate metrics
        const discount = high52 > 0 ? (high52 - currentPrice) / high52 : 0;
        const upside = currentPrice > 0 ? ((targetPrice - currentPrice) / currentPrice) * 100 : 0;
        
        // Strategy determination
        let strategy = 'Fundamental'; // Default
        if (criteria.maxPe && pe < 20) strategy = 'CSP';
        else if (criteria.minEps && eps > 5) strategy = 'LEAPS';

        // Apply filters
        let passes = true;
        if (criteria.maxPe && pe > criteria.maxPe) passes = false;
        if (criteria.minEps && eps < criteria.minEps) passes = false;
        if (criteria.minDiscount && discount < criteria.minDiscount) passes = false;
        if (criteria.upsideRequired && upside <= 0) passes = false;

        if (passes) {
          results.push({
            symbol,
            pe: pe.toFixed(1),
            eps: eps.toFixed(2),
            discount: (discount * 100).toFixed(1),
            price: currentPrice.toFixed(2),
            rsi: data.technical?.rsi || 45,
            macd: data.technical?.macd || 'Neutral',
            upside: upside.toFixed(1),
            earningsDate: data.earningsDate || 'N/A',
            strategy: strategy
          });
        }
      });

      return results;
    }
  };

  window.filterService = filterService;
})();
