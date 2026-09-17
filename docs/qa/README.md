# System Q&A (Agent Witch)

Canonical answers to **how the product works** questions — architecture, identity, dispatch, hosting — written for humans and agents. Indexed into `.feature-knowledge/index.json` with the rest of `docs/**/*.md` (query slug: `docs`).

## When to use this folder

| Use **docs/qa/**                                | Use elsewhere                                         |
| ----------------------------------------------- | ----------------------------------------------------- |
| “How does X work?” with a stable product answer | Bug symptoms → feature `KNOWN_ISSUES.md`              |
| Onboarding / explain without reading `src/`     | Lasting design choice → `docs/adr/`                   |
| Repeat questions from chat or support           | Feature API details → `src/features/<slug>/README.md` |

## File format (one topic per file)

Each `docs/qa/<topic-slug>.md` should include:

1. **Title** — one clear question as H1.
2. **Query aliases** — H2 with bullet phrases (English and other languages agents see in chat).
3. **Short answer** — 2–4 sentences for chat replies.
4. **Details** — tables, flows, deployable names (AWC / AWL / AWB / AWI).
5. **Related** — links to ADRs, domains, code paths (for doc maintenance only; agents answer from this file first).
6. **Last reviewed** — ISO date when behavior last matched production.

Do not duplicate full ADR text; link instead.

## Query before code

```bash
npm run feature-knowledge:query -- "this computer token hash" --feature=docs
npm run feature-knowledge:query -- "AWC browser local identity" --feature=docs
```

Open the top `sourcePath` under `docs/qa/` when present.

## Catalog

| File                                                                                     | Topic                                                     |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [awc-how-browser-knows-this-computer.md](awc-how-browser-knows-this-computer.md)         | AWC “This computer” / “this Mac” vs cloud device list     |
| [awb-localhost-identity-and-cors.md](awb-localhost-identity-and-cors.md)                 | AWB `/identity`, CORS, AWI config vs AWL                  |
| [delegate-local-cli-conversation-context.md](delegate-local-cli-conversation-context.md) | Local CLI (Cursor, etc.) follow-up context / `--continue` |
| [writer-dispatch-cascade-routing.md](writer-dispatch-cascade-routing.md)                 | Mac dispatch route: continuation vs memory/RAG budget     |
| [awc-project-folder-path-picker.md](awc-project-folder-path-picker.md)                   | AWC Projects opens AWL for paired local folder selection  |

Add a row here when you add a Q&A file.

## Maintenance

After adding or editing any file here:

```bash
npm run feature-knowledge:index
```

Commit `.feature-knowledge/index.json` on the same branch. Agent rule: **`rules-system-qa-rag.mdc`**.
