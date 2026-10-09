import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const QA_DOC = `# What is X?

## Query aliases

- release notes workflow
- how to write release notes

## Short answer

Write release notes from merged pull requests. Keep them short.

## Steps

1. Collect merged pull requests since the last tag
2. Group them by feature area
3. Write one line per change
4. Ask a reviewer to read the draft
`;

export const COMMAND_DOC = `---
name: command-quick-commit
description: Quick commit with local verification
---

# Quick commit

1. Stage only your files
2. Run lint and typecheck
3. Commit with a conventional message
`;

export const POINTER_SKILL = `---
name: skill-pointers
description: Where to look
---

- [Commit command](../commands/command-quick-commit.md)
- [Rules](../rules/a.mdc)
- [Docs](../../docs/a.md)
`;

export const makeDocFolder = (
  files: Readonly<Record<string, string>>,
): string => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "docs-")));
  Object.entries(files).forEach(([rel, text]) => {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), text);
  });
  return root;
};
