import { prepareAgentWitchInstallScriptForShipping } from "@/lib/agentWitch/prepareAgentWitchInstallScriptForShipping";
import { readAgentWitchClientSource } from "@/lib/agentWitch/readAgentWitchClientSource";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const source = readAgentWitchClientSource();
  const shipped = await prepareAgentWitchInstallScriptForShipping({
    scriptName: "agent-witch.ts",
    source,
  });

  return new Response(shipped, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
