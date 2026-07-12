import {
  isAgentWitchInstallScriptName,
  readAgentWitchInstallScriptSource,
} from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { readonly params: Promise<{ readonly scriptName: string }> },
): Promise<Response> {
  const { scriptName } = await context.params;

  if (!isAgentWitchInstallScriptName(scriptName)) {
    return new Response("Not found", { status: 404 });
  }

  const source = readAgentWitchInstallScriptSource(scriptName);

  return new Response(source, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
