import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { refreshDeviceAccessToken } from "@/lib/agentAccess/deviceCode/refreshDeviceAccessToken";
import { exchangeAuthorizationCode } from "@/lib/agentAccess/oauth/exchangeAuthorizationCode";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";

export const dynamic = "force-dynamic";

const readBody = async (request: Request): Promise<Record<string, unknown>> => {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    const out: Record<string, unknown> = {};
    form.forEach((value, key) => {
      if (typeof value === "string") out[key] = value;
    });
    return out;
  }
  const payload = await readBoundedAgentAccessBody(request);
  if (payload === "too_large") return { __too_large: true };
  if (payload !== null && typeof payload === "object") {
    return payload as Record<string, unknown>;
  }
  return {};
};

export async function POST(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);
  if (limited !== null) return limited;

  const body = await readBody(request);
  if (body.__too_large === true) return agentAccessTooLargeResponse();

  const grantType = typeof body.grant_type === "string" ? body.grant_type : "";

  if (grantType === "refresh_token") {
    const refreshToken =
      typeof body.refresh_token === "string" ? body.refresh_token : "";
    const outcome = await refreshDeviceAccessToken({ refreshToken });
    return Response.json(outcome.body, { status: outcome.status });
  }

  if (grantType === "authorization_code") {
    const outcome = await exchangeAuthorizationCode({
      code: typeof body.code === "string" ? body.code : "",
      redirectUri:
        typeof body.redirect_uri === "string" ? body.redirect_uri : "",
      clientId: typeof body.client_id === "string" ? body.client_id : "",
      clientSecret:
        typeof body.client_secret === "string" ? body.client_secret : null,
      codeVerifier:
        typeof body.code_verifier === "string" ? body.code_verifier : "",
    });
    return Response.json(outcome.body, { status: outcome.status });
  }

  return Response.json(
    {
      error: "unsupported_grant_type",
      error_description:
        'grant_type must be "authorization_code" or "refresh_token"',
    },
    { status: 400 },
  );
}
