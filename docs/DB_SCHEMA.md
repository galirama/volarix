# VolariX Database Schema
## Platform: Supabase (PostgreSQL) with Row-Level Security

---

## Tables

### user_profiles
```sql
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name    TEXT,
  avatar_url      TEXT,
  risk_tolerance  TEXT DEFAULT 'moderate' CHECK (risk_tolerance IN ('conservative','moderate','aggressive')),
  paper_cash      NUMERIC DEFAULT 100000.00,
  plan            TEXT DEFAULT 'free' CHECK (plan IN ('free','pro','enterprise')),
  stripe_customer_id TEXT,
  mfa_enabled     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access own profile"
  ON user_profiles FOR ALL USING (auth.uid() = id);
```

### risk_thresholds
```sql
CREATE TABLE risk_thresholds (
  user_id               UUID PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  max_concentration_pct NUMERIC DEFAULT 20 CHECK (max_concentration_pct BETWEEN 5 AND 100),
  max_delta             NUMERIC DEFAULT 100,
  stop_loss_pct         NUMERIC DEFAULT 200,
  profit_target_pct     NUMERIC DEFAULT 50,
  dte_exit_days         INTEGER DEFAULT 21,
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE risk_thresholds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own thresholds"
  ON risk_thresholds FOR ALL USING (auth.uid() = user_id);
```

### watchlists
```sql
CREATE TABLE watchlists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  ticker     TEXT NOT NULL,
  added_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ticker)
);

ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own watchlist"
  ON watchlists FOR ALL USING (auth.uid() = user_id);
```

### portfolio_holdings
```sql
CREATE TABLE portfolio_holdings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  ticker         TEXT NOT NULL,
  asset_type     TEXT CHECK (asset_type IN ('stock','call','put','spread')),
  quantity       INTEGER NOT NULL,
  avg_cost       NUMERIC NOT NULL,
  option_type    TEXT CHECK (option_type IN ('Call','Put','Spread',NULL)),
  strike         NUMERIC,
  expiration     DATE,
  entry_delta    NUMERIC,
  entry_theta    NUMERIC,
  entry_iv       NUMERIC,
  entry_premium  NUMERIC,
  is_paper       BOOLEAN DEFAULT TRUE,
  opened_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own holdings"
  ON portfolio_holdings FOR ALL USING (auth.uid() = user_id);
```

### paper_trades
```sql
CREATE TABLE paper_trades (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  ticker           TEXT NOT NULL,
  strategy         TEXT NOT NULL,
  legs             JSONB,
  entry_date       TIMESTAMPTZ DEFAULT NOW(),
  exit_date        TIMESTAMPTZ,
  entry_credit     NUMERIC,
  exit_debit       NUMERIC,
  realized_pnl     NUMERIC,
  market_iv_entry  NUMERIC,
  iv_rank_entry    NUMERIC,
  vix_at_entry     NUMERIC,
  fg_index_entry   INTEGER,
  dte_at_entry     INTEGER,
  status           TEXT DEFAULT 'open' CHECK (status IN ('open','closed','expired')),
  notes            TEXT
);

ALTER TABLE paper_trades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own paper trades"
  ON paper_trades FOR ALL USING (auth.uid() = user_id);
```

### trade_postmortems
```sql
CREATE TABLE trade_postmortems (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id         UUID REFERENCES paper_trades(id) ON DELETE CASCADE,
  user_id          UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  ai_summary       TEXT NOT NULL,
  key_mistakes     TEXT[],
  key_wins         TEXT[],
  iv_crush_flag    BOOLEAN DEFAULT FALSE,
  earnings_flag    BOOLEAN DEFAULT FALSE,
  theta_flag       BOOLEAN DEFAULT FALSE,
  sentiment_score  INTEGER CHECK (sentiment_score BETWEEN -10 AND 10),
  generated_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE trade_postmortems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own postmortems"
  ON trade_postmortems FOR ALL USING (auth.uid() = user_id);
```

### custom_alerts
```sql
CREATE TABLE custom_alerts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  ticker          TEXT NOT NULL,
  alert_type      TEXT CHECK (alert_type IN ('iv_rank','rsi_oversold','macd_cross','uoa','price_target')),
  threshold_value NUMERIC,
  frequency       TEXT DEFAULT 'realtime' CHECK (frequency IN ('realtime','daily','weekly')),
  delivery        TEXT[] DEFAULT ARRAY['push'],
  is_active       BOOLEAN DEFAULT TRUE,
  last_triggered  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE custom_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own alerts"
  ON custom_alerts FOR ALL USING (auth.uid() = user_id);
```

### market_snapshot_cache
```sql
CREATE TABLE market_snapshot_cache (
  id           SERIAL PRIMARY KEY,
  vix          NUMERIC,
  fear_greed   INTEGER,
  fg_label     TEXT,
  spy_price    NUMERIC,
  qqq_price    NUMERIC,
  put_call     NUMERIC,
  treasury_10y NUMERIC,
  captured_at  TIMESTAMPTZ DEFAULT NOW()
);
-- No RLS — read-only public cache
-- Populated by Vercel Cron every 15 minutes
```

### subscriptions
```sql
CREATE TABLE subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  stripe_customer_id     TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type              TEXT CHECK (plan_type IN ('free','pro','enterprise')),
  status                 TEXT CHECK (status IN ('active','canceled','past_due','trialing')),
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own subscription"
  ON subscriptions FOR SELECT USING (auth.uid() = user_id);
```

---

## Indexes
```sql
CREATE INDEX idx_watchlists_user ON watchlists(user_id);
CREATE INDEX idx_holdings_user ON portfolio_holdings(user_id);
CREATE INDEX idx_paper_trades_user ON paper_trades(user_id);
CREATE INDEX idx_paper_trades_status ON paper_trades(user_id, status);
CREATE INDEX idx_alerts_user_active ON custom_alerts(user_id, is_active);
CREATE INDEX idx_market_cache_time ON market_snapshot_cache(captured_at DESC);
```

---

## Seed Data (Demo User)
```sql
INSERT INTO user_profiles (id, display_name, plan, paper_cash)
VALUES ('00000000-0000-0000-0000-000000000001', 'Demo Trader', 'pro', 100000.00);

INSERT INTO risk_thresholds (user_id) 
VALUES ('00000000-0000-0000-0000-000000000001');

INSERT INTO watchlists (user_id, ticker) VALUES
  ('00000000-0000-0000-0000-000000000001', 'SPY'),
  ('00000000-0000-0000-0000-000000000001', 'AAPL'),
  ('00000000-0000-0000-0000-000000000001', 'NVDA'),
  ('00000000-0000-0000-0000-000000000001', 'TSLA'),
  ('00000000-0000-0000-0000-000000000001', 'MSFT');
```
