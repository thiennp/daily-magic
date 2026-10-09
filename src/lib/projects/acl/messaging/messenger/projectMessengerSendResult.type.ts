import type { ProjectMessagePostDenyCode } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import type { BotMessageBlock } from "@/lib/projects/acl/messaging/decideBotIsolation";
import type { ProjectMessageRateLimitFailure } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";

export type ProjectMessengerSendFailureCode =
  | "not_found"
  | "forbidden"
  | ProjectMessagePostDenyCode
  | "invalid_arguments"
  | "summary_too_large"
  | "forbidden_content"
  | "thread_not_found"
  | "no_bots"
  | "single_recipient_required";

export type ProjectMessengerSendResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly threadKey: string;
      readonly recipientCount: number;
      /** Deliveries now under the 5/10 minute silence watch (accepted wakes). */
      readonly watchedCount: number;
    }
  | { readonly ok: false; readonly code: ProjectMessengerSendFailureCode }
  | {
      readonly ok: false;
      readonly code: BotMessageBlock;
      readonly message: string;
    }
  | ProjectMessageRateLimitFailure;
