import { createHash } from "node:crypto";

import { MAC_BOOTSTRAP_SCRIPT_ORIGIN } from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

/** Hex sha256 of the tokenless install script body (no PRESET). */
export const computeMacBootstrapScriptSha256 = (): string => {
  const script = renderInstallAgentWitchScript(MAC_BOOTSTRAP_SCRIPT_ORIGIN);
  return createHash("sha256").update(script, "utf8").digest("hex");
};
