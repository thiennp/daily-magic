import XCTest
@testable import AgentWitchLocalCore

final class SetupSessionTransitionTests: XCTestCase {
    func testAllowedTransitions() throws {
        let running = MacAppSetupSessionState.running(
            step: .checkingThisComputer,
            progressPercent: 10
        )
        let progress = MacAppSetupSessionState.running(
            step: .downloadingTheConnection,
            progressPercent: 40
        )
        let failed = MacAppSetupSessionState.failed(kind: .generic, logPath: nil)

        XCTAssertEqual(
            try applyMacAppSetupSessionTransition(from: .idle, to: running),
            running
        )
        XCTAssertEqual(
            try applyMacAppSetupSessionTransition(from: running, to: progress),
            progress
        )
        XCTAssertEqual(
            try applyMacAppSetupSessionTransition(from: progress, to: .succeeded),
            .succeeded
        )
        XCTAssertEqual(
            try applyMacAppSetupSessionTransition(from: progress, to: failed),
            failed
        )
        XCTAssertEqual(
            try applyMacAppSetupSessionTransition(from: failed, to: running),
            running
        )
        XCTAssertEqual(
            try applyMacAppSetupSessionTransition(from: .succeeded, to: .idle),
            .idle
        )
        XCTAssertEqual(
            try applyMacAppSetupSessionTransition(from: .succeeded, to: running),
            running
        )
    }

    func testRefusedTransitions() {
        let running = MacAppSetupSessionState.running(
            step: .checkingThisComputer,
            progressPercent: 10
        )
        let failed = MacAppSetupSessionState.failed(kind: .offline, logPath: nil)

        XCTAssertFalse(isMacAppSetupSessionTransitionAllowed(from: .idle, to: .succeeded))
        XCTAssertFalse(isMacAppSetupSessionTransitionAllowed(from: .idle, to: failed))
        XCTAssertFalse(isMacAppSetupSessionTransitionAllowed(from: .succeeded, to: failed))
        XCTAssertFalse(isMacAppSetupSessionTransitionAllowed(from: failed, to: .succeeded))
        XCTAssertFalse(isMacAppSetupSessionTransitionAllowed(from: failed, to: .idle))
        XCTAssertFalse(isMacAppSetupSessionTransitionAllowed(from: running, to: .idle))
        XCTAssertThrowsError(
            try applyMacAppSetupSessionTransition(from: .idle, to: .succeeded)
        )
    }

    func testDecideKickstartFallbackRoutesErrorToSelfHeal() {
        let errored = StartCoreFlowResult(
            state: .error(message: "launchctl kickstart failed (status 113)."),
            bootstrapStatus: 0,
            kickstartStatus: 113
        )
        XCTAssertEqual(decideKickstartFallback(result: errored), .selfHeal)

        let ok = StartCoreFlowResult(
            state: .running,
            bootstrapStatus: 0,
            kickstartStatus: 0
        )
        XCTAssertEqual(decideKickstartFallback(result: ok), .none)

        let nonzero = StartCoreFlowResult(
            state: .running,
            bootstrapStatus: 0,
            kickstartStatus: 5
        )
        XCTAssertEqual(decideKickstartFallback(result: nonzero), .selfHeal)
    }

    func testSanitizeKickstart113Message() {
        let cleaned = sanitizeMacAppUserFacingStatus(
            "launchctl kickstart failed (status 113)."
        )
        XCTAssertFalse(cleaned.contains("113"))
        XCTAssertEqual(cleaned, MacAppSetupFailureKind.couldNotFinishTitle)
        // Do not strip unrelated "113" counts (narrow patterns only).
        XCTAssertEqual(
            sanitizeMacAppUserFacingStatus("Found 113 tools"),
            "Found 113 tools"
        )
    }
}
