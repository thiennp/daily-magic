# AgentWitch Prompt optimizer — Product LOCK (canonical)

Locked: 2026-10-06 ~23:01 CEST by AgentWitch Product (AW Lead order: Automations done, then Prompt optimizer, then Companies & rules).  
NRG Lead already moved Claude onto Prompt optimizer — publish this pack for inject / correct.  
Pricing LOCK rule 12 (AI path wording) applies here as the Optimizer’s own surface, not as package card copy.  
Base tip (main, live Marketplace/onboarding): **`328b7243`**.  
Claude design first, then Human UI build. Never hide live Marketplace or Connect.  
Agent messages: plain English only (no Soft shorthand).

## Scope

1. **Cloud console page** `/prompt-optimizer` — explainer that sends the user to AgentWitch Local (does **not** run the wizard in the browser).
2. **Cloud guide** `/prompt-optimizer/guide` — how it works / examples (continuity with Local).
3. **Home entry** — Prompt optimizer CTA / compose card that opens AgentWitch Local on **this computer**.
4. **AgentWitch Local wizard** `http://127.0.0.1:43347/prompt-optimizer` — the real run surface (four compose steps + run cycle).
5. **AI path choices** on Optimizer (and any How AI / path picker shown with it): **CLI**, **assistant**, **buy tokens**, **own API key** (each own API key = **1 agent**).

Prefer a **dedicated** Claude artifact name: **AgentWitch – Prompt optimizer**.  
Do **not** reuse Pricing chat `66e405e0` or Pricing artifact.  
Do **not** reuse Automations chat `8f580ed5` / Automations artifact unless NRG Lead explicitly continues in the current Claude chat — still prefer the dedicated Prompt optimizer artifact name.

## Visible product rules (HARD)

- Product name: **AgentWitch** (one word). Never “Agent Witch”.
- Prefer **assistant** over **bot** in UI copy.
- Prefer **computer** / **This computer** over machine / Mac as generic nouns (kill “this Mac”, “Mac app” as the generic install noun — say Download / AgentWitch Local on **this computer**).
- Download AgentWitch Local stays visible when a computer is already connected.
- Never hide **Marketplace** or **Connect** in nav or product shells.
- Brighter / vibrant colors OK (logo-aligned); **light mode** for this design pass.
- Match Home / Marketplace visual tokens.
- **No AI credits inside Pricing packages** — Optimizer AI paths are add-on / how-AI only (same as Pricing LOCK rule 12).

## AI path choices (HARD — Pricing LOCK rule 12, shown on Optimizer)

The user chooses how the Prompt optimizer runs AI:

| Choice | Meaning (plain English) |
| --- | --- |
| **CLI** | Use a writer CLI already installed and signed in on this computer (for example Claude, Codex, Cursor, Antigravity). |
| **assistant** | Use a connected assistant (prefer this word over “bot” in visible labels). |
| **buy tokens** | Buy AgentWitch tokens / an AW AI pack for on-demand runs (add-on — **not** bundled in Pricing package cards). |
| **own API key** | Provide their own API key. **Each own API key counts as 1 agent** toward assistant connect limits. |

Show these four choices clearly on the Optimizer design (path picker, How AI works strip, or compose step — not buried).  
Do **not** invent a fifth bundled “AI credits included in Pro/Team” path.

**Skill-from-repeat:** leave to Pricing (own tokens/own AI **or** buy AW AI pack). Mention on Optimizer **only** if this UI pass literally touches skill-from-repeat; otherwise omit.

## Must keep working (live behavior)

Reference live checkout under `src/features/prompt-optimizer/` and `apps/live/features/prompt-optimizer/` (e.g. `awc-download-always-visible`):

### Cloud console `/prompt-optimizer`

| Surface | Keep |
| --- | --- |
| Title | **Prompt optimizer** |
| Intent | Wizard runs in **AgentWitch Local on this computer**; console page does **not** run the optimizer |
| Steps | Install / open Local → open Prompt optimizer → paste prompt + goal, choose folder, pick judge / improver |
| Honesty | Passed / failed / timeout / interrupt / no_reply; **use this prompt only when passed** |
| CTAs | Download / install path + **Open in AgentWitch Local** (`http://127.0.0.1:43347/prompt-optimizer`) |
| Links | How it works (`/prompt-optimizer/guide`) · Instructions in AgentWitch Local |

### Home

