---
name: command-npm-install-and-audit
description: Root dependency install and audit via ./npm.sh (local .npmrc workflow)
---

Run from the **repository root** (not under `.agents/tools/rag`).

## Command

```text
./npm.sh
```

This script temporarily applies **`.npmrc.local`**, runs **`pnpm i`**, restores the original **`.npmrc`**, then runs **`pnpm audit`**. Use this instead of bare **`pnpm install`** at the root when **`.npmrc.local`** exists (see **`.cursor/rules/rules-bundle-core.mdc`** § 6b).

Run it **after** editing root **`package.json`**, **`pnpm-lock.yaml`**, or root **`.npmrc`** so those changes are validated through install + audit before commit.

If execution is denied, use **`bash ./npm.sh`** as the command instead.
