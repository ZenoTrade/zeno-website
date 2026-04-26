# zeno-website

Initial public website for Zeno.

## Workflow

- `main`: protected release branch
- `develop`: integration branch
- `feature/*`: implementation branches

## Quality bar

- React + TypeScript + Vite for a static-first site
- test-first slices with Vitest + Testing Library
- modular separation between domain content and presentation
- GitHub Actions for test/build and GitHub Pages deployment from `develop`

## Commands

```bash
npm install
npm test
npm run build
npm run dev
```
