# Cursor agent hooks

Mechanical repo checks run as **Cursor hooks** so agents do not need always-on rules repeating the same lint lists (saves context tokens). Git **Husky** hooks remain the commit gate.

Official reference: [cursor.com/docs/hooks](https://cursor.com/docs/hooks.md).

## Project config

| File                 | Role                                                     |
| -------------------- | -------------------------------------------------------- |
| `.cursor/hooks.json` | Event → command mapping                                  |
| `.cursor/hooks/*.sh` | Thin wrappers → `tsx` in `.agents/scripts/cursor-hooks/` |

## Events

| Event          | When                                  | What runs                                                                                             |
| -------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `sessionStart` | New Agent chat                        | One-line pointer: hooks enforce layout/architecture                                                   |
| `postToolUse`  | After `Write` / `StrReplace`          | `npm run cursor:architecture -- <edited src file>`                                                    |
| `stop`         | Agent loop ends (`status: completed`) | Architecture on changed `src/` files + `structure-validation --scope changes` (max 2 auto follow-ups) |

## Overlap with Husky

| Gate                       | Agent hook             | Husky pre-commit                                        |
| -------------------------- | ---------------------- | ------------------------------------------------------- |
| structure-validation       | `stop` (changes scope) | `validate:staged`                                       |
| architecture-check         | `postToolUse` + `stop` | `cursor:architecture --staged`                          |
| Agent Witch guide chapters | `postToolUse` + `stop` | `guideMaintenanceCheck.ts` (read/update `docs/guides/`) |
| ESLint / typecheck / tests | —                      | pre-commit / CI                                         |

## Local debugging

1. Cursor → **Customize → Hooks** and the **Hooks** output channel.
2. Simulate stdin: `echo '{"tool_name":"Write","tool_input":{"path":"'"$PWD"'/src/lib/foo.ts"},"cwd":"'"$PWD"'"}' | npx tsx .agents/scripts/cursor-hooks/postToolUseVerify.ts`
3. Stop hook: `echo '{"status":"completed","loop_count":0}' | npx tsx .agents/scripts/cursor-hooks/stopVerify.ts`

## Cloud agents

Project `.cursor/hooks.json` is included in the repo and runs on Cursor Cloud agents. User-level `~/.cursor/hooks.json` does not.

## Related

- [guardz-and-structure-validation.md](guardz-and-structure-validation.md)
- [quality-gates.md](../development/quality-gates.md)
- `.cursor/rules/rules-agent-hooks.mdc`
