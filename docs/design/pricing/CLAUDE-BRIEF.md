# Claude brief — AgentWitch Pricing (canonical HARD REBUILD)

Send this as one message in chat `66e405e0` (stop streaming first). Supersedes older EUR / permanent-Free / bundled-AI / 5-computers-per-seat wording. Rules 11–12 appended 2026-10-06 ~22:33 CEST.

---

HARD REBUILD — supersede the earlier EUR / permanent-Free / bundled-credits / 5-computers Pricing prompt.

Rebuild the **AgentWitch – Pricing** artifact (one word AgentWitch). Do not overwrite Home, Projects, Marketplace, Invite, Onboarding, Automations, or AWL artifacts. Keep Marketplace and Connect visible in nav if the app shell is shown.

## Package rules (locked)

1. Default: **1-month free trial**, then **Pro** or **Team**. No self-serve permanent Free package card. Permanent Free only via admin flag (edge note OK; not a CTA tier).
2. Prices in **USD**, aimed at US seats. Remove all € / EUR.
3. **No AI credits in any package.** Packages are seat/plan only. Users bring their own AI accounts. Do not show an AW AI credit product line on Free trial, Pro, or Team cards.
4. **Storage optional:** users may bring their own S3; no must-buy AW storage.
5. **Cloud message storage** applies only after paid billing starts — **not** during the free trial month.
6. State clearly: **Cancel anytime.**
7. Max **2 computers** for all packages. Remove any “5 computers per seat” (or higher) limits.
8. **Bot connect limits:** Pro **3**, Team **10**. Prefer the word **assistant** in visible UI labels where you mean the generic noun.
9. **Pro:** local LLM + auto skill-build token savings (own AI). **Team:** share harness + local LLM + team token savings for repeated work.
10. Internal cost control (Railway / Neon / infra) stays off the customer page.
11. **Skill-from-repeat (outside packages):** when the user creates a skill from repeated work, offer **two choices** — add their own tokens / own AI, **or** buy an AW AI pack. Put this in FAQ / “How AI works” / add-on notes — **not** as a line inside trial/Pro/Team cards.
12. **Prompt optimizer / AI path (outside packages):** let the user choose **CLI**, **assistant** (bot), **buy tokens**, or **their own API key** — each own API key counts as **1 agent**. Put this in FAQ / “How AI works” / add-on notes — **not** bundled inside package cards.

## Visual / copy

- Same visual system as Home (signed in) / Marketplace: tokens, logo SVG, brighter vibrant colors.
- Light mode only; minimal text; helpers in accessible (i) tooltips.
- Prefer **assistant** over **bot**; **computer** / **This computer** over machine/Mac as generic nouns.
- Product name **AgentWitch** one word everywhere.

## Page contents

- Hero: “Simple pricing” + short subtitle about assistants on your projects.
- Cards: Trial (then upgrade) / Pro / Team — USD seat/month placeholders OK until exact numbers lock; primary CTAs Start trial / Subscribe / Start team.
- Comparison table across tiers (computers, assistants, harness, local LLM, token savings, cloud storage after paid).
- **How AI works / add-ons** section (outside cards): skill-from-repeat two choices; prompt optimizer paths (CLI / assistant / buy tokens / own API key = 1 agent).
- FAQ: cancel anytime; seat definition; own AI; own S3; cloud storage only after paid; trial → Pro/Team; computer and assistant limits; skill-from-repeat; prompt optimizer options.
- States: signed-out, trial, Pro, Team, loading, error+Try again, billing portal for paid.
- Responsive 1440, 1100, 768, 390 — no horizontal overflow. Keyboard and screen-reader friendly.

Only rebuild Pricing in this reply. At the end list each rule as done or missing. When done, say so clearly so we can export HTML to Desktop.

---
