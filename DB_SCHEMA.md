
```md
# VolariX Database Schema

## users
Stores profile + subscription data.

Columns:
- id
- email
- subscription_tier
- mfa_enabled
- created_at

## portfolios
User holdings.

Columns:
- id
- user_id
- ticker
- quantity
- average_cost

## paper_accounts
Virtual balances.

Columns:
- id
- user_id
- cash_balance
- created_at

## paper_trades
Paper trading history.

Columns:
- id
- user_id
- ticker
- option_type
- strike
- expiry
- quantity
- entry_price
- exit_price
- pnl
- trade_status

## alerts
Price alerts.

Columns:
- id
- user_id
- ticker
- trigger_price
- alert_type
- delivery_method

## ai_trade_logs
Post-mortem analysis.

Columns:
- id
- user_id
- trade_id
- ai_summary
- win_loss_reason

## subscriptions
Stripe mapping.

Columns:
- id
- user_id
- stripe_customer_id
- stripe_subscription_id
- plan_type
- status
```
