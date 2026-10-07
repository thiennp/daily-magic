"use client";

import { formatAwcGrokWakeCopy } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_WAKE_CONNECT_PASTE_COPY as C } from "@/features/projects/access/awcWakeConnectPasteCopy.constant";
import { useWakeConnectPaste } from "@/features/projects/access/hooks/useWakeConnectPaste";

interface AwcWakeConnectPasteCardProps {
  readonly projectId: string;
  readonly membershipId: string;
  readonly memberName: string | null;
  readonly onSaved?: (membershipId: string) => void;
}

const FIELD =
  "mt-1 block w-full resize-none rounded-md border border-awc-border-strong bg-white px-2 py-1.5 font-mono text-xs text-awc-fg [-webkit-text-security:disc] placeholder:font-sans";

/** P1-S1b: one paste box for the Grok wake link + key; saves via the owner route. */
export default function AwcWakeConnectPasteCard({
  projectId,
  membershipId,
  memberName,
  onSaved,
}: AwcWakeConnectPasteCardProps) {
  const form = useWakeConnectPaste({ projectId, membershipId, onSaved });
  const fieldId = `wake-connect-${membershipId}`;
  return (
    <form
      className="space-y-2 rounded-lg border border-awc-border/80 bg-awc-surface p-3"
      autoComplete="off"
      aria-label={C.title}
      onSubmit={(event) => {
        event.preventDefault();
        form.save();
      }}
    >
      <p className="text-xs font-semibold text-awc-fg">{C.title}</p>
      <p className="text-[11px] text-awc-fg-muted">
        {formatAwcGrokWakeCopy(C.help, memberName)}
      </p>
      <label className="block text-xs text-awc-fg-muted" htmlFor={fieldId}>
        {C.label}
        <textarea
          id={fieldId}
          name="grok-wake-connect"
          rows={2}
          className={FIELD}
          value={form.text}
          placeholder={C.placeholder}
          spellCheck={false}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          onChange={(event) => form.changeText(event.target.value)}
        />
      </label>
      <button
        type="submit"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        disabled={form.saving || form.text.trim() === ""}
      >
        {form.saving ? C.saving : C.save}
      </button>
      {form.saved ? (
        <p role="status" className="text-xs text-awc-ok">
          {formatAwcGrokWakeCopy(C.saved, memberName)}
        </p>
      ) : null}
      {form.error ? (
        <p role="alert" className="text-xs text-awc-bad">
          {form.error}
        </p>
      ) : null}
    </form>
  );
}
