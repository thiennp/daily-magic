import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

/** Owner-facing created-banner line per invite platform (Copy prompt target). */
export const AWC_PROJECT_INVITE_PLATFORM_COPY: Readonly<
  Record<ProjectInvitePlatform, { readonly createdFor: string }>
> = {
  grok: {
    createdFor: "Grok Bot invite — this Copy prompt is for a Grok Bot.",
  },
  muse: {
    createdFor: "Muse invite — this Copy prompt is for Muse.",
  },
};
