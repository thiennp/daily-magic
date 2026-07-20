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
      text: `Bundle unknown${serverVersion.length > 0 ? ` · cloud ${serverVersion}` : ""}`,
      isMismatch: serverVersion.length > 0,
    };
  }

  const isMismatch = isAgentWitchInstallBundleVersionBehind(
    localVersion,
    serverVersion,
  );

  if (!isMismatch) {
    return {
      text: `Bundle ${localVersion}`,
      isMismatch: false,
    };
  }

  return {
    text:
      serverVersion.length > 0
        ? `Bundle ${localVersion} · update available (cloud ${serverVersion})`
        : `Bundle ${localVersion}`,
    isMismatch: true,
  };
};
