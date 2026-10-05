import AwcHumanInviteAcceptView from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import AwcHumanInvitePersonPanel from "@/features/projects/access/humanInvites/AwcHumanInvitePersonPanel";
import AwcHumanInviteUndoToast from "@/features/projects/access/humanInvites/AwcHumanInviteUndoToast";
import AwcHumanPeopleMembersList from "@/features/projects/access/humanInvites/AwcHumanPeopleMembersList";
import {
  FIXTURE_CREATE_201,
  FIXTURE_JOINED_HUMANS,
  FIXTURE_PENDING_INVITES,
  HUMAN_INVITE_STORY_PROJECT,
} from "@/features/projects/access/humanInvites/humanInviteUiFixtures";

/**
 * S1–S2 human member invites — wired components (Storybook fixtures).
 * Lead GO: Revoke/Remove = one-click + 10s Undo; Copy link only after create.
 */
export default {
  title: "AWC/Human member invites",
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

export const AcceptPage_SignedOut = () => (
  <AwcHumanInviteAcceptView
    viewState="signed_out"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
  />
);

export const AcceptPage_SignedIn = () => (
  <AwcHumanInviteAcceptView
    viewState="signed_in"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
    signedInEmail="ben@example.com"
  />
);

export const AcceptPage_Expired = () => (
  <AwcHumanInviteAcceptView
    viewState="expired"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
  />
);

export const AcceptPage_Used = () => (
  <AwcHumanInviteAcceptView
    viewState="used"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
  />
);

export const AcceptPage_Revoked = () => (
  <AwcHumanInviteAcceptView
    viewState="revoked"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
  />
);

export const AcceptPage_AlreadyMember = () => (
  <AwcHumanInviteAcceptView
    viewState="already_member"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
  />
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
