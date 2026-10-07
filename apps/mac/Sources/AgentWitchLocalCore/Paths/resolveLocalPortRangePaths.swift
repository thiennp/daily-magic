import Foundation

public func resolveAgentWitchProfilesDir(
    installDir: URL = resolveAgentWitchInstallDir()
) -> URL {
    installDir.appendingPathComponent(MacAppConstants.profilesDirName, isDirectory: true)
}

public func resolveAgentWitchProfileDir(
    email: String,
    installDir: URL = resolveAgentWitchInstallDir()
) -> URL {
    resolveAgentWitchProfilesDir(installDir: installDir)
        .appendingPathComponent(email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased(), isDirectory: true)
}

public func resolveLocalPortRangeFileURL(profileDir: URL) -> URL {
    profileDir.appendingPathComponent(MacAppConstants.localPortRangeFileName, isDirectory: false)
}

public func resolveLocalAppPortFileURL(profileDir: URL) -> URL {
    profileDir.appendingPathComponent(MacAppConstants.localAppPortFileName, isDirectory: false)
}
