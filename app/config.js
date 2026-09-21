// app/config.js
window.VOLARIX_CONFIG = {
  supabaseUrl: 'https://ifixqeuxvfsxzkxlytqm.supabase.co',
  supabaseKey: 'sb_publishable_BjcFWrlYoIv2DKqXk1A8iA_uaJB487L',
  finnhubApiKey: 'YOUR_FINNHUB_KEY', // Should be managed via your build process
  ollama: {
    baseUrl: 'http://localhost:11434/v1',
    model: 'qwen2.5-coder:1.5b'
  },
  BS: {
    cyan: 'background:rgba(0,212,170,0.15);color:#00D4AA;border:1px solid rgba(0,212,170,0.3)',
    red: 'background:rgba(255,71,87,0.15);color:#FF4757;border:1px solid rgba(255,71,87,0.3)',
    amber: 'background:rgba(255,184,48,0.15);color:#FFB830;border:1px solid rgba(255,184,48,0.3)',
    neutral: 'background:rgba(255,255,255,0.06);color:#9896B0;border:1px solid rgba(255,255,255,0.1)'
  }
};
