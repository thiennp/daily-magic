"use client";

import AwcProjectAccessMemberGrokWebhookForm from "@/features/projects/access/AwcProjectAccessMemberGrokWebhookForm";
import type { AwcMemberWakeLinksListProps } from "@/features/projects/access/hooks/useAwcProjectAccessWakeLinks";
import { resolveMemberWakeLinkState } from "@/features/projects/access/utils/resolveMemberWakeLinkState";

interface AwcProjectAccessMemberWakeLinkSlotProps {
  readonly projectId?: string;
  readonly member: {
    readonly id: string;
    readonly isAgent: boolean;
    readonly projectDisplayName: string | null;
    readonly wakeLinkSet?: boolean;
  };
  readonly wakeLinks?: AwcMemberWakeLinksListProps;
}

/** Bot rows only: the Grok wake link form, wired to deep-link focus + save. */
export default function AwcProjectAccessMemberWakeLinkSlot({
  projectId,
  member,
  wakeLinks,
}: AwcProjectAccessMemberWakeLinkSlotProps) {
  if (!member.isAgent || !projectId) {
    return null;
  }
  const request = wakeLinks?.request ?? null;
  const state = resolveMemberWakeLinkState(member, wakeLinks?.savedIds);
  return (
    <AwcProjectAccessMemberGrokWebhookForm
      projectId={projectId}
      membershipId={member.id}
      memberName={member.projectDisplayName}
      wakeLinkSet={state === "set"}
      openRequest={request?.membershipId === member.id ? request.nonce : 0}
      onSaved={wakeLinks?.onSaved}
    />
  );
}
