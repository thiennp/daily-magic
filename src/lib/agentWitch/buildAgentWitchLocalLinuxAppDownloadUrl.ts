/** Fixed GitHub Release asset name for the unsigned Linux AppImage. */
export const AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME =
  "AgentWitchLocal-x86_64.AppImage";

/** Fixed GitHub Release asset name for the unsigned Linux .deb. */
export const AGENT_WITCH_LOCAL_LINUX_APP_DEB_ASSET_NAME =
  "agent-witch-local_0.1.0_amd64.deb";

/** Current Linux tray app release tag. Bump when a new awl-linux-v* tag is cut. */
export const AGENT_WITCH_LOCAL_LINUX_APP_RELEASE_TAG = "awl-linux-v0.1.0";

/** Flip to true only after the awl-linux-v0.1.0 release exists; until then the Linux row stays hidden (asset URLs 404). */
export const IS_AGENT_WITCH_LOCAL_LINUX_APP_RELEASED = false;

const AGENT_WITCH_LOCAL_LINUX_APP_RELEASES_DOWNLOAD_BASE =
  "https://github.com/thiennp/daily-magic/releases/download";

const buildLinuxReleaseAssetUrl = (assetName: string): string =>
  `${AGENT_WITCH_LOCAL_LINUX_APP_RELEASES_DOWNLOAD_BASE}/${AGENT_WITCH_LOCAL_LINUX_APP_RELEASE_TAG}/${assetName}`;

/** Tag-pinned AppImage URL for site CTAs. */
export const buildAgentWitchLocalLinuxAppImageDownloadUrl = (): string =>
  buildLinuxReleaseAssetUrl(AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME);

/** Tag-pinned .deb URL for site CTAs. */
export const buildAgentWitchLocalLinuxDebDownloadUrl = (): string =>
  buildLinuxReleaseAssetUrl(AGENT_WITCH_LOCAL_LINUX_APP_DEB_ASSET_NAME);
