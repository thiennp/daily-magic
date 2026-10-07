import Foundation

/// Decides Start / Start setup: self-heal when missing or outdated (`.unverified`), never bare 113.
public func decideMacAppStartAction(
    isCoreInstalled: Bool,
    runtimeState: MacAppRuntimeState,
    ownership: LocalHealthOwnership
) -> MacAppStartAction {
    if case .foreign = ownership {
        return .blockedForeign
    }
    // Old core without osUid must update/repair — kickstart alone leaves Stopped / unverified.
    if case .unverified = ownership {
        return .selfHeal
    }
    if !isCoreInstalled || runtimeState == .notInstalled {
        return .selfHeal
    }
    // Prefer live health over a possibly stale published .running.
    if ownership.isHealthy {
        return .none
    }
    return .kickstart
}
