# Daily Magic — documentation

Product overview lives in the [root README](../README.md). This tree holds **technical** and **architecture** material indexed for `npm run feature-knowledge:query`.

## Development

- [Local setup](development/setup.md)
- [Deploy to Vercel + Neon](development/deployment.md)
- [Quality gates and CI](development/quality-gates.md)

## Agent Witch

- [Local bridge and install](agent-witch/local-bridge.md)

## Product concepts

- [Capabilities, harness, library, marketplace](product/concepts.md)

## Security

- [Threat model](security/threat-model.md)

## Architecture decision records (ADRs)

- [ADR index](adr/README.md)

## Indexing

Markdown under `docs/` and feature folders under `src/features/*/README.md` (and `AGENTS.md`, `KNOWN_ISSUES.md`) are chunked into `.feature-knowledge/index.json` via TF-IDF. Rebuild after edits:

```bash
npm run feature-knowledge:index
```
