# Marketplace install is project-scoped

## Query aliases

- marketplace install project required
- harness only in project not global
- usage guide workflow agent marketplace

## Short answer

Official and teammate **marketplace install** requires **`projectId`** plus **`deviceId`**. Cloud saves the capability to library and writes **`project_components`** bindings (workflow/agent + harness slug). UI shows a **How to use** guide per listing. Playbook files land in the **project repo** after Mac **pull into repo**—not via `pushHarnessInstallBundleToDevice` for marketplace presets.

## Details

- API: `POST /api/marketplace/install` body `{ capabilityId, deviceId, projectId }`.
- Code: `bindMarketplaceInstallToProject`, `bindPublishedCapabilityHarnessToProject`.
- Writers documented in usage guides: Anthropic, OpenAI, Cursor, Google.
- Catalog expansion to **100** workflow/agent listings is tracked separately (batch presets); harness is not a separate marketplace product surface.

## Related

- [docs/guides/user-guide/07-capabilities-library-playbooks.md](../guides/user-guide/07-capabilities-library-playbooks.md)
- [docs/architecture/project-composition.md](../architecture/project-composition.md)
- [mac-harness-workflow-agent-dispatch.md](mac-harness-workflow-agent-dispatch.md)
