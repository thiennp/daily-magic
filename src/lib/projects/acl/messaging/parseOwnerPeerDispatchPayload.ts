import {
  parseProjectDispatchPayload,
  type ParsedProjectDispatch,
} from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";

/**
 * Owner → peer payload: kind defaults to task.assign; exactly one of
 * toMembershipId | toProjectDisplayName (no teamLabel / Owner).
 */
export const parseOwnerPeerDispatchPayload = (
  args: unknown,
): ParsedProjectDispatch => {
  if (args === null || typeof args !== "object") {
    return { ok: false, code: "invalid_arguments" };
  }
  const body = args as Record<string, unknown>;
  const parsed = parseProjectDispatchPayload({
    ...body,
    kind:
      typeof body.kind === "string" && body.kind.trim().length > 0
        ? body.kind
        : "task.assign",
  });
  if (
    !parsed.ok ||
    parsed.toTeamLabel !== null ||
    (parsed.toMembershipId === null && parsed.toProjectDisplayName === null) ||
    (parsed.toMembershipId !== null && parsed.toProjectDisplayName !== null)
  ) {
    return { ok: false, code: parsed.ok ? "peer_required" : parsed.code };
  }
  if (
    parsed.toProjectDisplayName !== null &&
    parsed.toProjectDisplayName.trim().toLowerCase() === "owner"
  ) {
    return { ok: false, code: "peer_required" };
  }
  return parsed;
};
