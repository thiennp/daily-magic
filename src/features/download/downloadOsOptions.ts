import {
  AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME,
  AGENT_WITCH_LOCAL_LINUX_APP_DEB_ASSET_NAME,
  AGENT_WITCH_LOCAL_LINUX_APP_RELEASE_TAG,
  buildAgentWitchLocalLinuxAppImageDownloadUrl,
  buildAgentWitchLocalLinuxDebDownloadUrl,
  IS_AGENT_WITCH_LOCAL_LINUX_APP_RELEASED,
} from "@/lib/agentWitch/buildAgentWitchLocalLinuxAppDownloadUrl";
import {
  AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME,
  AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG,
  buildAgentWitchLocalMacAppDownloadUrl,
} from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

export type DownloadOsKey = "mac" | "linux";

export type DownloadFile = {
  readonly label: string;
  readonly name: string;
  readonly url: string;
};

export type DownloadOsOption = {
  readonly name: string;
  readonly version: string;
  readonly files: readonly DownloadFile[];
  readonly steps: readonly string[];
};

const versionOf = (tag: string): string => tag.replace(/^.*-v/, "v");

export const DOWNLOAD_OS_OPTIONS: Record<DownloadOsKey, DownloadOsOption> = {
  mac: {
    name: "macOS",
    version: versionOf(AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG),
    files: [
      {
        label: "Apple silicon",
        name: AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME,
        url: buildAgentWitchLocalMacAppDownloadUrl(),
      },
    ],
    steps: [
      "Open the downloaded .dmg file.",
      "Drag AgentWitch into Applications.",
      "Open AgentWitch from Applications. If asked, choose Open.",
    ],
  },
  linux: {
    name: "Linux",
    version: versionOf(AGENT_WITCH_LOCAL_LINUX_APP_RELEASE_TAG),
    files: [
      {
        label: "AppImage",
        name: AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME,
        url: buildAgentWitchLocalLinuxAppImageDownloadUrl(),
      },
      {
        label: "Debian or Ubuntu",
        name: AGENT_WITCH_LOCAL_LINUX_APP_DEB_ASSET_NAME,
        url: buildAgentWitchLocalLinuxDebDownloadUrl(),
      },
    ],
    steps: [
      `Make the AppImage runnable: chmod +x ${AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME}`,
      `Start it: ./${AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME}`,
      "Or install the .deb package with your package manager.",
    ],
  },
};

export const DOWNLOAD_OS_KEYS: readonly DownloadOsKey[] =
  IS_AGENT_WITCH_LOCAL_LINUX_APP_RELEASED ? ["mac", "linux"] : ["mac"];
