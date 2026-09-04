// Loaded after app.html's inline dashboard runtime. It uses the shared $ helper
// and modal elements declared there, so do not move this script into <head>.
// Fundamental data remains simulated until the production data-provider migration.
// ══════════════════════════════════════════
const FUNDAMENTALS = {
  AAPL: { pe:29.2, pb:48.1, ps:7.8, de:1.81, revGrowth:6.1,  epsGrowth:10.4, grossMargin:45.2, currentRatio:0.99, roe:160.1, insiderOwn:0.06, earningsDate:3 },
  NVDA: { pe:64.3, pb:36.2, ps:18.3,de:0.41, revGrowth:122.4,epsGrowth:288.2,grossMargin:74.6, currentRatio:4.17, roe:91.4,  insiderOwn:3.50, earningsDate:3  },
  MSFT: { pe:36.1, pb:12.8, ps:13.1,de:0.27, revGrowth:17.6, epsGrowth:20.8, grossMargin:69.8, currentRatio:1.78, roe:38.4,  insiderOwn:1.30, earningsDate:45 },
  TSLA: { pe:52.4, pb:10.2, ps:7.1, de:0.08, revGrowth:2.1,  epsGrowth:-24.1,grossMargin:17.9, currentRatio:1.84, roe:10.4,  insiderOwn:13.0, earningsDate:9  },
  GOOGL:{ pe:21.8, pb:6.1,  ps:6.2, de:0.07, revGrowth:15.1, epsGrowth:31.4, grossMargin:57.2, currentRatio:1.96, roe:31.2,  insiderOwn:5.80, earningsDate:30 },
  AMZN: { pe:38.4, pb:8.6,  ps:3.4, de:0.64, revGrowth:13.2, epsGrowth:218.4,grossMargin:47.6, currentRatio:1.10, roe:23.4,  insiderOwn:9.80, earningsDate:14 },
  META: { pe:24.6, pb:7.4,  ps:8.1, de:0.10, revGrowth:27.1, epsGrowth:73.4, grossMargin:81.4, currentRatio:2.67, roe:34.2,  insiderOwn:13.6, earningsDate:30 },
  JPM:  { pe:12.1, pb:2.0,  ps:3.8, de:1.20, revGrowth:8.4,  epsGrowth:14.2, grossMargin:62.1, currentRatio:1.10, roe:17.4,  insiderOwn:0.40, earningsDate:60 },
  JNJ:  { pe:15.8, pb:5.2,  ps:4.6, de:0.45, revGrowth:3.1,  epsGrowth:5.8,  grossMargin:68.9, currentRatio:1.34, roe:24.8,  insiderOwn:0.06, earningsDate:45 },
  V:    { pe:30.4, pb:13.2, ps:16.1,de:0.62, revGrowth:10.2, epsGrowth:12.1, grossMargin:80.1, currentRatio:1.54, roe:47.8,  insiderOwn:0.30, earningsDate:60 },
  UNH:  { pe:18.2, pb:5.8,  ps:0.8, de:0.68, revGrowth:8.6,  epsGrowth:12.4, grossMargin:24.1, currentRatio:0.72, roe:26.4,  insiderOwn:0.20, earningsDate:45 },
  WMT:  { pe:31.4, pb:8.6,  ps:1.0, de:0.67, revGrowth:5.4,  epsGrowth:14.2, grossMargin:24.6, currentRatio:0.82, roe:23.8,  insiderOwn:0.04, earningsDate:60 },
  XOM:  { pe:13.8, pb:1.9,  ps:1.4, de:0.21, revGrowth:-8.4, epsGrowth:-24.1,grossMargin:42.1, currentRatio:1.41, roe:14.2,  insiderOwn:0.10, earningsDate:45 },
  AVGO: { pe:28.4, pb:9.6,  ps:12.1,de:1.84, revGrowth:44.2, epsGrowth:52.1, grossMargin:62.8, currentRatio:1.12, roe:48.4,  insiderOwn:3.20, earningsDate:30 },
  LLY:  { pe:64.8, pb:58.1, ps:20.1,de:1.84, revGrowth:51.4, epsGrowth:98.4, grossMargin:80.4, currentRatio:1.08, roe:58.4,  insiderOwn:0.10, earningsDate:45 },
  ORCL: { pe:36.2, pb:null, ps:8.4, de:null,  revGrowth:6.8,  epsGrowth:18.4, grossMargin:71.2, currentRatio:0.81, roe:null,  insiderOwn:40.0, earningsDate:30 },
  NFLX: { pe:48.2, pb:17.4, ps:9.6, de:0.64, revGrowth:15.1, epsGrowth:98.4, grossMargin:45.8, currentRatio:1.28, roe:38.4,  insiderOwn:2.10, earningsDate:30 },
  COST: { pe:54.8, pb:16.4, ps:1.4, de:0.32, revGrowth:5.2,  epsGrowth:14.8, grossMargin:12.8, currentRatio:0.94, roe:31.4,  insiderOwn:0.40, earningsDate:28 },
  AMD:  { pe:null, pb:3.6,  ps:8.2, de:0.04, revGrowth:18.4, epsGrowth:null, grossMargin:53.2, currentRatio:2.48, roe:1.4,   insiderOwn:0.30, earningsDate:60 },
  SMCI: { pe:14.2, pb:3.4,  ps:1.2, de:0.84, revGrowth:110.4,epsGrowth:84.2, grossMargin:14.8, currentRatio:2.14, roe:44.8,  insiderOwn:14.4, earningsDate:21 },
  SPY:  { pe:22.4, pb:4.6,  ps:2.4, de:0.84, revGrowth:8.4,  epsGrowth:10.2, grossMargin:null, currentRatio:null,  roe:18.4,  insiderOwn:null, earningsDate:null},
  QQQ:  { pe:28.4, pb:7.4,  ps:5.4, de:null,  revGrowth:12.4, epsGrowth:16.4, grossMargin:null, currentRatio:null,  roe:null,  insiderOwn:null, earningsDate:null},
  GME:  { pe:null, pb:1.8,  ps:1.2, de:0.00, revGrowth:-8.4, epsGrowth:null, grossMargin:24.1, currentRatio:3.84, roe:null,  insiderOwn:0.10, earningsDate:21 },
  TSLA: { pe:52.4, pb:10.2, ps:7.1, de:0.08, revGrowth:2.1,  epsGrowth:-24.1,grossMargin:17.9, currentRatio:1.84, roe:10.4,  insiderOwn:13.0, earningsDate:9  },
};

