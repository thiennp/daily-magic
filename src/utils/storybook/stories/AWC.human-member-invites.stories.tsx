import { AwcHumanInviteAcceptView } from "@/features/projects/access/humanInvites/public-api/presentation";
import { HUMAN_INVITE_STORY_PROJECT } from "@/features/projects/access/humanInvites/public-api/types";

/**
 * S1–S2 human member invites — core accept states (Storybook fixtures).
 */
export default {
  title: "AWC/Human member invites",
  parameters: { layout: "padded" },
};

const project = HUMAN_INVITE_STORY_PROJECT;

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
