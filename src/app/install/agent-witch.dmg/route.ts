import { readAgentWitchDmgBytes } from "@/lib/agentWitch/resolveAgentWitchDmgFile";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const bytes = await readAgentWitchDmgBytes();
  if (bytes === null) {
    return Response.json(
      {
        error:
          "Agent Witch DMG is not published on this server yet. Run npm run agent-witch:dmg (copies to public/install/).",
      },
      { status: 404 },
    );
  }

  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/x-apple-diskimage",
      "Content-Disposition": 'attachment; filename="AgentWitch.dmg"',
      "Cache-Control": "no-store",
    },
  });
}