// ── 10-POINT SCORING ENGINE ──
function scoreStock(sym) {
  const d = FUNDAMENTALS[sym] || FUNDAMENTALS['AAPL'];
  const checks = [
    {
      label: 'P/E Ratio',
      desc: 'Price-to-earnings valuation',
      value: d.pe ? d.pe.toFixed(1)+'×' : 'N/A',
      raw: d.pe,
      score: !d.pe ? 'amber'
           : d.pe < 20 ? 'green'
           : d.pe < 40 ? 'amber'
           : 'red',
      tip: !d.pe ? 'No earnings yet' : d.pe < 20 ? 'Attractively valued' : d.pe < 40 ? 'Fairly valued' : 'Premium valuation — high growth required',
    },
    {
      label: 'Price / Book',
      desc: 'Asset-based valuation',
      value: d.pb ? d.pb.toFixed(1)+'×' : 'N/A',
      raw: d.pb,
      score: !d.pb ? 'amber'
           : d.pb < 3 ? 'green'
           : d.pb < 15 ? 'amber'
           : 'red',
      tip: !d.pb ? 'N/A' : d.pb < 3 ? 'Trading near book value' : d.pb < 15 ? 'Moderate premium to assets' : 'High premium — justified only by strong moat',
    },
    {
      label: 'Price / Sales',
      desc: 'Revenue-based valuation',
      value: d.ps ? d.ps.toFixed(1)+'×' : 'N/A',
      raw: d.ps,
      score: !d.ps ? 'amber'
           : d.ps < 5 ? 'green'
           : d.ps < 15 ? 'amber'
           : 'red',
      tip: !d.ps ? 'N/A' : d.ps < 5 ? 'Reasonable revenue multiple' : d.ps < 15 ? 'Elevated — needs high margins' : 'Very expensive on sales basis',
    },
    {
      label: 'Debt / Equity',
      desc: 'Financial leverage risk',
      value: d.de !== null ? d.de.toFixed(2)+'×' : 'N/A',
      raw: d.de,
      score: d.de === null ? 'amber'
           : d.de < 0.5 ? 'green'
           : d.de < 1.5 ? 'amber'
           : 'red',
      tip: d.de === null ? 'N/A' : d.de < 0.5 ? 'Low leverage — strong balance sheet' : d.de < 1.5 ? 'Moderate debt — manageable' : 'High leverage — interest rate sensitive',
    },
    {
      label: 'Revenue Growth',
      desc: 'Year-over-year top line',
      value: d.revGrowth ? (d.revGrowth > 0 ? '+' : '') + d.revGrowth.toFixed(1)+'%' : 'N/A',
      raw: d.revGrowth,
      score: !d.revGrowth ? 'amber'
           : d.revGrowth > 15 ? 'green'
           : d.revGrowth > 0 ? 'amber'
           : 'red',
      tip: d.revGrowth > 15 ? 'Strong revenue expansion' : d.revGrowth > 0 ? 'Slow growth — watch for deceleration' : 'Declining revenues — risk signal',
    },
    {
      label: 'EPS Growth',
      desc: 'Earnings per share growth YoY',
      value: d.epsGrowth ? (d.epsGrowth > 0 ? '+' : '') + d.epsGrowth.toFixed(1)+'%' : 'N/A',
      raw: d.epsGrowth,
      score: !d.epsGrowth ? 'amber'
           : d.epsGrowth > 20 ? 'green'
           : d.epsGrowth > 0 ? 'amber'
           : 'red',
      tip: !d.epsGrowth ? 'Not profitable yet' : d.epsGrowth > 20 ? 'Accelerating earnings growth' : d.epsGrowth > 0 ? 'Modest earnings growth' : 'EPS declining — investigate why',
    },
    {
      label: 'Gross Margin',
      desc: 'Profitability of core business',
      value: d.grossMargin ? d.grossMargin.toFixed(1)+'%' : 'N/A',
      raw: d.grossMargin,
      score: !d.grossMargin ? 'amber'
           : d.grossMargin > 50 ? 'green'
           : d.grossMargin > 25 ? 'amber'
           : 'red',
      tip: !d.grossMargin ? 'N/A' : d.grossMargin > 50 ? 'High-margin business with strong moat' : d.grossMargin > 25 ? 'Decent margins — industry dependent' : 'Low margins — commodity-like business',
    },
    {
      label: 'Current Ratio',
      desc: 'Short-term liquidity',
      value: d.currentRatio ? d.currentRatio.toFixed(2)+'×' : 'N/A',
      raw: d.currentRatio,
      score: !d.currentRatio ? 'amber'
           : d.currentRatio > 1.5 ? 'green'
           : d.currentRatio > 0.8 ? 'amber'
           : 'red',
      tip: !d.currentRatio ? 'N/A' : d.currentRatio > 1.5 ? 'Strong liquidity position' : d.currentRatio > 0.8 ? 'Adequate — watch cash flow' : 'Tight liquidity — potential stress',
    },
    {
      label: 'Return on Equity',
      desc: 'Management effectiveness',
      value: d.roe ? d.roe.toFixed(1)+'%' : 'N/A',
      raw: d.roe,
      score: !d.roe ? 'amber'
           : d.roe > 20 ? 'green'
           : d.roe > 10 ? 'amber'
           : 'red',
      tip: !d.roe ? 'N/A' : d.roe > 20 ? 'Excellent capital efficiency' : d.roe > 10 ? 'Reasonable returns on equity' : 'Poor capital allocation — investigate',
    },
    {
      label: 'Insider Ownership',
      desc: 'Skin in the game',
      value: d.insiderOwn !== null ? d.insiderOwn.toFixed(1)+'%' : 'N/A',
      raw: d.insiderOwn,
      score: d.insiderOwn === null ? 'amber'
           : d.insiderOwn > 5 ? 'green'
           : d.insiderOwn > 1 ? 'amber'
           : 'red',
      tip: d.insiderOwn === null ? 'N/A' : d.insiderOwn > 5 ? 'High insider alignment with shareholders' : d.insiderOwn > 1 ? 'Moderate insider ownership' : 'Low insider ownership — agency risk',
    },
  ];

  const greens  = checks.filter(c => c.score === 'green').length;
  const ambers  = checks.filter(c => c.score === 'amber').length;
  const reds    = checks.filter(c => c.score === 'red').length;
  const total   = checks.length;
  const score   = Math.round((greens * 10 + ambers * 5) / total);

  const composite = score >= 70
    ? { label: '🟢 STRONG BUY', cls: 'strong',   color: 'var(--green)',  desc: 'Fundamentals are solid across the board. Good candidate for premium-selling strategies.' }
    : score >= 45
    ? { label: '🟡 CAUTIOUS',   cls: 'cautious', color: 'var(--amber)', desc: 'Mixed fundamentals. Proceed with smaller position size and tighter stops.' }
    : { label: '🔴 AVOID',      cls: 'avoid',    color: 'var(--red)',   desc: 'Weak fundamentals. High risk for options buyers. If selling premium, use very small size.' };

  return { checks, greens, ambers, reds, score, composite, earningsDate: d.earningsDate };
}

