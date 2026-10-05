"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInvitePersonRolePickerProps = {
  readonly role: HumanInviteRole;
  readonly busy: boolean;
  readonly onRoleChange: (role: HumanInviteRole) => void;
};

/** Member / Viewer role picker for Invite person. */
export default function AwcHumanInvitePersonRolePicker({
  role,
  busy,
  onRoleChange,
}: AwcHumanInvitePersonRolePickerProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const roleOneLiner =
    role === "member" ? copy.roleMemberOneLiner : copy.roleViewerOneLiner;

  return (
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
            onClick={() => onRoleChange(value)}
          >
            {value === "member" ? copy.roleMember : copy.roleViewer}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{roleOneLiner}</p>
    </fieldset>
  );
}
