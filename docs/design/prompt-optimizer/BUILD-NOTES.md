# AgentWitch Prompt optimizer — Human UI build handoff

Status: **FIX-NEEDED** (Product EN 2026-10-06 ~23:41 CEST).  
Locked rules win over HTML. Do **not** ship the cloud Optimize / Before-and-after runner from the Desktop export.

## Source

- HTML: `/workspace/agentwitch/docs/design/prompt-optimizer/AgentWitch-Prompt-optimizer.html`
- Claude chat: `17990c9e` (**AgentWitch – Prompt optimizer**)
- Desktop export: ~23:33 CEST, 2026-10-06 (mtime ~23:39 CEST)
- LOCK: `docs/design/prompt-optimizer/LOCK.md`
- Brief: `CLAUDE-BRIEF.md`
- EN: `EN-PASS.md` · copy: `COPY.md`
- Live: `src/features/prompt-optimizer/`, `apps/live/features/prompt-optimizer/`, Home Prompt optimizer entry

## Base tip / branch

- Main is now **past `9e0fb4f3`** (Pricing + Automations LIVE).
- **Stack on current `origin/main`** (do not branch from a stale tip).
- Older LOCK note `328b7243` is superseded for branch base; Marketplace / Connect remain never-hide.

## Locked rules win

1. Product name **AgentWitch** one word (never “Agent Witch”).
2. Prefer **assistant** over **bot** (nav **My bots** OK).
3. Prefer **computer** / **This computer** — kill Mac / machine as generic seat nouns.
4. **Never hide Marketplace or Connect.**
5. **Download AgentWitch Local** stays visible when a computer is already connected.
6. Cloud `/prompt-optimizer` is **explainer only** — does **not** run the wizard. Primary CTA: **Open in AgentWitch Local** → `http://127.0.0.1:43347/prompt-optimizer`.
7. Four AI paths: **CLI · assistant · buy tokens · own API key** (each own API key = **1 agent**). No AI credits inside Pricing packages / Pro/Team claim.
8. Local wizard: **Project → Prompt and goal → CLI → Summary → Run**.
9. Quick fill chips intent (six goals).
10. Honesty outcomes; **use this prompt / save as skill only when passed**.
11. Home entry opens Local on **this computer**.
12. Cost estimates are estimates (not invoices); **Try again** on errors.

## Must-keep overlays (HTML wrong or silent)

| Must-keep | HTML finding | Build action |
|-----------|--------------|--------------|
| Cloud explainer + Open Local `:43347` | Full in-tab Optimize runner | **Discard cloud run UX**; ship live/LOCK explainer + Open in AgentWitch Local |
| “Does not run the optimizer” note | Absent (tip implies cloud run) | Add LOCK honesty |
| Local four-step wizard + Run | Absent | Keep / polish **live Local** wizard |
| passed / failed / timeout / interrupt / no_reply | Absent | Keep live outcome badges |
| use-this / save-as-skill only when passed | Use as my prompt / Save always after Optimize | Gate on **passed** only |
| Four AI paths (CLI · assistant · buy tokens · own API key) | Account / key / AW AI on demand | Map to LOCK four; keep not-in-plan honesty |
| Quick fill six chips | Focus Balanced/Clearer/Shorter/More structure | Ship LOCK Quick fill on Local Prompt and goal |
| Home → Local on this computer | Absent | Keep / align Home entry with LOCK |
| Download Local when connected | Install/Open in connect flows only | Keep **Download** visible when connected |
| Guide `/prompt-optimizer/guide` | Absent | Keep live guide |
| Marketplace + Connect | Present in nav | **Never hide** |

## Small needles (non-blocking once HARD fixed)

- CSS comment “Agent Witch” → AgentWitch.
- Cursor disconnect “Bots can no longer…” → “Assistants can no longer…”.
- Tab “Prompt Optimizer” → “Prompt optimizer”.

## Mac video / complete Local path

Mac video needs the **complete Local path** (install/open Local → four compose steps → Run → honesty outcomes → save/use only when passed). Do not demo cloud Optimize as the product. Prefer a corrected Claude artifact for Local screens before recording polish.

## Do not

- Hide Marketplace or Connect.
- Ship cloud browser Optimize as the Prompt optimizer.
- Bundle AI credits inside Pricing package cards.
- Offer use-this-prompt / save-as-skill on failed / timeout / interrupt / no_reply.
- Overwrite Pricing, Automations, Home, Projects, Invite, Onboarding, Marketplace full redesign, or AWL shell artifacts.
- Use Soft shorthand in shipping files.
- Redesign Companies & rules in this pass.

## Surfaces to build

1. Cloud `/prompt-optimizer` — explainer, honesty chrome, Download + Open Local, guide links.
2. Cloud `/prompt-optimizer/guide` — continuity with Local.
3. Home entry — CTA / compose → Local on this computer.
4. AgentWitch Local wizard — four steps + run cycle + passed-only save/use.
5. AI path strip — all four choices + own API key = 1 agent.
6. App shell — Marketplace + Connect visible; Download Local when connected.

Plain English only in shipping files (no Soft shorthand).
