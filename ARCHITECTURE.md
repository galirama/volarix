```md
# VolariX System Architecture

## Recommended Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts

### Backend
- Next.js API routes
- Supabase

### Database
- Supabase PostgreSQL

### Authentication
- Supabase Auth
- MFA enabled

### Hosting
- Vercel

### Cache Layer
- Redis (Upstash free tier)

### Payments
- Stripe

### Notifications
- Web Push
- Webhooks
- Twilio (Premium SMS)

---

## Financial Data Sources

Priority order:

1. Yahoo Finance (free)
2. Finnhub
3. Alpha Vantage
4. Polygon.io (future)

---

## Data Flow

User → API Route → Cache Check → External Provider → Normalize → Store → UI

### Cache Rules

Ticker data cache:
- 1 minute

Options chain cache:
- 1–5 minutes

Congressional data:
- Daily refresh

Insider buying:
- Daily refresh

---

## Risk Shield Flow

Input:
- Current portfolio
- Proposed trade

Calculate:
- Position concentration
- Delta exposure
- Theta decay
- Max loss
- Leverage risk
- Earnings event risk
- Sector overexposure

Output:
- Green = acceptable
- Yellow = caution
- Red = excessive risk

---

## Future Brokerage Layer

Abstract trading adapter:

BrokerAdapter Interface:
- getPortfolio()
- placeOrder()
- cancelOrder()
- getPositions()

Supported later:
- SnapTrade
- Interactive Brokers
- Webull
```
