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
  const stream = new ReadableStream({
    start: async (controller) => {
      const cursor = { seq: safeAfterSeq };

      const pushEvents = async (): Promise<boolean> => {
        const events = await listAgentRunEvents(runId, cursor.seq);
        for (const event of events) {
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

      const done = await pushEvents();
      if (done) {
        controller.close();
        return;
      }

      const interval = setInterval(() => {
        void pushEvents().then((finished) => {
          if (finished) {
            clearInterval(interval);
            controller.close();
          }
        });
      }, 1000);
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
