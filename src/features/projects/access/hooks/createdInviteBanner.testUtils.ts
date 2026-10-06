import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { runWithHookSlots } from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import { useAwcProjectInviteActions as inviteActionsHook } from "@/features/projects/access/hooks/useAwcProjectInviteActions";
import { useCreatedInviteBanner as createdInviteBannerHook } from "@/features/projects/access/hooks/useCreatedInviteBanner";
import AwcProjectInvitesPanel from "@/features/projects/access/invites/AwcProjectInvitesPanel";

export type CreatedInviteBannerState = ReturnType<
  typeof createdInviteBannerHook
>;

/** One "render" of the banner hook with persisted slots. */
export const renderBanner = (): CreatedInviteBannerState =>
  runWithHookSlots(createdInviteBannerHook);

/** Invite actions wired to the banner setters, as useAwcProjectAccess does. */
export const actionsFor = (banner: CreatedInviteBannerState) =>
  inviteActionsHook({
    projectId: "p1",
    reload: async () => undefined,
    setMessage: () => undefined,
    setCreatedInviteUrl: banner.setCreatedInviteUrl,
    setCreatedInviteToken: banner.setCreatedInviteToken,
    setCreatedInviteId: banner.setCreatedInviteId,
  });

/** Real panel markup for that banner state (shows the created banner label). */
export const panelHtml = (banner: CreatedInviteBannerState): string =>
  renderToStaticMarkup(
    createElement(AwcProjectInvitesPanel, {
      invites: [],
      createdInviteUrl: banner.createdInviteUrl,
      createdInviteToken: banner.createdInviteToken,
      createdInvitePlatform: banner.createdInvitePlatform,
      createdInviteJoinTypeId: banner.createdInviteJoinTypeId,
      projectId: "p1",
      onCreate: () => undefined,
      onRevoke: () => undefined,
      onClearCreatedUrl: () => undefined,
    }),
  );
