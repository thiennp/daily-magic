# AgentWitch Project Connections — Product DESIGN

**Owner (Product EN / lock):** AgentWitch Product  
**Interim build owners:** **API = NRG AgentWitch** · **UI = AW Human UI**  
**Ask:** Thien via NRG Lead ~06:29 CEST 2026-10-07  
**Drafted:** 2026-10-07 ~06:35 CEST  
**Status:** Design-only. Soft land lock free. Soft-claim waits until Mac Soft land **cost-control + Companies** RELEASES — do not Soft HOLD yet. Tip Lead for owner confirm + Soft HOLD after pack READY.  
**Canonical lock:** [LOCK.md](./LOCK.md) · **API sketch:** [API-BRIEF.md](./API-BRIEF.md) · **Strings:** [COPY.md](./COPY.md)

---

## 1. Intent

For each AgentWitch project, users connect Slack, Linear, Gmail, GitHub (and similar later) as **real OAuth / connector binds** — not only paste links. The bind is **project-scoped** so assistants in that project can call those services through tools.

**Outcome:** “This project’s assistants can post to our Slack / open Linear issues / read Gmail / use GitHub — because someone with permission connected that account here.”

---

## 2. What this is not

| Confusion                               | Reality                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| Global **Connect**                      | Pairs **this computer** with AgentWitch Local. Stays global (MAP). Label stays **Connect**.   |
| Invite / bot-connect-matrix / MCP OAuth | Assistant **joins** the project. Separate product.                                            |
| Resources Git remotes / Folders         | Paste HTTPS/SSH URLs and folder paths — **no login secrets**. Bookmarks / refs only.          |
| Wake / Slack as the assistant           | Inbound wake via Slack bot = **out of v1**. v1 = **outbound** tool use with the project bind. |
| Pricing “own AI accounts”               | Bring-your-own AI for inference. Not Slack/Linear/Gmail/GitHub project Connections.           |

---

## 3. Placement

**Recommendation (LOCK):** one clear home — **project Settings → Connections**.

### Why Settings → Connections

1. **Not global Connect** — computers vs services; MAP already locks Admin / Download / Connect as global setup.
2. **Not Team** — Team is people, assistants, computers, invites (V5-8). OAuth service config is not membership.
3. **Not Resources** — live Resources = Folders on this computer + Git remotes (optional paste URLs). Putting OAuth next to paste-link remotes teaches the wrong model.
4. **Tab budget** — MAP adds Automations, Prompt optimizer, History as centre tabs. Connections is lower frequency → Settings subsection for v1.

**OPEN Q1 (Lead):** centre **Connections** tab vs Settings subsection. Product prefers Settings for v1.

Live V5 centre tabs (research): Overview · Activity · Reports · Team · Library · Safety rules · Resources · Settings (`projectPageTabs.constant.ts` / L3 PLAN). Pitfalls label in product EN = **Safety rules**.

---

## 4. Live surfaces found (research — do not invent)

| Surface                           | Live behavior                                                          | Relation to Connections                                                   |
| --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Resources → Folders**           | Owner adds computer + path; files stay on computer; `foldersOwnerOnly` | Keep. Not OAuth.                                                          |
| **Resources → Git remotes**       | Paste HTTPS/SSH URLs; **no credentials** in URL; owner-only edit       | Keep as bookmarks. Connections = authenticated GitHub API, not paste URL. |
| Older redesign “Links / Add link” | Design-era empty for “repo or docs”                                    | Superseded by Git remotes + Library; do not revive as fake Connections.   |
| Global **/connect**               | Pair this computer                                                     | Never absorb.                                                             |
| Invite / access approve           | Consent + confirm + (planned) access-log lines                         | **Reuse** for OAuth consent + connect/disconnect audit.                   |
| Team roles                        | owner / member / viewer                                                | Gate mutate vs read status.                                               |

Do **not** hide Marketplace, Connect (computer), Automations, or Download while shipping Connections.

---

## 5. UX shape

### 5.1 List

- Heading **Connections**
- Subtitle: services assistants in this project can use (see COPY).
- Rows for Slack, Linear, Gmail, GitHub (v1). Future services append same row pattern.
- Per row state: **Connect** | **Connected** | **Reconnect** | **Disconnect**

### 5.2 Empty

- Body: **Connect a service so assistants in this project can use it.**
- Optional secondary: point that Resources links stay bookmarks (one short line — COPY).

### 5.3 Connect flow (reuse Connect / Invite)

