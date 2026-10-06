# Product EN — AgentWitch Pricing

- Source HTML: `/workspace/agentwitch/docs/design/pricing/AgentWitch-Pricing.html`
- Claude artifact: **1a19bd9d** (Desktop export ~22:32 CEST, 2026-10-06)
- Reviewed: 2026-10-06 ~22:36 CEST (Europe/Berlin)
- LOCK: `LOCK.md` (12 rules) + NRG Lead build notes

## Verdict: **EN PASS**

Human UI can start build now on `feat/awc-pricing-v1`. Locked rules win over HTML. Apply build notes and needles below before shipping claims.

### Blockers
None for start-of-build. Non-blocking needles listed under Copy fixes.

---

## Rule checklist 1–12

| # | Rule | Result | Evidence |
|---|------|--------|----------|
| 1 | Default 1-month trial → Pro/Team; permanent Free only via admin | **PASS** | Plan cards render `['trial','pro','team']` only. Free is signed-in admin edge: chip “Set by your admin”; tip “A Free plan is not self-serve.” No self-serve Free package CTA. |
| 2 | USD / US seats (not EUR) | **PASS** | Visible prices use `$` via helper (`eur` name is leftover code only). Hero: “Prices in USD, excl. tax”. No € symbol in customer copy. |
| 3 | No AI credits in any package | **PASS** | Trial/Pro/Team `feats` have no AI credit line. AI credit lives in `ADD.credit` (add-on) and comparison “On demand … Never part of a seat.” |
| 4 | Storage optional; own S3 OK | **PASS** | “Bring your own” S3 card; FAQ “You never have to buy AgentWitch storage.” |
| 5 | Cloud message storage only after paid (not trial) | **PASS** | Trial feat: “No cloud message storage during the trial”. Comparison: “Not in the trial”. Addon CTA blocked in trial with why-text. |
| 6 | Cancel anytime stated | **PASS** | Hero subtitle; plan-card footers; trust strip; FAQ “Can I cancel anytime?” |
| 7 | Max 2 computers all packages | **PASS** | “Up to 2 computers” on cards, comparison, FAQ. No “5 computers”. |
| 8 | Connect limits Pro 3 / Team 10; prefer assistant | **PASS** | Feats + comparison use “assistants” (3 / 10). |
| 9 | Pro: local LLM + auto skill-build savings; Team: share harness + local LLM + team token savings | **PASS** | Pro feats include Local LLM + Token savings with auto skill build. Team adds Share harness + Team token savings. |
| 10 | No internal COGS / margin math on page | **PASS** | No Railway / Neon / margin copy on customer surface. |
| 11 | Skill-from-repeat two choices outside package cards | **PASS** | FAQ + account modal “Use my own tokens or AI” / “Buy an AgentWitch AI pack”. Not a feat line inside Trial/Pro/Team cards. Comparison/how-AI rows OK. |
| 12 | Prompt optimizer paths outside package cards | **PASS** | FAQ + modal: CLI / assistant / tokens you buy; own API key = 1 assistant. Not bundled inside package card feats. |

### Visible product rules (HARD)

| Check | Result |
|-------|--------|
| Product name AgentWitch one word | **PASS** — `<title>AgentWitch – Pricing</title>` and body copy. One CSS comment still says “Agent Witch” (non-shipping). |
| Prefer assistant over bot (nav exception) | **PASS** — body/cards use assistant; nav keeps **My bots**. |
| Prefer computer / This computer | **PASS** |
| Marketplace + Connect never hidden | **PASS** — signed-in nav: Home, Projects, Marketplace, Connect, My bots, New task, Billing. |
| No self-serve permanent Free CTA | **PASS** |

---

## Flag scan (NRG / LOCK)

| Flag | Finding |
|------|---------|
| Agent Witch two-word | CSS comment only (`Agent Witch design tokens`). Visible name OK. Needle below. |
| EUR / € leftovers | Helper still named `eur` but formats USD `$`. No € in UI. Rename in build. |
| Permanent Free CTA | Absent from package grid. Admin Free edge only. |
| AI credits inside package cards | Absent from card feats. Add-on only. |
| 5 computers / seat | Absent. |
| Missing cancel anytime | Present. |
| Cloud storage during trial | Correctly denied. |
| Skill-from-repeat / prompt-optimizer outside packages | Present (FAQ + modals + comparison). No dedicated h2 “How AI works”; content under “Bring your own” + “On demand, only if you need it” + Questions. |
| Hide Marketplace / Connect | Not hidden. |
| Sample usage / “viewers are free” as claims | **Do not ship as product claims.** See build notes. |

---

## Build notes (fold into Human UI)

1. **Provisional prices (one config constant):** Pro **$29** / seat / month; Team **$49** / seat / month; Team **3-seat minimum**. HTML already has `price: 29`, `price: 49`, Team `min: 3`. Put in **one** config constant so Thien can change later.
2. **Keep nav label “My bots”** as-is (rename to assistants is Thien’s later call).
3. **Sample content only — do not ship as product claims:**
   - “Viewers are free” / “Viewers do not” (FAQ seat answer; seat tips; checkout tip).
   - Demo usage figures (`awSpend: 6.2`, estimate defaults, fake cards/invoices, sample AI account tail).
4. Still: **no AI credits bundled** inside trial / Pro / Team packages.
5. Never hide **Marketplace** or **Connect**.
6. Product name **AgentWitch** one word.
7. Prefer **assistant** over **bot** in body/cards (nav “My bots” exception).

---

## Copy fixes (needles → replacements)

Small, non-blocking. Prefer applying in build, not blocking start.

| Exact string (or locus) | Replacement / action |
|-------------------------|----------------------|
| CSS comment `Agent Witch design tokens` | `AgentWitch design tokens` |
| JS helper name `eur` | Rename to `usd` (or `money`); keep `$` output |
| FAQ: `Members count. Viewers do not.` | Drop viewer claim until Product locks it; e.g. keep “One person who runs assistants in your account.” only |
| Tip/checkout: `Viewers are free.` | Remove until locked; seat = access for one member who runs assistants |
| Demo `awSpend: 6.2` and fake spend UI | Wire to real billing data or empty/zero state; do not present as product usage claim |

No Soft shorthand in shipping files.
