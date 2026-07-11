---
name: skill-testing-extended-patterns
description: >-
  Index for extended Vitest mocking and utility-test drills under command references; authoritative policy stays in rules-bundle-testing.mdc.
---

# Testing patterns (extended)

Authoritative gates and mock boundaries live in **`rules-bundle-testing.mdc`**.

Detailed cookbooks (patterns only—no duplicate policy):

| Topic                                             | Reference                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| Module mocks, dependency isolation, `vi.hoisted`  | **`@.cursor/commands/references/testing-extended/mock-and-import-patterns.md`** |
| `setGlobal` / `getGlobal`, timers, storage mocks  | **`@.cursor/commands/references/testing-extended/global-browser-mocking.md`**   |
| Triaging failing tests and expectation mismatches | **`@.cursor/commands/references/testing-extended/failure-resolution.md`**       |
| Utility coverage focus                            | **`@.cursor/commands/references/testing-extended/utility-coverage.md`**         |

Index of files: **`@.cursor/commands/references/testing-extended/README.md`**.

**Window mocking:** prefer **`setGlobal`** / **`getGlobal`** from root **`setupTest.tsx`**. Avoid wholesale `Object.defineProperty(global, "window", …)` unless a documented harness requires it.

Executable workflows: **`command-README.md`**, **`command-verify-post-change-lint-typecheck-tests.md`** (under **`@.cursor/commands/`**).
