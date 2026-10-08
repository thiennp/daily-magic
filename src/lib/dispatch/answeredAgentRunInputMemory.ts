import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

/** Heartbeats sent before the host saw the answer still say awaitingInput. */
export const ANSWERED_INPUT_HEARTBEAT_GRACE_MS = 30_000;
/** A host that re-asks the same thing this soon missed the answer. */
export const ANSWERED_INPUT_REPLAY_WINDOW_MS = 120_000;

interface AnsweredAgentRunInput {
  readonly question: string;
  readonly answeredAtMs: number;
  readonly respondMessage: AgentWitchMessage;
}

const normalize = (text: string): string =>
  text.replace(/\s+/g, " ").trim().toLowerCase();

/**
 * 2a17ba21 (4fe3657c follow-up A): after an answer the server must not
 * re-show the ask. It keeps the last answer per run briefly so a late
 * `awaitingInput` heartbeat is not forwarded and a re-sent ask (the host
 * reconnected before the answer reached it) gets the same answer again
 * instead of reopening "Waiting on you".
 */
export class AnsweredAgentRunInputMemory {
  private readonly byRunId = new Map<string, AnsweredAgentRunInput>();

  remember(
    agentRunId: string,
    question: string,
    respondMessage: AgentWitchMessage,
    nowMs: number = Date.now(),
  ): void {
    this.byRunId.set(agentRunId, {
      question: normalize(question),
      answeredAtMs: nowMs,
      respondMessage,
    });
  }

  isInHeartbeatGrace(agentRunId: string, nowMs: number = Date.now()): boolean {
    const answered = this.byRunId.get(agentRunId);
    return (
      answered !== undefined &&
      nowMs - answered.answeredAtMs <= ANSWERED_INPUT_HEARTBEAT_GRACE_MS
    );
  }

  /** The stored answer when this ask repeats one just answered, else null. */
  findReplayAnswer(
    agentRunId: string,
    question: string,
    nowMs: number = Date.now(),
  ): AgentWitchMessage | null {
    const answered = this.byRunId.get(agentRunId);
    if (
      answered === undefined ||
      nowMs - answered.answeredAtMs > ANSWERED_INPUT_REPLAY_WINDOW_MS ||
      answered.question !== normalize(question)
    ) {
      return null;
    }
    return answered.respondMessage;
  }
}

export const answeredAgentRunInputMemory = new AnsweredAgentRunInputMemory();
