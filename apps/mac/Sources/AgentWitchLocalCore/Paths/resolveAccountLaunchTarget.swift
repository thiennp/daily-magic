import Foundation

/// Resolves the selected account's LaunchAgent label + plist.
/// When host-services.json lists the account, never falls back to the legacy
/// `com.agent-witch` label (dd5c338d). Before migration, uses the legacy label.
public func resolveAccountLaunchTarget(
    email: String?,
    installDir: URL = resolveAgentWitchInstallDir(),
    homeDirectory: URL = FileManager.default.homeDirectoryForCurrentUser,
    fileManager: FileManager = .default
) -> MacAppAccountLaunchTarget? {
    guard let emailRaw = email else { return nil }
    let email = normalizeAccountEmail(emailRaw)
    guard !email.isEmpty else { return nil }

    let hostLabels = readHostServicesLaunchAgentLabels(
        installDir: installDir,
        fileManager: fileManager
    )
    let label: String
    if let hostLabel = hostLabels[email], !hostLabel.isEmpty {
        label = hostLabel
    } else if hostLabels.isEmpty {
        // Not migrated: one LaunchAgent for the install.
        label = MacAppConstants.launchAgentLabel
    } else {
        // Migrated but this email is missing from host-services.json — do not
        // touch the legacy all-accounts launcher.
        return nil
    }

    let plistPath = resolveAgentWitchLaunchAgentPlistPath(
        label: label,
        homeDirectory: homeDirectory
    )
    return MacAppAccountLaunchTarget(email: email, label: label, plistPath: plistPath)
}

public func resolveAgentWitchLaunchAgentPlistPath(
    label: String,
    homeDirectory: URL = FileManager.default.homeDirectoryForCurrentUser
) -> URL {
    homeDirectory
        .appendingPathComponent("Library", isDirectory: true)
        .appendingPathComponent("LaunchAgents", isDirectory: true)
        .appendingPathComponent("\(label).plist", isDirectory: false)
}
