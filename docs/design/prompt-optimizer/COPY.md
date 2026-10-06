# AgentWitch Prompt optimizer — user-facing copy extract

Source: `/workspace/agentwitch/docs/design/prompt-optimizer/AgentWitch-Prompt-optimizer.html`  
Claude chat: `17990c9e` (**AgentWitch – Prompt optimizer**)  
Desktop export: ~23:33 CEST / mtime ~23:39 CEST, 2026-10-06  
Extracted: 2026-10-06 ~23:41 CEST (Europe/Berlin)  
Method: static chrome + JS string/template extract (UI is JS-rendered).  
Dev corner (“Not part of the product”) is **not** shipping copy.

**Locked rules win over HTML.** Cloud must stay explainer-only; Local wizard, honesty outcomes, four AI paths, Quick fill, Home entry, and Download Local when connected come from LOCK / live when the HTML is wrong or silent.

---

## Nav / shell

### Signed-in app shell (from HTML)
| Label | Note |
|-------|------|
| Home | keep |
| Projects | keep |
| Marketplace | **never hide** |
| Connect | **never hide** (present in this artifact’s signed-in nav) |
| My bots | **keep as-is** (prefer assistant in body) |
| New task | keep |
| Devices (side) | This computer + other devices; Connect this computer / Connect another computer |
| Cursor Cloud | Connected / Not connected + Connect / Disconnect |

### Project centre tabs (HTML)
Overview · Workflows · Automations · **Prompt Optimizer** *(prefer **Prompt optimizer**)* · Library · Reports · History · Safety rules · Team · Settings

### Breadcrumb
Projects › {project name?} › Prompt optimizer

### Brand
- Wordmark / title — **AgentWitch**
- Page h1 — **Prompt optimizer**

---

## Cloud `/prompt-optimizer` (HTML vs LOCK)

### What the HTML shows (do not ship as cloud run)
| String | Role |
|--------|------|
| Prompt optimizer | Title |
| Paste a prompt and get a clearer version. Compare both, then copy it, save it to the Library or send it to a project chat. | Tip (WRONG for cloud — implies in-tab run) |
| AI for this prompt | Section |
| My own AI account / My own API key / AgentWitch AI, on demand | AI radios (not LOCK four paths) |
| Free from AgentWitch / 1 key = 1 assistant / Optional / Not in any plan | Chips |
| Your prompt / Paste or type a prompt | Input |
| Write what you want an assistant to do… | Placeholder |
| Try an example · Weekly summary (+ other examples) | Examples |
| Focus: Balanced · Clearer · Shorter · More structure | Focus (not Quick fill) |
| Optimize · Clear · Optimizing… | Primary actions |
| Before and after · Copy optimized · Copy original · Save to Library · Send to chat · Use as my prompt | Results (cloud run) |
| Nothing optimized yet | Empty result |
| Sign in to optimize prompts | Signed-out |
| Could not load the optimizer · Try again | Load error |
| Could not optimize · Monthly limit reached · Try again · Use my own AI | Run error |

### LOCK cloud copy to ship instead
| Role | Copy |
|------|------|
| Title | **Prompt optimizer** |
| Intent | Run the four-step wizard in **AgentWitch Local on this computer**. This console page does **not** run the optimizer. |
| Honesty | Badges: **passed** / failed / timeout / interrupt / no_reply. **Use this prompt only when passed.** |
| CTAs | Download / install path + **Open in AgentWitch Local** (`http://127.0.0.1:43347/prompt-optimizer`) |
| Links | How it works (`/prompt-optimizer/guide`) · Instructions in AgentWitch Local |
| Steps explainer | Install / open Local → open Prompt optimizer → paste prompt + goal, choose folder, pick judge / improver |

---

## Home entry (missing from HTML — LOCK)

| Role | Copy |
|------|------|
| Eyebrow | **Prompt optimizer** |
| Body | Improve a prompt in your project on your computer. |
| Compose (optional) | Goal + Prompt fields |
| Primary | **Open in AgentWitch Local** (wizard runs on the computer — not this browser tab) |

