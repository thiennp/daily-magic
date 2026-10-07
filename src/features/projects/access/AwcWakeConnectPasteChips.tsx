import { AWC_WAKE_CONNECT_PASTE_COPY as C } from "@/features/projects/access/awcWakeConnectPasteCopy.constant";
import type { WakeConnectDetect } from "@/features/projects/access/utils/detectWakeConnectPaste";

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border border-awc-line bg-awc-surface-2 px-2 py-0.5 text-[11px] text-awc-fg-muted";

function Chip({ ok, label }: { readonly ok: boolean; readonly label: string }) {
  return (
    <span className={CHIP} data-wake-chip={ok ? "ok" : "muted"}>
      {ok ? <span className="inline-block size-[6px] rounded-full bg-awc-ok-dot" aria-hidden /> : null}
      {label}
    </span>
  );
}

/** DF-036: what the one-box paste found so far — wake link site + "Key ✓ hidden". */
export default function AwcWakeConnectPasteChips({ found }: { readonly found: WakeConnectDetect }) {
  const linkLabel =
    found.link === "ok"
      ? C.chipLinkOk.replace("{site}", found.site ?? "")
      : found.link === "check"
        ? C.chipLinkCheck
        : C.chipLinkMissing;
  return (
    <div className="flex flex-wrap gap-1.5" aria-live="polite" data-wake-detect>
      <Chip ok={found.link === "ok"} label={linkLabel} />
      <Chip ok={found.keyFound} label={found.keyFound ? C.chipKeyOk : C.chipKeyMissing} />
    </div>
  );
}
