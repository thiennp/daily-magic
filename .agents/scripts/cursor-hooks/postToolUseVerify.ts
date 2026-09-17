#!/usr/bin/env tsx
/**
 * Cursor postToolUse hook: inject architecture violations after Write/StrReplace.
 * Stdin: postToolUse JSON. Stdout: { "additional_context"?: string }.
 */
import { emitAdditionalContext } from "./emitHookJson";
import {
  readHookInput,
  resolveEditedFilePath,
  type PostToolUseInput,
} from "./readHookInput";
import {
  runArchitectureOnFile,
  shouldArchitectureCheck,
  toRepoRelativePath,
} from "./runArchitectureOnFile";

const MAX_CONTEXT_CHARS = 6000;

const truncate = (text: string): string =>
  text.length <= MAX_CONTEXT_CHARS
    ? text
    : `${text.slice(0, MAX_CONTEXT_CHARS)}\n…(truncated)`;

const main = (): void => {
  const input = readHookInput<PostToolUseInput>();
  const toolName = input.tool_name ?? "";
  if (toolName !== "Write" && toolName !== "StrReplace") {
    emitAdditionalContext("");
    return;
  }

  const absolutePath = resolveEditedFilePath(input);
  if (absolutePath === null) {
    emitAdditionalContext("");
    return;
  }

  const repoRelative = toRepoRelativePath(absolutePath, input.cwd);
  if (repoRelative === null || !shouldArchitectureCheck(repoRelative)) {
    emitAdditionalContext("");
    return;
  }

  const failure = runArchitectureOnFile(repoRelative);
  if (failure === null) {
    emitAdditionalContext("");
    return;
  }

  emitAdditionalContext(
    truncate(
      `[Cursor hook: architecture-check] Fix before continuing:\n\n${failure}`,
    ),
  );
};

main();
