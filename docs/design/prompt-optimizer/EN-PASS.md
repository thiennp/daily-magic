# Product EN — AgentWitch Prompt optimizer

- Source HTML: `/workspace/agentwitch/docs/design/prompt-optimizer/AgentWitch-Prompt-optimizer.html`
- Claude chat: `17990c9e` (**AgentWitch – Prompt optimizer**)
- Desktop export: non-(1) file, mtime ~23:39 CEST, 2026-10-06 (export ~23:33 CEST)
- Reviewed: 2026-10-06 ~23:41 CEST (Europe/Berlin)
- LOCK: `LOCK.md` + `CLAUDE-BRIEF.md`
- Live refs checked: `awc-download-always-visible/src/features/prompt-optimizer/`, `apps/live/features/prompt-optimizer/`, Home `HomePromptSdlcSection`

## Verdict: **FIX-NEEDED**

**HARD break:** the Desktop HTML is a **cloud browser runner** (paste prompt → Optimize → Before/After in the tab). LOCK says cloud `/prompt-optimizer` is an **explainer only** and does **not** run the wizard; the real run surface is AgentWitch Local at `http://127.0.0.1:43347/prompt-optimizer`.

Human UI must **not** ship the cloud Optimize flow from this HTML. Locked rules win. Use overlays below + live Local wizard behavior. Claude should correct the artifact (explainer + Open in AgentWitch Local + Local four-step wizard surfaces) before treating this export as the visual source of truth.

### Blockers (HARD)

1. **Cloud runs the optimizer** — Optimize / Before and after / Copy optimized / Use as my prompt all run in the console tab. Missing “this console page does not run the optimizer” + **Open in AgentWitch Local** (`:43347`).
2. **Use / save without passed gate** — After every successful Optimize, UI offers **Use as my prompt**, **Save to Library**, **Send to chat** with no passed / failed / timeout / interrupt / no_reply honesty. LOCK: use-this-prompt / save-as-skill **only when passed**.

### Not HARD (overlays for Human UI)

Missing Local wizard, Quick fill chips, four AI paths as labeled, Home entry, Download Local when connected, guide links — treat as must-keep overlays (do not auto-block start if Human UI builds from LOCK + live, discarding cloud-run UX).

---

## Rule checklist (LOCK needles)

| # | Needle | Result | Evidence |
|---|--------|--------|----------|
| 1 | **AgentWitch** one word (flag Agent Witch) | **PASS** (comment needle) | `<title>AgentWitch – Prompt optimizer</title>`; wordmark AgentWitch. CSS comment `Agent Witch design tokens` only (non-shipping). Path `~/.agent-witch/` is filesystem, not UI. |
| 2 | Prefer **assistant** over **bot** (My bots nav OK) | **PASS** (needles) | Body uses assistant. Nav **My bots** OK. Cursor disconnect: “Bots can no longer…” → prefer Assistants. |
| 3 | **computer** / **This computer** (kill Mac / machine seat nouns) | **PASS** | This computer / Connect this computer / another computer. No Mac / machine seat nouns in UI. |
| 4 | Never hide **Marketplace** or **Connect** | **PASS** | Signed-in `NAVL`: Home, Projects, Marketplace, **Connect**, My bots, New task. |
| 5 | **Download AgentWitch Local** visible when computer connected | **NEEDLE / OVERLAY** | URLS.download exists; connect flows say Install / Open AgentWitch Local. No visible **Download AgentWitch Local** when already connected (Devices only shows Connect another computer). Keep live download affordance. |
| 6 | Cloud `/prompt-optimizer` explainer only; **Open in AgentWitch Local** → `:43347` | **FAIL (HARD)** | Page tip: “Paste a prompt and get a clearer version…”; primary **Optimize**. No `127.0.0.1:43347`, no Open in AgentWitch Local CTA, no “does not run the optimizer” note. |
| 7 | Four AI paths: **CLI · assistant · buy tokens · own API key** (= 1 agent). No credits-in-Pro/Team | **FAIL → OVERLAY** | HTML shows **My own AI account** / **My own API key** (1 key = 1 assistant) / **AgentWitch AI, on demand** (“Not in any plan”, “Seats never include AI”). **CLI missing.** No labeled **buy tokens** / **assistant** (connected assistant) path. Good: no Pro/Team credits claim. |
| 8 | Local wizard: **Project → Prompt and goal → CLI → Summary → Run** | **FAIL → OVERLAY** | No Local four-step wizard surface at all. Cloud single-page compose only. |
| 9 | Quick fill chips intent | **FAIL → OVERLAY** | Absent. Focus chips are Balanced / Clearer / Shorter / More structure — not Save tokens, Shorter prompt, Clearer instructions, Add guardrails, Template variables, Raise judge score. |
| 10 | Honesty: passed / failed / timeout / interrupt / no_reply; use-this / save-as-skill **only when passed** | **FAIL (HARD on use/save)** | No outcome badges. Success always unlocks Use as my prompt / Save to Library / Send to chat. |
| 11 | Home entry opens Local on this computer | **FAIL → OVERLAY** | No Home CTA / compose card in this artifact. |
| 12 | Cost estimate honesty (estimate not invoice); **Try again** on errors | **PARTIAL** | **Try again** present on load/optimize errors. AW AI copy says “next invoice” (billing). No Local estimated run cost / Max trials / Max spend / early-stop. Prefer estimate language for run cost. |

