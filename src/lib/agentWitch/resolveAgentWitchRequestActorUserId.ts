import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "@/lib/agentWitch/agentWitchDeviceAuth.constant";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { requireAuth } from "@/lib/auth/requireAuth";

const hasDeviceToken = (request: Request): boolean => {
  const header = request.headers.get(AGENT_WITCH_PAIRING_TOKEN_HEADER)?.trim();
  const authorization = request.headers.get("authorization")?.trim() ?? "";
  return (
    (header !== undefined && header.length > 0) ||
    authorization.toLowerCase().startsWith("bearer ")
  );
};

/**
 * Acting user for project routes callable by AWL and the AWC UI: the paired
 * device's user when a device token is sent, else the signed-in session user.
 * Returns the 401 Response on failure. Callers still apply project ACL.
 */
export const resolveAgentWitchRequestActorUserId = async (
  request: Request,
): Promise<string | Response> => {
  if (hasDeviceToken(request)) {
    const auth = await requireAgentWitchDeviceAuth(request);
    return auth instanceof Response ? auth : auth.device.userId;
  }
  const { actor, error } = await requireAuth();
  if (error !== null || actor === null) {
    return error ?? Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return actor.id;
};
