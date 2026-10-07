# AgentWitch Companies & rules — user-facing copy extract

Source: `/workspace/agentwitch/docs/design/companies-rules/AgentWitch-Companies-rules.html`  
Claude chat: `40470b31` (**AgentWitch – Companies & rules**)  
Desktop export: Desktop mtime **06:17:28 CEST**, 2026-10-07 (~191770 bytes)  
Extracted: 2026-10-07 ~06:20 CEST (Europe/Berlin) — re-EN after CORRECT  
Method: static chrome + JS string/template extract (UI is JS-rendered).  
Dev corner (“Not part of the product”) is **not** shipping copy.

**Locked rules win over HTML.** Soft needles: CSS “Agent Witch”, empty h2 “Create a company”, picker label “Company” vs “Managing company”, Safety CTA wording.

---

## Nav / shell

### Signed-in primary nav (`NAV` in HTML)
| Label | Note |
|-------|------|
| Home | keep |
| Projects | keep |
| Marketplace | **never hide** — present |
| Assistants | prefer assistant (replaces My bots in this shell) |
| New task | keep |
| Automations | **never hide** — present |
| Connect | **never hide** — present |
| Companies & rules | active (`here`) |

### Topbar / Devices
- **Download AgentWitch Local** visible (signed-in topbar, signed-out topbar, Devices side)
- This computer / Connect this computer / Connect another computer
- Cursor Cloud Connected / Not connected

---

## Hub header

1. Breadcrumb — Manage › **Companies & rules**
2. h1 — **Companies** (with Companies & rules chrome)
3. Lede — A company is your team's shared workspace. Here you add teammates and decide who can send tasks to **this computer**. Safety rules stay inside each project.
4. Tip (What is a company?) — A company is the top-level workspace for your team. Projects, people and computers belong to it.

---

## Empty / create / join honesty

| Surface | Copy |
|---------|------|
| Empty h2 | Create a company *(needle — prefer Create company)* |
| Empty body | Create a company to invite teammates and set who can send tasks to this computer. |
| Field | Company name · placeholder e.g. Infusion Labs |
| CTA | **Create company** |
| Join honesty h3 | Joining your team's company? |
| Join honesty body | You can't join a company yourself. Ask a company admin to add you with this email: |
| Join honesty follow-up | You'll see the company here as soon as they add you. |
| Copy email | Copy your email |

**No** “Join with a code” / invite-code self-join.

### New company modal
- Title — New company  
- Field — Company name  
- Actions — Cancel · **Create company**

---

## Company selected bar

- Selected company mark + name  
- Picker label — **Company** (`#co-pick`) *(optional LOCK: Managing company)*  
- **New company**  
- Gear — aria-label Company settings for {name}

---

## Rules orientation strip

### Company dispatch policy (primary)
| Mode | Name | Helper |
|------|------|--------|
| approval | **Approval required** | Each task waits until it is approved in the browser and on **this computer**. |
| open | **Open dispatch** | Tasks from teammates start on **this computer** right away. |

- Tip — Decides what happens when a teammate in this company sends a task to this computer.  
- Actions — Change policy (admin) / View policy (member) → opens Company settings  

### Safety rules (orientation only — no CRUD)
- Kicker — Safety rules  
- Tip — Safety rules are traps assistants must avoid. Each project keeps its own list, so you edit them on the project page.  
- Value — **Set per project**  
- Body — Open a project to see or edit its Safety rules.  
- Control — Project select + **Open Safety rules** (deep link into a project)  

**Do not ship** Built-in safety rules / Add a rule / Edit / Override / proposals on this hub.

---

## Company settings

### Company dispatch policy
- Legend — When a teammate sends a task to this computer  
- Approval tip — This computer is the computer connected with AgentWitch Local. Approval needs a click in the browser and a confirm on this computer.  
- Save — **Save** / Saving…  
- Success — Policy saved. {mode} is now on for {company}.  
- Fail — Could not save… + **Try again**  
- Gate — Only company admins can change this.

### Danger zone
- Title — Danger zone  
- Delete — Delete {company}  
- Body — Removes the company, its members and its dispatch policy. This cannot be undone.  
- Confirm modal — Type {name} to confirm · Cancel · **Delete company**  
- Confirm body — Projects stay with their owners. This cannot be undone.

---

## Company members

- Section — **Company members**  
- Invite — Email (placeholder name@company.com) · Role (Member / Admin) · **Invite**  
- Roles — Owner · Admin · Member  
- Role tip — Admins can invite people, change roles and change the dispatch policy. Members can send tasks and see activity.  
- Table — Person · Role · Last active  
- Remove confirm — Remove {name}? · {name} loses access… · **Remove**  
- Cancel invite confirm — Cancel invite? · invite link stops working · **Cancel invite**

---

## Recent company agent runs

- Section — **Recent company agent runs**  
- Statuses — Waiting for approval · Running · Done · Declined · Failed  
- Empty — No runs yet · When a teammate sends a task to a company computer, it shows up here.  
- Loading — Loading recent runs…  
- Error — Couldn't load recent runs. Check your connection, then try again. · **Try again**  
- Refresh — Refresh runs

---

## Signed-out / loading

- Gate h1 — Sign in to manage companies  
- Gate body — Companies and their dispatch rules are only shown to signed-in teammates.  
- CTA — Sign in · Back to Home  
- Loading — Manage › Companies & rules chrome with loading state

---

## Kill / prefer

| Kill | Prefer |
|------|--------|
| Agent Witch (UI) | AgentWitch |
| Join with a code / self-join | Ask a company admin to add you |
| Global Safety rules CRUD | Orientation + Open Safety rules in a project |
| group as entity label | Company / Companies |
| this Mac / machine (generic) | this computer / This computer |
| Hide Marketplace / Connect / Automations / Download | Keep visible |

Plain English only in shipping files (no Soft shorthand).
