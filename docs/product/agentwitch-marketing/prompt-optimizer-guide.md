# Prompt Optimizer — end-to-end

**Status:** [SHIPPED path]  
**Slug:** `prompt-optimizer-guide`  
**Audience:** anyone writing reusable agent prompts

## Prerequisites

Writers installed (`installedWriters`). Mac AWI / local client path as applicable. Empty writers = blocked playground.

## Four-step wizard

1. **Start cycle** — goal, working directory, writer / judge / runner
2. **Evaluate** — score, threshold, `passed`, readable judge reasons
3. **Separate** — topology (e.g. chain modules)
4. **`optimize_modules`** — trial modules; surface writer no-reply / timeout as **failure**

## Reuse

Export winners as **skills / Playbooks**; re-optimize when evaluate scores drop.

## Troubleshooting

- Empty writers — install before expecting Step 4 to finish
- Module timeout / interrupt / no_reply — failed kinds, not silent success
- Stuck writers — may escalate with SIGKILL

## Related

- [Optimizer scoring and billing](./optimizer-scoring-billing.md)
