/** Fixed GitHub Release asset name for the Mac menu bar dmg. */
export const AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME = "AgentWitchLocal.dmg";

/** Current Mac app release tag. Bump this when a new awl-mac-v* tag is cut. */
export const AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG = "awl-mac-v0.2.3";

const AGENT_WITCH_LOCAL_MAC_APP_RELEASES_DOWNLOAD_BASE =
  "https://github.com/thiennp/daily-magic/releases/download";

/** Tag-pinned URL for site CTAs (avoids repo-wide releases/latest). */
export const buildAgentWitchLocalMacAppDownloadUrl = (): string =>
  `${AGENT_WITCH_LOCAL_MAC_APP_RELEASES_DOWNLOAD_BASE}/${AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG}/${AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME}`;
