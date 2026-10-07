import Foundation

/// Tokenless public install script (`/install/agent-witch.sh`).
public func resolveAgentWitchInstallScriptUrl(
    origin: String = MacAppConstants.cloudOrigin
) -> URL {
    let base = origin.hasSuffix("/") ? String(origin.dropLast()) : origin
    return URL(string: base + MacAppConstants.bootstrapInstallScriptPath)!
}

/// Tokenless update/repair script (`/install/agent-witch-update.sh`) for existing installs.
public func resolveAgentWitchUpdateScriptUrl(
    origin: String = MacAppConstants.cloudOrigin
) -> URL {
    let base = origin.hasSuffix("/") ? String(origin.dropLast()) : origin
    return URL(string: base + MacAppConstants.updateInstallScriptPath)!
}

/// Picks install vs update URL from whether the core layout already exists.
public func resolveAgentWitchSelfHealScriptUrl(
    isCoreInstalled: Bool,
    origin: String = MacAppConstants.cloudOrigin
) -> URL {
    isCoreInstalled
        ? resolveAgentWitchUpdateScriptUrl(origin: origin)
        : resolveAgentWitchInstallScriptUrl(origin: origin)
}
