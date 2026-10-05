import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

/** Create-invite choices, in button order. */
export const AWC_PROJECT_INVITE_PLATFORMS: readonly ProjectInvitePlatform[] = [
  "grok",
];

/** Owner-facing labels per invite platform (create button + created banner). */
export const AWC_PROJECT_INVITE_PLATFORM_COPY: Readonly<
  Record<
    ProjectInvitePlatform,
    { readonly create: string; readonly createdFor: string }
  >
> = {
  grok: {
    create: "Invite a Grok Bot",
    createdFor: "Grok Bot invite — this Copy prompt is for a Grok Bot.",
  },
  muse: {
    create: "Invite a Muse bot",
    createdFor: "Muse bot invite — this Copy prompt is for a Muse bot.",
  },
};
