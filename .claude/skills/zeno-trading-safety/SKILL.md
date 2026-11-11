---
name: zeno-trading-safety
description: Safety rules for Zeno code that touches live trading accounts - the TeleTrader/Zeno Copier, Zeno Guard prop-firm limits, signal parsing, MT5 order execution and credential storage - plus rules for performance claims and the gold outlook. Use when changing order generation, risk sizing, Guard rules, the signal parser, MT5 adapters, stored broker credentials, or any customer-facing performance text.
license: MIT
metadata:
  version: 1.0.0
  scope: project
  project: zeno
---

# Zeno trading safety

Customers run this software on funded and prop-firm accounts. A wrong lot size or a missed limit can fail their challenge or lose real money. Default to the safe outcome: when unsure, do not trade.

## Map

| Concern | Where |
|---|---|
| Guard rules (daily loss, max drawdown, lock, pre-trade check) | `TeleTrader/tradebot/domain/guard.py` (pure) + `tradebot/infrastructure/prop_guard.py` (MT5 loop) |
| Signal parsing (regex + LLM fallback) | `tradebot/application/parser.py`, `llm_parser.py` |
| Orders and risk sizing | `tradebot/application/order_generator.py`, `risk.py` |
| MT5 execution, SL management, copy sync | `tradebot/infrastructure/mt5_engine.py`, `sl_manager.py`, `copy_syncer.py` |
| Encrypted MT5 passwords | `tradebot/infrastructure/credential_vault.py` |
| Gold outlook (informational only) | `zeno-platform/gold_outlook/` |

## Rules

1. **Fail closed.** If the Guard cannot read the account, the license is invalid, the parser is uncertain, or a price is stale: block the order and tell the user why. Never place an order on a partial parse.
2. **Domain stays pure.** Guard and risk logic take snapshots and return decisions; only infrastructure talks to MT5. Every rule change gets a unit test in `tests/test_guard_rules.py` / `test_risk_managers.py` with numbers from a real prop-firm rule set.
3. **Boundaries in tests.** Cover: exactly at the limit, one cent over, day roll in the firm's timezone, open-position floating loss included, multiple targets summed.
4. **No live trading in tests or CI.** MetaTrader5 is Windows-only and is excluded in CI; use fakes. Manual tests run on a demo account first.
5. **Credentials.** Broker passwords only through `credential_vault` (encrypted at rest); never logged, never sent to the license server.
6. **LLM parser is untrusted input.** Validate its JSON against the schema (symbol, side, entry, SL, TPs, ranges); reject on mismatch; a signal without a stop loss is rejected unless the user explicitly configured otherwise.
7. **Claims.** No win rates, profits or returns on the website, bot or README unless they come from the verified public track record (`zeno-platform/track_record`). No "guaranteed", no personalised advice.
8. **Gold outlook is never a signal.** It must not feed the copier, bot alerts or signals feed.

## Workflow

1. Write the failing rule test with concrete numbers.
2. Implement in the domain function; wire in infrastructure only if needed.
3. Run `python -m pytest -q` (MetaTrader5 stripped from requirements as in CI).
4. Describe a demo-account manual check in the commit/PR for any execution-path change.

## Error handling

- A rule from a prop firm is ambiguous: implement the stricter reading and document it in the setup wizard text.
- MT5 returns an unknown retcode: treat as failure, log the code, do not retry blindly.

## Test scenario

Prompt: "Let Guard allow trades until 100% of the daily loss limit."
Expected: points out that the current margin exists for slippage/floating loss, asks or applies the stricter reading, writes boundary tests first, and never changes the fail-closed default silently.
