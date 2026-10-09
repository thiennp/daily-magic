import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import { listAgentRunEvents } from "@/lib/dispatch/agentRunEventQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { readonly params: Promise<{ readonly runId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { runId } = await context.params;
  const run = await getAgentRunForParticipant(runId, actor.id);

  if (run === null) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }

  const requestUrl = new URL(request.url);
  const afterSeq = Number.parseInt(
    requestUrl.searchParams.get("afterSeq") ?? "0",
    10,
  );
  const safeAfterSeq =
    Number.isFinite(afterSeq) && afterSeq >= 0 ? afterSeq : 0;

  const encoder = new TextEncoder();
  const state: {
    closed: boolean;
    interval: ReturnType<typeof setInterval> | undefined;
  } = {
    closed: false,
    interval: undefined,
  };
  const closeOnce = (controller: ReadableStreamDefaultController): void => {
    if (state.closed) return;
    state.closed = true;
    controller.close();
  };
  const stream = new ReadableStream({
    start: async (controller) => {
      const cursor = { seq: safeAfterSeq };

      const pushEvents = async (): Promise<boolean> => {
        if (state.closed) return true;
        const events = await listAgentRunEvents(runId, cursor.seq);
        for (const event of events) {
          if (state.closed) return true;
          cursor.seq = event.seq;
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
          );
        }

        const latest = await getAgentRunForParticipant(runId, actor.id);
        const isTerminal =
          latest?.status === "completed" ||
          latest?.status === "failed" ||
          latest?.status === "denied" ||
          latest?.status === "expired";

        return isTerminal === true;
      };

      const done = await pushEvents().catch(() => true);
      if (done) {
        closeOnce(controller);
        return;
      }

      state.interval = setInterval(() => {
        void pushEvents()
          .then((finished) => finished)
          .catch(() => true)
          .then((finished) => {
            if (finished || state.closed) {
              clearInterval(state.interval);
              closeOnce(controller);
            }
          });
      }, 1000);
    },
    // The browser went away: stop polling the database for it.
    cancel: () => {
      state.closed = true;
      clearInterval(state.interval);
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
