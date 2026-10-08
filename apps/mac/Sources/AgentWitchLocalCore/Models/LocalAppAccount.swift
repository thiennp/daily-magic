import Foundation

public struct LocalAppAccount: Equatable, Sendable {
    public let email: String
    public let port: Int?
    /// Per-account LaunchAgent label from host-services.json (nil before ISO-1 migration).
    public let launchAgentLabel: String?

    public init(email: String, port: Int?, launchAgentLabel: String? = nil) {
        self.email = email
        self.port = port
        self.launchAgentLabel = launchAgentLabel
    }
}

/// One account's launchd target for Start / Stop / Restart (dd5c338d).
public struct MacAppAccountLaunchTarget: Equatable, Sendable {
    public let email: String
    public let label: String
    public let plistPath: URL

    public init(email: String, label: String, plistPath: URL) {
        self.email = email
        self.label = label
        self.plistPath = plistPath
    }
}
