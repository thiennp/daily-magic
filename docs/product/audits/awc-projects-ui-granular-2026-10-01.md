# AWC Projects — granular UI audit

| Field          | Value                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Page**       | `/projects` (signed-in)                                                                                                |
| **Deployable** | AWC                                                                                                                    |
| **Auditor**    | A (phase 01)                                                                                                           |
| **Date**       | 2026-10-01                                                                                                             |
| **Evidence**   | Production capture (`agentwitch.com/projects`, user Thien, 11 projects); code read-only under `src/features/projects/` |

## Executive summary

The Projects list is visually consistent with the rest of AWC (TailAdmin surfaces, search, card grid, overflow menus) but **does not yet read as a polished SaaS workspace** when the account holds many projects. Duplicate default names, truncated paths, internal Mac labels in presence strings, and always-zero composition counts force users to parse every card. Intro copy correctly explains ACL-only cloud scope but is **long and repetitive** for a page users revisit daily.

**`executiveScore`: 52**

---

## scoreBreakdown

```json
[
  {
    "dimension": "Scannability & information architecture",
    "score": 52,
    "weight": 0.25,
    "notes": "Four of six visible cards share the name \"Default\"; paths truncate before differentiating segment (~/.agent-witch/profiles/...). No sort (online, recent, name) or grouping by Mac."
  },
  {
    "dimension": "Copy & product vocabulary",
    "score": 58,
    "weight": 0.2,
    "notes": "Card footer uses \"Harness\" (philosophy prefers Playbook for user-facing terms). Page + panel repeat ACL/cowork explainer. Presence shows opaque device labels (\"Grey - Study\") without tying to user-facing Mac naming guidance."
  },
  {
    "dimension": "Visual design & hierarchy",
    "score": 74,
    "weight": 0.15,
    "notes": "Clear page title, nested panel, 2-column grid, consistent card chrome and kebab actions. Status dot + line works at a glance when names are unique."
  },
  {
    "dimension": "Task completion & CTAs",
    "score": 63,
    "weight": 0.2,
    "notes": "Search and project count present. \"New project\" lives at bottom of panel after scroll; no header-level primary action. \"Connect a computer to edit\" only on some cards — easy to miss linkage for offline/no-Mac rows."
  },
  {
    "dimension": "Accessibility & interaction",
    "score": 76,
    "weight": 0.1,
    "notes": "Search has aria-label; cards use full-surface link with separate pointer-events on menu (documented pattern). Loading/empty/search-no-match states exist in code."
  },
  {
    "dimension": "SaaS workspace expectations",
    "score": 60,
    "weight": 0.1,
    "notes": "Signed-in user sees project inventory but not workspace-level signals (which Mac is default, bulk health, last activity). Composition stats always 0 in capture — reads as broken or placeholder."
  }
]
```

Weighted score: **52** (dimension scores × weights, rounded).

---

## checklist

| id  | criterion                                  | status  | evidence                                                                  |
| --- | ------------------------------------------ | ------- | ------------------------------------------------------------------------- |
| P01 | Auth-gated route; signed-in shell with nav | pass    | Production URL `agentwitch.com/projects`; layout matches AWC app shell    |
| P02 | Page title + one-line purpose              | pass    | "Projects" + subtitle re Mac repos and AWL editing (`ProjectsPageLayout`) |
| P03 | Project list renders as scannable grid     | partial | Grid works; duplicate "Default" names undermine scan                      |
| P04 | Search filters projects                    | pass    | "Search projects…" + count "11 projects" in capture                       |
| P05 | Distinct identity per card (name + path)   | fail    | Multiple "Default"; paths truncated with ellipsis                         |
| P06 | Mac linkage status understandable          | partial | Online/offline/last seen helpful; device display names opaque             |
| P07 | User vocabulary (Playbook vs Harness)      | fail    | Cards show "0 Harness · 0 Workflows · 0 Agents"                           |
| P08 | Cloud vs Mac responsibility clear          | partial | `listHint` ACL copy correct but dense; competes with cards                |
| P09 | Clear path to add project                  | partial | "New project" section at panel bottom (`AwcProjectsPanel`)                |
| P10 | Clear path when no computer linked         | partial | Helper "Connect a computer to edit this project." on some cards only      |
| P11 | Card actions discoverable                  | pass    | Overflow menu on each card                                                |
| P12 | Empty / loading / no-match states          | pass    | Implemented in `AwcProjectsListBody` (not exercised in capture)           |
| P13 | Keyboard / SR basics on search & cards     | pass    | `aria-label` on search; card `aria-label` "Open project {name}"           |
| P14 | Composition counts meaningful on list      | fail    | All visible cards show zeros — no explain-away or hide-when-empty         |
| P15 | Mobile-ready layout (inferred)             | partial | Responsive grid in code; capture is desktop only                          |

