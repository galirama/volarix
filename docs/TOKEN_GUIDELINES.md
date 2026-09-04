# VolariX Token & Coding Efficiency Guidelines

## Session Start Protocol
1. Read root `CODEX.md`, then `docs/HANDOFF.md`
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
| app.html   | 187,725 bytes | 200KB  | Keep below 200,000 bytes |
| app.js     | 19,423 bytes | No separate limit | Load after inline runtime |
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

## Preferred Edit Method
- Use a focused patch and keep unrelated edits intact.
- Do not replace large files wholesale for small changes.

## Session End Protocol
1. Update docs/PROJECT_STATUS.md — mark completed tasks
2. Update docs/TASK_QUEUE.md — check off done items
3. Update `docs/HANDOFF.md` with the changed files, verification, and remaining risks
