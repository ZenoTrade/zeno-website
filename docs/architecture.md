# Architecture

## Why this stack

This first iteration is a marketing/informational website, not the trading platform itself. The domain is still light, so the design keeps domain concerns narrow:

- `src/domain`: site content and future business-facing models
- `src/presentation`: rendering and UI composition

That keeps room for stronger DDD boundaries later when products, pricing, onboarding, or lead flows become real subdomains.

## Delivery model

- gitflow branch model
- CI on pushes and pull requests
- GitHub Pages deployment from `develop`
