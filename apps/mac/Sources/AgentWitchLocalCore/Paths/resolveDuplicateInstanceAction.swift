import Foundation

/// A running AgentWitch Local process that is not this one.
public struct OtherAppInstance: Equatable {
    public let processIdentifier: Int32
    public let bundlePath: String

    public init(processIdentifier: Int32, bundlePath: String) {
        self.processIdentifier = processIdentifier
        self.bundlePath = bundlePath
    }
}

public enum DuplicateInstanceAction: Equatable {
    /// Nothing else is running.
    case proceed
    /// Another copy from a normal location is already running: hand over to it and quit.
    case activateExistingAndQuit
    /// The copies running from a disk image or temporary folder are stale: quit them, keep this one.
    case terminateOthers(processIdentifiers: [Int32])
}

/// Several mounted copies (even different versions) must never run side by side:
/// each one would manage the same LaunchAgent. A copy in Applications outranks one that
/// runs from a disk image or an App Translocation folder.
public func resolveDuplicateInstanceAction(
    selfBundlePath: String,
    others: [OtherAppInstance],
    homeDirectory: String
) -> DuplicateInstanceAction {
    if others.isEmpty {
        return .proceed
    }
    let selfIsNormal = resolveAppInstallGuidance(bundlePath: selfBundlePath, homeDirectory: homeDirectory) == nil
    let stale = others.filter {
        resolveAppInstallGuidance(bundlePath: $0.bundlePath, homeDirectory: homeDirectory) != nil
    }
    if selfIsNormal && stale.count == others.count {
        return .terminateOthers(processIdentifiers: stale.map(\.processIdentifier))
    }
    return .activateExistingAndQuit
}
