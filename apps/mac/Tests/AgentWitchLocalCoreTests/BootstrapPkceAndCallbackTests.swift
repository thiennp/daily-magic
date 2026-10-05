import XCTest
@testable import AgentWitchLocalCore

final class BootstrapPkceAndCallbackTests: XCTestCase {
    /// RFC 7636 Appendix B test vector.
    func testPkceChallengeRfc7636AppendixB() {
        let verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
        let challenge = derivePkceCodeChallenge(codeVerifier: verifier)
        XCTAssertEqual(challenge, "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM")
    }

    func testEncodeBase64UrlNoPadding() {
        // 3 bytes → 4 chars base64, no padding needed; 2 bytes would pad.
        let encoded = encodeBase64Url(Data([0xFF, 0xEE, 0xDD, 0xCC]))
        XCTAssertFalse(encoded.contains("="))
        XCTAssertFalse(encoded.contains("+"))
        XCTAssertFalse(encoded.contains("/"))
    }

    func testParseCallbackSuccess() {
        let url = URL(string: "agentwitch-local://install?code=abc&state=xyz")!
        XCTAssertEqual(
            parseBootstrapCallbackUrl(url),
            .success(code: "abc", state: "xyz")
        )
    }

    func testParseCallbackErrorSlug() {
        let url = URL(string: "agentwitch-local://install?error=access_denied&state=xyz")!
        XCTAssertEqual(
            parseBootstrapCallbackUrl(url),
            .error(slug: "access_denied", state: "xyz")
        )
    }

    func testParseCallbackRejectsWrongScheme() {
        let url = URL(string: "https://evil.example/install?code=a&state=b")!
        XCTAssertEqual(parseBootstrapCallbackUrl(url), .rejected)
    }

    func testParseCallbackRejectsWrongHost() {
        let url = URL(string: "agentwitch-local://other?code=a&state=b")!
        XCTAssertEqual(parseBootstrapCallbackUrl(url), .rejected)
    }

    func testParseCallbackRejectsMissingState() {
        let url = URL(string: "agentwitch-local://install?code=abc")!
        XCTAssertEqual(parseBootstrapCallbackUrl(url), .rejected)
    }

    func testParseCallbackRejectsMissingCodeAndError() {
        let url = URL(string: "agentwitch-local://install?state=xyz")!
        XCTAssertEqual(parseBootstrapCallbackUrl(url), .rejected)
    }

    func testPendingAttemptStateMatchAndExpiry() {
        let created = Date(timeIntervalSince1970: 1_000)
        let pending = MacAppBootstrapPendingAttempt(
            state: "pending-state",
            codeVerifier: "verifier",
            createdAt: created
        )
        XCTAssertEqual(
            isBootstrapPendingAttemptValid(
                pending: pending,
                callbackState: "pending-state",
                now: created.addingTimeInterval(60)
            ),
            .valid
        )
        XCTAssertEqual(
            isBootstrapPendingAttemptValid(
                pending: pending,
                callbackState: "other-state",
                now: created.addingTimeInterval(60)
            ),
            .stateMismatch
        )
        XCTAssertEqual(
            isBootstrapPendingAttemptValid(
                pending: nil,
                callbackState: "pending-state",
                now: created
            ),
            .noPendingAttempt
        )
        XCTAssertEqual(
            isBootstrapPendingAttemptValid(
                pending: pending,
                callbackState: "pending-state",
                now: created.addingTimeInterval(MacAppConstants.bootstrapPendingAttemptTtlSeconds + 1)
            ),
            .expired
        )
    }

    func testHandleCallbackIgnoresStateMismatch() throws {
        let pending = MacAppBootstrapPendingAttempt(
            state: "good",
            codeVerifier: "v",
            createdAt: Date()
        )
        let url = URL(string: "agentwitch-local://install?code=c&state=bad")!
        let outcome = try handleBootstrapCallbackFlow(
            current: .signingIn,
            url: url,
            pending: pending
        )
        XCTAssertEqual(outcome, .ignored)
    }

    func testHandleCallbackProceedsOnMatch() throws {
        let pending = MacAppBootstrapPendingAttempt(
            state: "good",
            codeVerifier: "v",
            createdAt: Date()
        )
        let url = URL(string: "agentwitch-local://install?code=authcode&state=good")!
        let outcome = try handleBootstrapCallbackFlow(
            current: .signingIn,
            url: url,
            pending: pending
        )
        guard case .proceed(let code, let state, _) = outcome else {
            return XCTFail("expected proceed")
        }
        XCTAssertEqual(code, "authcode")
        XCTAssertEqual(state, .installing)
    }
}
