import XCTest
@testable import AgentWitchLocalCore

final class MacAppChromeStatusTests: XCTestCase {
    func testNotInstalledMapsToNotSetUp() {
        let s = MacAppChromeStatus.resolve(
            runtime: .notInstalled,
            bootstrap: nil,
            signedIn: false
        )
        XCTAssertEqual(s.kind, .notSetUp)
        XCTAssertEqual(s.pillLabel, "Not set up")
    }

    func testBootstrapInstallingMapsToSettingUp() {
        let s = MacAppChromeStatus.resolve(
            runtime: .notInstalled,
            bootstrap: .installing,
            signedIn: false
        )
        XCTAssertEqual(s.kind, .settingUp)
        XCTAssertEqual(s.pillLabel, "Setting up…")
    }

    func testSignedOutWhenInstalled() {
        let s = MacAppChromeStatus.resolve(
            runtime: .stopped,
            bootstrap: nil,
            signedIn: false
        )
        XCTAssertEqual(s.kind, .signedOut)
        XCTAssertEqual(s.pillLabel, "Signed out")
    }

    func testRunning() {
        let s = MacAppChromeStatus.resolve(
            runtime: .running,
            bootstrap: nil,
            signedIn: true
        )
        XCTAssertEqual(s.kind, .running)
        XCTAssertEqual(s.pillLabel, "Running")
        XCTAssertEqual(s.detailTitle, "This computer is available")
    }

    func testOfflineTakesPrecedenceWhenSignedIn() {
        let s = MacAppChromeStatus.resolve(
            runtime: .running,
            bootstrap: nil,
            signedIn: true,
            offline: true
        )
        XCTAssertEqual(s.kind, .waitingForInternet)
        XCTAssertEqual(s.pillLabel, "Waiting for internet")
    }

    func testErrorSanitizes113() {
        let s = MacAppChromeStatus.resolve(
            runtime: .error(message: "launchctl kickstart failed with status 113"),
            bootstrap: nil,
            signedIn: true
        )
        XCTAssertEqual(s.kind, .problem)
        XCTAssertFalse(s.detailSubtitle.contains("113"))
        XCTAssertEqual(s.pillLabel, "Problem")
    }

    func testSanitizeChromeMessageStripsBare113() {
        XCTAssertFalse(sanitizeChromeMessage("status 113").contains("113"))
        XCTAssertEqual(
            sanitizeChromeMessage("status 113"),
            "Could not finish setup on this computer."
        )
    }
}
