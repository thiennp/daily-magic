import type { TerminalStreamPublisherAuthorization } from "@/lib/dispatch/authorizeTerminalStreamPublisher";

const MAX_CONCURRENT_TERMINAL_STREAMS = 1000;

interface TerminalStreamSlotRecord {
  readonly runId: string;
  readonly executorUserId: string;
  readonly executorDeviceId: string | null;
  readonly startedAt: number;
}

const activeStreams = new Map<string, TerminalStreamSlotRecord>();

export interface StreamSlotAcquireResult {
  readonly accepted: boolean;
  readonly activeStreams: number;
  readonly maxStreams: number;
  readonly retryAfterSeconds: number;
}

const publisherMatchesSlot = (
  slot: TerminalStreamSlotRecord,
  publisher: TerminalStreamPublisherAuthorization,
): boolean =>
  slot.executorUserId === publisher.executorUserId &&
  slot.executorDeviceId === publisher.executorDeviceId;

export const tryAcquireTerminalStreamSlot = (
  runId: string,
  publisher: TerminalStreamPublisherAuthorization,
): StreamSlotAcquireResult => {
  const existing = activeStreams.get(runId);

  if (existing !== undefined) {
    return {
      accepted: publisherMatchesSlot(existing, publisher),
      activeStreams: activeStreams.size,
      maxStreams: MAX_CONCURRENT_TERMINAL_STREAMS,
      retryAfterSeconds: 0,
    };
  }

  if (activeStreams.size >= MAX_CONCURRENT_TERMINAL_STREAMS) {
    return {
      accepted: false,
      activeStreams: activeStreams.size,
      maxStreams: MAX_CONCURRENT_TERMINAL_STREAMS,
      retryAfterSeconds: 30,
    };
  }

  activeStreams.set(runId, {
    runId,
    executorUserId: publisher.executorUserId,
    executorDeviceId: publisher.executorDeviceId,
    startedAt: Date.now(),
  });

  return {
    accepted: true,
    activeStreams: activeStreams.size,
    maxStreams: MAX_CONCURRENT_TERMINAL_STREAMS,
    retryAfterSeconds: 0,
  };
};

export const isTerminalStreamSlotOwnedBy = (
  runId: string,
  publisher: TerminalStreamPublisherAuthorization,
): boolean => {
  const slot = activeStreams.get(runId);
  return slot !== undefined && publisherMatchesSlot(slot, publisher);
};

export const releaseTerminalStreamSlot = (runId: string): void => {
  activeStreams.delete(runId);
};

export const getTerminalStreamSlotCount = (): number => activeStreams.size;

export const clearTerminalStreamSlotsForTests = (): void => {
  activeStreams.clear();
};
