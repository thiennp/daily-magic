# Claude brief — AgentWitch Companies & rules (canonical HARD)

Paste as **one message** in a **new** Claude chat (or new artifact).  
Prefer dedicated artifact name: **AgentWitch – Companies & rules**.  
Do **not** use Pricing, Automations, or Prompt optimizer chats / artifacts.  
Do **not** overwrite **AgentWitch – Admin** unless NRG Lead is already continuing that chat — still prefer the dedicated Companies & rules artifact name.

NRG Lead sends this via Mac Chrome. Product owns the brief; do not drive Chrome from Product.

---

HARD — rebuild / finish the **AgentWitch – Companies & rules** artifact only (AgentWitch is one word). Separate from Pricing, Automations, and Prompt optimizer. Do not overwrite those artifacts, or Home, Projects, Invite, Onboarding, AWL, or a full Marketplace redesign. Keep Marketplace, Connect, and Automations visible in the app shell nav — including on this page.

## Goal

Design a polished **light-mode** **Companies & rules** experience that matches Home / Marketplace tokens (brighter / vibrant OK). Cover:

1. Signed-in global hub for primary nav item **Companies & rules** (live route `/admin/groups`).
2. Company (workspace / org) create, select, members, invites, roles, company settings.
3. Company **dispatch / approval rules** (who can send tasks to **this computer**).
4. Clear orientation that **project Safety rules** stay on each **project** page — do **not** create a new global Safety rules page.

Ship the finished design — never hide live Marketplace, Connect, or Automations to “fix” anything.

## Visible copy rules (HARD)

- Product name **AgentWitch** one word everywhere (never “Agent Witch”).
- Prefer **assistant** over **bot** (My bots as a leftover nav label elsewhere is OK).
- Prefer **computer** / **This computer** over machine / Mac as generic nouns. Kill “this Mac”, “Mac app”, “Mac owner” as the generic label — say computer owner / **this computer**.
- Download AgentWitch Local stays visible when a computer is already connected.
- Never hide Marketplace, Connect, or Automations.
- In UI language a **company** is the top-level workspace / org (not a department). Do not say “group” in visible labels even if code uses `group`.

## What “rules” means here

| Meaning | Show on this hub? |
| --- | --- |
| **Company dispatch policy** — Open dispatch vs Approval required (teammates sending tasks to **this computer**) | **Yes — primary** |
| **Project Safety rules** — traps assistants must avoid on a project | **Orientation + link only** → open Safety rules inside a project. Do not move CRUD here. |
| Harness rule-compare / Prompt optimizer | **No** — out of scope |

## Must keep working (live product)

### Hub `/admin/groups`

- Nav label **Companies & rules**; page entity titles **Companies** / **Company**.
- Empty: create a company to invite teammates; cannot self-join — ask an admin to add you.
- Create: name + **Create company**.
- With companies: select / show company name; settings gear → **Company settings**.
- Company settings: **Company dispatch policy** (Approval required / Open dispatch) + Save; Danger zone delete (cannot be undone).
- Policy intent: open runs immediately; approval needs confirmation in the browser and on **this computer**.
- **Company members**: invite by email + role; change role; remove with confirm.
- **Recent company agent runs**: list / empty / loading (error + **Try again** if you show a failed load).

### Shell

- Marketplace + Connect + Automations remain visible (do not blank the primary nav to “simplify” admin).
- Download AgentWitch Local still visible when a computer is connected.
- Prefer **full primary nav** with Marketplace, Connect, Automations visible on this page.
- **No** `/admin/users` frames this pass (Companies-only).

## Page contents to include in the artifact

1. Companies & rules hub header + plain-English lede (company = workspace/org; rules here = dispatch / approval; Safety rules stay on projects).
2. Empty + create company.
3. Company selected: picker, settings, dispatch policy, danger zone.
4. Company members invite / table / remove confirm.
5. Recent company activity.
6. Rules orientation strip: company policy summary + “Open Safety rules in a project” (picker or deep link — no global pitfalls editor).
7. App shell with Marketplace, Connect, Automations visible; Download Local still visible when connected.
8. States: signed-out login gate; no company yet; loading; policy save success/fail; delete confirm.
9. Do **not** design policy-layer preview (device/user/company/product) this pass.

## Visual / a11y

- Same visual system as Home (signed in) / Marketplace: tokens, logo SVG, brighter vibrant colors.
- Light mode only; minimal text; helpers in accessible (i) tooltips where useful.
- Responsive 1440, 1100, 768, 390 — no horizontal overflow.
- Keyboard and screen-reader friendly (labels on fields, focus rings, meaningful button names).


## Lead lock (2026-10-06 ~23:42) — apply now

1. Prefer **full primary nav** (Marketplace, Connect, Automations) inside admin chrome — never hide those three.
2. Ship **create / members / dispatch policy / activity** only. **No** policy-layer preview (device/user/company/product) this pass.
3. **Companies-only** frames — **no** `/admin/users` screens in this artifact.

## Out of scope this message

- Pricing package cards / seat prices.
- Automations redesign.
- Prompt optimizer (cloud or Local wizard).
- Moving Safety rules / pitfalls off the project page.
- Harness rule-compare UI.
- `/admin/users` frames and full Users / Styleguide redesign.
- Policy-layer preview (device / user / company / product).
- Hiding any live nav item (Marketplace, Connect, Automations).

Only rebuild / finish **Companies & rules** (global company hub + dispatch rules + Safety rules orientation). At the end, list each locked item as **done** or **missing**. When the artifact is ready, say clearly so we can export HTML to Desktop.

---
