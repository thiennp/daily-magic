import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const runtime = "nodejs";

const isHarnessWriterAgent = (value: string): value is HarnessWriterAgent =>
  (HARNESS_WRITER_AGENTS as readonly string[]).includes(value);

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const writerAgent =
    typeof body === "object" &&
    body !== null &&
    "writerAgent" in body &&
    typeof (body as { writerAgent: unknown }).writerAgent === "string"
      ? (body as { writerAgent: string }).writerAgent
      : "";

  if (!isHarnessWriterAgent(writerAgent)) {
    return NextResponse.json({ error: "Invalid writer" }, { status: 400 });
  }

  const hub = getAgentWitchHub();
  const agent = hub.findAgentClientForUser(actor.id);
  if (agent === undefined) {
    return NextResponse.json(
      {
        error: "Your Mac is offline. Open Agent Witch on the Mac and retry.",
      },
      { status: 409 },
    );
  }

  agent.send({
    type: AGENT_WITCH_MESSAGE_TYPES.WRITER_ENSURE,
    payload: { writerAgent },
  });

  return NextResponse.json({
    ok: true,
    queued: true,
    writerAgent,
    installed: false,
    loggedIn: false,
    message: "Ensure command sent to your Mac over WebSocket.",
  });
}
