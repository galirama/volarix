// app/config.js
window.VOLARIX_CONFIG = {
  supabaseUrl: 'https://ifixqeuxvfsxzkxlytqm.supabase.co',
  supabaseKey: 'sb_publishable_BjcFWrlYoIv2DKqXk1A8iA_uaJB487L',
  finnhubApiKey: 'YOUR_FINNHUB_KEY', // Should be managed via your build process
  ollama: {
    baseUrl: 'http://localhost:11434/v1',
    model: 'qwen2.5-coder:1.5b'
  }
};
