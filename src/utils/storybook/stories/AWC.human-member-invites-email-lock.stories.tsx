import AwcHumanInviteAcceptView from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import {
  FIXTURE_INVITED_EMAIL_MASKED,
  HUMAN_INVITE_STORY_PROJECT,
} from "@/features/projects/access/humanInvites/humanInviteUiFixtures";

/**
 * Email-lock accept states. Soft mask: invitedEmailMasked from fixtures only
 * (no client maskHumanInviteEmail).
 */
export default {
  title: "AWC/Human member invites/Email lock",
  parameters: { layout: "padded" },
};

const project = HUMAN_INVITE_STORY_PROJECT;

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
