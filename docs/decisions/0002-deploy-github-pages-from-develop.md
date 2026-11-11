# 0002. Deploy GitHub Pages from `develop`

- Status: Accepted (recorded 2026-11-10)
- Links: `.github/workflows/pages.yml`

## Context
The site is static. The repo uses gitflow (`develop` integration, `main` release).

## Decision
Every push to `develop` builds and deploys GitHub Pages.

## Consequences
- A push to `develop` is a production deploy: run `npm test` and `npm run build` first.
- `main` currently has no deploy role; if a custom domain and release process are added, revisit this ADR.
