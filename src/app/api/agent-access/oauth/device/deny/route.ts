import {
  deviceVerifyMessageForErrorCode,
} from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { isAllowedAppHttpOrigin } from "@/lib/app/isAllowedAppHttpOrigin";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { requireAuth } from "@/lib/auth/requireAuth";
import { denyDeviceAuthorization } from "@/lib/agentAccess/deviceCode/denyDeviceAuthorization";
import {
  hashAgentAccessClientIp,
  readClientIp,
} from "@/lib/agentAccess/readClientIp";

export const dynamic = "force-dynamic";

const readUserCode = async (request: Request): Promise<string> => {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    const value = form.get("user_code");
    return typeof value === "string" ? value : "";
  }
  const json: unknown = await request.json().catch(() => null);
  if (
    json !== null &&
    typeof json === "object" &&
    typeof (json as { user_code?: unknown }).user_code === "string"
  ) {
    return (json as { user_code: string }).user_code;
  }
  return "";
};

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedAppHttpOrigin(request)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const wantsHtml = (request.headers.get("accept") ?? "").includes("text/html");
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    if (wantsHtml) {
      // Session expired: the verify page sends the browser to /login and back.
      const code = await readUserCode(request);
      return Response.redirect(
        new URL(`/device/verify?code=${encodeURIComponent(code)}`, resolveAppBaseUrl()),
        303,
      );
    }
    return error ?? Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userCode = await readUserCode(request);
  const outcome = await denyDeviceAuthorization({
    userCode,
    ownerUserId: actor.id,
    ipHash: hashAgentAccessClientIp(readClientIp(request)),
  });

  if (!outcome.ok) {
    if (wantsHtml) {
      return Response.redirect(
        new URL(
          `/device/verify?code=${encodeURIComponent(userCode)}&error=${encodeURIComponent(outcome.code)}`,
          resolveAppBaseUrl(),
        ),
        303,
      );
    }
    return Response.json(
      { ok: false, error: deviceVerifyMessageForErrorCode(outcome.code), code: outcome.code, detail: outcome.error },
      { status: outcome.status },
    );
  }

  if (wantsHtml) {
    return Response.redirect(
      new URL(
        `/device/verify?code=${encodeURIComponent(userCode)}&done=denied`,
        resolveAppBaseUrl(),
      ),
      303,
    );
  }

  return Response.json({ ok: true });
}
