import XCTest
@testable import AgentWitchLocalCore

final class LocalWebViewReloadTests: XCTestCase {
    func testShouldReloadWhenLastRequestedNil() {
        let requested = URL(string: "http://127.0.0.1:51234/prompt-optimizer")!
        XCTAssertTrue(shouldReloadLocalWebView(requested: requested, lastRequested: nil))
    }

    func testShouldNotReloadWhenSameURL() {
        let url = URL(string: "http://127.0.0.1:51234/prompt-optimizer")!
        XCTAssertFalse(shouldReloadLocalWebView(requested: url, lastRequested: url))
    }

    func testShouldReloadOnNewPath() {
        let last = URL(string: "http://127.0.0.1:51234/prompt-optimizer")!
        let requested = URL(string: "http://127.0.0.1:51234/prompt-optimizer/guide")!
        XCTAssertTrue(shouldReloadLocalWebView(requested: requested, lastRequested: last))
    }

    func testShouldReloadOnNewQuery() {
        let last = URL(string: "http://127.0.0.1:51234/prompt-optimizer")!
        let requested = URL(string: "http://127.0.0.1:51234/prompt-optimizer?example=support-reply")!
        XCTAssertTrue(shouldReloadLocalWebView(requested: requested, lastRequested: last))
    }

    func testShouldReloadOnNewPort() {
        let last = URL(string: "http://127.0.0.1:51234/prompt-optimizer")!
        let requested = URL(string: "http://127.0.0.1:51235/prompt-optimizer")!
        XCTAssertTrue(shouldReloadLocalWebView(requested: requested, lastRequested: last))
    }

    func testAllowLocalNavigationMatchingPort() {
        let url = URL(string: "http://127.0.0.1:51234/prompt-optimizer?cycle=abc")!
        XCTAssertTrue(shouldAllowLocalWebViewNavigation(url: url, allowedPort: 51234))
    }

    func testAllowLocalNavigationGuidePath() {
        let url = URL(string: "http://127.0.0.1:51234/prompt-optimizer/guide")!
        XCTAssertTrue(shouldAllowLocalWebViewNavigation(url: url, allowedPort: 51234))
    }

    func testRejectWrongPort() {
        let url = URL(string: "http://127.0.0.1:43347/prompt-optimizer")!
        XCTAssertFalse(shouldAllowLocalWebViewNavigation(url: url, allowedPort: 51234))
    }

    func testRejectHttps() {
        let url = URL(string: "https://www.agentwitch.com/prompt-optimizer")!
        XCTAssertFalse(shouldAllowLocalWebViewNavigation(url: url, allowedPort: 51234))
    }

    func testRejectOtherHost() {
        let url = URL(string: "http://localhost:51234/prompt-optimizer")!
        XCTAssertFalse(shouldAllowLocalWebViewNavigation(url: url, allowedPort: 51234))
    }

    func testRejectMissingExplicitPort() {
        let url = URL(string: "http://127.0.0.1/prompt-optimizer")!
        XCTAssertFalse(shouldAllowLocalWebViewNavigation(url: url, allowedPort: 51234))
    }
}
