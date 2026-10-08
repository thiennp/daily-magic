"use client";

import { useState } from "react";

import { AWC_WAKE_CONNECT_PASTE_COPY as C } from "@/features/projects/access/awcWakeConnectPasteCopy.constant";
import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";

const INPUT =
  "block w-full rounded-md border border-awc-border-strong bg-white px-2 py-1.5 font-mono text-xs text-awc-fg placeholder:font-sans";

interface AwcWakeConnectFieldProps {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly tip: string;
  readonly value: string;
  readonly placeholder: string;
  readonly onChange: (value: string) => void;
  /** Key field: password-style with a show/hide toggle. */
  readonly secret?: boolean;
  readonly error?: string | null;
}

/** One labelled wake-connect input with its (i) tip, optional show/hide, inline error. */
export default function AwcWakeConnectField(p: AwcWakeConnectFieldProps) {
  const [shown, setShown] = useState(false);
  const hidden = p.secret === true && !shown;
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-awc-fg-muted" htmlFor={p.id}>
          {p.label}
        </label>
        <AwcProjectMembersInfoTip id={`${p.id}-tip`}>
          {p.tip}
        </AwcProjectMembersInfoTip>
      </div>
      <div className="flex items-center gap-1.5">
        <input
          id={p.id}
          name={p.name}
          type={hidden ? "password" : p.secret === true ? "text" : "url"}
          className={INPUT}
          value={p.value}
          placeholder={p.placeholder}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={p.error ? true : undefined}
          data-1p-ignore
          data-lpignore="true"
          onChange={(event) => p.onChange(event.target.value)}
        />
        {p.secret === true ? (
          <button
            type="button"
            className="awc-focus-ring shrink-0 text-xs text-awc-fg-muted underline"
            aria-pressed={shown}
            onClick={() => setShown(!shown)}
          >
            {shown ? C.hideKey : C.showKey}
          </button>
        ) : null}
      </div>
      {p.error ? (
        <p className="text-xs text-awc-bad" data-wake-hint>
          {p.error}
        </p>
      ) : null}
    </div>
  );
}
