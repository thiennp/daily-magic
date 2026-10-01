# Storybook (AWC + AWL page previews)

Local UI/UX work without deploying Agent Witch Console (**AWC**) or Agent Witch Live (**AWL**).

## Commands

```bash
npm run storybook          # http://localhost:6006
npm run storybook:build    # static output in storybook-static/
npm run storybook:generate # refresh CSF exports after catalog changes
```

After editing page catalogs or manifests, run `npm run storybook:generate` and commit the generated `*.pages.stories.tsx` files.

## Layout (shared chrome)

| Deployable | Chrome                                                                                                           | Source                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **AWC**    | `AwcStorybookChrome` — same providers as `src/app/(app)/layout.tsx` plus `AppShell` (or marketing/none per page) | `src/utils/storybook/AwcStorybookChrome.tsx`        |
| **AWL**    | Full local app HTML via `buildAgentWitchLocalAppShell` (same shell as the Mac app)                               | `src/utils/storybook/renderAwlStorybookDocument.ts` |

## Statuses

Each page story is named `{pageId} / {status}`:

- `loading` — API handlers hang (AWC) or compose-only loading fixture (AWL prompt optimizer)
- `guest` — signed-out session (guest-aware AWC pages)
- `empty` — success APIs with empty data / empty AWL fixtures
- `error` — 500 APIs or error flash/content fixtures
- `ready` — happy path with fixture data

## AWC pages (20)

| ID                     | Route                     | Statuses                            |
| ---------------------- | ------------------------- | ----------------------------------- |
| home-marketing         | `/`                       | ready                               |
| home-signed-in         | `/` (dashboard)           | loading, empty, error, ready        |
| login                  | `/login`                  | ready                               |
| for-agents             | `/for-agents`             | ready                               |
| setup-writer           | `/setup/writer`           | ready                               |
| privacy                | `/privacy`                | ready                               |
| terms                  | `/terms`                  | ready                               |
| projects               | `/projects`               | loading, empty, error, ready        |
| project-detail         | `/projects/:projectId`    | loading, empty, error, ready        |
| library                | `/library`                | loading, guest, empty, error, ready |
| marketplace            | `/marketplace`            | loading, guest, empty, error, ready |
| reports                | `/reports`                | loading, guest, empty, error, ready |
| report-detail          | `/reports/:runId`         | loading, empty, error, ready        |
| automations            | `/automations`            | loading, empty, error, ready        |
| prompt-optimizer       | `/prompt-optimizer`       | ready                               |
| prompt-optimizer-guide | `/prompt-optimizer/guide` | ready                               |
| connection-lab         | `/connection-lab`         | ready, error                        |
| showcases              | `/showcases`              | ready                               |
| admin-users            | `/admin/users`            | ready, empty                        |
| admin-groups           | `/admin/groups`           | ready, empty, error                 |

Catalog code: `src/utils/storybook/awc/`. Manifest (for codegen): `awcStorybookPageManifest.constant.ts`.

## AWL pages (14)

Matches AWL sidebar nav in `buildAgentWitchLocalAppShell`.

| ID                     | Route                     | Statuses                     |
| ---------------------- | ------------------------- | ---------------------------- |
| home                   | `/`                       | ready, empty, error          |
| task                   | `/task`                   | ready, empty, error          |
| prompt-optimizer       | `/prompt-optimizer`       | ready, empty, error, loading |
| prompt-optimizer-guide | `/prompt-optimizer/guide` | ready                        |
| status                 | `/status`                 | ready, empty, error          |
| projects               | `/projects`               | ready, empty, error          |
| project                | `/project`                | ready, empty, error          |
| harness                | `/harness`                | ready, empty, error          |
| writer-api             | `/writer-api`             | ready, error                 |
| knowledge              | `/knowledge`              | ready, empty                 |
| history                | `/history`                | ready, empty                 |
| writer-sessions        | `/writer-sessions`        | ready, empty                 |
| errors                 | `/errors`                 | ready, empty, error          |
| traffic                | `/traffic`                | ready, empty                 |

Catalog code: `src/utils/storybook/awl/`. Manifest: `awlStorybookPageManifest.constant.ts`.

## Tests

`src/utils/storybook/pageStoryManifest.test.ts` keeps manifests aligned with render catalogs.
