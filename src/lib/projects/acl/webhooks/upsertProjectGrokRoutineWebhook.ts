import { writeProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/writeProjectGrokRoutineWebhook";

export type UpsertProjectGrokRoutineWebhookResult =
  | { readonly ok: true; readonly grokWebhookUrl: string }
  | {
      readonly ok: false;
      readonly code:
        | "forbidden"
        | "invalid_url"
        | "https_only"
        | "blocked_host"
        | "naming_required"
        | "invalid_bearer";
    };

/** Bot path (register_project_webhook): condition = the caller's own active membership. */
export const upsertProjectGrokRoutineWebhook = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly grokWebhookUrl: unknown;
  readonly grokWebhookBearer: unknown;
}): Promise<UpsertProjectGrokRoutineWebhookResult> => {
  const result = await writeProjectGrokRoutineWebhook({
    target: {
      projectId: input.projectId,
      by: "own_membership",
      userId: input.actorUserId,
    },
    grokWebhookUrl: input.grokWebhookUrl,
    grokWebhookBearer: input.grokWebhookBearer,
  });
  if (!result.ok) {
    return {
      ok: false,
      code: result.code === "not_found" ? "forbidden" : result.code,
    };
  }
  return result;
};
