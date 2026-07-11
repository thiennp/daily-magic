---
name: command-test-snapshot-codemod-bulk
description: >-
  Lists React TSX files without co-located tests and generates Vitest snapshot tests via TypeScript codemods. Use when bulk-adding component tests, closing snapshot coverage gaps, or when the user runs the component snapshot codemod workflow.
---

# Description

Lists React TSX files without co-located tests and generates Vitest snapshot tests via TypeScript codemods. Use when bulk-adding component tests, closing snapshot coverage gaps, or when the user runs the component snapshot codemod workflow.

# Component snapshot test codemod

## When to use

Adding **`*.test.tsx`** with **`createSnapshotRootElm`** patterns for components that lack tests (see **`.cursor/rules/rules-typescript-clean-code.mdc`**).

## Steps

1. From the repository root, list components missing tests (run once):

   ```bash
   npx tsx .agents/scripts/codemods/list-tsx-without-test.ts
   ```

2. For each path printed in step 1:

   ```bash
   npx tsx .agents/scripts/codemods/write-component-test.ts "<path>"
   ```

   Use the exact path from the list (repo-relative or absolute as emitted).

3. Each run creates or overwrites **`<ComponentName>.test.tsx`** next to the component. Review snapshots and apply **`@.cursor/skills/skill-post-change-verification/SKILL.md`** after batches.

## Scripts

- **`.agents/scripts/codemods/list-tsx-without-test.ts`**
- **`.agents/scripts/codemods/write-component-test.ts`**

See **`.agents/scripts/README.md`** for related codemods.

## Extended bulk run (all listed components)

1. **List** every `.tsx` component without a co-located test:  
   `npx tsx .agents/scripts/codemods/list-tsx-without-test.ts`
2. **For each path** in the output, run:  
   `npx tsx .agents/scripts/codemods/write-component-test.ts "<path>"`  
   (exact path from the list). Optionally report progress (N/M) and continue on per-file errors.
3. Follow conventions in **`@.cursor/commands/references/component-snapshot-codemod/bulk-all-components.md`** (snapshots as contracts; spot-check drift).

## Related

- **`@.cursor/commands/references/component-snapshot-codemod/bulk-all-components.md`**