1. User (allowed role) clicks **Connect** on a service row.
2. OAuth popup or redirect — same family of chrome as device **Connect** / OAuth consent and Invite approve/confirm (plain English; explicit human action).
3. Success → row **Connected** + toast; write access-log / Activity line (`connection.connected` or product-equivalent).
4. Fail / deny / cancel → stay disconnected; error + **Try again** / Connect again. No silent grant.

### 5.4 Connected card

- Service name
- Account / workspace label (e.g. Slack workspace name, Gmail address, GitHub user/org)
- **Connected** date
- **Disconnect** → confirm dialog (reuse Invite destructive confirm pattern: name the service + verb on button)

### 5.5 Failed / expired

- Status **Reconnect** (or Connected with Reconnect CTA).
- Same OAuth path as Connect; log reconnect on success.

### 5.6 vs Resources

| Resources                              | Connections                               |
| -------------------------------------- | ----------------------------------------- |
| Paste Git URL / folder path            | OAuth bind                                |
| No secrets in URL                      | Tokens held server-side for project tools |
| Assistants may _know about_ a repo URL | Assistants may _call_ GitHub/Slack/… APIs |

---

## 6. Scope & permissions

**Per-project bind (recommend):** project A’s Slack token is not usable by assistants only in project B.

**OPEN Q2:** later “Use this account for this project” from an account-level grant.

**Mutate (recommend):** project **owner** only for v1 (aligns with folders / Git remotes owner-only).  
**OPEN Q3** company admin · **OPEN Q4** member own Gmail.

**Assistants:** never connect themselves; never silent auto-approve. Use tokens only for tools scoped to that project.

**Audit:** connect / disconnect / reconnect lines (reuse access-log / Activity restore pattern — owner-visible audit, not messenger Activity).

---

## 7. v1 services

Locked set: **Slack · Linear · Gmail · GitHub**.  
Later: Notion, Discord, and similar — same row UX.

**OPEN Q5** GitHub org+repo picker · **OPEN Q6** Gmail personal vs Workspace · **OPEN Q7** staged API ship behind one UI list.

**Outbound tools only** for v1 — no claim that connecting Slack makes a Slack bot the project assistant.

---

## 8. Pattern reuse (HARD)

| Pattern source                              | Reuse for Connections                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Global Connect / `/oauth/*` / device verify | Consent chrome, explicit Confirm, cancel/deny honesty                               |
| Invite approve / remove confirms            | Disconnect confirm; no one-click destructive without naming the service             |
| Access log / Activity restore design        | Durable lines for connect / disconnect / reconnect (not high-volume tool call spam) |
| Resources owner-only + read-only note       | Members/viewers see status; mutate gated                                            |

Do **not** invent a second OAuth product language (no “link account magic”, no Soft shorthand).

---

## 9. Build ownership & sequence

| Step                              | Owner                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------- |
| LOCK + DESIGN + COPY + API-BRIEF  | AgentWitch Product (this pack)                                                  |
| Data model + OAuth + endpoints    | **NRG AgentWitch**                                                              |
| Project Settings → Connections UI | **AW Human UI** (after Lead GO + API brief)                                     |
| Claude HTML (optional)            | NRG Lead drives Chrome after Lead GO                                            |
| Soft-claim / Soft HOLD            | **After** cost-control + Companies Soft land RELEASES; tip Lead when pack READY |

Do **not** Soft HOLD now. Do **not** block Companies or cost-control Soft tips.

---

## 10. Out of scope / do not

- Redesign Companies Soft HOLD or cost-control Soft tip
- Assistant Invite / wake / MCP join
- Replacing computer Connect
- Hiding Marketplace / Connect / Automations / Download
- Claiming inbound Slack-bot-as-assistant

---

## 11. Open Qs (for AW Lead)

Same as LOCK § Open Qs (Q1–Q7): tab vs Settings; grant reuse; company admin; member Gmail; GitHub picker; Gmail Workspace; v1 API staging.

---

## 12. Cite

- `docs/design/global-to-project/MAP.md`
- `docs/design/l3-v5/PLAN.md` · `docs/design/project-layout-v5/UI-SLICE-PLAN.md`
- `docs/design/companies-rules/LOCK.md` (tone)
- `docs/design/pricing/LOCK.md` (own AI ≠ Connections)
- `docs/design/human-member-invites/spec.md`
- `docs/design/activity-restore/DESIGN.md`
- Live copy: Resources / Git remotes constants in product worktrees

_Doc only. No implementation in this change._

## Lead locks (2026-10-07 ~06:35 CEST)

See LOCK.md — Q1–Q7 confirmed. Placement **Settings → Connections**; per-project bind; owner-only mutate; all four services; Soft HOLD after cost-control + Companies RELEASE.
