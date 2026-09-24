# Chapter 8 — Production and trust

This chapter answers: **what runs where**, **what Agent Witch can see**, and **what honest limits** you should expect in production at [https://www.agentwitch.com](https://www.agentwitch.com).

It is written for team leads, security reviewers, and solo makers who want clarity before they pair a **Mac** or save a **Playbook**. Vocabulary: [Chapter 0](00-philosophy-and-vocabulary.md).

Trust boundaries below enable all [four pillars](00-philosophy-and-vocabulary.md#four-pillars): **easy authoring** only works if you know what the composer will touch; **learn from usage** requires honest **Run** records; **efficient memory** must not leak one teammate’s context into another’s **Task** without policy; **team learning** needs clear rules for shared **Library** / **Marketplace** installs on paired **Macs**.

---

## Production vs repository name

| Name                              | Meaning                                                             |
| --------------------------------- | ------------------------------------------------------------------- |
| **Agent Witch**                   | The product you use in the browser and on your Mac                  |
| **daily-magic**                   | Historical git repository name only—same codebase                   |
| **www.agentwitch.com**            | Production **console** (AWC) and APIs                               |
| **CHECK24 `daily-magic.*` hosts** | Not Agent Witch production unless your org explicitly deploys there |

Canonical hosting: [Repository name and hosting](../../product/repo-name-and-hosting.md).

Production Mac clients use a fixed WebSocket target: `wss://www.agentwitch.com/api/agent-witch/ws` (install bundle **103+**). Local dev uses `http://localhost:3000` with the same path on your machine.

---

## Four deployables (engineering map)

Users mostly see **Mac** and **Runs**. Under the hood:

| Piece             | Role                                              | Typical address                                    |
| ----------------- | ------------------------------------------------- | -------------------------------------------------- |
| **Console (AWC)** | Sign-in, **Tasks**, **Runs**, library, hub        | `www.agentwitch.com`                               |
| **Install (AWI)** | Mac runtime, LaunchAgents, WebSocket client       | `~/.agent-witch`                                   |
| **Live (AWL)**    | Mac-local UI, projects, status                    | `http://127.0.0.1:43347`                           |
| **Bridge (AWB)**  | Browser-on-same-Mac glue (identity, wake, update) | `127.0.0.1:47892` (prod) / `47893` (localhost dev) |

Full table: [Agent Witch deployables](../../product/agent-witch-deployables.md).

---

## Trust boundary: cloud vs Mac

```text
Browser (you)  ──HTTPS──►  Agent Witch Console + Postgres (runs, workflows, accounts)
                              │
                              │ WebSocket hub (paired Mac only)
                              ▼
Mac (AWI)  ──►  real shell / writer CLI in folders YOU chose
              ──►  harness files under ~/.agent-witch/harness/
              ──►  local bridge (AWB) only on loopback — not exposed to the internet
```

**On the cloud**, Agent Witch stores account data, **Run** metadata, workflow graphs, your checkpoint answers, and dispatch queue state (see ADR 0005 in [architecture index](../../adr/README.md)).

**On the Mac**, Agent Witch executes **Tasks** and workflow agent steps: shell sessions, CLI tools, and file writes implied by the agent (including harness install). The console streams terminal output to your browser; it does not silently substitute cloud compute for Mac work unless you configure **Cursor Cloud** as an explicit target.

Dispatch overview: [Mac harness, workflow, and agent dispatch](../../qa/mac-harness-workflow-agent-dispatch.md).

---

## Pairing and “this Mac”

Claiming a **Mac** creates a **pairing token** on the machine. The cloud stores a **hash** only. The browser learns “this computer” by comparing that hash to the local **bridge** `/identity` probe—not by guessing from IP or hostname.

- You must run **Connect this Mac** while signed in to link an install to your account.
- Another person’s account on the same physical Mac gets a different token; hostname alone is not proof of ownership.

[How AWC knows this computer](../../qa/awc-how-browser-knows-this-computer.md) · [AWB localhost identity and CORS](../../qa/awb-localhost-identity-and-cors.md).

---

## Honest run UX (no fake success)

Agent Witch commits to **honest** progress labels on live **Runs**:

- **Connecting** / **In progress** / **Waiting on you** while work is not finished.
- Terminal outcome chips (**Success**, **Failed**, **Stopped**, etc.) only after a real end state.

Locked product strings: [Run UX honesty](../../qa/run-ux-honesty-strings.md).

The **New task** composer uses the same honesty for **Mac** readiness: if the Mac is offline, reconnecting, needs an update, or unreachable (DNS), **Send** is blocked with a clear reason—not a silent queue failure.

[Send readiness reason codes](../../agent-witch/send-readiness-reason-codes.md).

---

## Mid-run input (`[[AWAITING_INPUT]]`)

During a **Run**, the agent may pause and ask a question in the terminal. The browser prompts you; the **Mac** waits for your answer over the hub protocol. Agent Witch does not invent answers on your behalf.

Workflow **checkpoints** (Chapter 6) are a higher-level version of the same idea—planned human nodes instead of ad hoc terminal gates.

---

## Cursor Cloud (optional second target)

**Mac** is the default trusted executor for local repos and CLIs. **Cursor Cloud** dispatch uses stored API keys and a cloud executor identity—it is an optional path for teams that configure it, not a hidden replacement for your laptop.

Writer routing (continuation vs memory limits): [Writer dispatch cascade routing](../../qa/writer-dispatch-cascade-routing.md).

---

## Data you should treat as sensitive

- **Pairing tokens** and Mac install directories (`~/.agent-witch`, dev `~/.local-agent-witch`).
- **Project folders** you attach to **Tasks** (source code, secrets in `.env` if the agent reads them).
- **Workflow uploads** (PDFs/images) stored server-side for a bounded time with signed agent download URLs ([workflow file upload](../../qa/workflow-file-upload-and-semantic-output.md)).
- **Session cookies** for your Agent Witch account—same as any SaaS console.

Agent Witch is built for teams who accept that **running an agent on a Mac is equivalent to giving a developer shell access in the chosen folder**, mediated by your prompts and playbooks.

### Pillars and data (honest summary)

| Pillar               | Trust takeaway                                                                                                                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Easy authoring**   | Forms and uploads you submit are stored for the workflow run; agents on the **Mac** only receive what dispatch sends.                                                                                                                           |
| **Learn from usage** | Improvements and feedback features vary by surface—you approve playbook/workflow changes; cloud stores run history for audit.                                                                                                                   |
| **Efficient memory** | Prior **Run** context may be injected on the **Mac** or via search—treat attached folders and transcripts as sensitive; team-wide memory policy is still maturing ([north star vs today](00-philosophy-and-vocabulary.md#north-star-vs-today)). |
| **Team learning**    | Shared templates and **Runs** visibility follow account/team membership; installing a **Playbook** writes files on the chosen **Mac**.                                                                                                          |

---

## Multi-instance production (brief)

Agent Witch Console may run on more than one server replica. **Writer dispatch** requires the live Mac WebSocket on the node handling your send request. During deploys or load balancing, you may briefly see **Reconnecting** even when AWI on the Mac is healthy. The product fails closed rather than dropping **Tasks** on the wrong node.

User impact and mitigations: [AWC Mac reconnecting vs local live](../../qa/awc-mac-reconnecting-vs-local-live.md) · OPEN-002 in [Agent Witch KNOWN_ISSUES](../../../src/features/agent-witch/KNOWN_ISSUES.md).

---

## Install bundle updates (trust + safety)

The cloud publishes an **install bundle version**; your **Mac** reports what it runs. When the Mac is behind, the composer blocks **Send** with **Update needed** until you update—so you are not dispatching with known-fixed client bugs.

Update flows use the local bridge and LaunchAgents; a bad update historically could break the plist (AGENT-067)—modern bundles heal on start. See [Update local and LaunchAgent plist](../../qa/awi-update-local-launchagent-plist.md).

---

## Related reading

- [System Q&A index](../../qa/README.md)
- [Local bridge doc](../../agent-witch/local-bridge.md) — ports, wake, harness install API
- [Chapter 9 — Troubleshooting](09-troubleshooting.md) — DNS, reconnecting, bundle mismatch

---

## Query aliases

- Agent Witch production trust what runs on Mac vs cloud
- www.agentwitch.com security pairing token harness
- honest run UX send blocked Mac offline
- Cursor Cloud vs Mac dispatch Agent Witch
- tin cay Agent Witch, du lieu o dau may Mac hay cloud
- agentwitch.com production khac daily-magic repo
- Mac pairing tokenHash this computer trust
- chan Send khi Mac reconnecting update needed
- bon tru cot tin cay, du lieu memory team learning bao mat
