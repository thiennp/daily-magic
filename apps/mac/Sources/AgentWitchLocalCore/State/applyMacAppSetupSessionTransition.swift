import Foundation

public enum MacAppSetupSessionTransitionError: Error, Equatable {
    case disallowed(from: MacAppSetupSessionState, to: MacAppSetupSessionState)
}

public func applyMacAppSetupSessionTransition(
    from: MacAppSetupSessionState,
    to: MacAppSetupSessionState
) throws -> MacAppSetupSessionState {
    guard isMacAppSetupSessionTransitionAllowed(from: from, to: to) else {
        throw MacAppSetupSessionTransitionError.disallowed(from: from, to: to)
    }
    return to
}
