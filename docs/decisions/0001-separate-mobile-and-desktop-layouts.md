# 0001. Separate mobile and desktop layouts

- Status: Accepted (recorded 2026-11-10; decided by Jasin 2026-11-09)
- Links: `src/presentation/App.tsx`, `src/presentation/layouts/`, Figma page "Landing 2026"

## Context
The earlier single responsive page became a very long stack of desktop cards on phones. Jasin wants mobile and desktop to be different experiences (navigation, content order, interactions).

## Decision
`App.tsx` renders `MobileLanding` (max-width 767px) or `DesktopLanding`. Both use the same `src/domain` modules. Mobile: bottom tab bar, tap-to-size Guard demo, swipe carousel, one plan at a time, bottom-sheet checkout. Desktop: top nav, slider demo, three-column plans, modal checkout.

## Consequences
- Every new section is built twice and tested in both layouts.
- Business logic must stay in `src/domain` so the two layouts cannot drift.
