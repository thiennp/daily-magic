import Foundation

/// Allowed MacAppSetupSessionState edges (H5 Arch Exact FIX-1).
public func isMacAppSetupSessionTransitionAllowed(
    from: MacAppSetupSessionState,
    to: MacAppSetupSessionState
) -> Bool {
    switch (from, to) {
    case (.idle, .running):
        return true
    case (.running, .running):
        return true
    case (.running, .succeeded), (.running, .failed):
        return true
    case (.failed, .running):
        return true
    case (.succeeded, .idle), (.succeeded, .running):
        return true
    // Identity / no-op same-case keeps UI stable.
    case (.idle, .idle), (.succeeded, .succeeded):
        return true
    case (.failed, .failed):
        return true
    default:
        return false
    }
}
