import type { AwcProjectAccessFolderRef } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";
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
};

const label = (m: AccessMembershipView): string =>
  m.projectDisplayName?.trim() || m.displayName?.trim() || m.teamLabel?.trim() || "Assistant";

const doneOr = (
  done: boolean,
  action: OverviewSetupStep["action"],
): OverviewSetupStep["action"] =>
  done ? { kind: "none", label: C.setupDonePill } : action;

/** Done steps stay listed (needle 3). Actions → live Members rail / tabs / Edit. */
const buildOverviewSetupSteps = (
  input: OverviewSetupInput,
): readonly OverviewSetupStep[] => {
  const assistants = input.members.filter(
    (m) => m.isAgent && !isComputerAccessMember(m),
  );
  const humans = input.members.filter((m) => !m.isAgent);
  const harness = input.composition.harness;
  const folders = input.folderRefs.length;
  const repos = input.repoUrlCount;
  const inviteTeam = {
    kind: "tab" as const,
    tab: "team" as const,
    label: C.setupInvite,
  };
  const addResources = {
    kind: "tab" as const,
    tab: "resources" as const,
    label: C.setupAdd,
  };
  return [
    {
      id: "create",
      title: C.setupCreateProject,
      hint: null,
      done: true,
      action: { kind: "none", label: C.setupDonePill },
    },
    {
      id: "assistant",
      title: C.setupInviteAssistant,
      hint: C.setupInviteAssistantHint(assistants.map(label).join(", ")),
      done: assistants.length > 0,
      action: doneOr(assistants.length > 0, inviteTeam),
    },
    {
      id: "playbook",
      title: C.setupPlaybook,
      hint: harness > 0 ? C.setupPlaybookDoneHint(harness) : C.setupPlaybookHint,
      done: harness > 0,
      action: doneOr(harness > 0, {
        kind: "mac",
        label: C.setupOpenOnComputer,
      }),
    },
    {
      id: "folder",
      title: C.setupFolder,
      hint: folders > 0 ? C.setupFolderDoneHint(folders) : C.setupFolderHint,
      done: folders > 0,
      action: doneOr(folders > 0, addResources),
    },
    {
      id: "git",
      title: C.setupGit,
      hint: repos > 0 ? C.setupGitDoneHint(repos) : C.setupGitHint,
      done: repos > 0,
      optional: true,
      action: doneOr(repos > 0, addResources),
    },
    {
      id: "people",
      title: C.setupInvitePeople,
      hint: humans.length > 0 ? C.setupInvitePeopleDoneHint : C.setupInvitePeopleHint,
      done: humans.length > 0,
      action: doneOr(humans.length > 0, inviteTeam),
    },
  ];
};

export default buildOverviewSetupSteps;
