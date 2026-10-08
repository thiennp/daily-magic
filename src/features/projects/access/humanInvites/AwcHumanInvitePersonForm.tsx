"use client";

import { useState } from "react";

import AwcHumanInviteCreatedLinkBanner from "@/features/projects/access/humanInvites/AwcHumanInviteCreatedLinkBanner";
import AwcHumanInviteFormError from "@/features/projects/access/humanInvites/AwcHumanInviteFormError";
import AwcHumanInviteSentView from "@/features/projects/access/humanInvites/AwcHumanInviteSentView";
import AwcHumanInvitePersonFormBody from "@/features/projects/access/humanInvites/AwcHumanInvitePersonFormBody";
import AwcHumanInvitePersonPanelActions from "@/features/projects/access/humanInvites/AwcHumanInvitePersonPanelActions";
import AwcHumanInvitePersonRolePicker from "@/features/projects/access/humanInvites/AwcHumanInvitePersonRolePicker";
import { useHumanInviteCreateSubmit } from "@/features/projects/access/humanInvites/hooks/useHumanInviteCreateSubmit";
import { useHumanInviteSendForm } from "@/features/projects/access/humanInvites/hooks/useHumanInviteSendForm";
import AwcHumanInvitePersonTabSeg, {
  type InvitePersonTab,
} from "@/features/projects/access/humanInvites/AwcHumanInvitePersonTabSeg";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { AwcHumanInvitePersonPanelProps } from "@/features/projects/access/humanInvites/types/awcHumanInvitePersonPanelProps.type";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

type FormProps = Omit<AwcHumanInvitePersonPanelProps, "projectName">;

/** Email|Link form + role + actions for Invite person. */
export default function AwcHumanInvitePersonForm({
  createdInvite = null,
  busy = false,
  errorMessage = null,
  onCreate,
  onCopyLink,
  onCancel,
  onDismissCreated,
  onSendEmails,
  sendBusy = false,
  sendErrorMessage = null,
}: FormProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const [tab, setTab] = useState<InvitePersonTab>("email");
  const [role, setRole] = useState<HumanInviteRole>("member");
  const [email, setEmail] = useState("");
  const [requireEmailMatch, setRequireEmailMatch] = useState(true); // F1: email lock ON by default
  const [localError, setLocalError] = useState<string | null>(null);
  const [sent, setSent] = useState<readonly string[] | null>(null);
  const shownError = localError ?? sendErrorMessage ?? errorMessage;
  const send = useHumanInviteSendForm({
    email,
    role,
    requireEmailMatch,
    setEmail,
    setLocalError,
    onSendEmails,
    onSent: setSent,
  });
  const roleLabel = role === "member" ? copy.roleMember : copy.roleViewer;

  const onSubmitCreate = useHumanInviteCreateSubmit({
    role,
    isEmailTab: tab === "email",
    email,
    requireEmailMatch,
    setLocalError,
    onCreate,
  });

  if (sent !== null) {
    return (
      <AwcHumanInviteSentView
        emails={sent}
        roleLabel={roleLabel}
        onCopyLink={onSubmitCreate}
        onAnother={() => setSent(null)}
        onDone={onCancel}
      />
    );
  }

  return (
    <>
      <AwcHumanInvitePersonTabSeg tab={tab} busy={busy} onTabChange={setTab} />
      <AwcHumanInvitePersonFormBody
        tab={tab}
        busy={busy || sendBusy}
        email={email}
        requireEmailMatch={requireEmailMatch}
        createdUrl={createdInvite?.url ?? null}
        roleLabel={roleLabel}
        onEmailChange={(value) => {
          setEmail(value);
          setLocalError(null);
        }}
        onRequireEmailMatchChange={(checked) => {
          setRequireEmailMatch(checked);
          setLocalError(null);
        }}
        invalid={shownError !== null && tab === "email"}
        requiresApproval={send.requiresApproval}
        onRequiresApprovalChange={send.onRequiresApprovalChange}
      />
      <AwcHumanInvitePersonRolePicker
        role={role}
        busy={busy}
        onRoleChange={setRole}
      />
      {createdInvite ? (
        <AwcHumanInviteCreatedLinkBanner
          createdInvite={createdInvite}
          onCopyLink={onCopyLink}
          onDismissCreated={onDismissCreated}
        />
      ) : null}
      <AwcHumanInviteFormError message={shownError} />
      <AwcHumanInvitePersonPanelActions
        busy={busy}
        onSubmitCreate={onSubmitCreate}
        onCancel={onCancel}
        tab={tab}
        sendBusy={sendBusy}
        onSubmitSend={send.onSubmitSend}
      />
    </>
  );
}
