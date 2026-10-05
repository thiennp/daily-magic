import type { AwcProjectAccessFolderRef } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";

export type { OverviewSetupAction, OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";

export type OverviewSetupInput = {
  readonly members: readonly AccessMembershipView[];
  readonly folderRefs: readonly AwcProjectAccessFolderRef[];
  readonly repoUrlCount: number;
  readonly composition: ProjectCompositionCounts;
  readonly deviceDisplayName: string;
};

const botLabel = (member: AccessMembershipView): string =>
  member.projectDisplayName?.trim() ||
  member.displayName?.trim() ||
  member.teamLabel?.trim() ||
  "Bot";

const doneOr = (
  done: boolean,
  doneLabel: string,
  action: OverviewSetupStep["action"],
): OverviewSetupStep["action"] =>
  done ? { kind: "none", label: doneLabel } : action;

/** Map real access/composition/repo state into honest setup checklist rows. */
const buildOverviewSetupSteps = (
  input: OverviewSetupInput,
): readonly OverviewSetupStep[] => {
  const bots = input.members.filter((m) => m.isAgent);
  const humans = input.members.filter((m) => !m.isAgent);
  const device = input.deviceDisplayName.trim() || "Mac";
  const harness = input.composition.harness;
  const folders = input.folderRefs.length;
  const repos = input.repoUrlCount;

  return [
    {
      id: "create",
      title: C.setupCreateProject,
      hint: null,
      done: true,
      action: { kind: "none", label: C.setupDonePill },
    },
    {
      id: "bot",
      title: C.setupInviteBot,
      hint: C.setupInviteBotHint(bots.map(botLabel).join(", ")),
      done: bots.length > 0,
      action: doneOr(bots.length > 0, C.setupDonePill, {
        kind: "tab",
        tab: "team",
        label: C.setupInvite,
      }),
    },
    {
      id: "playbook",
      title: C.setupPlaybook,
      hint: harness > 0 ? C.setupPlaybookDoneHint(harness) : C.setupPlaybookHint(device),
      done: harness > 0,
      action: doneOr(harness > 0, C.setupDonePill, {
        kind: "mac",
        label: C.setupOpenOnMac,
      }),
    },
    {
      id: "folder",
      title: C.setupFolder,
      hint: folders > 0 ? C.setupFolderDoneHint(folders) : C.setupFolderHint,
      done: folders > 0,
      action: doneOr(folders > 0, C.setupDonePill, {
        kind: "tab",
        tab: "resources",
        label: C.setupAdd,
      }),
    },
    {
      id: "git",
      title: C.setupGit,
      hint: repos > 0 ? C.setupGitDoneHint(repos) : C.setupGitHint,
      done: repos > 0,
      optional: true,
      action: doneOr(repos > 0, C.setupDonePill, {
        kind: "tab",
        tab: "resources",
        label: C.setupAdd,
      }),
    },
    {
      id: "people",
      title: C.setupInvitePeople,
      hint: humans.length > 0 ? C.setupInvitePeopleDoneHint : C.setupInvitePeopleHint,
      done: humans.length > 0,
      action: doneOr(humans.length > 0, C.setupDonePill, {
        kind: "tab",
        tab: "team",
        label: C.setupInvite,
      }),
    },
  ];
};

export default buildOverviewSetupSteps;
