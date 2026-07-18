import { pollDashboardUserEvent } from "@/lib/agentWitch/agentWitchDashboardEventBuffer";
import { registerHttpDashboardWitchClient } from "@/lib/agentWitch/registerHttpDashboardWitchClient";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Browser SSE stream of hub→dashboard events (replaces WebSocket). */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  registerHttpDashboardWitchClient({
    userId: actor.id,
    email: actor.email,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start: (controller) => {
      const poll = { active: true };

      const push = async (): Promise<void> => {
        while (poll.active) {
          const event = await pollDashboardUserEvent(actor.id, 25_000);
          if (!poll.active) {
            return;
          }

          if (event === null) {
            controller.enqueue(encoder.encode(": keepalive\n\n"));
            continue;
          }

          controller.enqueue(encoder.encode(`data: ${event.raw}\n\n`));
        }
      };

      void push().catch(() => {
        poll.active = false;
        try {
          controller.close();
        } catch {
          // already closed
        }
      });

      return () => {
        poll.active = false;
      };
    },
    cancel: () => undefined,
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
