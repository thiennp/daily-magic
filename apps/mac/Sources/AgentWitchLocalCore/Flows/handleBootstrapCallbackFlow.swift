import Foundation

public enum HandleBootstrapCallbackOutcome: Equatable, Sendable {
    /// Ignore silently (wrong scheme/host, state mismatch, no pending, expired).
    case ignored
    /// Transition to Installing with the authorization code (pending still held for exchange).
    case proceed(code: String, state: MacAppBootstrapState, pending: MacAppBootstrapPendingAttempt)
    /// Transition to Error (AWC returned error slug, or similar).
    case failed(state: MacAppBootstrapState)
}

/// Pure-ish callback handling: parse URL, validate pending state/TTL, transition SigningIn → Installing or Error.
/// Does not clear pending (exchange clears after one attempt). Never logs the URL.
public func handleBootstrapCallbackFlow(
    current: MacAppBootstrapState,
    url: URL,
    pending: MacAppBootstrapPendingAttempt?,
    now: Date = Date()
) throws -> HandleBootstrapCallbackOutcome {
    let parsed = parseBootstrapCallbackUrl(url)
    switch parsed {
    case .rejected:
        return .ignored
    case .error(let slug, let callbackState):
        let validation = isBootstrapPendingAttemptValid(
            pending: pending,
            callbackState: callbackState,
            now: now
        )
        guard validation == .valid, let pending else {
            return .ignored
        }
        _ = pending
        let reason = sanitizeBootstrapErrorReason("Sign-in failed (\(slug)).")
        let next = try applyMacAppBootstrapStateTransition(
            from: current,
            to: .error(reason: reason)
        )
        return .failed(state: next)
    case .success(let code, let callbackState):
        let validation = isBootstrapPendingAttemptValid(
            pending: pending,
            callbackState: callbackState,
            now: now
        )
        guard validation == .valid, let pending else {
            return .ignored
        }
        let next = try applyMacAppBootstrapStateTransition(from: current, to: .installing)
        return .proceed(code: code, state: next, pending: pending)
    }
}