// ── RENDER SCORECARD ──
function renderScorecard(sym, mode) {
  const { checks, greens, ambers, reds, score, composite, earningsDate } = scoreStock(sym);

  const earningsWarn = earningsDate && earningsDate <= 7
    ? `<div class="alert-box" style="background:var(--red-bg);border:1px solid var(--red-dim);margin-bottom:12px"><div class="alert-box-title" style="color:var(--red)">🚨 Earnings in ${earningsDate} days — IV Crush Risk</div><div class="alert-box-body">IV likely to collapse post-earnings. Avoid buying options. If selling, close before the event.</div></div>`
    : earningsDate && earningsDate <= 14
    ? `<div class="alert-box" style="background:var(--amber-bg);border:1px solid var(--amber-dim);margin-bottom:12px"><div class="alert-box-title" style="color:var(--amber)">⚠️ Earnings in ${earningsDate} days</div><div class="alert-box-body">Consider earnings risk before placing this trade.</div></div>`
    : '';

  return `
    ${earningsWarn}
    <div class="composite-badge ${composite.cls}" style="margin-bottom:14px">
      <div>
        <div style="font-size:18px;font-weight:800;color:${composite.color}">${composite.label}</div>
        <div style="font-size:11px;color:var(--text2);margin-top:4px;max-width:380px;line-height:1.5">${composite.desc}</div>
      </div>
      <div style="text-align:center;flex-shrink:0">
        <div style="font-family:var(--mono);font-size:32px;font-weight:800;color:${composite.color}">${score}</div>
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text3)">/ 100</div>
        <div style="display:flex;gap:4px;margin-top:6px;justify-content:center">
          <span style="font-size:9px;padding:2px 6px;border-radius:20px;background:var(--green-bg);color:var(--green);border:1px solid var(--green-dim)">${greens} ✓</span>
          <span style="font-size:9px;padding:2px 6px;border-radius:20px;background:var(--amber-bg);color:var(--amber);border:1px solid var(--amber-dim)">${ambers} ~</span>
          <span style="font-size:9px;padding:2px 6px;border-radius:20px;background:var(--red-bg);color:var(--red);border:1px solid var(--red-dim)">${reds} ✗</span>
        </div>
      </div>
    </div>
    <div style="height:6px;background:var(--bg4);border-radius:3px;overflow:hidden;margin-bottom:14px">
      <div style="height:100%;width:${score}%;background:${score>=70?'var(--green)':score>=45?'var(--amber)':'var(--red)'};border-radius:3px;transition:width 1s ease"></div>
    </div>
    <div class="scorecard-grid">
      ${checks.map(c => `
        <div class="score-row ${c.score}">
          <div class="score-dot ${c.score}"></div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span class="score-label" style="font-weight:600;font-size:12px">${c.label}</span>
              <span class="score-val ${c.score}">${c.value}</span>
            </div>
            <div style="font-size:10px;color:var(--text3);line-height:1.4">${c.tip}</div>
          </div>
        </div>`).join('')}
    </div>
  `;
}

