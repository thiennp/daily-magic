"use client";

import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";

/** "Block it from other people's assistants" checkbox with its help line. */
export default function AwcProjectIsolateCheckbox({
  checked,
  onChange,
}: {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-2 text-[13px] text-awc-fg">
      <input
        type="checkbox"
        className="mt-0.5"
        checked={checked}
        data-invite-isolate=""
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        {C.isolateLabel}
        <span className="block text-[12px] text-awc-fg-muted">
          {C.isolateHelp}
        </span>
      </span>
    </label>
  );
}
