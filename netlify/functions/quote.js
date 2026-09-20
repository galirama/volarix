// netlify/functions/quote.js
exports.handler = async (event, context) => {
  const ticker = event.queryStringParameters.symbol;
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!ticker || !apiKey) {
    return { statusCode: 400, body: 'Missing symbol or API key' };
  }

  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: 'Failed to fetch ticker data' };
  }
};
