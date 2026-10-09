import { renderLocalWakeDeprecatedInstallScript } from "@/lib/agentWitch/localWake/renderLocalWakeDeprecatedInstallScript";

export const dynamic = "force-dynamic";

/** Legacy URL — local wake receiver (cloudflared) is deprecated; script exits 1 with poll guidance. */
export async function GET(): Promise<Response> {
  return new Response(renderLocalWakeDeprecatedInstallScript(), {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
