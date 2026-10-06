import { isAllowedAppHttpOrigin } from "@/lib/app/isAllowedAppHttpOrigin";
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

  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error ?? Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userCode = await readUserCode(request);
  const outcome = await denyDeviceAuthorization({
    userCode,
    ownerUserId: actor.id,
    ipHash: hashAgentAccessClientIp(readClientIp(request)),
  });

  const wantsHtml = (request.headers.get("accept") ?? "").includes("text/html");
  if (!outcome.ok) {
    if (wantsHtml) {
      return Response.redirect(
        new URL(
          `/device/verify?user_code=${encodeURIComponent(userCode)}&error=${encodeURIComponent(outcome.code)}`,
          request.url,
        ),
        303,
      );
    }
    return Response.json(
      { ok: false, error: outcome.error, code: outcome.code },
      { status: outcome.status },
    );
  }

  if (wantsHtml) {
    return Response.redirect(
      new URL(
        `/device/verify?user_code=${encodeURIComponent(userCode)}&done=denied`,
        request.url,
      ),
      303,
    );
  }

  return Response.json({ ok: true });
}
