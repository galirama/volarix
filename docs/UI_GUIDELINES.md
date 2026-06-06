# VolariX UI Guidelines

## Design Principles
1. Institutional fintech feel — not a toy, not a terminal
2. Data-dense but not cluttered
3. Mobile-first — sidebar collapses, tables become cards
4. Dark by default — light mode via toggle
5. Color communicates meaning — cyan=positive, red=negative, amber=warning, purple=premium

## Typography
```css
--font: 'Bricolage Grotesque', sans-serif;  /* All UI text */
--mono: 'DM Mono', monospace;               /* All numbers, tickers, prices */
```

## Color System
```css
--bg:#0D0F1A  --bg2:#13162A  --bg3:#1A1D30  --bg4:#22253C
--text:#F0EFF8  --text2:#9896B0  --text3:#555370
--cyan:#00D4AA   --red:#FF4757   --amber:#FFB830
--purple:#8B7FFF --green:#00D084 --blue:#4DACFF
/* Each has -bg (10% opacity) and -dim (25% opacity) variants */
```

## Core Components

### Cards
```html
<div class="card">
  <div class="card-header"><div class="card-title">Title</div></div>
  <div class="card-body">Content</div>
</div>
```

### Badges (always use helper)
```javascript
badge('text', 'cyan')    // positive
badge('text', 'red')     // negative
badge('text', 'amber')   // warning
badge('text', 'purple')  // PRO feature
badge('text', 'neutral') // grey
```

### Stat Cards
```html
<div class="stat-row">  <!-- 4-col grid -->
  <div class="stat-card">
    <div class="stat-label">LABEL</div>
    <div class="stat-val clr-cyan">VALUE</div>
    <div class="stat-sub">subtitle</div>
  </div>
</div>
```

### Alert Boxes
```html
<div class="alert-box" style="background:var(--red-bg);border:1px solid var(--red-dim)">
  <div class="alert-box-title" style="color:var(--red)">🚨 Title</div>
  <div class="alert-box-body">Body text</div>
</div>
```

### Modal Pattern
```html
<div class="mymodal-overlay" id="mymodalOverlay">
  <div class="mymodal-modal">
    <!-- header + × close button -->
    <div id="mymodalContent"></div>
    <!-- action buttons -->
  </div>
</div>
```
Open: `el.classList.add('open')`
Close: `el.classList.remove('open')`

## Mobile Rules (< 720px)
- Sidebar: hidden
- Stat rows: 2 columns
- Tables: thead hidden, tr → flex-wrap card
- Modals: max-width 92vw

## Canvas Chart Colors
- Bullish/positive: `#00D4AA`
- Bearish/negative: `#FF4757`
- RSI/equity line:  `#8B7FFF`
- Zero line:        `rgba(255,255,255,0.12)` dashed
