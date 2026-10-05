import Foundation

public enum BootstrapPendingAttemptValidation: Equatable, Sendable {
    case valid
    case noPendingAttempt
    case stateMismatch
    case expired
}

/// Validates callback `state` against the in-memory pending attempt (constant-time compare + TTL).
public func isBootstrapPendingAttemptValid(
    pending: MacAppBootstrapPendingAttempt?,
    callbackState: String,
    now: Date = Date(),
    ttlSeconds: TimeInterval = MacAppConstants.bootstrapPendingAttemptTtlSeconds
) -> BootstrapPendingAttemptValidation {
    guard let pending else {
        return .noPendingAttempt
    }
    guard constantTimeStringEquals(pending.state, callbackState) else {
        return .stateMismatch
    }
    if now.timeIntervalSince(pending.createdAt) > ttlSeconds {
        return .expired
    }
    return .valid
}
