import { NextResponse } from "next/server";

/**
 * Mac↔cloud transport is WebSocket-only. HTTP poll is retired.
 */
export async function POST(): Promise<Response> {
  return NextResponse.json(
    {
      ok: false,
      error:
        "Agent Witch Mac transport is WebSocket-only. Use wss://…/api/agent-witch/ws.",
      deprecated: true,
    },
    { status: 410 },
  );
}