---

## mustFix

```json
[
  {
    "id": "MF-01",
    "title": "Eliminate ambiguous duplicate project titles in the list",
    "severity": "high",
    "rationale": "With 11 projects, four visible cards named \"Default\" make the grid unusable without opening each card or reading truncated paths.",
    "suggestedDirection": "Surface a human-chosen display name prominently; when name is default, derive subtitle from last path segment or repo folder; discourage duplicate names at create time; optional inline rename on list."
  },
  {
    "id": "MF-02",
    "title": "Show full distinguishing path (or repo slug) without hiding the differentiator",
    "severity": "high",
    "rationale": "Truncation at `~/.agent-witch/profiles/email...` removes the only cue that separates profile-scoped projects.",
    "suggestedDirection": "Two-line path with middle-ellipsis preserving tail (`daily-magic`, `infusiontv`); tooltip on hover/focus; optional copy button."
  },
  {
    "id": "MF-03",
    "title": "Align list metrics with product vocabulary",
    "severity": "medium",
    "rationale": "\"Harness\" on cards conflicts with philosophy (user-facing Playbook). Always-zero counts add noise.",
    "suggestedDirection": "Rename to Playbook-aligned labels; hide the metrics row when all zero or replace with one line (e.g. \"Composition on computer — open in Agent Witch Local\")."
  },
  {
    "id": "MF-04",
    "title": "Simplify and de-duplicate ACL / cowork explainer on the list page",
    "severity": "medium",
    "rationale": "Header subtitle plus in-panel `listHint` repeat the same ACL-only story; pushes project grid below the fold mentally.",
    "suggestedDirection": "Keep one short line under the title; move long cowork help to detail page, docs link, or collapsible \"How cloud projects work\"."
  },
  {
    "id": "MF-05",
    "title": "Make Mac presence labels user-meaningful",
    "severity": "medium",
    "rationale": "Strings like \"Offline — Grey - Study - last seen 7h 4 mins ago\" expose internal device naming; users cannot map Grey/Study to their Macs.",
    "suggestedDirection": "Prefer user-editable Mac display names; format as \"Offline on {MacName}\" with relative time secondary; link to device settings when name is generic."
  }
]
```

---

## niceToHave

```json
[
  {
    "id": "NH-01",
    "title": "Sort and filter controls",
    "severity": "low",
    "rationale": "Search alone does not help prioritize online computers or recently used repos.",
    "suggestedDirection": "Filter chips: Online / Offline / No computer; sort by last activity or name."
  },
  {
    "id": "NH-02",
    "title": "Promote \"New project\" to page header",
    "severity": "low",
    "rationale": "Primary growth action is below the fold after 11 cards.",
    "suggestedDirection": "Header button opening same flow as `SendTaskComposerCreateProjectForm` or deep link to home Mac connect when no devices."
  },
  {
    "id": "NH-03",
    "title": "Unified Mac connection banner when any project lacks linkage",
    "severity": "low",
    "rationale": "Per-card \"Connect a Mac\" duplicates effort when multiple cards share state.",
    "suggestedDirection": "Single dismissible banner with link to install/connect AWI."
  },
  {
    "id": "NH-04",
    "title": "Visual status consistency for offline",
    "severity": "low",
    "rationale": "Capture suggests strong red offline cue; code uses neutral gray dot for offline (`AwcProjectPresenceBadge`).",
    "suggestedDirection": "Align design tokens so offline reads as attention-worthy without matching error red."
  },
  {
    "id": "NH-05",
    "title": "Skeleton loading for card grid",
    "severity": "low",
    "rationale": "List uses text-only \"Loading projects…\".",
    "suggestedDirection": "Card-shaped skeletons matching grid for perceived performance."
  },
  {
    "id": "NH-06",
    "title": "Quick actions on card hover (desktop)",
    "severity": "low",
    "rationale": "Assign Task and Open in AWL require opening kebab menu.",
    "suggestedDirection": "Expose \"New Task\" secondary button on hover/focus within card hit area without breaking overlay link pattern."
  }
]
```

---

## Observations tied to implementation (read-only)

- List composition: `ProjectsPageLayout` → `AwcProjectsPanel` → toolbar, grid (`AwcProjectsListBody`), bottom `SendTaskComposerCreateProjectForm`.
- Presence copy built in `buildProjectDevicePresenceLabel.ts` (`Online here —`, `Offline —`, `No computer linked`).
- Count line: `formatProjectCompositionCountsLine.ts` (Harness / Workflows / Agents).
- Cowork hint: `AWC_PROJECT_COWORK_HELP_COPY.listHint` in panel.

---

## Out of scope (recorded)

- `/projects/[projectId]` detail, Project Access UI (Members / Pending / Messages / Folders; Access Activity feed removed).
- Code fixes (audit-only phase).