---

## AI paths

### HTML (reference only)
| Choice | Supporting copy |
|--------|-----------------|
| My own AI account | Sign in to an AI account you already have. It does not count as an assistant. Free from AgentWitch. |
| My own API key | Paste a key from your AI provider. Your provider bills you. 1 key = 1 assistant. Assistants meter. |
| AgentWitch AI, on demand | Pay only when you use it. Billed at list rates on your next invoice. Seats never include AI. Not in any plan. Monthly limit. |

### LOCK (ship these four)
| Choice | Meaning |
|--------|---------|
| **CLI** | Writer CLI installed and signed in on this computer (Claude, Codex, Cursor, Antigravity, or You for manual). |
| **assistant** | A connected assistant (prefer this word over bot). |
| **buy tokens** | Buy AgentWitch tokens / an AW AI pack for on-demand runs (add-on, not a package card line). |
| **own API key** | Provide their own API key; **each own API key counts as 1 agent** toward connect limits. |

Do not invent “AI credits included in Pro/Team.” Keep HTML’s “Not in any plan” / “Seats never include AI” honesty when mapping buy tokens / AW AI.

---

## Local wizard (missing from HTML — LOCK + live)

Four compose steps → **Run**:

1. **Project** — Folder writers run in; optional Skill from `.cursor/skills/…/SKILL.md`.
2. **Prompt and goal** — Goal + Prompt; **Quick fill** chips; pass scores; cost controls (Max trials, Max spend USD, early-stop); estimated run cost (estimate, not an invoice).
3. **CLI** — Judge + instructions; Improver + instructions; Runner (required) + runner instructions; writers Claude / Codex / Cursor / Antigravity / You (manual); ready/blocked until signed in.
4. **Summary → Run** — Starts generalize → evaluate → separate → optimize modules.

### Quick fill chips (keep intent)
1. Save tokens  
2. Shorter prompt  
3. Clearer instructions  
4. Add guardrails  
5. Template variables  
6. Raise judge score  

### Run cycle
Progress timeline · tokens so far · gates Continue / Rerun with feedback · Download report (.md).

### Passed only
**Save as skill** / **Use this prompt** only when status is **passed**.

---

## States (HTML + LOCK)

| State | HTML string (if any) | LOCK / ship |
|-------|----------------------|-------------|
| Signed out | Sign in to optimize prompts | Keep sign-in; cloud still explainer |
| Loading | Loading… | keep |
| Load error | Could not load the optimizer · Try again | keep Try again |
| No internet | No internet. You can read and edit… | adapt for explainer |
| No AI connected | No AI connected. Connect… | map to four paths |
| No computer connected | This computer is not connected · Connect this computer | keep computer nouns |
| Local not running | (absent) | Add: open AgentWitch Local on this computer |
| Writers missing / not signed in | (absent) | Local CLI step blocked states |
| Empty history | Recent section omitted when empty | Local empty history |
| Optimize error | Could not optimize · Try again | keep Try again |
| Budget / limit | Monthly limit reached | Local: budget exceeded |
| Passed vs fail-clean | (absent) | passed / failed / timeout / interrupt / no_reply |

### Devices / connect (HTML — keep computer-neutral)
- This computer · Online / Offline / Reconnecting… / Not connected / Needs update  
- Connect this computer · Connect another computer  
- Install AgentWitch Local on the other computer  
- Open AgentWitch Local on that computer, sign in, and enter this code  
- This computer is connected  

### Download (OVERLAY)
Keep visible **Download AgentWitch Local** when a computer is already connected (HTML silent).

---

## Small needles

| Exact | Prefer |
|-------|--------|
| Agent Witch (CSS comment) | AgentWitch |
| Bots can no longer send tasks to Cursor Cloud… | Assistants can no longer… |
| Prompt Optimizer (tab) | Prompt optimizer |
| Soft shorthand | never in shipping files |

Plain English only.
