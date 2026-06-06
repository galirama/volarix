# VolariX Token & Coding Efficiency Guidelines

## Session Start Protocol
1. Read root CLAUDE.md ONLY — no other file needed to start
2. Confirm state in 3 bullets: what's built / what's broken / what's next
3. Do NOT write code until human confirms the task

## #1 Rule — No Template Literals in HTML
```html
<!-- ❌ WRONG -->
<div id="tab">${items.map(i => `<span>${i}</span>`).join('')}</div>

<!-- ✅ CORRECT -->
<div id="tab"></div>
<script>
  function buildTab() {
    document.getElementById('tab').innerHTML =
      items.map(i => `<span>${i}</span>`).join('');
  }
</script>
```

## File Size Budget
| File       | Current  | Limit  | Action if over        |
|------------|----------|--------|-----------------------|
| app.html   | ~192KB   | 200KB  | Split JS into app.js  |
| index.html | ~23KB    | 50KB   | Fine                  |
| login.html | ~20KB    | 50KB   | Fine                  |

Check before every commit: `wc -c app/app.html`

## One Feature Per Turn
- Never build more than one P-level feature per conversation turn
- Propose in bullets before building
- Audit before presenting

## Audit Checklist
```python
checks = {
  'No raw template literals': html[:html.find('<script>')].count('${') == 0,
  'Auth guard intact':        'volarix_auth' in html,
  'Legal disclaimer':         'not financial advice' in html,
  'Under 200KB':              len(html.encode()) < 200000,
}
```

## Backup Before Patching
```bash
cp app/app.html app/app-backup-$(date +%Y-%m-%d).html
```

## Preferred Edit Method
- Changes < 20 lines: use str_replace
- Changes > 20 lines: Python read → modify → write
- Never bash heredoc for files > 50KB (causes truncation)

## Session End Protocol
1. Update docs/PROJECT_STATUS.md — mark completed tasks
2. Update docs/TASK_QUEUE.md — check off done items
3. Present both updated files for GitHub upload
