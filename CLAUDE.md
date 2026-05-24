```md
# VolariX Agent Rules

You are working on VolariX, a fintech web platform focused on risk-first options trading.

## Read Only What Is Needed
Before coding, read only the relevant documents:

- Product & business rules → `/docs/PRODUCT.md`
- System architecture → `/docs/ARCHITECTURE.md`
- Database schema → `/docs/DB_SCHEMA.md`
- UI & frontend → `/docs/UI_GUIDELINES.md`
- Legal disclaimers → `/docs/LEGAL.md`
- Current sprint status → `/docs/PROJECT_STATUS.md`
- Pending work → `/docs/TASK_QUEUE.md`

## Core Engineering Rules
- Work in small increments.
- Change only requested files.
- Do not refactor unrelated working code.
- Ask before making architectural changes.
- Prefer reusable components.
- Prefer TypeScript.
- Keep files modular and maintainable.
- Add comments only where logic is complex.
- Avoid unnecessary dependencies.

## Workflow Rules
1. Propose a short implementation plan.
2. Implement only the requested scope.
3. Run lint/type checks.
4. Update PROJECT_STATUS.md.
5. Suggest next task.

## Token Efficiency Rules
- Never load the entire project context.
- Read only files relevant to the task.
- Do not rewrite unchanged files.
- Avoid long explanations.
- Summarize completed work briefly.
```
