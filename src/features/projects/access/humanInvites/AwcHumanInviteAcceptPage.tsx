"use client";

import AwcHumanInviteAwaitingApprovalView from "@/features/projects/access/humanInvites/AwcHumanInviteAwaitingApprovalView";
import AwcHumanInviteAcceptView from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import { useHumanInviteAcceptFlow } from "@/features/projects/access/humanInvites/hooks/useHumanInviteAcceptFlow";
import type { AwcHumanInviteAcceptPageProps } from "@/features/projects/access/humanInvites/types/awcHumanInviteAcceptPageProps.type";

export type { AwcHumanInviteAcceptPageProps } from "@/features/projects/access/humanInvites/types/awcHumanInviteAcceptPageProps.type";

/** Client accept flow: POST /api/invite/h/{token}/accept + Product error copy. */
export default function AwcHumanInviteAcceptPage({
  token,
  initialView,
  projectId,
  projectName,
  inviterDisplayName,
  role,
  expiresAt,
  signedInEmail,
  accountName = null,
  requireEmailMatch = false,
  invitedEmailMasked = null,
  requiresApproval = false,
}: AwcHumanInviteAcceptPageProps) {
  const flow = useHumanInviteAcceptFlow({
    token,
    initialView,
    projectId,
    expiresAt,
    accountName,
    invitedEmailMasked,
  });

  if (flow.viewState === "awaiting_approval") {
    return (
      <AwcHumanInviteAwaitingApprovalView
        projectName={projectName}
        inviterDisplayName={inviterDisplayName}
      />
    );
  }

  return (
    <AwcHumanInviteAcceptView
      viewState={flow.viewState}
      projectName={projectName}
      inviterDisplayName={inviterDisplayName}
      role={role}
      signedInEmail={signedInEmail}
      busy={flow.busy}
      joinError={flow.joinError}
      nickname={flow.nickname}
      nicknameError={flow.nicknameError}
      onNicknameChange={flow.onNicknameChange}
      onAccept={flow.onAccept}
      onSignUp={flow.goAuth}
      onLogIn={flow.goAuth}
      onOpenProject={flow.onOpenProject}
      requireEmailMatch={requireEmailMatch}
      invitedEmailMasked={flow.maskedEmail}
      onSwitchAccount={flow.onSwitchAccount}
      requiresApproval={requiresApproval}
    />
  );
}
