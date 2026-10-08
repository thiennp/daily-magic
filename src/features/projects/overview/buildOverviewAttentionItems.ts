import type { OverviewAttention } from "@/features/projects/overview/buildOverviewAttention";

export type OverviewAttentionItem =
  | { readonly kind: "run"; readonly count: number }
  | { readonly kind: "join"; readonly count: number }
  | { readonly kind: "skill"; readonly count: number }
  | {
      readonly kind: "unread";
      readonly assistantName: string;
      readonly membershipId: string | null;
    };

/**
 * "Needs your attention" rows, most actionable first: things waiting for the
 * owner's approval (runs, join requests), then unread messages.
 */
const buildOverviewAttentionItems = (input: {
  readonly pendingRunCount: number;
  readonly joinRequestCount: number;
  /** Pending "Save as skill?" questions (owner only). */
  readonly skillQuestionCount?: number;
  readonly unread: OverviewAttention | null;
}): readonly OverviewAttentionItem[] => [
  ...(input.pendingRunCount > 0
    ? [{ kind: "run", count: input.pendingRunCount } as const]
    : []),
  ...(input.joinRequestCount > 0
    ? [{ kind: "join", count: input.joinRequestCount } as const]
    : []),
  ...((input.skillQuestionCount ?? 0) > 0
    ? [{ kind: "skill", count: input.skillQuestionCount ?? 0 } as const]
    : []),
  ...(input.unread !== null
    ? [
        {
          kind: "unread",
          assistantName: input.unread.assistantName,
          membershipId: input.unread.membershipId,
        } as const,
      ]
    : []),
];

export default buildOverviewAttentionItems;