| Surface | Keep |
| --- | --- |
| CTA | Eyebrow **Prompt optimizer**; body about improving a prompt in your project on your computer; open Prompt optimizer |
| Compose card | Goal + Prompt fields; **Open in AgentWitch Local** (wizard runs on the computer — not in this browser tab) |

### AgentWitch Local wizard `/prompt-optimizer`

Four compose steps: **Project → Prompt and goal → CLI → Summary**, then **Run**.

| Step | Keep |
| --- | --- |
| Project | Folder (writers’ working directory) + optional Skill from `.cursor/skills/…/SKILL.md` |
| Prompt and goal | Goal + Prompt; **Quick fill** goal chips; pass scores; cost controls (Max trials, Max spend USD, early-stop); estimated run cost |
| CLI | Judge (+ instructions); Improver (+ instructions); Runner (required) + runner instructions; writers Claude / Codex / Cursor / Antigravity / You (manual) |
| Summary → Run | Starts generalize → evaluate → separate → optimize modules |
| Run cycle | Progress, tokens so far, gates (Continue / Rerun with feedback), Download report (.md) |
| Passed only | Save as skill / use this prompt **only when status is passed** |
| Guide | `/prompt-optimizer/guide` explains the four-step wizard |

### Goal chips (Quick fill — live labels)

Keep intent (labels may polish wording, not remove the set):

1. Save tokens  
2. Shorter prompt  
3. Clearer instructions  
4. Add guardrails  
5. Template variables  
6. Raise judge score  

## Page contents to design

1. **Cloud Prompt optimizer** — hero, honesty chrome, install / open Local CTAs, how-it-works links; **computer**-neutral copy (no Mac-only nouns).
2. **AI path strip / picker** — CLI · assistant · buy tokens · own API key (= 1 agent) clearly visible.
3. **Home entry** — CTA + optional compose preview aligned with the same rules.
4. **Local wizard** — four-step compose + run / gate / outcome / save-as-skill-when-passed; Quick fill chips; cost estimate honesty (estimates, not invoices).
5. **States** — no computer connected; Local not running; writers not installed / not signed in; empty history; loading; error + **Try again**; budget exceeded; passed vs fail-clean (timeout / interrupt / no_reply).
6. **App shell** — Marketplace and Connect stay visible; Download Local stays visible when a computer is already connected.

## Visual

- Same visual system as signed-in Home / Marketplace: tokens, logo SVG, brighter vibrant OK.
- Light mode only for this pass.
- Responsive 1440 / 1100 / 768 / 390; keyboard + screen-reader friendly.
- Minimal text; helpers in accessible (i) tooltips where useful.

## Do not

- Hide Marketplace or Connect.
- Bundle AI credits / token packs **inside** Pricing package cards (paths stay add-on / how-AI / Optimizer UI).
- Run the optimizer in the cloud browser tab (Local remains the run surface).
- Mark timeout / interrupt / no_reply as passed or offer use-this-prompt / save-as-skill on those outcomes.
- Overwrite Pricing, Automations, Home, Projects, Invite, Onboarding, Marketplace full redesign, or AWL shell artifacts.
- Start this work inside Pricing chat `66e405e0` or Automations artifact unless NRG Lead continues the open Claude chat — still name the artifact **AgentWitch – Prompt optimizer**.
- Use Soft shorthand in Product briefs or agent reports.
- Redesign Companies & rules in this pass (next in AW Lead order).
- Expand skill-from-repeat on Optimizer unless this UI literally touches it (leave to Pricing).

## Claude chat

- Artifact / chat name: **AgentWitch – Prompt optimizer** (dedicated; prefer over continuing Pricing or Automations).
- NRG Lead drives Mac Chrome Claude send; Product does **not** drive Chrome.
- Product EN-checks Desktop HTML when exported, then pings AW Lead so Human UI can build.

## Research refs (box)

- Live UI: `/workspace/awc-download-always-visible/src/features/prompt-optimizer/`, `…/apps/live/features/prompt-optimizer/`, Home compose/CTA under `src/features/home/`
- Marketing leave-behind: `docs/marketing/06-prompt-optimizer-leave-behind.md`
- Demo + UI steps: `samples/prompt-optimizer-demo/`
- Pricing AI path wording: `docs/design/pricing/LOCK.md` rule 12; `docs/design/pricing/COPY.md` How AI / FAQ
