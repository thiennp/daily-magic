import Foundation

/// True when `~/.agent-witch` exists and at least one LaunchAgent plist does:
/// the selected account's plist, any host-services account plist, or the legacy
/// `com.agent-witch.plist` (pre-migration).
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
    guard hasInstallDir else { return false }
    if fileManager.fileExists(atPath: plistPath.path) {
        return true
    }
    // ~/.agent-witch → ~ (keeps tests hermetic with a temp install dir).
    let home = installDir.deletingLastPathComponent()
    for row in readHostServicesAccounts(installDir: installDir, fileManager: fileManager) {
        let accountPlist = resolveAgentWitchLaunchAgentPlistPath(
            label: row.launchAgentLabel,
            homeDirectory: home
        )
        if fileManager.fileExists(atPath: accountPlist.path) {
            return true
        }
    }
    return false
}
