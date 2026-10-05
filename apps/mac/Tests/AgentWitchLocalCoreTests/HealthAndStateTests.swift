import XCTest
@testable import AgentWitchLocalCore

final class HealthAndStateTests: XCTestCase {
    func testParseHealthAccepts2xx() {
        XCTAssertTrue(parseLocalHealthResponse(statusCode: 200))
        XCTAssertTrue(parseLocalHealthResponse(statusCode: 204))
        XCTAssertFalse(parseLocalHealthResponse(statusCode: 404))
        XCTAssertFalse(parseLocalHealthResponse(statusCode: 500))
    }

    func testAllowedTransitions() {
        XCTAssertTrue(isMacAppStateTransitionAllowed(from: .stopped, to: .starting))
        XCTAssertTrue(isMacAppStateTransitionAllowed(from: .starting, to: .running))
        XCTAssertTrue(isMacAppStateTransitionAllowed(from: .running, to: .stopping))
        XCTAssertTrue(isMacAppStateTransitionAllowed(from: .stopping, to: .stopped))
        XCTAssertFalse(isMacAppStateTransitionAllowed(from: .notInstalled, to: .starting))
        XCTAssertFalse(isMacAppStateTransitionAllowed(from: .running, to: .starting))
    }

    func testApplyTransitionThrowsWhenDisallowed() {
        XCTAssertThrowsError(
            try applyMacAppStateTransition(from: .notInstalled, to: .starting)
        )
    }

    func testPollHealthFlowRunningAndStopped() throws {
        XCTAssertEqual(
            try pollHealthFlow(current: .stopped, isHealthy: true),
            .running
        )
        XCTAssertEqual(
            try pollHealthFlow(current: .running, isHealthy: false),
            .stopped
        )
        XCTAssertEqual(
            try pollHealthFlow(current: .notInstalled, isHealthy: true),
            .notInstalled
        )
    }
}
