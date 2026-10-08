"use client";

import { useState } from "react";

import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import {
  toAwcProjectInviteAddSelection,
  type AwcProjectInviteAddSelection,
} from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import AwcAssistantAvatarTile from "@/features/projects/access/invites/AwcAssistantAvatarTile";
import AwcSupportedAssistantsDialog from "@/features/projects/access/invites/AwcSupportedAssistantsDialog";
import { findSupportedAssistant } from "@/features/projects/access/invites/awcSupportedAssistants";

interface AwcProjectInviteAddAssistantControlProps {
  readonly buttonClassName: string;
  readonly onCreate: (selection: AwcProjectInviteAddSelection) => void;
}

const FIELD =
  "flex w-full items-center gap-2 rounded-lg border border-awc-control-border bg-awc-surface px-2.5 py-2 text-left text-sm text-awc-fg";

/** One shared create control: "Add assistant" + optional supported-assistant picker dialog. */
export default function AwcProjectInviteAddAssistantControl({
  buttonClassName,
  onCreate,
}: AwcProjectInviteAddAssistantControlProps) {
  const [joinTypeId, setJoinTypeId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const chosen = findSupportedAssistant(joinTypeId);

  return (
    <div className="grid gap-2" data-invite-add-assistant="">
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] font-semibold text-awc-fg">
          {C.typeLabel}
        </span>
        <AwcProjectMembersInfoTip id="invite-type-tip">
          {C.typeHelp}
        </AwcProjectMembersInfoTip>
      </div>
      <button
        type="button"
        id="invite-type-select"
        className={FIELD}
        aria-haspopup="dialog"
        aria-label={`${C.typeLabel}: ${chosen.label}`}
        data-invite-type-picker=""
        data-invite-type-value={joinTypeId}
        onClick={() => setOpen(true)}
      >
        {joinTypeId !== "" ? (
          <AwcAssistantAvatarTile label={chosen.label} />
        ) : null}
        <span className="flex-1">{chosen.label}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {open ? (
        <AwcSupportedAssistantsDialog
          value={joinTypeId}
          onClose={() => setOpen(false)}
          onSelect={(id) => {
            setJoinTypeId(id);
            setOpen(false);
          }}
        />
      ) : null}
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
