import Foundation

/// Returns whether `to` is an allowed next state from `from`.
public func isMacAppStateTransitionAllowed(
    from: MacAppRuntimeState,
    to: MacAppRuntimeState
) -> Bool {
    switch (from, to) {
    case (.notInstalled, .notInstalled),
         (.notInstalled, .stopped),
         (.notInstalled, .running),
         (.notInstalled, .error):
        return true
    case (.stopped, .starting),
         (.stopped, .stopped),
         (.stopped, .running),
         (.stopped, .notInstalled),
         (.stopped, .error):
        return true
    case (.starting, .running),
         (.starting, .stopped),
         (.starting, .error),
         (.starting, .starting):
        return true
    case (.running, .stopping),
         (.running, .running),
         (.running, .stopped),
         (.running, .error):
        return true
    case (.stopping, .stopped),
         (.stopping, .error),
         (.stopping, .stopping):
        return true
    case (.error, .starting),
         (.error, .stopped),
         (.error, .notInstalled),
         (.error, .running),
         (.error, .error):
        return true
    default:
        return false
    }
}
