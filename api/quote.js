// api/quote.js
module.exports = async (req, res) => {
  const { symbol, type } = req.query;
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!symbol || !apiKey) {
    return res.status(400).json({ error: 'Missing symbol or API key' });
  }

  try {
    let endpoint = 'quote';
    let params = `symbol=${symbol}`;
    
    if (type === 'metric') {
      endpoint = 'stock/metric';
      params = `symbol=${symbol}&metric=all`;
    } else if (type === 'price-target') {
      endpoint = 'stock/price-target';
    }

    const url = `https://finnhub.io/api/v1/${endpoint}?${params}&token=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch ticker data' });
  }
};

