import { AwcHumanInvitePersonPanel } from "@/features/projects/access/humanInvites/public-api/presentation";
import { AwcHumanInviteUndoToast } from "@/features/projects/access/humanInvites/public-api/presentation";
import { AwcHumanPeopleMembersList } from "@/features/projects/access/humanInvites/public-api/presentation";
import {
  FIXTURE_CREATE_201,
  FIXTURE_JOINED_HUMANS,
  FIXTURE_PENDING_INVITES,
  FIXTURE_PENDING_OPEN,
  HUMAN_INVITE_STORY_PROJECT,
} from "@/features/projects/access/humanInvites/public-api/types";

/**
 * S1–S2 human member invites — Invite person + People list (Storybook).
 * Lead GO: Revoke/Remove = one-click + 10s Undo; Copy link only after create.
 */
export default {
  title: "AWC/Human member invites/People",
  parameters: { layout: "padded" },
};

const project = HUMAN_INVITE_STORY_PROJECT;

export const InvitePersonPanel_Default = () => (
  <div className="mx-auto max-w-lg p-4">
    <AwcHumanInvitePersonPanel projectName={project.projectName} />
  </div>
);

export const InvitePersonPanel_CreatedLink = () => (
  <div className="mx-auto max-w-lg p-4">
    <AwcHumanInvitePersonPanel
      projectName={project.projectName}
      createdInvite={FIXTURE_CREATE_201}
    />
  </div>
);

export const InvitePersonPanel_EmailLockOff = () => (
  <div className="mx-auto max-w-lg p-4">
    <AwcHumanInvitePersonPanel projectName={project.projectName} />
  </div>
);

export const InvitePersonPanel_EmailLockOnCreated = () => (
  <div className="mx-auto max-w-lg p-4">
    <AwcHumanInvitePersonPanel
      projectName={project.projectName}
      createdInvite={FIXTURE_CREATE_201}
    />
  </div>
);

export const InvitePersonPanel_EmailRequiredError = () => (
  <div className="mx-auto max-w-lg p-4">
    <AwcHumanInvitePersonPanel
      projectName={project.projectName}
      errorMessage="Enter an email to lock this invite to one person."
    />
  </div>
);

export const PeopleMembersList_PendingAndJoined = () => (
  <div className="mx-auto max-w-2xl space-y-3 p-4">
    <AwcHumanInviteUndoToast
      message="Invite revoked — Undo for 10s."
      onUndo={() => undefined}
    />
    <AwcHumanPeopleMembersList
      pendingInvites={FIXTURE_PENDING_INVITES}
      joinedHumans={FIXTURE_JOINED_HUMANS.filter((m) => m.role !== "owner")}
      ownerEmail={project.ownerEmail}
      ownerDisplayName={project.ownerDisplayName}
    />
  </div>
);

export const PeopleMembersList_Empty = () => (
  <div className="mx-auto max-w-2xl p-4">
    <AwcHumanPeopleMembersList
      pendingInvites={[]}
      joinedHumans={[]}
      ownerEmail={project.ownerEmail}
      ownerDisplayName={project.ownerDisplayName}
    />
  </div>
);

export const PeopleMembersList_JoinedOnly = () => (
  <div className="mx-auto max-w-2xl p-4">
    <AwcHumanPeopleMembersList
      pendingInvites={[]}
      joinedHumans={FIXTURE_JOINED_HUMANS.filter((m) => m.role !== "owner")}
      ownerEmail={project.ownerEmail}
      ownerDisplayName={project.ownerDisplayName}
    />
  </div>
);

export const PeopleMembersList_OpenAndLocked = () => (
  <div className="mx-auto max-w-2xl p-4">
    <AwcHumanPeopleMembersList
      pendingInvites={[FIXTURE_PENDING_INVITES[0], FIXTURE_PENDING_OPEN]}
      joinedHumans={[]}
      ownerEmail={project.ownerEmail}
      ownerDisplayName={project.ownerDisplayName}
    />
  </div>
);
