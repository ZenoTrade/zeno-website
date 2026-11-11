# zeno-website

Zeno's public site: landing, pricing, crypto checkout, thank-you/key page, legal pages, gold outlook section. React 18 + TypeScript (strict) + Vite, Vitest + Testing Library. Static site on GitHub Pages.

## Commands (what CI runs)

```bash
npm ci
npm test        # vitest run
npm run build   # tsc -b && vite build
```

## Layout

- `src/domain/`: content, pricing, checkout config, Guard demo maths, gold outlook data (pure TS, tested).
- `src/presentation/`: `App.tsx` picks `MobileLanding` or `DesktopLanding` via `useMediaQuery('(max-width: 767px)')`; `layouts/`, `components/`, `hooks/`.
- `src/styles/`: `mobile.css`, `desktop.css`. Tokens mirror the Figma `Zeno/Color` and `Zeno/Size` variables.

## Rules

- Mobile and desktop are different experiences, not a reflow. When you add or change a section, change both layouts and their tests in `App.test.tsx`.
- Prices and plans must match `zeno-platform/license_server/zeno_license/plans.py`; see `.claude/skills/zeno-payments-licensing`.
- No win rates, profits or returns unless they come from the verified track record; see `.claude/skills/zeno-trading-safety`.
- `VITE_*` variables are public. Checkout reads `VITE_LICENSE_API_URL` and `VITE_TELEGRAM_BOT`.
- Test first for domain logic and behaviour; screenshot mobile (390) and desktop (1440) for UI changes and compare with Figma.
- Keep the current `domain/` + `presentation/` structure; move to feature folders only when a second data-backed feature appears (see `react-engineering`).

## Workflow

- Gitflow: `develop` is the integration branch and **pushing `develop` deploys GitHub Pages**; `main` is the release branch.
- Current rule from Jasin (2026-10-29): no pull requests for now; push tested commits directly.
- Commits: Conventional Commits.

## Skills

Global: `project-orchestrator`, `react-engineering`, `figma-workflow`, `github-workflow`, `engineering-code-review`. Project: `.claude/skills/zeno-payments-licensing`, `.claude/skills/zeno-trading-safety`. Figma plugin skills for design-to-code.

## Links

- Figma master file: https://www.figma.com/design/BnA6nbdhLwBJGbX65r3GXf (pages: Landing 2026, Checkout, Gold outlook, Components)
- Notion: Website & Sales https://app.notion.com/p/0f738ee1f92982e197dd8115dae3948b
- Architecture notes: `docs/architecture.md`. Decisions: `docs/decisions/`.
