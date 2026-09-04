# VolariX — Developer & Architecture Guide

Welcome to the **VolariX** technical documentation. This guide provides a comprehensive overview of the application's design, technology stack, AI integration framework, and lifecycle processes. It is intended for developers, technical stakeholders, and architects to quickly understand the professional standards and architecture of the platform.

---

## 1. App Design & Architecture
VolariX is a **Risk-First Options Intelligence Platform**.
Currently operating as a high-fidelity, client-side prototype, the application relies on a strictly static architecture to ensure maximum speed and zero server-side rendering costs during the initial validation phase. Yahoo Finance quotes and Alternative.me Fear & Greed are fetched from the client with a cache and simulated-data fallback; the remaining product data is simulated.

- **Single-Page Application (SPA) Mechanics**: All routing and tab switching occurs purely via client-side DOM manipulation without page reloads.
- **State Management**: The application acts entirely statelessly on the backend. All state (watchlists, paper trades, theme preferences) is stored in `localStorage` and `sessionStorage`.
- **Constraint-Driven Design**: To maintain ultra-fast load times, the core dashboard (`app.html`) is strictly capped at **200KB**.

## 2. Technology Stack
**Current Stack (Static Prototype Phase)**
- **Core Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Custom properties/variables for theming).
- **Charting**: Canvas API (custom implementations for Candlestick & RSI charts to save library weight).
- **Authentication**: Client-side mock JWT via `sessionStorage` (Basic Auth & MFA layouts).
- **Deployment**: Netlify (Drop / Manual Deployment).

**Future Target Stack (Production Migration)**
- **Framework**: Next.js 14 (App Router) with TypeScript.
- **Styling**: Tailwind CSS + shadcn/ui.
- **Backend & Database**: Supabase (PostgreSQL, Auth, RLS) + Upstash Redis (caching).
- **Deployments**: Vercel CI/CD + GitHub Actions.

## 3. The AI Framework (How LLMs Work in VolariX)
VolariX is built using a highly structured, LLM-first development lifecycle. We use a dedicated memory bank system to ensure any AI agent (e.g., Claude, ChatGPT, Antigravity) can seamlessly maintain context.

- **`CODEX.md`**: This is the root AI instruction file. Every AI agent reads it first, followed by `docs/HANDOFF.md`, which contains the current continuation state. Together they contain:
  - Strict coding rules (e.g., prohibiting JavaScript template literals in raw HTML).
  - The exact state of what is built vs. what is broken.
  - State management architectures.
- **Task state**: `docs/TASK_QUEUE.md` defines acceptance criteria and `docs/PROJECT_STATUS.md` records completed and in-progress work. There is currently no `.specs/` directory.
- **Handoffs**: Because state and rules are codified in `CODEX.md`, human developers can seamlessly switch between different AI models without losing the repository's context.

## 4. Key Features
VolariX currently features a 21-tab interactive dashboard. Highlights include:
- **Live Market Simulator**: A highly performant 8-second tick simulator updating prices dynamically across the UI.
- **Fundamental Screener (10-Point Scorecard)**: A specialized algorithm visualizing stock health across Growth, Value, and Momentum metrics.
- **Mega-Cap IV Screener**: Dynamic tracking of Implied Volatility and IV Rank for the top 20 market cap stocks.
- **Paper Trading & Trade Journaling**: Simulated trade execution with real-time P&L tracking and AI-driven post-mortem notes.
- **Risk Shield**: Pre-trade concentration and net-delta gating to prevent dangerous account allocations.

## 5. Testing Lifecycle (BDD)
VolariX utilizes **Behavior-Driven Development (BDD)** to strictly enforce UI stability.
- **Framework**: **Cucumber.js** coupled with **Playwright**.
- **Execution**: Run locally via `npm test`. The system automatically spawns a headless Chromium browser and a local HTTP server (`http-server`).
- **Coverage**: Tests are mapped via `.feature` files (Gherkin syntax). For example, `auth.feature` and `screener.feature` ensure that fundamental user flows, DOM rendering, and strict visibility rules are preserved across iterative AI developments.
- **CI/CD Integration**: Tests are wired into GitHub Actions (`.github/workflows/test.yml`) to block broken deployments automatically.

## 6. Deployment Lifecycle
- **Current (Manual)**: The `app/` folder is packaged and dragged into **Netlify Drop** for instantaneous static hosting.
- **Automated (GitHub Actions)**: With the new CI/CD pipeline, pushing to the `main` or `master` branch triggers the following lifecycle:
  1. GitHub Actions spins up an Ubuntu runner.
  2. Dependencies and Playwright drivers are installed.
  3. The `npm test` BDD suite executes.
  4. Upon a 100% pass rate, the repository is cleared for deployment.

## 7. Industry Standards & Best Practices
VolariX adheres to strict modern engineering standards:
- **Zero-Dependency Core**: By avoiding heavy frameworks (React/Vue) in the prototype, we achieve 100/100 Lighthouse performance scores.
- **Strict Byte Budgets**: Hard limits (`wc -c < 200KB`) force ruthless code optimization and elegant architectural decisions.
- **Design System**: A fully tokenized CSS variable system (`var(--bg1)`, `var(--cyan)`) ensures instant Dark/Light mode switching without JavaScript recalculations.
- **Test-Driven AI**: By pairing BDD tests with AI Agents, we solve the "LLM Hallucination" problem. The AI writes code, but the strict Gherkin specs (verified by Playwright) ensure the output actually works in a real browser environment.
