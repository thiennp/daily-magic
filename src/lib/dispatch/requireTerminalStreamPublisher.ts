import { isTerminalStreamSlotOwnedBy } from "@/lib/agentWitch/agentWitchStreamSlotManager";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import {
  authorizeTerminalStreamPublisher,
  type AuthorizeTerminalStreamPublisherResult,
} from "@/lib/dispatch/authorizeTerminalStreamPublisher";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

type AuthorizedTerminalStreamPublisher = Extract<
  AuthorizeTerminalStreamPublisherResult,
  { readonly ok: true }
>;

export type RequireTerminalStreamPublisherResult =
  | AuthorizedTerminalStreamPublisher
  | { readonly ok: false; readonly error: AgentWitchMessage };

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

  if (
    input.requireActiveSlot === true &&
    !isTerminalStreamSlotOwnedBy(input.runId, authorization.publisher)
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        "Terminal stream is not active for this run.",
        input.requestId,
      ),
    };
  }

  return authorization;
};
