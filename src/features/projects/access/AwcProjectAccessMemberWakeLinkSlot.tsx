"use client";

import AwcProjectAccessMemberDeliveryModeControl from "@/features/projects/access/AwcProjectAccessMemberDeliveryModeControl";
import AwcProjectAccessMemberGrokWebhookForm from "@/features/projects/access/AwcProjectAccessMemberGrokWebhookForm";
import type { AwcMemberWakeLinksListProps } from "@/features/projects/access/hooks/useAwcProjectAccessWakeLinks";
import {
  hasMemberWakeLink,
  resolveMemberDeliveryModeDisplay,
  resolveMemberWakeLinkState,
} from "@/features/projects/access/utils/resolveMemberWakeLinkState";

interface AwcProjectAccessMemberWakeLinkSlotProps {
  readonly projectId?: string;
  readonly member: {
    readonly id: string;
    readonly isAgent: boolean;
    readonly projectDisplayName: string | null;
    readonly wakeLinkSet?: boolean;
    readonly deliveryMode?: string;
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
  const savedIds = wakeLinks?.savedIds;
  const state = resolveMemberWakeLinkState(member, savedIds);
  const linkSet = hasMemberWakeLink(member, savedIds);
  return (
    <>
      {state === null ? null : (
        <AwcProjectAccessMemberDeliveryModeControl
          projectId={projectId}
          membershipId={member.id}
          memberName={member.projectDisplayName}
          deliveryMode={resolveMemberDeliveryModeDisplay(member, savedIds)}
          wakeLinkSet={linkSet}
        />
      )}
      <AwcProjectAccessMemberGrokWebhookForm
        projectId={projectId}
        membershipId={member.id}
        memberName={member.projectDisplayName}
        wakeLinkSet={linkSet}
        openRequest={request?.membershipId === member.id ? request.nonce : 0}
        onSaved={wakeLinks?.onSaved}
      />
    </>
  );
}
