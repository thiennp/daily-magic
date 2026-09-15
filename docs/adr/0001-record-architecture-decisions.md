# ADR 0001: Record architecture decisions

## Status

Accepted

## Context

Daily Magic spans a Next.js app, a Mac install bundle, and team policies. Decisions were scattered across README, chat, and agent rules.

## Decision

- Product narrative stays in the root `README.md`.
- Technical setup, deployment, and ADRs live under `docs/`.
- Agents retrieve docs via TF-IDF index (`.feature-knowledge/index.json`), not by loading the entire README.

## Consequences

- README stays short; contributors follow `docs/README.md`.
- Doc changes require `npm run feature-knowledge:index` before commit when the index is tracked in git.
