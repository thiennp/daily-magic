import {
  fetchAgentWitchRemoteInstallBundleVersion,
  isRemoteAgentWitchBundleVersionNewer,
  readAgentWitchInstallVersion,
} from "@agent-witch/install-self-update";
import { resolveAgentWitchLocalCloudAppOrigin } from "./resolveAgentWitchLocalCloudAppOrigin";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

export type AgentWitchLocalInstallUpdateOffer = {
  readonly updateAvailable: boolean;
  readonly localBundleVersion: string | null;
  readonly remoteBundleVersion: string | null;
  readonly checkError: string | null;
};

export const resolveAgentWitchLocalInstallUpdateOffer = async (
  layout: AgentWitchLocalLayout,
): Promise<AgentWitchLocalInstallUpdateOffer> => {
  const installVersion = readAgentWitchInstallVersion(layout.installDir);
  const localBundleVersion = installVersion?.bundleVersion ?? null;
  const appOrigin = resolveAgentWitchLocalCloudAppOrigin(installVersion);

  try {
    const remoteBundleVersion =
      await fetchAgentWitchRemoteInstallBundleVersion(appOrigin);

    if (remoteBundleVersion === null) {
      return {
        updateAvailable: false,
        localBundleVersion,
        remoteBundleVersion: null,
        checkError: "Could not fetch remote install bundle version.",
      };
    }

    return {
      updateAvailable: isRemoteAgentWitchBundleVersionNewer(
        localBundleVersion,
        remoteBundleVersion,
      ),
      localBundleVersion,
      remoteBundleVersion,
      checkError: null,
    };
  } catch {
    return {
      updateAvailable: false,
      localBundleVersion,
      remoteBundleVersion: null,
      checkError: "Install bundle update check failed.",
    };
  }
};
