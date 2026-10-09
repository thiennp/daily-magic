import { LOCAL_WAKE_RECEIVER_PART_1 } from "@/lib/agentWitch/localWake/localWakeReceiverCore";
import { LOCAL_WAKE_RECEIVER_PART_2 } from "@/lib/agentWitch/localWake/localWakeReceiverServer";
import { LOCAL_WAKE_RECEIVER_PART_3 } from "@/lib/agentWitch/localWake/localWakeReceiverTunnel";

/**
 * Source of the local wake receiver that `/install/agent-witch-local-wake.sh` writes to
 * `~/.agent-witch/local-wake/<projectId>/receiver.mjs`.
 *
 * One Node process: HTTP server (127.0.0.1) + cloudflared quick tunnel + registration of the
 * tunnel URL with `register_project_webhook`. A wake runs the user's `wakeCommand`.
 * The parts are plain JS without backticks or interpolation so they embed verbatim in a heredoc.
 */
export const LOCAL_WAKE_RECEIVER_SOURCE =
  LOCAL_WAKE_RECEIVER_PART_1 +
  LOCAL_WAKE_RECEIVER_PART_2 +
  LOCAL_WAKE_RECEIVER_PART_3;
