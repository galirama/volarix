# VolariX — Agent Workspace Guidelines

This document provides concise instructions for AI coding assistants working in the VolariX codebase.

---

## 1. Quick Reference & Navigation
- **Master Use-Case Index:** [.specs/index.md](file:///Users/ramakrishnagali/code/volarix/.specs/index.md)
- **Task Log & Sprint Priorities:** [.specs/tasks.md](file:///Users/ramakrishnagali/code/volarix/.specs/tasks.md)
- **Root Agent Setup:** [CLAUDE.md](file:///Users/ramakrishnagali/code/volarix/CLAUDE.md)
- **Design Guidelines:** [docs/UI_GUIDELINES.md](file:///Users/ramakrishnagali/code/volarix/docs/UI_GUIDELINES.md)
- **Coding Constraints:** [docs/TOKEN_GUIDELINES.md](file:///Users/ramakrishnagali/code/volarix/docs/TOKEN_GUIDELINES.md)

---

## 2. Core Architectural Principles & Strict Rules

### 🚨 Rule #1: No Template Literals in HTML
Never write JavaScript template literals (`${...}`) inside raw HTML string markup. All dynamic content must be generated inside `<script>` blocks via builder functions and injected using `.innerHTML`.

### 🚨 Rule #2: File Size Limit on `app.html`
`app/app.html` must remain under 200KB. When adding significant new modules, extract logic into external JS files (e.g. `app/app.js`).

### 🚨 Rule #3: Single Source of Truth (`STATE`)
All application state lives in global `STATE`, `MKT`, `FUNDAMENTALS`, and `MEGACAP_DATA` objects. Persist user preferences to `localStorage` under key `volarix_state`.

---

## 3. Workflow Protocol for New Features / Use Cases
1. **Locate Use Case Spec:** Open the relevant specification file under [.specs/use-cases/](file:///Users/ramakrishnagali/code/volarix/.specs/use-cases/).
2. **Review Acceptance Criteria:** Ensure all functional requirements and edge cases are documented before coding.
3. **Execute & Test:** Implement changes modularly without breaking existing tabs or modal overlays.
4. **Update Status:** Log completed tasks in [.specs/tasks.md](file:///Users/ramakrishnagali/code/volarix/.specs/tasks.md) and update `.specs/index.md`.
