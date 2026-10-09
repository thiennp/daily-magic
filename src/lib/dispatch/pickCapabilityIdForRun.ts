import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";

/**
 * The capability stored on a run. One resolved by the dispatch checks is trusted; one that only
 * rode along in the request body must belong to the requester, otherwise a run (and its feedback)
 * could be attached to someone else's capability.
 */
export const pickCapabilityIdForRun = async (input: {
  readonly requesterUserId: string;
  readonly resolvedCapabilityId: string | null | undefined;
  readonly payloadCapabilityId: unknown;
}): Promise<string | null> => {
  if (input.resolvedCapabilityId) return input.resolvedCapabilityId;
  const claimed =
    typeof input.payloadCapabilityId === "string" &&
    input.payloadCapabilityId.length > 0
      ? input.payloadCapabilityId
      : null;
  if (claimed === null) return null;
  const capability = await getPublishedCapabilityById(claimed);
  return capability?.ownerUserId === input.requesterUserId ? claimed : null;
};
