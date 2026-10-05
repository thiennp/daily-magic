import Foundation
import Security

public struct BeginBootstrapSignInFlowResult: Equatable, Sendable {
    public let state: MacAppBootstrapState
    public let pending: MacAppBootstrapPendingAttempt
    public let connectUrl: URL

    public init(
        state: MacAppBootstrapState,
        pending: MacAppBootstrapPendingAttempt,
        connectUrl: URL
    ) {
        self.state = state
        self.pending = pending
        self.connectUrl = connectUrl
    }
}

/// From Checking (first attempt) or Signing in (retry): create a fresh PKCE attempt, open connect URL → Signing in.
public func beginBootstrapSignInFlow(
    current: MacAppBootstrapState,
    opener: BrowserOpening,
    now: Date = Date(),
    randomBytes: (Int) -> Data = { count in
        var bytes = [UInt8](repeating: 0, count: count)
        let status = SecRandomCopyBytes(kSecRandomDefault, count, &bytes)
        precondition(status == errSecSuccess, "SecRandomCopyBytes failed")
        return Data(bytes)
    }
) throws -> BeginBootstrapSignInFlowResult {
    _ = try applyMacAppBootstrapStateTransition(from: current, to: .signingIn)

    let state = encodeBase64Url(randomBytes(MacAppConstants.bootstrapPkceByteCount))
    let codeVerifier = encodeBase64Url(randomBytes(MacAppConstants.bootstrapPkceByteCount))
    let challenge = derivePkceCodeChallenge(codeVerifier: codeVerifier)
    let connectUrl = buildBootstrapConnectUrl(state: state, codeChallenge: challenge)
    try opener.open(connectUrl)

    let pending = MacAppBootstrapPendingAttempt(
        state: state,
        codeVerifier: codeVerifier,
        createdAt: now
    )
    return BeginBootstrapSignInFlowResult(
        state: .signingIn,
        pending: pending,
        connectUrl: connectUrl
    )
}
