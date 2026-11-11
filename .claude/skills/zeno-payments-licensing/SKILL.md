---
name: zeno-payments-licensing
description: Zeno's crypto checkout and licensing domain - plans and prices, BTCPay invoices and webhooks, Ed25519 license keys, renewals, trials, grants, referrals, and how the website, bot and copier consume them. Use when changing anything in zeno-platform/license_server, plan prices or products, the website checkout, the bot's purchase flow, or TeleTrader's license check.
license: MIT
metadata:
  version: 1.0.0
  scope: project
  project: zeno
---

# Zeno payments and licensing

Money and access control live here, so mistakes cost customers or revenue. Work test-first (`fastapi-ddd-tdd`) and run `/security-review` on every diff in this area.

## Map

| Concern | Where |
|---|---|
| Plans, prices, products, seat limits | `zeno-platform/license_server/zeno_license/plans.py` (single source of truth) |
| Checkout, settlement, renewals, trials, grants, validation | `zeno_license/service.py` |
| HTTP API (incl. `/v1/btcpay/webhook`, `/v1/licenses/validate`, `/v1/signals`) | `zeno_license/api.py` |
| BTCPay client + webhook signature | `zeno_license/btcpay.py` |
| Key format, signing, verification | `zeno_license/keys.py` (server) and `TeleTrader/tradebot/infrastructure/license_guard.py` (client, offline verify) |
| Price display | `zeno-website/src/domain/pricing.ts`; bot texts `zeno-platform/bot/zeno_bot/texts.py` |

Read [references/invariants.md](references/invariants.md) before changing behaviour.

## Rules

1. **Plans change in one place.** A price or product change touches `plans.py`, then the website pricing, bot texts and tests in the same piece of work. Search all three repos for the plan id before finishing.
2. **Never trust the webhook body alone.** Verify the BTCPay signature, then re-fetch the invoice status from BTCPay before issuing a key.
3. **Idempotent settlement.** A repeated webhook for the same invoice must not issue a second key, extend twice, or pay referral commission twice. Add a test for the repeat.
4. **Key format is a contract.** The copier verifies keys offline with the public key. Any change to `LicensePayload` fields or encoding needs a version field bump, backward-compatible verification in TeleTrader, and an ADR.
5. **Private signing key** only from env/secret file; never in logs, tests (generate a throwaway keypair in fixtures), or the repo.
6. **No KYC by design.** Do not add fields that collect identity documents. Email and Telegram id are optional contact channels.
7. **Side effects after commit.** Telegram/email delivery happens after the license row is committed; failures are retried, never roll back a paid order.
8. **Money types.** Plan prices are integer USD; commission amounts are rounded to cents. Use `Decimal` or integer cents for any new stored amount.
9. **Copy and claims.** Customer-facing text must not promise profits or returns.

## Workflow for a change

1. Write the failing test in `license_server/tests` (service-level first, then API).
2. Implement; run `cd license_server && pytest -q`.
3. If keys or validation changed: run TeleTrader tests (`python -m pytest -q` with MetaTrader5 removed from requirements, as CI does).
4. If plans changed: run website `npm test` and bot `pytest -q`.
5. Update `infra/README.md` / `.env.example` for new settings.

## Error handling

- BTCPay unreachable in tests: use the fake gateway in `tests/conftest.py`; never call a real BTCPay from tests.
- Unknown invoice status value: treat as unpaid, log it, add a test with that status.

## Test scenario

Prompt: "Raise the Guard + Copier monthly price to $69."
Expected: failing test for the new price, change in `plans.py`, website pricing + tests and bot texts updated, all three suites run, note that existing licenses are unaffected, no change to key format.
