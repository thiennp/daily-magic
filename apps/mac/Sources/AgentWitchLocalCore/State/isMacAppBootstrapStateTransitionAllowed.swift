import Foundation

/// Returns whether `to` is an allowed next bootstrap state from `from`.
public func isMacAppBootstrapStateTransitionAllowed(
    from: MacAppBootstrapState,
    to: MacAppBootstrapState
) -> Bool {
    switch (from, to) {
    case (.checking, .signingIn),
         (.checking, .connected),
         (.checking, .error),
         (.checking, .checking):
        return true
    case (.signingIn, .installing),
         (.signingIn, .error),
         (.signingIn, .signingIn):
        return true
    case (.installing, .settingUp),
         (.installing, .error),
         (.installing, .installing):
        return true
    case (.settingUp, .connected),
         (.settingUp, .error),
         (.settingUp, .settingUp):
        return true
    case (.error, .checking),
         (.error, .error):
        return true
    case (.connected, .connected):
        return true
    default:
        return false
    }
}
