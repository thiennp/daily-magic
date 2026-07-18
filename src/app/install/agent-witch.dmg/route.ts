import { isLocalAgentWitchHostname } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import {
  readAgentWitchDmgBytes,
  type AgentWitchDmgVariant,
} from "@/lib/agentWitch/resolveAgentWitchDmgFile";

export const dynamic = "force-dynamic";

const resolveDmgVariantFromRequest = (
  request: Request,
): AgentWitchDmgVariant => {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  const hostname = host.split(":")[0] ?? "";
  return isLocalAgentWitchHostname(hostname) ? "local" : "production";
};

export async function GET(request: Request): Promise<Response> {
  const variant = resolveDmgVariantFromRequest(request);
  const bytes = await readAgentWitchDmgBytes(variant);
  if (bytes === null) {
    const hint =
      variant === "local"
        ? "Run: AGENT_WITCH_DMG_ORIGIN=http://localhost:3000 npm run agent-witch:dmg"
        : "Run: npm run agent-witch:dmg (publishes public/install/AgentWitch.dmg)";
    return Response.json(
      {
        error: `Agent Witch DMG (${variant}) is not available on this server yet. ${hint}`,
      },
      { status: 404 },
    );
  }

  const filename =
    variant === "local" ? "AgentWitch-local.dmg" : "AgentWitch.dmg";

  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/x-apple-diskimage",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
