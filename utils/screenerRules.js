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
        const discount = calculateDiscount(ticker.price, ticker.high52w);
        const upside = calculateAnalystUpside(ticker.price, ticker.analystTargetPrice);
        const rsiStatus = getRSIStatus(ticker.rsi);
        const macdTrend = getMACDTrend(ticker.macdLine, ticker.signalLine, ticker.histogram);

        const tags = [];
        const warnings = [];

        // CSP Setup Logic
        // CSP Setup (Cash Secured Put): Good Fundamentals (PE < 35, EPS > 0) + Discounted from 52W High + RSI < 45 (Oversold/Dip buy).
        const isFundamentalGood = ticker.pe < 35 && ticker.eps > 0;
        const isDiscounted = discount > 0; 
        const isRSIForCSP = ticker.rsi < 45;
        
        if (isFundamentalGood && isDiscounted && isRSIForCSP) {
            tags.push('CSP Setup');
        }

        // LEAPS Call Setup Logic
        // LEAPS Call Setup: High Analyst Upside (>20%) + MACD Bullish Crossover + Momentum recovering.
        const isUpsideGood = upside > 20;
        const isMACDBullish = macdTrend === 'Bullish Crossover';
        
        if (isUpsideGood && isMACDBullish) {
            tags.push('LEAPS Call Setup');
        }

        // Risk Warnings
        // Flag any ticker with Next Earnings Date within 14 days or RSI > 70 (Too overbought to sell puts safely).
        if (ticker.nextEarningsDate) {
            const daysToEarnings = Math.ceil((new Date(ticker.nextEarningsDate) - new Date()) / (1000 * 60 * 60 * 24));
            if (daysToEarnings <= 14 && daysToEarnings >= 0) {
                warnings.push('Upcoming Earnings');
            }
        }
        
        if (ticker.rsi > 70) {
            warnings.push('Too Overbought');
        }

        return {
            ...ticker,
            metrics: {
                discount,
                upside,
                rsiStatus,
                macdTrend
            },
            tags,
            warnings
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
