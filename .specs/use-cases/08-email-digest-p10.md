# Use Case 08: P10 — Weekly Email Digest

## 1. Overview
Build a Netlify Scheduled Function (`netlify/functions/weekly-digest.js`) powered by Resend.com to send a weekly summary digest to registered users.

---

## 2. Target Files & Infrastructure
- `netlify/functions/weekly-digest.js` — Netlify scheduled background function (New File)
- `app/netlify.toml` — Cron trigger configuration (`[functions."weekly-digest"] schedule = "@weekly"`)
- `docs/TASK_QUEUE.md` — Task queue tracking

---

## 3. Functional Requirements

### 3.1 Email Service Provider
- **Provider:** Resend.com (Free tier: up to 3,000 emails/month).
- **Authentication:** Netlify environment variable `RESEND_API_KEY`.

### 3.2 Scheduled Execution
- Scheduled via Netlify Functions cron trigger every Sunday at 9:00 AM UTC (`0 9 * * 0`).

### 3.3 Email Content & Template
The weekly email digest HTML template must include:
1. **Paper Trading Performance:** Portfolio P&L summary for the past week.
2. **Top 5 High-IV Opportunities:** Screened from Mega-Cap universe.
3. **Watchlist Earnings Alert:** Upcoming earnings for held/watched tickers in the next 7 days.
4. **Macro Economic Focus:** High-impact economic releases scheduled for the coming week.
5. **Mandatory Legal Disclaimer:**
   > *"VolariX provides educational and analytical tools only. All signals, risk metrics, and data points are not financial advice. Trade at your own risk."*

---

## 4. Acceptance Criteria & Verification

- [ ] `netlify/functions/weekly-digest.js` is created and compiles cleanly.
- [ ] Netlify configuration triggers schedule every Sunday at 9am UTC.
- [ ] Email template renders cleanly on desktop and mobile email clients.
- [ ] Includes mandatory legal disclaimer in footer.
- [ ] Netlify env variable `RESEND_API_KEY` configured.

---

## 5. Current Implementation Status
- **Status:** 🔴 Not Started — Planned as Feature P10 Backlog item.
