# Share → Mac pull mirror contract v1

**One-liner:** On each AWL History tick, Share `pullPublishedProjectSkillsToMirror(projectId)` lists AWC published skills, compares local `meta.json` contentHash, fetches missing/changed bodies, and writes `<profileDir>/project-data/<projectId>/skills/<skillId>/vNNNN.md` + `meta.json` **only via History helpers** and **only when** `sha256:`+hex equals AWC `contentHash`; failures log and retry next tick — never block ack/delete.

## Ownership

| Owner         | Owns                                                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWC**       | Store of record: published body ≤ 64KB + meta + contentHash                                                                                                    |
| **Share**     | `pullPublishedProjectSkillsToMirror`, AWC published source port, list/get ACL (owner / member / viewer for published)                                            |
| **History**   | AWL tick that calls pull; real `resolveProjectDataDir` / `writeProjectSkillVersion` / `readProjectSkillVersion` (dirs 0700 / files 0600); atomic mirror writes |
| **Mac / AWL** | Profile dir layout; inject History port + AWC HTTP source when not in-process                                                                                  |

## Layout

```
<profileDir>/project-data/<projectId>/skills/<skillId>/vNNNN.md
<profileDir>/project-data/<projectId>/skills/<skillId>/meta.json
  { skillId, version, contentHash, updatedAt }
```

Hash: `sha256:` + lowercase hex of exact UTF-8 body bytes (no trim).

## Ports (Share-side until History SHIPs)

- `ProjectSkillHistoryPort` — stub reports History OFF (`PROJECT_SKILL_HISTORY_STUB_PORT`).
- `ProjectSkillAwcPublishedSource` — `listPublished` / `getPublishedBody`; default `createDbProjectSkillAwcPublishedSource()` for in-process Neon; AWL injects HTTP.

## ACL (list / get published)

- **owner | member | viewer** — see published skills.
- Drafts / revoke / publish — owner or publisher (member); **viewer** never publishes or revokes.
- AWC membership rows today resolve to `member` (DB has no `viewer` yet); `viewer` is accepted by list/get predicates for future ACL / injected roles.

## Non-goals (v1)

- No tick implementation in Share (History owns tick).
- No direct filesystem writes from Share (History helpers only).
- No coupling to History cloud schema migrations (059–061 computer history) for skills pull.
