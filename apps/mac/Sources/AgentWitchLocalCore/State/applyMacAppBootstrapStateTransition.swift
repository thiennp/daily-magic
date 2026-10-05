import Foundation

public enum MacAppBootstrapStateTransitionError: Error, Equatable {
    case disallowed(from: MacAppBootstrapState, to: MacAppBootstrapState)
}

/// Applies an allowed bootstrap transition or throws when the edge is invalid.
public func applyMacAppBootstrapStateTransition(
    from: MacAppBootstrapState,
    to: MacAppBootstrapState
) throws -> MacAppBootstrapState {
    guard isMacAppBootstrapStateTransitionAllowed(from: from, to: to) else {
        throw MacAppBootstrapStateTransitionError.disallowed(from: from, to: to)
    }
    return to
}
