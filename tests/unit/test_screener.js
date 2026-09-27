const { calculateDiscount, calculateAnalystUpside, getRSIStatus, getMACDTrend, screenTickers } = require('../../utils/screenerRules');

const tickers = [
    {
        symbol: 'AAPL',
        price: 150,
        high52w: 200,
        analystTargetPrice: 190,
        rsi: 30, // Oversold
        macdLine: 1,
        signalLine: 0.5,
        histogram: 0.2, // Bullish
        pe: 20,
        eps: 5,
        nextEarningsDate: '2026-10-05' // Within 14 days of 2026-09-27
    },
    {
        symbol: 'TSLA',
        price: 300,
        high52w: 310,
        analystTargetPrice: 320,
        rsi: 80, // Overbought + Risk
        macdLine: -1,
        signalLine: 0,
        histogram: -0.5,
        pe: 50,
        eps: 2,
        nextEarningsDate: '2026-12-01'
    }
];

const results = screenTickers(tickers);
console.log(JSON.stringify(results, null, 2));

// Validations
const aapl = results.find(t => t.symbol === 'AAPL');
if (aapl.tags.includes('CSP Setup') && aapl.tags.includes('LEAPS Call Setup') && aapl.warnings.includes('Upcoming Earnings')) {
    console.log('AAPL test passed');
} else {
    console.log('AAPL test failed', aapl);
}

const tsla = results.find(t => t.symbol === 'TSLA');
if (tsla.warnings.includes('Too Overbought')) {
    console.log('TSLA test passed');
} else {
    console.log('TSLA test failed', tsla);
}
