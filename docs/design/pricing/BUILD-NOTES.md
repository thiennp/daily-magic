# AgentWitch Pricing — Human UI build handoff

Status: **EN PASS** (2026-10-06 ~22:36 CEST). Locked rules win over HTML. Human UI can build on `feat/awc-pricing-v1`.

## Source

- HTML: `/workspace/agentwitch/docs/design/pricing/AgentWitch-Pricing.html`
- Claude artifact id: **1a19bd9d** (Desktop ~22:32 CEST)
- LOCK: `docs/design/pricing/LOCK.md`
- EN: `EN-PASS.md` · copy: `COPY.md`

## Must wire once (config constant)

```
Pro  = $29 / seat / month
Team = $49 / seat / month
Team minimum seats = 3
```

One constant/object — Thien changes later. Do not scatter literals.

Also lock from LOCK (not prices): max **2** computers; assistants connect **Pro 3 / Team 10**; trial = 1 free month then Pro or Team.

## Do not ship as product claims

- Usage figures in the design (demo spend, estimate defaults, fake invoices/cards).
- **“Viewers are free”** / “Viewers do not” (FAQ + seat tips + checkout). Treat as sample until Product locks viewer billing.

## Keep / never

- Keep nav label **My bots** as-is.
- Prefer **assistant** in body/cards (nav exception above).
- Product name **AgentWitch** one word.
- **Never hide Marketplace or Connect.**
- **No AI credits** inside trial / Pro / Team package cards (add-on / how-AI only).
- Cloud message storage **only after paid billing** — not during trial.
- Cancel anytime visible.
- Own S3 / own AI optional; no must-buy AW storage.
- No self-serve permanent Free package CTA (admin Free edge OK).

## Small needles (non-blocking)

- Rename CSS comment “Agent Witch” → AgentWitch.
- Rename JS helper `eur` → `usd` (already formats `$`).
- Strip viewer-free claims until locked (see EN-PASS / COPY).

## Pages

- Signed-out public Pricing
- Signed-in Account → Billing and plans

Plain English only in shipping files (no Soft shorthand).
