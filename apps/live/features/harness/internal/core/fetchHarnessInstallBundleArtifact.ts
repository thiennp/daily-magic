import { gunzipSync } from "node:zlib";

import type { HarnessInstallBundle } from "./harnessInstallBundle.types";

const AGENT_WITCH_PAIRING_TOKEN_HEADER = "x-agent-witch-token";
import { parseHarnessInstallBundle } from "./parseHarnessInstallBundle";

export const fetchHarnessInstallBundleArtifact = async (input: {
  readonly appOrigin: string;
  readonly pairingToken: string;
  readonly artifactId: string;
  readonly expectedContentSha256: string;
}): Promise<
  | { readonly ok: true; readonly bundle: HarnessInstallBundle }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const url = `${input.appOrigin.replace(/\/$/, "")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(input.artifactId)}`;

  try {
    const response = await fetch(url, {
      headers: {
        [AGENT_WITCH_PAIRING_TOKEN_HEADER]: input.pairingToken,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        ok: false,
        errorMessage:
          text.length > 0
            ? text.slice(0, 500)
            : `Harness artifact download failed (${response.status}).`,
      };
    }

    const sha256Header = response.headers.get("x-content-sha256")?.trim() ?? "";
    if (
      sha256Header.length > 0 &&
      sha256Header !== input.expectedContentSha256
    ) {
      return {
        ok: false,
        errorMessage: "Harness artifact checksum mismatch.",
      };
    }

    const compressed = Buffer.from(await response.arrayBuffer());
    const jsonText = gunzipSync(compressed).toString("utf8");
    const parsed: unknown = JSON.parse(jsonText);
    const bundle = parseHarnessInstallBundle(parsed);

    if (bundle === null) {
      return {
        ok: false,
        errorMessage: "Harness artifact payload is not a valid bundle.",
      };
    }

    return { ok: true, bundle };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Harness artifact download failed.";
    return { ok: false, errorMessage: message };
  }
};