### Visible product rules (HARD) — quick scan

| Check | Result |
|-------|--------|
| AgentWitch one word | **PASS** (CSS comment needle) |
| assistant over bot | **PASS** (My bots OK; Cursor “Bots” needle) |
| computer / This computer | **PASS** |
| Marketplace not hidden | **PASS** |
| Connect not hidden | **PASS** |
| Cloud does not run optimizer | **FAIL** |
| use-prompt / save only when passed | **FAIL** |

---

## Needles table (flag scan)

| Flag | Finding |
|------|---------|
| Agent Witch two-word | CSS comment only. Visible name OK. |
| bot vs assistant | Prefer assistant in body. Nav My bots OK. Fix Cursor “Bots can no longer…”. |
| Mac / machine | Absent from visible copy. |
| Hide Marketplace / Connect | Neither hidden. |
| Cloud runs wizard | **Yes — HARD.** Rebuild as explainer + Open Local. |
| Open in AgentWitch Local / :43347 | **Missing.** |
| Download Local when connected | **Missing** as always-visible download. |
| Four AI paths | Not matched; CLI absent; labels diverge. Keep “not in any plan” honesty. |
| Local four steps + Run | **Missing entirely.** |
| Quick fill six chips | **Missing.** |
| Outcome honesty | **Missing**; use/save ungated. |
| Home → Local | **Missing.** |
| Tab “Prompt Optimizer” vs h1 “Prompt optimizer” | Capitalization inconsistency — prefer **Prompt optimizer**. |

---

## Copy fixes (needles → replacements)

| Exact string (or locus) | Replacement / action |
|-------------------------|----------------------|
| CSS comment `Agent Witch design tokens` | `AgentWitch design tokens` |
| Cursor disconnect: `Bots can no longer send tasks to Cursor Cloud…` | `Assistants can no longer send tasks to Cursor Cloud…` |
| Tab label `Prompt Optimizer` | `Prompt optimizer` (match h1 / LOCK title) |
| Hero tip / Optimize cloud runner | Replace with LOCK cloud intent: wizard runs in **AgentWitch Local on this computer**; this console page does **not** run the optimizer; CTAs **Download** / **Open in AgentWitch Local** (`http://127.0.0.1:43347/prompt-optimizer`); links How it works (`/prompt-optimizer/guide`) · Instructions in AgentWitch Local |
| Primary **Optimize** on cloud page | Remove cloud run; use Open in AgentWitch Local |
| `Use as my prompt` / Save / Send on every success | Local only; **only when status is passed** |
| AI radios: account / key / AgentWitch AI | Show **CLI · assistant · buy tokens · own API key** (= 1 agent); keep add-on / not-in-plan honesty |
| Focus: Balanced / Clearer / Shorter / More structure | On Local Prompt and goal: Quick fill **Save tokens, Shorter prompt, Clearer instructions, Add guardrails, Template variables, Raise judge score** |
| Missing Download when connected | Keep **Download AgentWitch Local** visible whenever a computer is connected |
| `Billed at list rates on your next invoice` (AW AI) | OK for AW AI billing if accurate; Local run cost must stay **estimate**, not invoice |
| Soft shorthand | Never in shipping files |

No Soft shorthand in shipping files.

---

## Top must-keep overlays (Human UI)

1. Cloud page = explainer only + Open in AgentWitch Local → `http://127.0.0.1:43347/prompt-optimizer` (do not ship cloud Optimize).
2. Local wizard four steps: Project → Prompt and goal → CLI → Summary → Run (+ run cycle gates, Download report).
3. Outcome honesty + use-this-prompt / save-as-skill **only when passed**.
4. Four AI paths clearly: CLI · assistant · buy tokens · own API key (= 1 agent).
5. Quick fill chip set (six intents).
6. Home entry opens Local on **this computer**.
7. Download AgentWitch Local stays visible when connected; never hide Marketplace or Connect.
8. Cost estimate honesty + Try again on errors.

---

## Human UI can build now?

**Yes, from LOCK + live + this pack — not from the cloud Optimize UX in the HTML.** Treat visual chrome / shell / computer-neutral wording as reference; rebuild cloud + Local surfaces per LOCK. Prefer a corrected Claude export for Mac video / full Local path before polish pass.

Stack on **current `origin/main`** (main is past `9e0fb4f3` — Pricing + Automations LIVE). Never hide Marketplace or Connect.
