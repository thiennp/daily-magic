import Foundation

/// `~/.agent-witch/logs/setup.log` — user-owned teed install/self-heal script output.
public func resolveAgentWitchSetupLogPath(
    installDir: URL = resolveAgentWitchInstallDir()
) -> URL {
    installDir
        .appendingPathComponent(MacAppConstants.logsDirName, isDirectory: true)
        .appendingPathComponent(MacAppConstants.setupLogFileName, isDirectory: false)
}
