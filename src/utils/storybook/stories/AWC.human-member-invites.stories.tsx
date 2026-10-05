import AwcHumanInviteAcceptView from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import AwcHumanInvitePersonPanel from "@/features/projects/access/humanInvites/AwcHumanInvitePersonPanel";
import AwcHumanInviteUndoToast from "@/features/projects/access/humanInvites/AwcHumanInviteUndoToast";
import AwcHumanPeopleMembersList from "@/features/projects/access/humanInvites/AwcHumanPeopleMembersList";
import {
  FIXTURE_CREATE_201,
  FIXTURE_INVITED_EMAIL_MASKED,
  FIXTURE_JOINED_HUMANS,
  FIXTURE_PENDING_INVITES,
  FIXTURE_PENDING_OPEN,
  HUMAN_INVITE_STORY_PROJECT,
} from "@/features/projects/access/humanInvites/humanInviteUiFixtures";

/**
 * S1–S2 human member invites — wired components (Storybook fixtures).
 * Lead GO: Revoke/Remove = one-click + 10s Undo; Copy link only after create.
 * Follow-up: email-lock checkbox + mismatch accept states.
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
    nickname="Ben"
  />
);

export const AcceptPage_NicknameTaken = () => (
  <AwcHumanInviteAcceptView
    viewState="signed_in"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
    signedInEmail="ben@example.com"
    nickname="Ben"
    nicknameError="That project nickname is already taken."
  />
);

export const AcceptPage_NicknameInvalid = () => (
  <AwcHumanInviteAcceptView
    viewState="signed_in"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
    signedInEmail="ben@example.com"
    nickname="ben@example"
    nicknameError="Nickname must be 2–32 letters (single spaces OK). Avoid @ / and reserved words."
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

export const AcceptPage_EmailMismatch = () => (
  <AwcHumanInviteAcceptView
    viewState="email_mismatch"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
    signedInEmail="wrong@example.com"
    invitedEmailMasked={FIXTURE_INVITED_EMAIL_MASKED}
  />
);

export const AcceptPage_EmailUnverified = () => (
  <AwcHumanInviteAcceptView
    viewState="email_unverified"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
    signedInEmail="ben@example.com"
    invitedEmailMasked={FIXTURE_INVITED_EMAIL_MASKED}
  />
);

export const AcceptPage_SignedOutEmailLocked = () => (
  <AwcHumanInviteAcceptView
    viewState="signed_out"
    projectName={project.projectName}
    inviterDisplayName={project.ownerDisplayName}
    role="member"
    requireEmailMatch
    invitedEmailMasked={FIXTURE_INVITED_EMAIL_MASKED}
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
