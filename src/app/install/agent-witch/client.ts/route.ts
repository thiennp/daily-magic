import { readAgentWitchClientSource } from "@/lib/agentWitch/readAgentWitchClientSource";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const source = readAgentWitchClientSource();

  return new Response(source, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
