import { AWC_WAKE_CONNECT_PASTE_COPY as C } from "@/features/projects/access/awcWakeConnectPasteCopy.constant";

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border border-awc-line bg-awc-surface-2 px-2 py-0.5 text-[11px] text-awc-fg-muted";

function Chip({ ok, label }: { readonly ok: boolean; readonly label: string }) {
  return (
    <span className={CHIP} data-wake-chip={ok ? "ok" : "muted"}>
      {ok ? (
        <span
          className="inline-block size-[6px] rounded-full bg-awc-ok-dot"
          aria-hidden
        />
      ) : null}
      {label}
    </span>
  );
}

export type WakeConnectChipsState = {
  readonly site: string | null;
  /** The link field has text that is not valid. */
  readonly linkRejected: boolean;
  readonly keyOk: boolean;
};

/** What the two fields hold so far: wake link site + "Key ✓ hidden" (never the key). */
export default function AwcWakeConnectPasteChips({
  found,
}: {
  readonly found: WakeConnectChipsState;
}) {
  const linkLabel =
    found.site !== null
      ? C.chipLinkOk.replace("{site}", found.site)
      : found.linkRejected
        ? C.chipLinkCheck
        : C.chipLinkMissing;
  return (
    <div className="flex flex-wrap gap-1.5" aria-live="polite" data-wake-detect>
      <Chip ok={found.site !== null} label={linkLabel} />
      <Chip
        ok={found.keyOk}
        label={found.keyOk ? C.chipKeyOk : C.chipKeyMissing}
      />
    </div>
  );
}
