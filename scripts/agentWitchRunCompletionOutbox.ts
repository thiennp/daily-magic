import fs from "node:fs";
import path from "node:path";

import {
  formatLocalCodingToolSafetyCopy,
  toOutboundRunText,
} from "@agent-witch/shared/dispatch";
import { rememberRunId } from "@agent-witch/install-runtime-client";

import {
  completeAgentRunOnCloud,
  type AgentWitchCloudApiConfig,
} from "./agentWitchCloudApi";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export interface AgentRunCompletionOutboxEntry {
  readonly runId: string;
  readonly exitCode: number;
  readonly output: string;
  readonly outcomeCode?: string | null;
  readonly createdAt: string;
  readonly estimateSeconds?: number;
  readonly actualSeconds?: number;
}

const OUTBOX_FILENAME = "run-completion-outbox.json";
/** S0-7c: runIds whose completion the cloud already accepted (bounded). */
const POSTED_LEDGER_FILENAME = "run-completion-posted.json";

const resolveProfileFilePath = (
  layout: AgentWitchLocalLayout,
  fileName: string,
): string => {
  const profileDir = layout.profileEmail
    ? path.join(layout.installDir, "profiles", layout.profileEmail)
    : layout.installDir;

  return path.join(profileDir, fileName);
};

const resolveOutboxPath = (layout: AgentWitchLocalLayout): string =>
  resolveProfileFilePath(layout, OUTBOX_FILENAME);

const readPostedRunIds = (layout: AgentWitchLocalLayout): readonly string[] => {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(resolveProfileFilePath(layout, POSTED_LEDGER_FILENAME), "utf8"),
    );
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
};

const markRunCompletionPosted = (
  layout: AgentWitchLocalLayout,
  runId: string,
): void => {
  const filePath = resolveProfileFilePath(layout, POSTED_LEDGER_FILENAME);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    JSON.stringify(rememberRunId(readPostedRunIds(layout), runId)),
    "utf8",
  );
};

/** True when this run's completion was already posted to the cloud. */
export const isAgentRunCompletionPosted = (
  layout: AgentWitchLocalLayout,
  runId: string,
): boolean => readPostedRunIds(layout).includes(runId);

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

const removeOutboxEntry = (
  layout: AgentWitchLocalLayout,
  runId: string,
): void => {
  writeOutbox(
    layout,
    readOutbox(layout).filter((item) => item.runId !== runId),
  );
};

/**
 * Queue a run completion for HTTP delivery. Output is scrubbed (S0-8) before
 * it is stored or posted; a run already posted is never queued again (S0-7c).
 */
export const enqueueAgentRunCompletionOutbox = (
  layout: AgentWitchLocalLayout,
  entry: AgentRunCompletionOutboxEntry,
): void => {
  if (isAgentRunCompletionPosted(layout, entry.runId)) {
    return;
  }
  const scrubbedEntry: AgentRunCompletionOutboxEntry = {
    ...entry,
    output: toOutboundRunText(
      entry.output,
      formatLocalCodingToolSafetyCopy("secretHidden"),
    ),
  };
  const next = [
    ...readOutbox(layout).filter((item) => item.runId !== entry.runId),
    scrubbedEntry,
  ];
  writeOutbox(layout, next);
};

const flushOnce = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly cloudApi: AgentWitchCloudApiConfig;
}): Promise<void> => {
  for (const entry of readOutbox(input.layout)) {
    if (isAgentRunCompletionPosted(input.layout, entry.runId)) {
      removeOutboxEntry(input.layout, entry.runId);
      continue;
    }
    const completed = await completeAgentRunOnCloud(
      input.cloudApi,
      entry.runId,
      entry.exitCode,
      entry.output,
      {
        estimateSeconds: entry.estimateSeconds,
        actualSeconds: entry.actualSeconds,
      },
    );
    if (completed) {
      markRunCompletionPosted(input.layout, entry.runId);
      // Re-read so entries queued during the POST are kept.
      removeOutboxEntry(input.layout, entry.runId);
    }
  }
};

const flushState: { chain: Promise<void> } = { chain: Promise.resolve() };

/**
 * Drain the outbox. Flushes are serialized in-process so two concurrent
 * drains can never POST the same run twice.
 */
export const flushAgentRunCompletionOutbox = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly cloudApi: AgentWitchCloudApiConfig | null;
}): Promise<void> => {
  const cloudApi = input.cloudApi;
  if (cloudApi === null) {
    return Promise.resolve();
  }
  const run = flushState.chain.then(() =>
    flushOnce({ layout: input.layout, cloudApi }),
  );
  flushState.chain = run.catch(() => undefined);
  return run;
};
