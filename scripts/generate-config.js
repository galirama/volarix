const fs = require('fs');
const path = require('path');

const url = (process.env.SUPABASE_URL || '').trim();
const key = (
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  ''
).trim();

// Locate the app folder where login.html and app.html live
const candidates = [
  path.resolve(__dirname, '../app'),
  path.resolve(process.cwd(), 'app'),
  process.cwd()
];

let targetFile = null;
for (const dir of candidates) {
  if (fs.existsSync(dir) && (fs.existsSync(path.join(dir, 'login.html')) || fs.existsSync(path.join(dir, 'app.html')))) {
    targetFile = path.join(dir, 'supabase.config.js');
    break;
  }
}

if (!targetFile) {
  targetFile = path.resolve(__dirname, '../app/supabase.config.js');
}

if (url && key) {
  const fileContent = [
    '// Generated at build time from environment variables',
    'window.VOLARIX_SUPABASE_CONFIG = {',
    '  url: ' + JSON.stringify(url) + ',',
    '  publishableKey: ' + JSON.stringify(key),
    '};',
    ''
  ].join('\n');
  fs.writeFileSync(targetFile, fileContent, 'utf8');
  console.log('[build] Successfully generated ' + targetFile + ' from environment variables.');
} else {
  if (fs.existsSync(targetFile)) {
    console.log('[build] Notice: Using existing ' + targetFile + '.');
  } else {
    console.warn('[build] Warning: SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY environment variables not found, and ' + targetFile + ' does not exist.');
  }
}
