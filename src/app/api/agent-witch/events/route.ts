import {
  resolveDashboardStreamStartSeq,
  waitForDashboardUserEvents,
} from "@/lib/agentWitch/agentWitchDashboardEventStream";
import { registerHttpDashboardWitchClient } from "@/lib/agentWitch/registerHttpDashboardWitchClient";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Browser SSE stream of hub→dashboard events (replaces WebSocket). */
export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  registerHttpDashboardWitchClient({
    userId: actor.id,
    email: actor.email,
  });

  const encoder = new TextEncoder();
  const startCursor = resolveDashboardStreamStartSeq(
    actor.id,
    request.headers.get("last-event-id"),
  );

  const abortController = new AbortController();
  request.signal.addEventListener("abort", () => {
    abortController.abort();
  });

  const stream = new ReadableStream({
    start: (controller) => {
      const position = { cursor: startCursor };
      // 33512877: send bytes at once so proxies flush the headers and the
      // browser opens the stream now, not at the first event or keepalive.
      controller.enqueue(encoder.encode("retry: 2000\n: connected\n\n"));

      const push = async (): Promise<void> => {
        while (!abortController.signal.aborted) {
          const events = await waitForDashboardUserEvents(
            actor.id,
            position.cursor,
            25_000,
            abortController.signal,
          );

          if (abortController.signal.aborted) {
            break;
          }

          if (events.length === 0) {
            try {
              controller.enqueue(encoder.encode(": keepalive\n\n"));
            } catch {
              abortController.abort();
              break;
            }
            continue;
          }

          try {
            for (const event of events) {
              controller.enqueue(
                encoder.encode(`id: ${event.seq}\ndata: ${event.raw}\n\n`),
              );
              position.cursor = event.seq;
            }
          } catch {
            abortController.abort();
            break;
          }
        }
      };

      void push().catch(() => {
        abortController.abort();
        try {
          controller.close();
        } catch {
          // already closed
        }
      });
    },
    cancel: () => {
      abortController.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
