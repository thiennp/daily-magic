import {
  GENERIC_INSTALL_TOKEN_ERROR,
  readInstallTokenErrorMessage,
} from "@/lib/agentWitch/readInstallTokenErrorMessage";
import detectMobileClient from "@/lib/mobile/detectMobileClient";

interface InstallTokenResult {
  readonly ok: boolean;
  readonly installCommand?: string;
  readonly pairingToken?: string;
  readonly tokenHash?: string;
  readonly profileEmail?: string;
  readonly errorMessage?: string;
}

const parseInstallTokenPayload = (payload: unknown): InstallTokenResult => {
  const installCommand =
    typeof payload === "object" &&
    payload !== null &&
    "installCommand" in payload &&
    typeof (payload as { installCommand: unknown }).installCommand === "string"
      ? (payload as { installCommand: string }).installCommand
      : "";
  const pairingToken =
    typeof payload === "object" &&
    payload !== null &&
    "pairingToken" in payload &&
    typeof (payload as { pairingToken: unknown }).pairingToken === "string"
      ? (payload as { pairingToken: string }).pairingToken
      : "";
  const tokenHash =
    typeof payload === "object" &&
    payload !== null &&
    "tokenHash" in payload &&
    typeof (payload as { tokenHash: unknown }).tokenHash === "string"
      ? (payload as { tokenHash: string }).tokenHash.trim()
      : "";
  const profileEmail =
    typeof payload === "object" &&
    payload !== null &&
    "email" in payload &&
    typeof (payload as { email: unknown }).email === "string"
      ? (payload as { email: string }).email
      : "";

  if (installCommand.length === 0 || pairingToken.length === 0) {
    return { ok: false, errorMessage: "Missing install command from server." };
  }

  return {
    ok: true,
    installCommand,
    pairingToken,
    tokenHash: tokenHash.length > 0 ? tokenHash : undefined,
    profileEmail,
  };
};

export const fetchAgentWitchInstallToken =
  async (): Promise<InstallTokenResult> => {
    // POST install-token reserves a computer device row; never do that from mobile.
    if (detectMobileClient()) {
      return {
        ok: false,
        errorMessage: "Mac install links are not created on mobile devices.",
      };
    }

    try {
      const response = await fetch("/api/agent-witch/install-token", {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        return {
          ok: false,
          errorMessage: await readInstallTokenErrorMessage(response),
        };
      }

      const payload: unknown = await response.json();
      return parseInstallTokenPayload(payload);
    } catch (error) {
      if (error instanceof DOMException && error.name === "TimeoutError") {
        return {
          ok: false,
          errorMessage:
            "Timed out while creating the install link. Refresh and try again.",
        };
      }

      return {
        ok: false,
        errorMessage: GENERIC_INSTALL_TOKEN_ERROR,
      };
    }
  };
