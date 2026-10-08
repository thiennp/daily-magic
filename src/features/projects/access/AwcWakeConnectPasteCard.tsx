"use client";

import AwcWakeConnectField from "@/features/projects/access/AwcWakeConnectField";
import AwcWakeConnectPasteChips from "@/features/projects/access/AwcWakeConnectPasteChips";
import { formatAwcGrokWakeCopy } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_WAKE_CONNECT_PASTE_COPY as C } from "@/features/projects/access/awcWakeConnectPasteCopy.constant";
import {
  useWakeConnectFields,
  type WakeConnectSave,
} from "@/features/projects/access/hooks/useWakeConnectFields";
import { formatWakeConnectPasteHint } from "@/features/projects/access/utils/formatWakeConnectPasteHint";

interface AwcWakeConnectPasteCardProps {
  readonly projectId: string;
  /** Membership id (Members rail) or pending request id (with `save`). */
  readonly membershipId: string;
  readonly memberName: string | null;
  readonly onSaved?: (membershipId: string) => void;
  readonly save?: WakeConnectSave;
}

const text = (
  issue: Parameters<typeof formatWakeConnectPasteHint>[0],
  name: string | null,
) => formatWakeConnectPasteHint(issue, name)?.text ?? null;

/** Wake link and Key as two separate fields; one Connect button, enabled when both are valid. */
export default function AwcWakeConnectPasteCard(
  p: AwcWakeConnectPasteCardProps,
) {
  const form = useWakeConnectFields({
    projectId: p.projectId,
    targetId: p.membershipId,
    onSaved: p.onSaved,
    save: p.save,
  });
  const named = (p.memberName?.trim() ?? "") !== "";
  const id = `wake-connect-${p.membershipId}`;
  const name = p.memberName;
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
      <p className="text-[11px] text-awc-fg-muted">
        {formatAwcGrokWakeCopy(C.help, name)}
      </p>
      <AwcWakeConnectField
        id={`${id}-url`}
        name="grok-wake-url"
        label={C.urlLabel}
        tip={formatAwcGrokWakeCopy(C.urlTip, name)}
        value={form.url}
        placeholder={C.urlPlaceholder}
        onChange={form.changeUrl}
        error={named ? text(form.urlCheck.issue, name) : null}
      />
      <AwcWakeConnectField
        id={`${id}-key`}
        name="grok-wake-key"
        label={C.keyLabel}
        tip={formatAwcGrokWakeCopy(C.keyTip, name)}
        value={form.key}
        placeholder={C.keyPlaceholder}
        onChange={form.changeKey}
        secret
        error={named ? text(form.keyCheck.issue, name) : null}
      />
      <AwcWakeConnectPasteChips
        found={{
          site: form.urlCheck.site,
          linkRejected: form.urlCheck.issue !== null,
          keyOk: form.keyCheck.ok,
        }}
      />
      {named ? null : (
        <p className="text-xs text-awc-bad" data-wake-hint>
          {text(null, name)}
        </p>
      )}
      <button
        type="submit"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        disabled={form.saving || !named || !form.ready}
      >
        {form.saving ? C.saving : C.save}
      </button>
      {form.saved ? (
        <p role="status" className="text-xs text-awc-fg-muted">
          {formatAwcGrokWakeCopy(C.saved, name)}
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
