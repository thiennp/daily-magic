# Product EN — AgentWitch Automations

- Source HTML: `docs/design/automations/AgentWitch-Automations.html`
- Claude chat: **8f580ed5** (Desktop export ~22:49 CEST, 2026-10-06)
- Reviewed: 2026-10-06 (Europe/Berlin)
- LOCK: `LOCK.md` + `MARKETPLACE-PICKER.md` + NRG build notes

## Verdict: EN PASS (with must-keep overlays)

Human UI can build on `feat/awc-automations-v1`. Locked rules win over HTML.

### HTML vs lock conflicts (HTML loses)

| Topic | HTML | Lock / must-keep |
|-------|------|------------------|
| Webhook HTTP POST + secret/URL copy-now | Omitted (event/manual triggers instead) | **Keep** live webhook trigger + copy controls |
| Timezone on schedule | Uses project-computer local time only | **Keep** timezone field |
| Sync-to-local amber | Omitted | **Keep** amber sync-failed message |
| Trigger model | schedule / event / manual + multi-step editor | Keep live Library-workflow + schedule/webhook create |
| Scope | Project-centre Automations tab + drawers | Keep standalone `/automations` page polish |

### Visible product rules

| Check | Result |
|-------|--------|
| AgentWitch one word | PASS in title/copy targets |
| Prefer assistant / My bots exception | PASS — empty/intro prefer assistant; My bots label kept |
| This computer / Another computer picker | PASS — see MARKETPLACE-PICKER.md |
| Marketplace + Connect + Automations never hidden | PASS — Automations not team-gated; Download/Connect HARD stays |
| Download when computer connected | PASS — existing Computers Download HARD |

### Blockers

None for start-of-build after applying must-keep overlays above.
