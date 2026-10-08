# AgentWitch Pricing — Product LOCK (canonical)

Locked: 2026-10-06 ~22:15 CEST via AW Lead (Thien); rules 11–12 appended ~22:33 CEST (overnight HARD).  
Marketplace v2 + onboarding English LIVE `328b7243` — land lock free.  
Claude design first, then build. Never hide live Marketplace or Connect.  
Agent messages: plain English only (no Soft shorthand).

## Locked rules

1. **Default:** 1-month free trial, then **Pro** or **Team**. Permanent Free only via admin flag on the user (not self-serve).
2. **Currency / market:** USD, aimed at US seats (not EUR).
3. **No AI credits in any package.** Packages are seat/plan only. Users bring their own AI accounts. No AW AI credit product line in packages (trial, Pro, or Team).
4. **Storage optional.** Users may use their own S3; no must-buy AW storage.
5. **Cloud message storage** applies only after paid billing starts — **not** during the free trial month.
6. **Cancel anytime** — state clearly on Pricing.
7. **Max 5 computers** for all packages (raised from 2 on 2026-10-08; one limit for every plan, not per seat).
8. **Bot connect limits:** Pro **3** bots, Team **10** bots. (UI copy still prefers **assistant** over **bot** where the noun is generic.)
9. **Team package options:** share harness, local LLM, and team token savings for repeated work.  
   **Pro:** local LLM + auto skill-build token savings (own AI or bought tokens outside packages).
10. **Cost control (internal):** covers Railway, Neon, and related infra. Do **not** put margin math on the customer page.
11. **Skill-from-repeat (outside packages):** when creating a skill from repeated work, the user gets **two choices** — add their own tokens / own AI, **or** buy an AW AI pack. Show on Pricing as FAQ / how AI works / add-on notes — **not** as a line inside trial/Pro/Team package cards.
12. **Prompt optimizer / AI path (outside packages):** choose **CLI**, **assistant** (bot), **buy tokens**, or **provide their own API key** — each own API key counts as **1 agent**. Show on Pricing as FAQ / how AI works / add-on notes — **not** bundled inside package cards.

## Visible product rules (HARD)

- Product name: **AgentWitch** (one word).
- Prefer **assistant** over **bot** in UI copy (limits above may stay “bots” in eng/data; visible labels prefer assistant).
- Prefer **computer** / **This computer** over machine/Mac as generic nouns.
- Download AgentWitch Local stays visible when a computer is already connected.
- Brighter/vibrant colors OK (logo-aligned); light mode for this design pass.

## Pages to design

- Signed-out public **Pricing** (marketing shell OK).
- Signed-in **Price / Billing** under account (app shell).

## Must include

- Hero: “Simple pricing” + short subtitle about assistants on your projects.
- Package cards: **Trial → Pro / Team** (no self-serve permanent Free card). Admin-Free only as an edge note if needed, not a CTA package.
- USD seat/month prices as placeholders until Lead sets exact numbers (do not invent EUR).
- Comparison table across tiers (computers, assistants/bots connect limits, harness, local LLM, token savings, cloud storage after paid).
- Optional storage note: own S3 OK.
- **How AI works / add-ons** (outside package cards): skill-from-repeat two choices (own tokens/AI vs AW AI pack); prompt optimizer paths (CLI / assistant / buy tokens / own API key = 1 agent each).
- FAQ: cancel anytime; what is a seat; own AI accounts; own S3; cloud storage only after paid; trial then Pro/Team; computer and assistant limits; skill-from-repeat choices; prompt optimizer options.
- States: signed-out, trial, Pro, Team, loading, error + Try again, billing portal for paid.
- Responsive 1440 / 1100 / 768 / 390; keyboard + screen-reader friendly.

## Do not

- Put AI credits (or any AW AI credit line) in trial, Pro, or Team packages.
- Bundle skill-from-repeat or prompt-optimizer token packs **inside** package cards (they are separate add-on / how-AI notes).
- Require AW storage purchase.
- Show a self-serve permanent Free package.
- Hide Marketplace or Connect.
- Put internal COGS / margin math on the customer page.
- Overwrite Home, Projects, Marketplace, Invite, Onboarding, Automations, or AWL artifacts.

## Build notes (overnight provisional)

- **Prices:** Pro **$29** / Team **$49** per seat; **3-seat minimum**. Put in **one config constant** only so Thien can change later. Locked rules still win over any other HTML numbers.
- **Nav:** Keep **"My bots"** label as-is for now (rename to assistants is Thien's later call). Prefer **assistant** elsewhere in body/cards.
- **Sample content:** Usage figures and **"viewers are free"** in the Claude HTML are sample only — **do not ship as product claims**.
- Human UI branch: `feat/awc-pricing-v1`. Locked rules win over HTML.
- Source HTML: Mac Desktop `AgentWitch – Pricing.html` (22:32 CEST), Claude artifact `1a19bd9d`; box copy `docs/design/pricing/AgentWitch-Pricing.html`.

## Claude chat

Active design chat: `https://claude.ai/chat/66e405e0-a874-4287-8400-3cf42172c27a`  
Artifact name: **AgentWitch – Pricing** (one word).  
NRG Lead drives Mac Chrome send; Product EN-checks Desktop HTML when exported, then pings AW Lead so Human UI can build.
