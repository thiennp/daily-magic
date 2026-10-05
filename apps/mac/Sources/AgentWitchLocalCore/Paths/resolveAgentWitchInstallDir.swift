import Foundation

/// Resolves `~/.agent-witch` (production install root).
public func resolveAgentWitchInstallDir(
    homeDirectory: URL = FileManager.default.homeDirectoryForCurrentUser
) -> URL {
    homeDirectory.appendingPathComponent(
        MacAppConstants.productionInstallDirName,
        isDirectory: true
    )
}
