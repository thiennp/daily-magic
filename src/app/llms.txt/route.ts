import { formatAgentAccessLlmsText } from "@/lib/agentAccess/formatAgentAccessLlmsText";

export const dynamic = "force-dynamic";

export function GET(): Response {
  return new Response(formatAgentAccessLlmsText(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
