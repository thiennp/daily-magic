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
  "w-full rounded-lg border border-awc-control-border bg-awc-surface px-2.5 py-2 text-sm text-awc-fg";

/** One shared create control: "Add assistant" + optional type picker (types[] labels). */
export default function AwcProjectInviteAddAssistantControl({
  buttonClassName,
  onCreate,
}: AwcProjectInviteAddAssistantControlProps) {
  const [joinTypeId, setJoinTypeId] = useState<string>("");

  return (
    <div className="grid gap-2" data-invite-add-assistant="">
      <div className="flex items-center gap-1.5">
        <label
          htmlFor="invite-type-select"
          className="text-[13px] font-semibold text-awc-fg"
        >
          {C.typeLabel}
        </label>
        <AwcProjectMembersInfoTip id="invite-type-tip">
          {C.typeHelp}
        </AwcProjectMembersInfoTip>
      </div>
      <select
        id="invite-type-select"
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
      <button
        type="button"
        className={`${buttonClassName} justify-self-start`}
        data-invite-create=""
        onClick={() =>
          onCreate(toAwcProjectInviteAddSelection(joinTypeId || null))
        }
      >
        {C.button}
      </button>
    </div>
  );
}
