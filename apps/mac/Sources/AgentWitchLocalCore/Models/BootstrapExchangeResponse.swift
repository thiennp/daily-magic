import Foundation

/// AWC `/api/local/bootstrap/exchange` success body (locked contract).
public struct BootstrapExchangeResponse: Equatable, Sendable {
    public let installToken: String
    public let profileEmail: String
    public let scriptUrl: String
    /// Hex-encoded SHA-256 of the install script body (always required).
    public let scriptSha256: String

    public init(
        installToken: String,
        profileEmail: String,
        scriptUrl: String,
        scriptSha256: String
    ) {
        self.installToken = installToken
        self.profileEmail = profileEmail
        self.scriptUrl = scriptUrl
        self.scriptSha256 = scriptSha256
    }
}
