"use client";

import { useId, useState } from "react";

import Button from "@/components/ui/button/Button";
import GroupInviteRoleField from "@/features/admin/components/GroupInviteRoleField";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import validateInviteEmail from "@/features/admin/utils/validateInviteEmail";

interface GroupMemberInviteFormProps {
  readonly memberEmail: string;
  readonly memberRole: string;
  readonly memberEmails: readonly string[];
  readonly canInvite: boolean;
  readonly onMemberEmailChange: (value: string) => void;
  readonly onMemberRoleChange: (value: string) => void;
  readonly onAddMember: () => void;
}

export default function GroupMemberInviteForm({
  memberEmail,
  memberRole,
  memberEmails,
  canInvite,
  onMemberEmailChange,
  onMemberRoleChange,
  onAddMember,
}: GroupMemberInviteFormProps) {
  const emailId = useId();
  const [error, setError] = useState("");

  return (
    <>
      <form
        noValidate
        aria-label={C.inviteCta}
        className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-start"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canInvite) {
            return;
          }
          const next = validateInviteEmail(memberEmail, memberEmails);
          setError(next);
          if (!next) {
            onAddMember();
          }
        }}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor={emailId} className="text-sm font-medium text-awc-fg">
            {C.inviteEmailLabel}
          </label>
          <input
            id={emailId}
            type="email"
            autoComplete="off"
            value={memberEmail}
            readOnly={!canInvite}
            aria-disabled={!canInvite || undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${emailId}-err` : undefined}
            placeholder={C.inviteEmailPlaceholder}
            onChange={(event) => {
              setError("");
              onMemberEmailChange(event.target.value);
            }}
            className="w-full rounded-lg border border-awc-border px-3 py-2 text-sm read-only:cursor-not-allowed read-only:bg-awc-fill"
          />
          {error ? (
            <p
              id={`${emailId}-err`}
              role="alert"
              className="text-sm text-awc-bad"
            >
              {error}
            </p>
          ) : null}
        </div>
        <GroupInviteRoleField
          id={`${emailId}-role`}
          value={memberRole}
          disabled={!canInvite}
          onChange={onMemberRoleChange}
        />
        <div className="sm:pt-6">
          <Button type="submit" disabled={!canInvite}>
            {C.inviteCta}
          </Button>
        </div>
      </form>
      {canInvite ? null : (
        <p className="mt-2 text-sm text-awc-fg-muted">{C.onlyAdminsInvite}</p>
      )}
    </>
  );
}
