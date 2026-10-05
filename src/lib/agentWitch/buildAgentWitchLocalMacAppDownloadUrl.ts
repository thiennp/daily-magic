/** Fixed GitHub Release asset name for the unsigned Mac menu bar dmg. */
export const AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME = "AgentWitchLocal.dmg";

const AGENT_WITCH_LOCAL_MAC_APP_RELEASES_LATEST_DOWNLOAD_BASE =
  "https://github.com/thiennp/daily-magic/releases/latest/download";

/** Stable URL for site CTAs: releases/latest/download/AgentWitchLocal.dmg */
export const buildAgentWitchLocalMacAppDownloadUrl = (): string =>
  `${AGENT_WITCH_LOCAL_MAC_APP_RELEASES_LATEST_DOWNLOAD_BASE}/${AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME}`;
