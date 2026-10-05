import Foundation

public enum MacAppStateTransitionError: Error, Equatable {
    case disallowed(from: MacAppRuntimeState, to: MacAppRuntimeState)
}

/// Applies an allowed transition or throws when the edge is invalid.
public func applyMacAppStateTransition(
    from: MacAppRuntimeState,
    to: MacAppRuntimeState
) throws -> MacAppRuntimeState {
    guard isMacAppStateTransitionAllowed(from: from, to: to) else {
        throw MacAppStateTransitionError.disallowed(from: from, to: to)
    }
    return to
}
