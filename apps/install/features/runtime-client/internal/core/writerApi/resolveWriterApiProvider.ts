import type { HarnessWriterAgentId } from "../../../../../../../scripts/buildWriterCliInvocation";

import type { WriterApiProvider } from "./WriterApiProvider.constant";

export const resolveWriterApiProvider = (
  writerAgent: HarnessWriterAgentId,
): WriterApiProvider | null => {
  if (writerAgent === "claude-cli") {
    return "anthropic";
  }
  if (writerAgent === "codex") {
    return "openai";
  }
  if (writerAgent === "antigravity") {
    return "google";
  }
  return null;
};