// ── OPEN SCORECARD MODAL ──
function openScorecard(sym, mode) {
  mode = mode || 'analyze';
  $('scTitle').textContent = '📊 ' + sym + ' — Fundamental Health Scorecard';
  $('scSub').textContent = '10-point analysis · Green = Healthy · Yellow = Caution · Red = Risk';
  $('scContent').innerHTML = renderScorecard(sym, mode);
  const actions = $('scActions');
  if (mode === 'pretrade') {
    actions.innerHTML = `
      <button class="btn btn-red" style="flex:1;justify-content:center" onclick="closeScorecard()">✕ Cancel Trade</button>
      <button class="btn btn-amber" style="flex:1;justify-content:center;background:var(--amber-bg);color:var(--amber);border:1px solid var(--amber-dim)" onclick="closeScorecard();showTab('paper')">⚠️ Trade Anyway</button>
      <button class="btn btn-cyan" style="flex:1;justify-content:center" onclick="closeScorecard()">OK, Got It →</button>
    `;
  } else {
    actions.innerHTML = `
      <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeScorecard();showTab('options')">View Options Chain →</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="closeScorecard()">Close</button>
    `;
  }
  $('scorecardOverlay').classList.add('open');
}

function closeScorecard() { $('scorecardOverlay').classList.remove('open'); }
$('scorecardOverlay').addEventListener('click', e => { if(e.target === $('scorecardOverlay')) closeScorecard(); });

