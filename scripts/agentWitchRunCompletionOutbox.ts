import fs from "node:fs";
import path from "node:path";

import {
  completeAgentRunOnCloud,
  type AgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export interface AgentRunCompletionOutboxEntry {
  readonly runId: string;
  readonly exitCode: number;
  readonly output: string;
  readonly createdAt: string;
}

const OUTBOX_FILENAME = "run-completion-outbox.json";

const resolveOutboxPath = (layout: AgentWitchLocalLayout): string => {
  const profileDir = layout.profileEmail
    ? path.join(layout.installDir, "profiles", layout.profileEmail)
    : layout.installDir;

  return path.join(profileDir, OUTBOX_FILENAME);
};

const readOutbox = (
  layout: AgentWitchLocalLayout,
): readonly AgentRunCompletionOutboxEntry[] => {
  const filePath = resolveOutboxPath(layout);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (entry): entry is AgentRunCompletionOutboxEntry =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as AgentRunCompletionOutboxEntry).runId === "string" &&
        typeof (entry as AgentRunCompletionOutboxEntry).exitCode === "number" &&
        typeof (entry as AgentRunCompletionOutboxEntry).output === "string" &&
        typeof (entry as AgentRunCompletionOutboxEntry).createdAt === "string",
    );
  } catch {
    return [];
  }
};

const writeOutbox = (
  layout: AgentWitchLocalLayout,
  entries: readonly AgentRunCompletionOutboxEntry[],
): void => {
  fs.mkdirSync(path.dirname(resolveOutboxPath(layout)), { recursive: true });
  fs.writeFileSync(
    resolveOutboxPath(layout),
    JSON.stringify(entries, null, 2),
    "utf8",
  );
};

export const enqueueAgentRunCompletionOutbox = (
  layout: AgentWitchLocalLayout,
  entry: AgentRunCompletionOutboxEntry,
): void => {
  const next = [
    ...readOutbox(layout).filter((item) => item.runId !== entry.runId),
    entry,
  ];
  writeOutbox(layout, next);
};

export const flushAgentRunCompletionOutbox = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly cloudApi: AgentWitchCloudApiConfig | null;
}): Promise<void> => {
  if (input.cloudApi === null) {
    return;
  }

  const pending = readOutbox(input.layout);
  if (pending.length === 0) {
    return;
  }

  const remaining: AgentRunCompletionOutboxEntry[] = [];

  for (const entry of pending) {
    const completed = await completeAgentRunOnCloud(
      input.cloudApi,
      entry.runId,
      entry.exitCode,
      entry.output,
    );

    if (!completed) {
      remaining.push(entry);
    }
  }

  writeOutbox(input.layout, remaining);
};
