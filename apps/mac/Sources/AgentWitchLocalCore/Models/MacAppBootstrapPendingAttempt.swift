import Foundation

/// In-memory PKCE attempt for one bootstrap sign-in (never persisted).
public struct MacAppBootstrapPendingAttempt: Equatable, Sendable {
    public let state: String
    public let codeVerifier: String
    public let createdAt: Date

    public init(state: String, codeVerifier: String, createdAt: Date) {
        self.state = state
        self.codeVerifier = codeVerifier
        self.createdAt = createdAt
    }
}
