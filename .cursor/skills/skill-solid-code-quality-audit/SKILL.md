---
name: skill-solid-code-quality-audit
description: >-
  SOLID lenses (SRP, ISP, LSP, DIP, OCP) for functional React audits; pairs with `.agents/scripts/audit/` drivers—no commands here.
---

## Single responsibility (SRP)

- Can you name one reason this module would change? If you need “and”, split candidates emerge.
- Are side-effects clustered (SSR context, telemetry) where they obscure data flow?
- Does the file both orchestrate **and** implement low-level details without seams? Time to carve helpers.

## Interface segregation (ISP)

- Fat props / fat hook returns force consumers to depend on unrelated fields—split seams.
- Type unions that grow without cohesion hint at missing role interfaces.
- Server/client boundaries deserve especially tight segregation to avoid SSR leaks.

## Liskov substitutability (LSP) — contracts

- Components, hooks, and loaders should honor declared types and error contracts end-to-end.
- Widening return unions “for convenience” often breaks downstream exhaustiveness—fix call sites instead.
- Treat shared DTO shapes as contracts: extend carefully and version visually risky changes.

## Dependency inversion (DIP)

- High-level modules should depend on narrow abstractions—not concrete infra soup.
- Look for adapters at boundaries (HTTP, analytics, persistence) rather than leaky imports inward.
- Favor injecting pure helpers or factories over static singleton registries.

## Open / closed (OCP)

- Prefer enum-keyed maps and small strategy objects over growing else-chains.
- Extension should mean adding a file or map entry—not rewiring unrelated modules.
- Document where teams _expect_ forks (themes, calculators) vs where edits are deliberate breaks.

Driver entrypoints live under **`.agents/scripts/audit/`**; each audit loop references this file as the shared prompt. Executable workflows: **`.cursor/commands/command-README.md`**
