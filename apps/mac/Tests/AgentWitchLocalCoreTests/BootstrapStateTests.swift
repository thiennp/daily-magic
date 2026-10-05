import XCTest
@testable import AgentWitchLocalCore

final class BootstrapStateTests: XCTestCase {
    func testLegalTransitions() {
        let legal: [(MacAppBootstrapState, MacAppBootstrapState)] = [
            (.checking, .signingIn),
            (.checking, .connected),
            (.checking, .error(reason: "x")),
            (.checking, .checking),
            (.signingIn, .installing),
            (.signingIn, .error(reason: "x")),
            (.signingIn, .signingIn),
            (.installing, .settingUp),
            (.installing, .error(reason: "x")),
            (.installing, .installing),
            (.settingUp, .connected),
            (.settingUp, .error(reason: "x")),
            (.settingUp, .settingUp),
            (.error(reason: "a"), .checking),
            (.error(reason: "a"), .error(reason: "b")),
            (.connected, .connected),
        ]
        for (from, to) in legal {
            XCTAssertTrue(
                isMacAppBootstrapStateTransitionAllowed(from: from, to: to),
                "expected legal \(from) → \(to)"
            )
            XCTAssertNoThrow(try applyMacAppBootstrapStateTransition(from: from, to: to))
        }
    }

    func testIllegalTransitions() {
        let illegal: [(MacAppBootstrapState, MacAppBootstrapState)] = [
            (.checking, .installing),
            (.checking, .settingUp),
            (.signingIn, .connected),
            (.signingIn, .checking),
            (.signingIn, .settingUp),
            (.installing, .connected),
            (.installing, .signingIn),
            (.installing, .checking),
            (.settingUp, .signingIn),
            (.settingUp, .installing),
            (.settingUp, .checking),
            (.connected, .checking),
            (.connected, .signingIn),
            (.connected, .error(reason: "x")),
            (.error(reason: "x"), .signingIn),
            (.error(reason: "x"), .connected),
            (.error(reason: "x"), .installing),
        ]
        for (from, to) in illegal {
            XCTAssertFalse(
                isMacAppBootstrapStateTransitionAllowed(from: from, to: to),
                "expected illegal \(from) → \(to)"
            )
            XCTAssertThrowsError(try applyMacAppBootstrapStateTransition(from: from, to: to))
        }
    }

    func testCheckHandoffWhenAlreadyInstalled() throws {
        let healthy = try checkBootstrapInstallFlow(
            current: .checking,
            isCoreInstalled: true,
            isHealthy: true
        )
        XCTAssertEqual(healthy.state, .connected)
        XCTAssertEqual(healthy.handoffRuntime, .running)

        let stopped = try checkBootstrapInstallFlow(
            current: .checking,
            isCoreInstalled: true,
            isHealthy: false
        )
        XCTAssertEqual(stopped.handoffRuntime, .stopped)
        XCTAssertEqual(stopped.state, .checking)

        let missing = try checkBootstrapInstallFlow(
            current: .checking,
            isCoreInstalled: false,
            isHealthy: false
        )
        XCTAssertNil(missing.handoffRuntime)
        XCTAssertEqual(missing.state, .checking)
    }
}
