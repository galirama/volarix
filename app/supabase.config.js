// Local deployment configuration. This file is ignored by Git.
// The publishable key is safe for browser use; never replace it with a secret key.
window.VOLARIX_SUPABASE_CONFIG = {
  url: 'https://ifixqeuxvfsxzkxlytqm.supabase.co',
  publishableKey: 'sb_publishable_BjcFWrlYoIv2DKqXk1A8iA_uaJB487L'
};

window.VOLARIX_OLLAMA_CONFIG = {
  provider: 'ollama',
  baseUrl: 'http://localhost:11434/v1',
  model: 'qwen2.5-coder:1.5b',
  apiKey: 'ollama',
  enabled: true
};
