"use client";

import { useState } from "react";

import AwcHumanInviteCreatedLinkBanner from "@/features/projects/access/humanInvites/AwcHumanInviteCreatedLinkBanner";
import AwcHumanInviteEmailLockField from "@/features/projects/access/humanInvites/AwcHumanInviteEmailLockField";
import AwcHumanInvitePersonPanelActions from "@/features/projects/access/humanInvites/AwcHumanInvitePersonPanelActions";
import AwcHumanInvitePersonRolePicker from "@/features/projects/access/humanInvites/AwcHumanInvitePersonRolePicker";
import {
  HUMAN_INVITE_UI_COPY,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { AwcHumanInvitePersonPanelProps } from "@/features/projects/access/humanInvites/types/awcHumanInvitePersonPanelProps.type";
import { buildHumanInviteCreateBody } from "@/features/projects/access/humanInvites/utils/buildHumanInviteCreateBody";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type { AwcHumanInvitePersonPanelProps } from "@/features/projects/access/humanInvites/types/awcHumanInvitePersonPanelProps.type";

/**
 * Owner Invite person — role picker + optional email lock + Copy link.
 * Send email = Later (S3). Created url shown once like bot invites.
 */
export default function AwcHumanInvitePersonPanel({
  projectName,
  createdInvite = null,
  busy = false,
  errorMessage = null,
  onCreate,
  onCopyLink,
  onCancel,
  onDismissCreated,
}: AwcHumanInvitePersonPanelProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const [role, setRole] = useState<HumanInviteRole>("member");
  const [email, setEmail] = useState("");
  const [requireEmailMatch, setRequireEmailMatch] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const shownError = localError ?? errorMessage;

  const onSubmitCreate = () => {
    const built = buildHumanInviteCreateBody({
      role,
      email,
      requireEmailMatch,
    });
    if (!built.ok) {
      setLocalError(built.errorMessage);
      return;
    }
    setLocalError(null);
    onCreate?.(built.body);
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950/40">
      <header>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
          {copy.invitePersonTitle}
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {withProjectName(copy.invitePersonIntro, projectName)}
        </p>
      </header>

      <AwcHumanInvitePersonRolePicker
        role={role}
        busy={busy}
        onRoleChange={setRole}
      />

      <label className="block space-y-1">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {copy.emailLabel}
        </span>
        <input
          type="email"
          value={email}
          disabled={busy}
          placeholder={copy.emailPlaceholder}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-transparent"
          onChange={(event) => {
            setEmail(event.target.value);
            setLocalError(null);
          }}
        />
      </label>

      <AwcHumanInviteEmailLockField
        checked={requireEmailMatch}
        disabled={busy}
        onChange={(checked) => {
          setRequireEmailMatch(checked);
          setLocalError(null);
        }}
      />

      {createdInvite ? (
        <AwcHumanInviteCreatedLinkBanner
          createdInvite={createdInvite}
          onCopyLink={onCopyLink}
          onDismissCreated={onDismissCreated}
        />
      ) : null}

      {shownError ? (
        <p className="text-xs text-red-600 dark:text-red-300">{shownError}</p>
      ) : null}

      <AwcHumanInvitePersonPanelActions
        busy={busy}
        onSubmitCreate={onSubmitCreate}
        onCancel={onCancel}
      />
    </div>
  );
}
