import { fetchAgentWitchLinkSession } from "@/lib/agentWitch/fetchAgentWitchLinkSession";
import { waitForLinkedMacDevice } from "@/lib/agentWitch/waitForLinkedMacDevice";

export { resolveAgentWitchWakeBaseUrlForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";

/** @deprecated Browser must not call Mac localhost; kept for legacy Mac helpers. */
export const canRequestLocalAgentWitchApi = (): boolean =>
  typeof window !== "undefined";

/**
 * Starts a cloud link session; the Mac completes claim over WS (account.link).
 * The browser only polls `/api/agent-witch/devices` — never localhost.
 */
export const linkLocalAgentToSignedInAccount = async (
  _appOrigin: string,
): Promise<{
  readonly ok: boolean;
  readonly email?: string;
  readonly errorMessage?: string;
}> => {
  void _appOrigin;
  const session = await fetchAgentWitchLinkSession();

  if (
    !session.ok ||
    session.linkToken === undefined ||
    session.profileEmail === undefined
  ) {
    return {
      ok: false,
      errorMessage:
        session.errorMessage ?? "Could not start account linking session.",
    };
  }

  const linked = await waitForLinkedMacDevice();
  if (!linked) {
    return {
      ok: false,
      errorMessage:
        "Waiting for your Mac to connect. Keep Agent Witch running on that Mac, then try again.",
    };
  }

  return { ok: true, email: session.profileEmail };
};
