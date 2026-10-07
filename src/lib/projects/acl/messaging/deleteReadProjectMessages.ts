import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { sweepProjectChatMessagePrune } from "@/lib/projects/acl/messaging/sweepProjectChatMessagePrune";

/**
 * Ticker/cron entry. Keep-300: no delete-on-read. Runs the chat prune sweep
 * instead. Export name kept so cron/ticker imports stay stable.
 */
export const deleteReadProjectMessages = async (): Promise<number> => {
  try {
    await ensureProjectAclSchema();
    return await sweepProjectChatMessagePrune();
  } catch (error: unknown) {
    console.error("project message prune-on-tick failed", {
      error: error instanceof Error ? error.message : "prune_on_tick_failed",
    });
    return 0;
  }
};
