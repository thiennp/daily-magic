import { prepareAgentWitchInstallScriptForShipping } from "@/lib/agentWitch/prepareAgentWitchInstallScriptForShipping";
import {
  isAgentWitchInstallScriptName,
  readAgentWitchInstallScriptSource,
} from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: {
    readonly params: Promise<{ readonly scriptName: readonly string[] }>;
  },
): Promise<Response> {
  const { scriptName } = await context.params;
  const scriptPath = scriptName.join("/");

  if (!isAgentWitchInstallScriptName(scriptPath)) {
    return new Response("Not found", { status: 404 });
  }

  const source = readAgentWitchInstallScriptSource(scriptPath);
  const shipped = await prepareAgentWitchInstallScriptForShipping({
    scriptName: scriptPath,
    source,
  });

  return new Response(shipped, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
