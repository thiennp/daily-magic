import { createHash } from "node:crypto";

/** Stable key so the UI can drop stale goal suggestions when compose inputs change. */
export const computePromptSdlcGoalSuggestKey = (input: {
  readonly promptText: string;
  readonly folder: string;
  readonly judge: string;
}): string =>
  createHash("sha256")
    .update(
      [input.promptText.trim(), input.folder.trim(), input.judge.trim()].join(
        "\u001e",
      ),
    )
    .digest("hex")
    .slice(0, 16);
