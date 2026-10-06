# Claude brief — AgentWitch Prompt optimizer (canonical HARD)

Paste as **one message** in a **new** Claude chat (or new artifact).  
Prefer dedicated artifact name: **AgentWitch – Prompt optimizer**.  
Do **not** use Pricing chat `66e405e0` or Pricing artifact.  
Do **not** use Automations chat `8f580ed5` / Automations artifact unless NRG Lead is already continuing in that chat — still prefer the dedicated Prompt optimizer artifact name.

NRG Lead sends this via Mac Chrome. Product owns the brief; do not drive Chrome from Product.

---

HARD — rebuild / finish the **AgentWitch – Prompt optimizer** artifact only (AgentWitch is one word). Separate from Pricing and Automations. Do not overwrite Pricing, Automations, Home, Projects, Invite, Onboarding, AWL, or a full Marketplace redesign artifact. Keep Marketplace and Connect visible in the app shell nav.

## Goal

Design a polished **light-mode** Prompt optimizer experience that matches Home / Marketplace tokens (brighter / vibrant OK). Cover:

1. Signed-in cloud page **`/prompt-optimizer`** (explainer — does **not** run the wizard in the browser).
2. Home entry (CTA / compose card) that opens AgentWitch Local on **this computer**.
3. AgentWitch Local wizard at `http://127.0.0.1:43347/prompt-optimizer` (the real run surface).
4. Clear **AI path choices**: **CLI**, **assistant**, **buy tokens**, **own API key** (each own API key = **1 agent**).

Ship the finished design — never hide live Marketplace or Connect to “fix” anything.

## Visible copy rules (HARD)

- Product name **AgentWitch** one word everywhere (never “Agent Witch”).
- Prefer **assistant** over **bot**.
- Prefer **computer** / **This computer** over machine / Mac as generic nouns. Kill “this Mac”, “Mac app” as the generic install label — say AgentWitch Local / Download on **this computer**.
- Download AgentWitch Local stays visible when a computer is already connected.
- Never hide Marketplace or Connect.
- No AI credits bundled inside Pricing packages — Optimizer AI paths are add-on / how-AI only.

## AI path choices (must show clearly)

Show these four choices on the Optimizer (path picker, How AI strip, or compose — not buried):

1. **CLI** — writer CLI installed and signed in on this computer (Claude, Codex, Cursor, Antigravity, or You for manual).
2. **assistant** — a connected assistant (prefer this word over bot).
3. **buy tokens** — buy AgentWitch tokens / an AW AI pack for on-demand runs (add-on, not a package card line).
4. **own API key** — provide their own API key; **each own API key counts as 1 agent** toward connect limits.

Do not invent “AI credits included in Pro/Team.”  
Skill-from-repeat (own tokens/AI **or** buy AW AI pack) stays on Pricing — omit here unless this UI literally touches skill-from-repeat.

## Must keep working

### Cloud `/prompt-optimizer`

- Title **Prompt optimizer**.
- Subtitle intent: run the four-step wizard in **AgentWitch Local on this computer**; judge scores; runner executes module trials; writers use Playbook / project folder.
- Honesty: badges for **passed** / failed / timeout / interrupt / no_reply; **use this prompt only when passed**.
- CTAs: Download / install path + **Open in AgentWitch Local**.
- Note: this console page does **not** run the optimizer.
- Links: How it works · Instructions in AgentWitch Local.

### Home

- Eyebrow **Prompt optimizer**; short body about improving a prompt in your project on your computer.
- Optional Goal + Prompt compose; primary **Open in AgentWitch Local** (wizard runs on the computer, not this browser tab).

### Local wizard (four compose steps → Run)

1. **Project** — folder writers run in; optional Skill from the folder.
2. **Prompt and goal** — Goal + Prompt; **Quick fill** chips (Save tokens, Shorter prompt, Clearer instructions, Add guardrails, Template variables, Raise judge score); pass scores; cost controls (Max trials, Max spend USD, early-stop); estimated run cost (estimate, not an invoice).
3. **CLI** — Judge + instructions; Improver + instructions; Runner (required) + runner instructions; writers ready/blocked until signed in.
4. **Summary → Run** — starts generalize → evaluate → separate → optimize modules.

Run cycle: progress timeline, tokens so far, gates (Continue / Rerun with feedback), Download report (.md).  
Save as skill / use this prompt **only when status is passed**.

## Page contents to include in the artifact

1. Cloud Prompt optimizer page (computer-neutral copy).
2. AI path strip / picker with all four choices + “own API key = 1 agent” help.
3. Home entry aligned with the same rules.
4. Local wizard compose + run / gate / outcome / save-when-passed.
5. States: no computer connected; Local not running; writers missing / not signed in; empty history; loading; error + **Try again**; budget exceeded; passed vs fail-clean outcomes.
6. App shell with Marketplace + Connect visible; Download Local still visible when a computer is connected.

## Visual / a11y

- Same visual system as Home (signed in) / Marketplace: tokens, logo SVG, brighter vibrant colors.
- Light mode only; minimal text; helpers in accessible (i) tooltips where useful.
- Responsive 1440, 1100, 768, 390 — no horizontal overflow.
- Keyboard and screen-reader friendly (labels on fields, focus rings, meaningful button names).

## Out of scope this message

- Pricing package cards / seat prices (separate artifact).
- Automations redesign.
- Companies & rules.
- Skill-from-repeat deep UI (Pricing) unless this screen literally opens it.
- Hiding any live nav item.
- Claiming the cloud tab runs the optimizer.

Only rebuild / finish **Prompt optimizer** (cloud + Home entry + Local wizard + AI paths). At the end, list each locked item as **done** or **missing**. When the artifact is ready, say clearly so we can export HTML to Desktop.

---
