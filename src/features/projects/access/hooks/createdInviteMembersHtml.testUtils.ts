import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import type { CreatedInviteBannerState } from "@/features/projects/access/hooks/createdInviteBanner.testUtils";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import AwcProjectMembersInviteBotsSection from "@/features/projects/members/AwcProjectMembersInviteBotsSection";

type SectionAccess = Parameters<typeof AwcProjectMembersInviteBotsSection>[0]["access"];

/** One unused invite as GET /access lists it. */
export const listed = (inviteId: string): AwcProjectAccessInvite =>
  ({
    inviteId,
    createdAt: "2026-10-07T18:00:00.000Z",
    expiresAt: "2026-10-14T18:00:00.000Z",
    revokedAt: null,
    maxUses: 1,
    usesRemaining: 1,
    teamLabel: null,
    scopes: [],
    autoApprove: false,
  }) as AwcProjectAccessInvite;

/** Members rail "Invite an assistant" markup for a banner state (actions stubbed). */
export const membersHtml = (
  banner: CreatedInviteBannerState,
  invites: readonly AwcProjectAccessInvite[],
): string =>
  renderToStaticMarkup(
    createElement(AwcProjectMembersInviteBotsSection, {
      projectId: "p1",
      access: {
        projectName: "AgentWitch",
        invites,
        createdInviteUrl: banner.createdInviteUrl,
        createdInviteToken: banner.createdInviteToken,
        createdInvitePlatform: banner.createdInvitePlatform,
        createdInviteJoinTypeId: banner.createdInviteJoinTypeId,
        createdInvitePrompts: banner.createdInvitePrompts,
        clearCreatedInviteBanner: () => undefined,
        createInvite: async () => undefined,
        revokeInvite: async () => undefined,
        turnOffAutoApprove: async () => undefined,
      } as unknown as SectionAccess,
    }),
  );
