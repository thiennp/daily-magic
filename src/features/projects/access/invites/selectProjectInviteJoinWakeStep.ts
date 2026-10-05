import { buildProjectInviteJoinMuseWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinMuseWebhookStep";
import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

const WAKE_STEP_BY_PLATFORM: Readonly<
  Record<ProjectInvitePlatform, () => readonly string[]>
> = {
  grok: buildProjectInviteJoinWakeWebhookStep,
  muse: buildProjectInviteJoinMuseWebhookStep,
};

/** Join selector — picks the step 7 (wake/webhook) builder for the platform.
 * Every other join step is shared. Unknown values fall back to Grok. */
export const selectProjectInviteJoinWakeStep = (
  platform: ProjectInvitePlatform = "grok",
): (() => readonly string[]) =>
  WAKE_STEP_BY_PLATFORM[platform] ?? buildProjectInviteJoinWakeWebhookStep;
