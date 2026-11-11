# Invariants to protect with tests

- A settled invoice produces exactly one active license period for its order.
- A license's `expires_at` only moves forward; a renewal extends from max(now, current expiry).
- A trial is granted once per customer (Telegram id) and never for a customer who has paid before, unless an admin grants it.
- `validate` rejects: bad signature (`invalid_key`), unknown license, `revoked`, `expired` (status expired or `expires_at` <= now), and a new MT5 account beyond `max_accounts` (`account_limit`). Product checks happen in the copier against the payload's products. The `GRACE_DAYS` setting is used by the renewal/expiry job, not by `validate`.
- Seat binding: an MT5 account number bound to a license counts against `max_accounts`; re-validating the same account does not consume a new seat.
- Referral commission = `REFERRAL_RATE` (default 0.25) x the referred buyer's paid amount, rounded to cents, recorded once per settled invoice, never for free plans.
- Plans in `COMING_SOON` cannot be checked out; free plans (`trial`, `grant`) cannot be checked out.
- Order status lookup requires the order's token; without it, return nothing (no enumeration).
- Admin endpoints require the admin token, compared in constant time.
