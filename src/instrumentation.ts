/** Next boot hook. Node server only; the dynamic import keeps edge from loading it. */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }
  const { startProjectMessageSilenceTicker } = await import(
    "@/lib/cron/startProjectMessageSilenceTicker"
  );
  startProjectMessageSilenceTicker();
  const { startProjectUpdatedNotifyTicker } = await import(
    "@/lib/cron/startProjectUpdatedNotifyTicker"
  );
  startProjectUpdatedNotifyTicker();
}
