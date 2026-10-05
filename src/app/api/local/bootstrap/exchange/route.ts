import { exchangeMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode";
import { MAC_BOOTSTRAP_ERROR_SLUG } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const readExchangeBody = async (
  request: Request,
): Promise<{
  readonly code: string;
  readonly state: string;
  readonly codeVerifier: string;
} | null> => {
  try {
    const body: unknown = await request.json();
    if (body === null || typeof body !== "object") {
      return null;
    }
    const record = body as Record<string, unknown>;
    const code = typeof record.code === "string" ? record.code.trim() : "";
    const state = typeof record.state === "string" ? record.state.trim() : "";
    const codeVerifier =
      typeof record.code_verifier === "string"
        ? record.code_verifier.trim()
        : typeof record.codeVerifier === "string"
          ? record.codeVerifier.trim()
          : "";
    if (code.length === 0 || state.length === 0 || codeVerifier.length === 0) {
      return null;
    }
    return { code, state, codeVerifier };
  } catch {
    return null;
  }
};

export async function POST(request: Request): Promise<Response> {
  const parsed = await readExchangeBody(request);
  if (parsed === null) {
    return Response.json(
      { error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_body },
      { status: 400, headers: NO_STORE },
    );
  }

  const result = await exchangeMacBootstrapCode(parsed);
  if (!result.ok) {
    return Response.json(
      { error: result.error },
      { status: result.status, headers: NO_STORE },
    );
  }

  return Response.json(
    {
      installToken: result.installToken,
      profileEmail: result.profileEmail,
      scriptUrl: result.scriptUrl,
      scriptSha256: result.scriptSha256,
    },
    { headers: NO_STORE },
  );
}
