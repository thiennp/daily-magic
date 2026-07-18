import { NextResponse } from "next/server";

/**
 * Mac↔cloud transport is WebSocket-only. HTTP message POST is retired for Macs.
 * Browser dashboard APIs remain on HTTPS elsewhere.
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
