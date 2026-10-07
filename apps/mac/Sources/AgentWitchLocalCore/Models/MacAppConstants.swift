import Foundation

public enum MacAppConstants {
    public static let productionInstallDirName = ".agent-witch"
    public static let launchAgentLabel = "com.agent-witch"
    public static let mainLogFileName = "agent-witch.log"
    public static let logsDirName = "logs"
    public static let profilesDirName = "profiles"
    public static let localAppHost = "127.0.0.1"
    public static let localAppPort = 43347
    public static let healthPath = "/health"
    public static let statusPath = "/status"
    /// Same origin constant as `AGENT_WITCH_DEFAULT_ORIGIN` in packages/shared.
    public static let cloudOrigin = "https://www.agentwitch.com"
    public static let cloudOriginHostExact = "www.agentwitch.com"
    public static let cloudOriginHostApex = "agentwitch.com"
    public static let bundleIdentifier = "com.agent-witch.local-app"
    /// Desktop app marketing version (keep in sync with CFBundleShortVersionString / Linux core.Version).
    public static let appVersion = "0.2.0"

    // MARK: - Desktop update notice (GitHub releases)

    /// Do not use /releases/latest — shared across awl-mac / awl-linux / awl-windows tag families.
    public static let releasesAPIURL = "https://api.github.com/repos/thiennp/daily-magic/releases"
    public static let tagPrefixMac = "awl-mac-v"
    public static let tagPrefixLinux = "awl-linux-v"
    public static let tagPrefixWindows = "awl-windows-v"
    public static let updateCheckIntervalSeconds: TimeInterval = 24 * 60 * 60

    // MARK: - First-run bootstrap (AWC PKCE contract)

    public static let bootstrapURLScheme = "agentwitch-local"
    public static let bootstrapCallbackHost = "install"
    public static let bootstrapClientId = "mac-app"
    public static let bootstrapConnectPath = "/connect"
    public static let bootstrapExchangePath = "/api/local/bootstrap/exchange"
    public static let bootstrapInstallScriptPath = "/install/agent-witch.sh"
    /// Existing-install repair/update script (same family as install; no token query).
    public static let updateInstallScriptPath = "/install/agent-witch-update.sh"
    /// Active account pointer under `~/.agent-witch` (email only — never pairing secrets).
    public static let activeProfileFileName = "active-profile.json"
    /// Status pill while self-heal runs (design).
    public static let setupInProgressStatus = "Setting up…"
    /// Official install script: `PAIRING_TOKEN="${PRESET_PAIRING_TOKEN:-}"`.
    public static let installTokenEnvironmentVariable = "PRESET_PAIRING_TOKEN"
    /// Official install script: profile email preset.
    public static let profileEmailEnvironmentVariable = "PRESET_PROFILE_EMAIL"
    public static let bootstrapPkceByteCount = 32
    public static let bootstrapPendingAttemptTtlSeconds: TimeInterval = 5 * 60
    public static let bootstrapSetupHealthTimeoutSeconds: TimeInterval = 90
    public static let bootstrapSetupHealthPollIntervalSeconds: TimeInterval = 2
    /// Shown when `/health` on the shared port is answered by another user's / install's AWL.
    public static let foreignLocalHealthReason =
        "Another AgentWitch (another macOS user or install) is answering on port 43347. "
        + "Quit it there, then Retry."
    /// Shown when `/health` answers without identity (AWL bundle older than this app).
    public static let unverifiedLocalHealthReason =
        "AgentWitch Local needs an update on this computer. "
        + "Start setup to repair it."
    /// Menu-bar notice when web opens agentwitch-local:// with a path this app cannot handle.
    public static let unsupportedConnectDeepLinkReason =
        "This AgentWitch Local cannot handle that Connect link. "
        + "Update from https://www.agentwitch.com/download."
    /// Generic copyable fallback (no token). Token-bearing command requires signed-in Home.
    public static let bootstrapFallbackInstallCommand =
        "curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash"
}
