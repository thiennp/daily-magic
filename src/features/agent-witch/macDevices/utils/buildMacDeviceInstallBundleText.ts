import { isAgentWitchInstallBundleVersionBehind } from "@/lib/agentWitch/isAgentWitchInstallBundleVersionBehind";

export const buildMacDeviceInstallBundleText = (input: {
  readonly installBundleVersion: string | null;
  readonly serverInstallBundleVersion: string | null;
}): { readonly text: string; readonly isMismatch: boolean } | null => {
  const serverVersion = input.serverInstallBundleVersion?.trim() ?? "";
  const localVersion = input.installBundleVersion?.trim() ?? "";

  if (serverVersion.length === 0 && localVersion.length === 0) {
    return null;
  }

  if (localVersion.length === 0) {
    return {
      text: `Version unknown${serverVersion.length > 0 ? ` · latest ${serverVersion}` : ""}`,
      isMismatch: serverVersion.length > 0,
    };
  }

  const isMismatch = isAgentWitchInstallBundleVersionBehind(
    localVersion,
    serverVersion,
  );

  if (!isMismatch) {
    return {
      text: `Version ${localVersion}`,
      isMismatch: false,
    };
  }

  return {
    text:
      serverVersion.length > 0
        ? `Version ${localVersion} · update available (latest ${serverVersion})`
        : `Version ${localVersion}`,
    isMismatch: true,
  };
};
