# Auto-skill reusability verification

Manual check that auto-generated skills stay reusable: no tickets, PRs, hashes,
urls, paths, ids or sender names; description differs from the name; no
duplicate of a skill the project already has.

Not in vitest, CI or git hooks (`*.verify.ts` is outside every include). Run
only when asked:

```bash
npx tsx .agents/verification/auto-skill-reusability/run.verify.ts
npx tsx .agents/verification/auto-skill-reusability/run.verify.ts --live "claude -p"
```

`--live` sends the real draft prompt to the command (prompt on stdin) and
validates the answer, so it also checks the prompt against a real model.
Fixtures are synthetic (`cases.ts`); keep real names and tickets out of them.
