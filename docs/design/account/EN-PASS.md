# Product EN — AgentWitch Account (re-EN after CORRECT)

- Source HTML: `/workspace/agentwitch/docs/design/account/AgentWitch-Account.html` (~190734 bytes; mtime ~**07:09 CEST** 2026-10-07)
- Upload twin: `/workspace/uploads/AgentWitch – Account.html` (byte-identical)
- Claude chat: `66e405e0-a874-4287-8400-3cf42172c27a` artifact **v2** (**AgentWitch – Account**)
- Reviewed: 2026-10-07 ~07:12 CEST (Europe/Berlin) — **re-EN after CORRECT** (prior verdict FIX-NEEDED ~06:40 CEST)
- LOCK: `LOCK.md` (HARD rules unchanged; Soft HOLD gate now open on EN)

## Verdict: **EN PASS**

Prior FIX-NEEDED hard blockers are **cleared** in this CORRECT export. Soft needles remain; locked rules win over HTML where noted.

Human UI may plan Soft HOLD for Account **after** Soft land RELEASE on tip `4fe6e5b2` (AW Mac Soft LOCK). Soft land is still **HELD** — **do not Soft-claim** Account yet. Soft HOLD tip recommendation: **yes** (wait RELEASE, then Soft HOLD / stack with lane-diff). Soft HOLD recommendation alone is not a Soft-claim.

Companies & rules CORRECT already **EN PASS** — do not mix packs.

---

## Prior hard blockers (must re-score)

| # | Prior blocker | Cleared? | Evidence |
|---|---------------|----------|----------|
| 1 | **Automations** absent from primary signed-in nav | **Yes** | Winning `NAVL`: Home → Projects → Marketplace → Connect → **Automations** → My bots → New task. Literal **Automations** count ≥ **1** in nav list. |
| 2 | **Download AgentWitch Local** absent / hidden when connected | **Yes** | Devices rail always renders `#dl-local` **Download AgentWitch Local** (not gated on `S.comp === 'unlinked'`). Default `S.comp: 'online'` — Download stays while This computer is Online. Signed-out topbar also has Download (+ sr “AgentWitch Local”). |

### Keep checks (must not regress)

| Check | Result |
|-------|--------|
| Marketplace in primary nav | **PASS** — in winning `NAVL` |
| Connect in primary nav | **PASS** — in `NAVL` + Devices **Connect this computer** / **Connect another computer** |
| Account tabs | **PASS** — Profile / Sign-in and security / Notifications / Privacy and data |
| No invented project Connections | **PASS** — no Slack / Linear / Gmail / GitHub OAuth on Account |
| AgentWitch one word | **PASS** (needle) — `<title>AgentWitch – Account</title>`; CSS comment soft only |
| Prefer assistant | **PASS** (needle) — body/tips use assistant; nav **My bots** soft |
| computer / This computer | **PASS** — sessions + Devices + privacy copy |
| Pricing CTA | **PASS** — Cancel anytime / USD / trial→Pro/Team; plan CTA to Pricing |

---

## Rule checklist (LOCK HARD + must-keep + sections)

| # | Rule | Result | Evidence |
|---|------|--------|----------|
| 1 | AgentWitch one word | **PASS** (needle) | Title OK; CSS `Agent Witch design tokens` |
| 2 | Prefer assistant | **PASS** (needle) | Body assistant; nav My bots |
| 3 | computer / This computer | **PASS** | Sessions + Devices + privacy |
| 4 | Never hide Marketplace | **PASS** | In `NAVL` |
| 5 | Never hide Connect | **PASS** | In `NAVL` + Devices CTAs |
| 6 | Never hide Automations | **PASS** | In `NAVL` after Connect |
| 7 | Download when connected | **PASS** | Devices `#dl-local` always; default Online |
| 8 | Account global user surface | **PASS** | h1 Account; not a project tab |
| 9 | No project Connections on Account | **PASS** | Absent |
| 10 | Profile section | **PASS** | Display name, email, avatar color, TZ; Your plan |
| 11 | Sign-in & security | **PASS** | Email code + Google; sessions; sign out |
| 12 | Notifications | **PASS** | Event toggles + quiet hours + test email |
| 13 | Privacy & data | **PASS** | History on computers; export; delete + blockers + grace cancel |
| 14 | Pricing alignment | **PASS** | Cancel anytime; USD; free month / Pro / Team / admin Free |
| 15 | Light mode | **PASS** | Bright light tokens |

---

## Soft needles (non-blocking)

1. CSS comment `Agent Witch design tokens` → `AgentWitch design tokens`
2. Nav label **My bots** → prefer **Assistants** when other shells already moved (Pricing keep-as-is OK)
3. Tab **Sign-in and security** / **Privacy and data** vs LOCK ampersand wording — either OK if plain English
4. Dead early `const NAV` / first `renderSide()` (no Connect / Automations / Download) overridden by winning `NAVL` `renderSide` — ship one shell list only
5. Signed-in Download is Devices-rail only (`#dl-local`); signed-out uses topbar `#top-dl` — OK (and/or satisfied); optional parity with Companies topbar Download while signed in
6. No explicit **Account** item in user-menu mock — build should add Account to live `UserDropdownMenu`
7. Cursor Cloud disconnect copy still says **Bots** — soft; prefer assistants
8. Notification prefs / quiet hours / export / delete grace are **greenfield** vs live — design OK; do not claim they already ship
9. Older shared-shell comment omits Connect / Automations — comment drift only

---

## Shell checklist

| Item | In winning signed-in shell? |
|------|----------------------------|
| Marketplace | **Yes** |
| Connect | **Yes** (`NAVL` + Devices) |
| Automations | **Yes** (`NAVL`) |
| Download AgentWitch Local | **Yes** (Devices; visible when Online) |
| My bots / New task | **Yes** |

## Sections present?

| Section | Present |
|---------|---------|
| Profile | **Yes** |
| Sign-in & security | **Yes** (`Sign-in and security`) |
| Notifications | **Yes** |
| Privacy & data | **Yes** (`Privacy and data`) |

---

## Soft HOLD / Soft land

| Gate | Status |
|------|--------|
| EN PASS | **Yes** — hard blockers cleared |
| Soft land tip `4fe6e5b2` (AW Mac Soft LOCK) | Still **HELD** |
| Soft HOLD Account now? | **Recommend yes after RELEASE** — wait Soft land RELEASE, then Soft HOLD / stack with lane-diff. **Do not Soft-claim** while Soft land held. |
| Soft-claim Account | **No** — not authorized this pass |

---

## Human UI can Soft HOLD / build?

**EN PASS — Soft HOLD recommended after Soft land RELEASE.** Use LOCK + this EN pack + `COPY.md` + `BUILD-NOTES.md`. Never hide Marketplace, Connect, Automations, or Download AgentWitch Local. Do not Soft-claim while tip `4fe6e5b2` Soft land remains held.
