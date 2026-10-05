import Foundation

/// Orchestrates install detection → `notInstalled` or `stopped`/`running` seed.
public func detectInstallFlow(
    installDir: URL = resolveAgentWitchInstallDir(),
    plistPath: URL = resolveAgentWitchLaunchAgentPlistPath(),
    fileManager: FileManager = .default,
    isHealthy: Bool = false
) -> MacAppRuntimeState {
    guard isAgentWitchCoreInstalled(
        installDir: installDir,
        plistPath: plistPath,
        fileManager: fileManager
    ) else {
        return .notInstalled
    }
    return isHealthy ? .running : .stopped
}
