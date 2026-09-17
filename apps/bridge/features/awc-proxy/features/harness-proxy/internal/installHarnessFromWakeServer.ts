import {
  applyHarnessInstallLocally,
  parseHarnessInstallBundle,
} from "../../../../../adapters/harnessInstall";
import { isAgentWitchWakeServerAllowedOrigin } from "../../../../server/features/cors-origin/public-api/infrastructure";
import { isRecord } from "../../../../server/internal/isRecord";
import type { AgentWitchHarnessInstallWakeResponse } from "../public-api/types";

export const installHarnessFromWakeServer = (
  body: unknown,
): AgentWitchHarnessInstallWakeResponse => {
  if (!isRecord(body)) {
    return { ok: false, errorMessage: "Request body must be a JSON object." };
  }

  const appOrigin =
    typeof body.appOrigin === "string" ? body.appOrigin.trim() : "";
  const profileEmail =
    typeof body.profileEmail === "string" ? body.profileEmail.trim() : "";
  const bundle = parseHarnessInstallBundle(body.bundle);

  if (appOrigin.length === 0) {
    return { ok: false, errorMessage: "appOrigin is required." };
  }

  if (!isAgentWitchWakeServerAllowedOrigin(appOrigin)) {
    return {
      ok: false,
      errorMessage: "appOrigin is not an allowed Agent Witch site.",
    };
  }

  if (bundle === null) {
    return {
      ok: false,
      errorMessage: "bundle.name, bundle.slug, and bundle.items are required.",
    };
  }

  const result = applyHarnessInstallLocally({
    bundle,
    ...(profileEmail.length > 0 ? { profileEmail } : {}),
  });

  if (!result.ok) {
    return {
      ok: false,
      errorMessage: result.errorMessage ?? "Harness install failed.",
    };
  }

  return {
    ok: true,
    writtenItemCount: result.writtenItemCount,
  };
};
