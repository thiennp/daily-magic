import { isValidElement, type ReactElement, type ReactNode } from "react";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { runWithHookSlots } from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import AwcProjectMembersInvitePendingList from "@/features/projects/members/AwcProjectMembersInvitePendingList";

export type InvitePendingListProps = Parameters<typeof AwcProjectMembersInvitePendingList>[0];

export const pendingInvite = (inviteId: string, copyAvailable: boolean): AwcProjectAccessInvite => ({
  inviteId,
  createdAt: "2026-10-07T18:00:00.000Z",
  expiresAt: "2026-10-14T18:00:00.000Z",
  revokedAt: null,
  maxUses: 1,
  usesRemaining: 1,
  teamLabel: null,
  scopes: [],
  autoApprove: false,
  copyAvailable,
});

/** Plain-function render with hook slots (no DOM in this repo's vitest). */
export const renderPendingListTree = (props: InvitePendingListProps): ReactElement =>
  runWithHookSlots(() => AwcProjectMembersInvitePendingList(props));

type CopyButton = ReactElement<{ onClick: () => void; children: ReactNode }>;

/** The Copy again button of one row, found by walking the rendered tree. */
export const findCopyButton = (node: ReactNode, inviteId: string): CopyButton | null => {
  if (Array.isArray(node)) {
    for (const child of node) {
      const hit = findCopyButton(child, inviteId);
      if (hit) return hit;
    }
    return null;
  }
  if (!isValidElement(node)) return null;
  const props = node.props as Record<string, unknown>;
  if (props["data-invite-copy"] === inviteId) return node as CopyButton;
  return findCopyButton(props.children as ReactNode, inviteId);
};

export const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));
