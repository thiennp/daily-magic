"use client";

import { useState } from "react";

import AwcProjectIsolateCheckbox from "@/features/projects/access/invites/AwcProjectIsolateCheckbox";
import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import {
  toAwcProjectInviteAddSelection,
  type AwcProjectInviteAddSelection,
} from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import { AwcBotName } from "@/features/projects/bots/public-api/presentation";
import AwcSupportedAssistantsDialog from "@/features/projects/access/invites/AwcSupportedAssistantsDialog";
import { findSupportedAssistant } from "@/features/projects/access/invites/awcSupportedAssistants";

interface AwcProjectInviteAddAssistantControlProps {
  readonly buttonClassName: string;
  readonly onCreate: (selection: AwcProjectInviteAddSelection) => void;
}

const LINK =
  "awc-focus-ring inline-flex items-center gap-1.5 justify-self-start text-left text-sm font-semibold text-awc-primary underline underline-offset-2";

/** One shared create control: "Add assistant" + optional supported-assistant picker dialog. */
export default function AwcProjectInviteAddAssistantControl({
  buttonClassName,
  onCreate,
}: AwcProjectInviteAddAssistantControlProps) {
  const [joinTypeId, setJoinTypeId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isolate, setIsolate] = useState(false);
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
        className={LINK}
        aria-haspopup="dialog"
        aria-label={`${C.typeLabel}: ${chosen.label}`}
        data-invite-type-picker=""
        data-invite-type-value={joinTypeId}
        onClick={() => setOpen(true)}
      >
        <AwcBotName name={chosen.label} kindHint={joinTypeId} />
        <span className="font-normal">({C.typeChange})</span>
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
      <AwcProjectIsolateCheckbox checked={isolate} onChange={setIsolate} />
      <button
        type="button"
        className={`${buttonClassName} justify-self-start`}
        data-invite-create=""
        onClick={() =>
          onCreate(toAwcProjectInviteAddSelection(joinTypeId || null, isolate))
        }
      >
        {C.button}
      </button>
    </div>
  );
}
