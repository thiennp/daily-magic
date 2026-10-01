# Performance audit (wave `perf-audit-1`)

One **full-catalog wave** after `product-audit-1`. One page at a time (`QUEUE_POST_COMPLETION_WAVES.md`).

## Goal

Catch issues a paying user feels as “slow” or “heavy” on that page in Storybook (proxy for production), not micro-benchmark vanity.

## Per page — reviewer A and B check

| Area               | What to verify                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **First paint**    | Ready story loads without long blank shell; loading story shows intentional skeleton, not flash of wrong layout                 |
| **Scroll**         | No jank on long pages (marketing, for-agents, library lists); sticky chrome does not repaint glitches                           |
| **Lists**          | Large fixtures still scroll smoothly; no runaway re-render feel (obvious duplicate network patterns in MSW console if observed) |
| **Images / icons** | No huge unoptimized assets in capture; `AppIcon` paths not broken                                                               |
| **Mobile AWC**     | Bottom nav + main content scroll; no horizontal overflow (`scrollWidth` vs viewport)                                            |
| **AWL**            | Desktop-only; panel resize does not trap focus or freeze scroll                                                                 |

## Evidence

- Capture round for the wave if prior round is stale after fixes.
- Optional: DevTools Performance snapshot or Lighthouse on Storybook iframe URL — attach path under `/opt/cursor/artifacts/storybook-waves/.../perf-audit-1/` when run.
- Review JSON: `role` field uses a dedicated `perf` pseudo-role in JSON (`reviewMethod: "agent"`, custom `role` not in record-agent — store under `perf-audit-1/*-reviewer-a.json` with `"role": "product"` **not** used; use `"auditType": "perf"` in review file until schema extended).

Until `record-agent` supports `perf`, **do not** write to `progress.json` roles; wave completion = all 34 pages have paired reviewer JSON in `perf-audit-1/`.

## Pass

- `scoreOverall` ≥ **95** both reviewers (performance allows slightly lower floor than copy/ux).
- **No `mustFix`:** blocking jank, overflow, or >3s obvious stall on ready story in VM capture conditions.

## Fixes

Product or Storybook fixture changes only when needed; prefer CSS/layout/list virtualization patterns already used in the repo.
