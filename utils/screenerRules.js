// utils/screenerRules.js

/**
 * Calculates 52W High Discount %
 */
const calculateDiscount = (price, high52w) => {
    if (!high52w || high52w === 0) return 0;
    return ((high52w - price) / high52w) * 100;
};

/**
 * Calculates Analyst Upside %
 */
const calculateAnalystUpside = (price, targetPrice) => {
    if (!price || price === 0) return 0;
    return ((targetPrice - price) / price) * 100;
};

/**
 * Determines RSI Status
 * Oversold if RSI < 40, Neutral 40-60, Overbought > 60
 */
const getRSIStatus = (rsi) => {
    if (rsi < 40) return 'Oversold';
    if (rsi > 60) return 'Overbought';
    return 'Neutral';
};

/**
 * Determines MACD Trend
 * Bullish Crossover if MACD Line > Signal Line and Histogram > 0, otherwise Bearish/Neutral
 */
const getMACDTrend = (macdLine, signalLine, histogram) => {
    if (macdLine > signalLine && histogram > 0) return 'Bullish Crossover';
    return 'Bearish/Neutral';
};

/**
 * Screens tickers and tags strategies
 */
const screenTickers = (tickers) => {
    return tickers.map(ticker => {
        const discount = calculateDiscount(ticker.price, ticker.high52);
        // Requirement: Price < 52W High by >10%
        const isDiscounted = discount > 10; 
        
        const rsiStatus = getRSIStatus(ticker.rsi);
        const macdTrend = getMACDTrend(ticker.macdLine, ticker.signalLine, ticker.histogram);
        
        // Strategy Badges
        // 'CSP Ready' (if RSI < 45 and Price < 52W High by >10%)
        // 'LEAPS Ready' (if Analyst Upside > 15% and MACD Bullish)
        // 'Neutral' (if neither setup triggers).
        
        let strategy = 'Neutral';
        if (ticker.rsi < 45 && isDiscounted) {
            strategy = 'CSP Ready';
        } else if (parseFloat(ticker.upside) > 15 && macdTrend === 'Bullish Crossover') {
            strategy = 'LEAPS Ready';
        }

        return {
            ...ticker,
            metrics: {
                discount,
                upside: ticker.upside,
                rsiStatus,
                macdTrend
            },
            strategy
        };
    });
};

module.exports = {
    calculateDiscount,
    calculateAnalystUpside,
    getRSIStatus,
    getMACDTrend,
    screenTickers
};
