"use client";

import { useState } from "react";

import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import {
  AWC_PROJECT_INVITE_TYPE_OPTIONS,
  toAwcProjectInviteAddSelection,
  type AwcProjectInviteAddSelection,
} from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";

interface AwcProjectInviteAddAssistantControlProps {
  readonly buttonClassName: string;
  readonly onCreate: (selection: AwcProjectInviteAddSelection) => void;
}

const SELECT =
  "rounded-md border border-awc-border-strong bg-white px-2 py-1 text-xs text-awc-fg dark:border-white/20 dark:bg-gray-900 dark:text-white/90";

/** One shared create control: "Add assistant" + optional type picker (types[] labels). */
export default function AwcProjectInviteAddAssistantControl({
  buttonClassName,
  onCreate,
}: AwcProjectInviteAddAssistantControlProps) {
  const [joinTypeId, setJoinTypeId] = useState<string>("");

  return (
    <div className="flex flex-col gap-1.5" data-invite-add-assistant="">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={buttonClassName}
          data-invite-create=""
          onClick={() =>
            onCreate(toAwcProjectInviteAddSelection(joinTypeId || null))
          }
        >
          {C.button}
        </button>
        <label className="flex items-center gap-1.5 text-xs text-awc-fg-muted dark:text-white/70">
          <span>{C.typeLabel}</span>
          <AwcProjectMembersInfoTip id="invite-type-tip">
            {C.typeHelp}
          </AwcProjectMembersInfoTip>
          <select
            className={SELECT}
            value={joinTypeId}
            data-invite-type-picker=""
            onChange={(event) => setJoinTypeId(event.target.value)}
          >
            <option value="">{C.typeAny}</option>
            {AWC_PROJECT_INVITE_TYPE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
