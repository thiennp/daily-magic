"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import {
  HUMAN_INVITE_UI_COPY,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type {
  CreateHumanInviteBody,
  CreateHumanInviteResponse,
  HumanInviteRole,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInvitePersonPanelProps = {
  readonly projectName: string;
  readonly createdInvite?: CreateHumanInviteResponse | null;
  readonly busy?: boolean;
  readonly errorMessage?: string | null;
  readonly onCreate?: (body: CreateHumanInviteBody) => void;
  readonly onCopyLink?: (url: string) => void;
  readonly onCancel?: () => void;
  readonly onDismissCreated?: () => void;
};

/**
 * Owner Invite person — role picker + Copy link (POST create).
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

  const roleOneLiner =
    role === "member" ? copy.roleMemberOneLiner : copy.roleViewerOneLiner;

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

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
          Role
        </legend>
        <div className="flex flex-wrap gap-2">
          {(["member", "viewer"] as const).map((value) => (
            <button
              key={value}
              type="button"
              disabled={busy}
              className={
                role === value
                  ? AWC_PROJECT_ACCESS_CTA.primary
                  : AWC_PROJECT_ACCESS_CTA.secondary
              }
              onClick={() => setRole(value)}
            >
              {value === "member" ? copy.roleMember : copy.roleViewer}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{roleOneLiner}</p>
      </fieldset>

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
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      {createdInvite ? (
        <div className="rounded-lg border border-amber-300/80 bg-amber-50/80 p-3 text-xs dark:border-amber-700/60 dark:bg-amber-950/30">
          <p className="font-medium text-amber-900 dark:text-amber-200">
            {copy.createdBannerTitle}
          </p>
          <p className="mt-1 text-amber-900 dark:text-amber-200">
            Role · {createdInvite.role} · exp{" "}
            {new Date(createdInvite.expiresAt).toLocaleDateString()}
          </p>
          <p className="mt-1 break-all text-amber-900/90 dark:text-amber-100/90">
            {createdInvite.url}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.primary}
              onClick={() => onCopyLink?.(createdInvite.url)}
            >
              {copy.copyLink}
            </button>
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.secondary}
              onClick={onDismissCreated}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      {errorMessage ? (
        <p className="text-xs text-red-600 dark:text-red-300">{errorMessage}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          disabled={busy}
          onClick={() =>
            onCreate?.({
              role,
              email: email.trim() ? email.trim() : null,
            })
          }
        >
          {copy.copyLink}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          disabled
          title="S3 — Resend"
        >
          {copy.sendEmail}
          <span className="ml-1 rounded bg-amber-100 px-1 text-[10px] font-semibold text-amber-800">
            {copy.sendEmailLaterBadge}
          </span>
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          disabled={busy}
          onClick={onCancel}
        >
          {copy.cancel}
        </button>
      </div>
    </div>
  );
}
