# AgentWitch Companies & rules — Human UI build handoff

Status: **EN PASS** (2026-10-07 ~06:20 CEST, re-EN after CORRECT). Locked rules win over HTML. Human UI can build now.

Soft land lock free. Stack this land onto the current tip; prefer stacking up to three related tips if possible. Never hide Marketplace, Connect, Automations, or Download AgentWitch Local.

## Source

- HTML: `/workspace/agentwitch/docs/design/companies-rules/AgentWitch-Companies-rules.html` (also mirrored under `/workspace/docs/design/companies-rules/`)
- Claude chat: `https://claude.ai/chat/40470b31` (**AgentWitch – Companies & rules**; chat id `40470b31` only)
- Desktop export: `/Users/thien.nguyen/Desktop/AgentWitch – Companies & rules.html` (Desktop mtime **06:17:28 CEST** 2026-10-07; box ~191770 bytes)
- LOCK: `docs/design/companies-rules/LOCK.md`
- Brief: `docs/design/companies-rules/CLAUDE-BRIEF.md`
- EN: `EN-PASS.md` · copy: `COPY.md`
- Base tip (main, Pricing + Automations live): **`9e0fb4f3`** (from LOCK)

## Prior FIX-NEEDED → cleared

| Prior blocker | Status in CORRECT HTML |
|---------------|------------------------|
| Global Safety rules / pitfalls CRUD | Cleared — orientation + Open Safety rules only |
| Missing dispatch / settings / Danger zone / members / runs | Cleared — all present |
| Join with a code / self-join | Cleared — cannot-self-join honesty |
| Automations missing from primary nav | Cleared — Marketplace + Connect + Automations in `NAV` |

## Locked rules win

1. Product name **AgentWitch** one word (never “Agent Witch”).
2. Prefer **assistant** over **bot** in body (this shell uses **Assistants** in nav).
3. Prefer **computer** / **This computer** — kill Mac / machine as generic seat nouns.
4. **Never hide Marketplace, Connect, or Automations** — full primary nav inside admin chrome.
5. Download AgentWitch Local stays visible when a computer is already connected.
6. Hub = **Companies & rules**; entity = **Companies** / **Company** (not “group” in UI labels).
7. Primary “rules” on this hub = **company dispatch / approval policy** (Approval required vs Open dispatch; browser + **this computer**).
8. **Safety rules** stay **in-project** — orientation + link only; **no** global Safety rules / pitfalls CRUD.
9. Ship live create / members / policy / activity this pass. **No** policy-layer preview.
10. **Companies-only** frames — no `/admin/users` redesign in this artifact.

## Keep from live when HTML is soft or silent

| Live must-keep | HTML finding | Build action |
|----------------|--------------|--------------|
| Create company CTA wording | Empty h2 “Create a company”; button “Create company” | Prefer **Create company** |
| Managing company picker label | Label “Company” + select works | Optional LOCK “Managing company” when multi-company |
| Open Safety rules in a project | “Open Safety rules” + project picker | Keep orientation; optional exact LOCK string |
| Optional Danger-zone delete-members | Absent | Keep live if present |
| Download AgentWitch Local when connected | Present in this export | Keep visible |
| Marketplace / Connect / Automations | All in primary `NAV` | Never hide |

## Small needles (non-blocking)

- CSS comment “Agent Witch” → AgentWitch.
- Empty h2 Create a company → Create company (optional).
- Picker “Company” → Managing company when multi (optional).
- Safety CTA → “Open Safety rules in a project” (optional exact).

## Do not

- Hide Marketplace, Connect, Automations, or Download AgentWitch Local.
- Invent a global Safety rules page or pitfalls editor on `/admin/groups`.
- Design policy-layer preview or `/admin/users` frames in this pass.
- Overwrite Pricing / Automations / Prompt optimizer / Home / Projects / Invite / Onboarding / AWL / Marketplace full redesign artifacts.
- Use Soft shorthand in shipping files.
- Mix this pass with Prompt optimizer.

## Pages / surfaces to build

1. Companies & rules hub header + dispatch-oriented lede  
2. Empty + create company (no-self-join honesty)  
3. Company selected: picker, settings gear → Company settings (dispatch + Danger zone)  
4. Company members invite / table / remove confirm  
5. Recent company agent runs (list / empty / loading / error + Try again)  
6. Rules orientation strip + Open Safety rules (project deep link — no global CRUD)  
7. App shell with Marketplace, Connect, Automations; Download Local when connected  
8. States: signed-out; no company; loading; policy save success/fail; delete confirm  

Plain English only in shipping files (no Soft shorthand).
