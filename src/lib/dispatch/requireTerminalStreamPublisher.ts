import { tryAcquireTerminalStreamSlot } from "@/lib/agentWitch/agentWitchStreamSlotManager";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import {
  authorizeTerminalStreamPublisher,
  type AuthorizeTerminalStreamPublisherResult,
} from "@/lib/dispatch/authorizeTerminalStreamPublisher";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { shouldReportInactiveTerminalStream } from "@/lib/dispatch/shouldReportInactiveTerminalStream";

type AuthorizedTerminalStreamPublisher = Extract<
  AuthorizeTerminalStreamPublisherResult,
  { readonly ok: true }
>;

export type RequireTerminalStreamPublisherResult =
  | AuthorizedTerminalStreamPublisher
  | { readonly ok: false; readonly error: AgentWitchMessage | null };

export const requireTerminalStreamPublisher = async (input: {
  readonly sender: AgentWitchHubClient | undefined;
  readonly runId: string;
  readonly requestId: string | undefined;
  readonly allowNonRunning?: boolean;
  readonly requireActiveSlot?: boolean;
}): Promise<RequireTerminalStreamPublisherResult> => {
  const authorization = await authorizeTerminalStreamPublisher(
    input.sender,
    input.runId,
    input.allowNonRunning === true ? { allowNonRunning: true } : undefined,
    input.requestId,
  );

  if (!authorization.ok) {
    return authorization;
  }

  // r323: a server restart or host reconnect drops the in-memory slot. The
  // authorized executor of a still-running run re-adopts it instead of
  // losing the rest of the run's output; another publisher is still refused.
  if (
    input.requireActiveSlot === true &&
    !tryAcquireTerminalStreamSlot(input.runId, authorization.publisher).accepted
  ) {
    return {
      ok: false,
      error: shouldReportInactiveTerminalStream(input.runId)
        ? buildDispatchError(
            "Terminal stream is not active for this run.",
            input.requestId,
          )
        : null,
    };
  }

  return authorization;
};
