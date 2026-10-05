import Foundation

/// Resolves `~/Library/LaunchAgents/com.agent-witch.plist`.
public func resolveAgentWitchLaunchAgentPlistPath(
    homeDirectory: URL = FileManager.default.homeDirectoryForCurrentUser
) -> URL {
    homeDirectory
        .appendingPathComponent("Library", isDirectory: true)
        .appendingPathComponent("LaunchAgents", isDirectory: true)
        .appendingPathComponent("\(MacAppConstants.launchAgentLabel).plist", isDirectory: false)
}
