---
name: command-test-raise-unit-coverage
description: >-
  Comprehensive Unit Test Coverage Improvement Process
---

# Description

Orchestrator for raising unit-test coverage. Detailed phases live in **`references/unit-test-coverage/`**—start with **phase 01** for intent (meaningful coverage, not vanity percentages).

INSTRUCTIONS:
When you see this prompt with "do it" or ".", you should:

- [ ] Run current test suite and check coverage
- [ ] Identify files with lowest coverage
- [ ] Write comprehensive tests for the lowest coverage file
- [ ] **MANDATORY: Achieve 100% coverage for Statements, Branches, Functions, and Lines**
- [ ] Follow testing best practices and avoid unnecessary mocking
- [ ] **MANDATORY: Prettify all files before committing**
- [ ] Proceeding to next iteration

## Phased playbooks

Run phases in order under **`references/unit-test-coverage/`**.

| Phase                                  | Reference                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1 — Assessment & file selection        | `@.cursor/commands/references/unit-test-coverage/phase-01-initial-assessment-and-selection.md`     |
| 2 — Test writing & patterns            | `@.cursor/commands/references/unit-test-coverage/phase-02-test-writing-and-patterns.md`            |
| 3 — Execution & quality                | `@.cursor/commands/references/unit-test-coverage/phase-03-execution-and-quality.md`                |
| 4 — Prettify, confirmation, iteration  | `@.cursor/commands/references/unit-test-coverage/phase-04-prettify-confirmation-and-loop.md`       |
| 5 — Best practices, examples, pitfalls | `@.cursor/commands/references/unit-test-coverage/phase-05-best-practices-examples-and-pitfalls.md` |
