import fs from "node:fs";
import path from "node:path";

import { scrubOutboundRunFrame } from "@agent-witch/install-runtime-client";

import { isAgentRunCompletionPosted } from "./agentWitchRunCompletionOutbox";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const PENDING_FILENAME = "pending-run-result-deliveries.json";

export interface PendingRunResultDelivery {
  readonly runId: string;
  readonly resultMessage: Record<string, unknown>;
  readonly terminalEndMessage?: Record<string, unknown>;
  readonly createdAt: string;
}

const resolvePendingPath = (layout: AgentWitchLocalLayout): string => {
  const profileDir = layout.profileEmail
    ? path.join(layout.installDir, "profiles", layout.profileEmail)
    : layout.installDir;
  return path.join(profileDir, PENDING_FILENAME);
};

const readPending = (
  layout: AgentWitchLocalLayout,
): readonly PendingRunResultDelivery[] => {
  const filePath = resolvePendingPath(layout);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (entry): entry is PendingRunResultDelivery =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as PendingRunResultDelivery).runId === "string" &&
        typeof (entry as PendingRunResultDelivery).createdAt === "string" &&
        typeof (entry as PendingRunResultDelivery).resultMessage === "object",
    );
  } catch {
    return [];
  }
};

const writePending = (
  layout: AgentWitchLocalLayout,
  entries: readonly PendingRunResultDelivery[],
): void => {
  const filePath = resolvePendingPath(layout);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), "utf8");
};

export const persistPendingRunResultDelivery = (
  layout: AgentWitchLocalLayout,
  delivery: PendingRunResultDelivery,
): void => {
  if (isAgentRunCompletionPosted(layout, delivery.runId)) {
    return;
  }
  const next = [
    ...readPending(layout).filter((item) => item.runId !== delivery.runId),
    delivery,
  ];
  writePending(layout, next);
};

export const removePendingRunResultDelivery = (
  layout: AgentWitchLocalLayout,
  runId: string,
): void => {
  writePending(
    layout,
    readPending(layout).filter((item) => item.runId !== runId),
  );
};

export const flushPendingRunResultDeliveries = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly send: (message: Record<string, unknown>) => void;
}): void => {
  for (const delivery of readPending(input.layout)) {
    if (isAgentRunCompletionPosted(input.layout, delivery.runId)) {
      removePendingRunResultDelivery(input.layout, delivery.runId);
      continue;
    }
    input.send(scrubOutboundRunFrame(delivery.resultMessage));
    if (delivery.terminalEndMessage !== undefined) {
      input.send(scrubOutboundRunFrame(delivery.terminalEndMessage));
    }
  }
};
