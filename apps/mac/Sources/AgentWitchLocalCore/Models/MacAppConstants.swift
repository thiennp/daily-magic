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
    public static let bundleIdentifier = "com.agent-witch.local-app"
}
