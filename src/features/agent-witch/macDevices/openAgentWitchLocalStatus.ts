import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

const HEALTH_PROBE_MS = 2500;

/** Raises the Mac menu-bar app window (AWL-H7). Host handled by Mac `handleOpenURL`. */
export const AGENT_WITCH_LOCAL_STATUS_DEEP_LINK = "agentwitch-local://status";

/**
 * Opens Prompt optimizer in the Mac app (AWL-H7 PM-3 b).
 * Host handled by Mac `handleOpenURL` → in-app WKWebView on discovered port.
 */
export const AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_DEEP_LINK =
  "agentwitch-local://prompt-optimizer";

export type OpenAgentWitchLocalStatusResult = "opened" | "unavailable";

/**
 * Legacy :43347 probe only — must NOT drive Revive alone (H6 per-account ports).
 * Prefer `openAgentWitchLocalStatus` which deep-links the Mac app.
 */
export const probeAgentWitchLocalHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `${AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}/health`,
      {
        signal: AbortSignal.timeout(HEALTH_PROBE_MS),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Best-effort: navigate to custom scheme so Mac can raise its window.
 * Single helper for status + Prompt optimizer (AWL-H7 FIX-2 / PM-3 b) — no second helper.
 */
export const openAgentWitchLocalDeepLink = (href: string): void => {
  if (typeof window === "undefined") {
    return;
  }
  // Prefer <a> click over location.assign so AWC tab stays put when the OS handles the scheme.
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

/** Best-effort: navigate to status deep link so Mac can raise its window. */
export const openAgentWitchLocalStatusDeepLink = (): void => {
  openAgentWitchLocalDeepLink(AGENT_WITCH_LOCAL_STATUS_DEEP_LINK);
};

/**
 * AWL-H7 Arch Exact FIX-2: raise Mac via agentwitch-local://status.
 * Never treat a lone :43347 /health miss as unavailable (false Revive on H6 ports).
 * Callers (HomeOpenLocalStatusButton / MacDeviceRowThisMacMenuSection) must not
 * open Revive from legacy probe failure alone — healthy H6 ≠ Revive.
 */
export const openAgentWitchLocalStatus =
  async (): Promise<OpenAgentWitchLocalStatusResult> => {
    openAgentWitchLocalStatusDeepLink();
    // Deep-link is the open path. Do not gate on :43347 — H6 listens elsewhere.
    return "opened";
  };
