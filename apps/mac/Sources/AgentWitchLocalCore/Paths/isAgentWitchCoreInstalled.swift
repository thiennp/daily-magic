import Foundation

/// True when `~/.agent-witch` and the production LaunchAgent plist both exist.
public func isAgentWitchCoreInstalled(
    installDir: URL,
    plistPath: URL,
    fileManager: FileManager = .default
) -> Bool {
    var isDirectory: ObjCBool = false
    let hasInstallDir = fileManager.fileExists(
        atPath: installDir.path,
        isDirectory: &isDirectory
    ) && isDirectory.boolValue
    let hasPlist = fileManager.fileExists(atPath: plistPath.path)
    return hasInstallDir && hasPlist
}
