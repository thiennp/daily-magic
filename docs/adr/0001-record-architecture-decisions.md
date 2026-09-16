# ADR 0001: Record architecture decisions

## Status

Accepted

## Context

The **daily-magic** repository ships **Agent Witch** (`https://www.agentwitch.com`): a Next.js control plane, Mac install bundle, and team policies. Decisions were scattered across README, chat, and agent rules.

## Decision

- Product narrative stays in the root `README.md`.
- Technical setup, deployment, product/hosting boundaries, and ADRs live under `docs/`.
- Agents retrieve docs via TF-IDF index (`.feature-knowledge/index.json`), not by loading the entire README.
- Binding architecture choices for Mac presence, WebSocket hosting, and deployment are numbered under `docs/adr/` (index: `docs/adr/README.md`).

## Consequences

- README stays short; contributors follow `docs/README.md`.
- Doc changes require `npm run feature-knowledge:index` before commit when the index is tracked in git.
- When behavior changes (for example presence tiers or production hosting), update the relevant ADR in the same change when practical.