// ══════════════════════════════════════════
// MEGA-CAP HIGH-IV SCREENER
// Top 20 companies market cap > $200B sorted by IV rank
// ══════════════════════════════════════════
const MEGACAP_DATA = [
  { ticker:'NVDA', name:'NVIDIA Corp',          cap:'3.1T',  capN:3100, price:875.30, chg:+2.11, iv:94.2, ivRank:89, pcRatio:0.68, earningsIn:3,  bias:'BULLISH',  strategy:'Iron Condor or CSP',      color:'red'   },
  { ticker:'SMCI', name:'Super Micro Computer', cap:'72B',   capN:72,   price:812.40, chg:+1.84, iv:142.3,ivRank:94, pcRatio:0.72, earningsIn:21, bias:'NEUTRAL',  strategy:'Iron Condor (wide)',      color:'red'   },
  { ticker:'META', name:'Meta Platforms',       cap:'1.3T',  capN:1300, price:504.33, chg:+1.02, iv:44.8, ivRank:62, pcRatio:0.84, earningsIn:30, bias:'BULLISH',  strategy:'Bull Put Spread',         color:'cyan'  },
  { ticker:'TSLA', name:'Tesla Inc',            cap:'570B',  capN:570,  price:177.88, chg:-1.45, iv:76.8, ivRank:68, pcRatio:0.91, earningsIn:9,  bias:'BEARISH',  strategy:'Bear Call Spread',        color:'amber' },
  { ticker:'AMZN', name:'Amazon.com Inc',       cap:'2.1T',  capN:2100, price:198.12, chg:+0.87, iv:38.4, ivRank:54, pcRatio:0.76, earningsIn:14, bias:'BULLISH',  strategy:'Cash Secured Put',        color:'cyan'  },
  { ticker:'AAPL', name:'Apple Inc',            cap:'2.9T',  capN:2900, price:189.45, chg:+0.18, iv:31.8, ivRank:44, pcRatio:0.82, earningsIn:15, bias:'NEUTRAL',  strategy:'Covered Call',            color:'cyan'  },
  { ticker:'AVGO', name:'Broadcom Inc',         cap:'620B',  capN:620,  price:182.40, chg:+1.24, iv:52.4, ivRank:71, pcRatio:0.64, earningsIn:30, bias:'BULLISH',  strategy:'Bull Put Spread',         color:'cyan'  },
  { ticker:'LLY',  name:'Eli Lilly & Co',       cap:'720B',  capN:720,  price:820.10, chg:+0.64, iv:41.2, ivRank:58, pcRatio:0.72, earningsIn:45, bias:'BULLISH',  strategy:'Covered Call / CSP',      color:'cyan'  },
  { ticker:'MSFT', name:'Microsoft Corp',       cap:'3.1T',  capN:3100, price:415.60, chg:+0.54, iv:28.4, ivRank:36, pcRatio:0.74, earningsIn:45, bias:'BULLISH',  strategy:'Cash Secured Put',        color:'cyan'  },
  { ticker:'AMD',  name:'Adv Micro Devices',    cap:'240B',  capN:240,  price:148.20, chg:-0.82, iv:62.1, ivRank:55, pcRatio:0.79, earningsIn:60, bias:'NEUTRAL',  strategy:'Iron Condor',             color:'amber' },
  { ticker:'GOOGL',name:'Alphabet Inc',         cap:'2.1T',  capN:2100, price:182.30, chg:+0.44, iv:30.1, ivRank:42, pcRatio:0.68, earningsIn:30, bias:'BULLISH',  strategy:'Bull Put Spread',         color:'cyan'  },
  { ticker:'NFLX', name:'Netflix Inc',          cap:'280B',  capN:280,  price:640.20, chg:+0.94, iv:46.8, ivRank:64, pcRatio:0.82, earningsIn:30, bias:'BULLISH',  strategy:'Bull Put Spread',         color:'cyan'  },
  { ticker:'COST', name:'Costco Wholesale',     cap:'380B',  capN:380,  price:850.40, chg:+0.34, iv:22.4, ivRank:28, pcRatio:0.62, earningsIn:28, bias:'BULLISH',  strategy:'Covered Call',            color:'cyan'  },
  { ticker:'JPM',  name:'JPMorgan Chase',       cap:'560B',  capN:560,  price:202.40, chg:+0.44, iv:24.1, ivRank:32, pcRatio:0.58, earningsIn:60, bias:'NEUTRAL',  strategy:'Cash Secured Put',        color:'cyan'  },
  { ticker:'WMT',  name:'Walmart Inc',          cap:'620B',  capN:620,  price:224.80, chg:+0.28, iv:20.4, ivRank:24, pcRatio:0.54, earningsIn:60, bias:'NEUTRAL',  strategy:'Covered Call',            color:'cyan'  },
  { ticker:'V',    name:'Visa Inc',             cap:'560B',  capN:560,  price:278.40, chg:+0.54, iv:21.4, ivRank:26, pcRatio:0.48, earningsIn:60, bias:'BULLISH',  strategy:'Cash Secured Put',        color:'cyan'  },
  { ticker:'UNH',  name:'UnitedHealth Group',   cap:'490B',  capN:490,  price:508.40, chg:-1.24, iv:34.8, ivRank:48, pcRatio:0.94, earningsIn:45, bias:'BEARISH',  strategy:'Bear Call Spread',        color:'amber' },
  { ticker:'ORCL', name:'Oracle Corp',          cap:'420B',  capN:420,  price:158.20, chg:+0.44, iv:28.4, ivRank:38, pcRatio:0.72, earningsIn:30, bias:'BULLISH',  strategy:'Bull Put Spread',         color:'cyan'  },
  { ticker:'XOM',  name:'ExxonMobil Corp',      cap:'490B',  capN:490,  price:114.20, chg:-0.84, iv:26.4, ivRank:34, pcRatio:0.88, earningsIn:45, bias:'BEARISH',  strategy:'Bear Call Spread',        color:'amber' },
  { ticker:'JNJ',  name:'Johnson & Johnson',    cap:'380B',  capN:380,  price:154.40, chg:-0.34, iv:18.4, ivRank:22, pcRatio:0.68, earningsIn:45, bias:'NEUTRAL',  strategy:'Covered Call',            color:'cyan'  },
];
