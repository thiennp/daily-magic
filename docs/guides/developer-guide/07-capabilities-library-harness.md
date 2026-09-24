# Chapter 7 — Capabilities, library, harness, marketplace

One **execution pipeline** (dispatch → Mac `command.claude.run` or Cursor Cloud) backs all of these nouns. They differ in **what is stored in Neon**, **what is installed on disk**, and **how users discover content** — not in separate runtimes. Glossary: [docs/product/concepts.md](../../product/concepts.md).

---

## Concept map

| Noun            | What it is                                                       | Primary storage                              | Mac side                                                                                                      |
| --------------- | ---------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Capability**  | Published agent or workflow offering (metadata, version, policy) | Postgres (`published_capabilities`, etc.)    | Referenced by dispatch (`capabilityId`)                                                                       |
| **Workflow**    | Capability shape with dynamic **task fields** (forms)            | Same + `workflow_fields`                     | One prompt (user-built) or orchestrated steps (official presets) — [Chapter 6](06-workflows-orchestration.md) |
| **Harness**     | Rules/skills/commands **files** under `~/.agent-witch/harness/`  | Cloud catalog + manifests; not the run graph | Installed via `harness.request` or local AWB `POST …/harness/install`                                         |
| **Library**     | Saved playbooks (fork/run again)                                 | User capabilities via existing APIs          | Same dispatch as any capability                                                                               |
| **Marketplace** | Company-published listings to browse/install                     | Harness + capability templates               | Install pushes harness bundle to chosen device                                                                |

Feature folders (FSA slices):

| Slug           | Path                         | Lib                           |
| -------------- | ---------------------------- | ----------------------------- |
| `capabilities` | `src/features/capabilities/` | `src/lib/capabilities/`       |
| `workflows`    | `src/features/workflows/`    | `src/lib/workflows/`          |
| `harness`      | `src/features/harness/`      | `src/lib/harness/`            |
| `library`      | `src/features/library/`      | `src/lib/library/`            |
| `marketplace`  | `src/features/marketplace/`  | `src/lib/harness/` (listings) |

Routes: `/library`, `/marketplace`. APIs include `/api/capabilities`, `/api/harness`, `/api/harness/marketplace`, `/api/agent-witch/harness-catalog`.

---

## Harness install paths (deterministic bundle)

Harness is **files on disk**, not an agent run.

| User action                                      | Cloud                                                                                     | Mac                                                                                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Marketplace → Install (+ device + **projectId**) | `installOfficialPresetListing` → `bindMarketplaceInstallToProject` (`project_components`) | Pull into repo on Mac (`applyInstalledHarnessSetsToProjectCursor`); no global `pushHarnessInstallBundleToDevice` for presets |
| Save to library (template fork)                  | `createCapabilityFromTemplate` → `requestCapabilityTemplateHarnessInstall`                | Same when a target device is chosen                                                                                          |
| Browser on same Mac (catalog)                    | Proxied via AWC                                                                           | AWB `POST http://127.0.0.1:47892/harness/install`                                                                            |

Message builder: `buildHarnessInstallDispatchMessage` — inline `bundle` or `bundleFetch` (gzip artifact when JSON exceeds ~96 KiB). Mac: `runDeterministicHarnessInstall` → `applyHarnessInstallLocally` (no writer CLI for deterministic installs). Legacy dashboard harness UI may still use writer `instruction` paths.

Full sequence diagram: [mac-harness-workflow-agent-dispatch.md](../../qa/mac-harness-workflow-agent-dispatch.md).

Local deterministic writes from the browser (harness bundle JSON): AWB `POST /harness/install` with `{ appOrigin, profileEmail?, bundle }` — see `CLAUDE.md` / install bundle docs.

---

## Library and guest drafts

- Signed-in: library items are capabilities the user owns; Send uses the same composer/dispatch gates as Home.
- Unsigned: `/library` stores drafts in **`localStorage`** (`agentwitch.library.guest-drafts.v1`); templates from public capabilities APIs.
- After sign-in: `GuestLibraryDraftSyncListener` syncs to cloud via capabilities APIs — **newer `updatedAt` wins**; cloud wins on tie.

Details: [guest-library-browser-drafts.md](../../qa/guest-library-browser-drafts.md).

---

## Marketplace → capability → workflow orchestration

1. Listing ships capability template (`template-*` slug) + generated **usageGuide** (UI); harness preset stays internal to templates.
2. **Install** requires `projectId`; binds workflow/agent + harness slug via `bindMarketplaceInstallToProject` / `bindPublishedCapabilityHarnessToProject`.
3. **Run** may start an **official workflow run** if the capability resolves to a registered orchestration template ([Chapter 6](06-workflows-orchestration.md)).
4. Playbook files materialize under the **project repo** after Mac pull; dispatch still uses `command.claude.run` per step.

Adding or changing a marketplace preset: co-locate harness template, capability constant, and `workflowOrchestration/definitions/*.definition.ts` per [official-marketplace-workflow-best-practices.md](../../product/official-marketplace-workflow-best-practices.md).

---

## Projects vs harness on disk

**Project catalog** (name, folder path, Mac binding) is **Neon** (`user_projects`). AWL `/projects` reads the device API; repo-local `.agent-witch/` holds code-local harness links, RAG, memory — not the account catalog.

See [awc-awl-projects-source-of-truth.md](../../qa/awc-awl-projects-source-of-truth.md).

**Pillars:** **4** — library/marketplace/harness sharing; **3** — project-folder RAG + run memory (not the same as repo `feature-knowledge`). Memory and improvements wiring: [Chapter 10](10-learning-memory-and-improvements.md).

---

## Agent editing checklist

1. `npm run feature-knowledge:query -- "…" --feature=capabilities` (or `harness`, `library`, `marketplace`, `workflows`).
2. Read feature `README.md` + `KNOWN_ISSUES.md` for the slug you touch.
3. Harness/dispatch changes: also [Chapter 4](04-mac-bridge-awl-awb-awi.md) and `src/features/agent-witch/KNOWN_ISSUES.md`.
4. Behavior change → update matching user guide chapter per [guide-maintenance.map.json](../guide-maintenance.map.json); run `npm run feature-knowledge:index` and commit `.feature-knowledge/index.json`.

---

## Query aliases

- capabilities library harness marketplace developer guide
- harness.request deterministic-bundle pushHarnessInstallToDevice
- published_capabilities workflow_fields template fork
- guest library localStorage syncGuestLibraryDraftsToCloud
- phân biệt capability workflow harness library marketplace
- cài harness lên Mac marketplace install save to library
- thư viện playbook Agent Witch đồng bộ sau đăng nhập
