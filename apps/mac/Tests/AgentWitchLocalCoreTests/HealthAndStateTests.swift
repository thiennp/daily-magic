import XCTest
@testable import AgentWitchLocalCore

final class HealthAndStateTests: XCTestCase {
    private func body(_ json: String) -> Data { Data(json.utf8) }

    func testParseHealthRequiresMatchingUid() {
        let ours = body(#"{"ok":true,"osUid":501,"installRootName":".agent-witch"}"#)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 200, body: ours, expectedUid: 501), .ours)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 204, body: ours, expectedUid: 501), .ours)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 200, body: ours, expectedUid: 502), .foreign)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 404, body: ours, expectedUid: 501), .unhealthy)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 500, body: ours, expectedUid: 501), .unhealthy)
    }

    func testParseHealthOldServerWithoutIdentityIsUnverified() {
        let legacy = body(#"{"ok":true,"wsConnected":true,"publicKeyRaw":"abc"}"#)
        XCTAssertEqual(
            parseLocalHealthResponse(statusCode: 200, body: legacy, expectedUid: 501),
            .unverified
        )
        XCTAssertEqual(
            parseLocalHealthResponse(statusCode: 200, body: Data(), expectedUid: 501),
            .unverified
        )
        XCTAssertEqual(
            parseLocalHealthResponse(statusCode: 200, body: body("not json"), expectedUid: 501),
            .unverified
        )
        XCTAssertFalse(LocalHealthOwnership.unverified.isHealthy)
        XCTAssertFalse(LocalHealthOwnership.foreign.isHealthy)
        XCTAssertTrue(LocalHealthOwnership.ours.isHealthy)
    }

    func testParseHealthRejectsOtherInstallRootAndNonNumericUid() {
        let devRoot = body(#"{"osUid":501,"installRootName":".local-agent-witch"}"#)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 200, body: devRoot, expectedUid: 501), .foreign)
        let noRoot = body(#"{"osUid":501}"#)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 200, body: noRoot, expectedUid: 501), .ours)
        let stringUid = body(#"{"osUid":"501"}"#)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 200, body: stringUid, expectedUid: 501), .unverified)
        let boolUid = body(#"{"osUid":true}"#)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 200, body: boolUid, expectedUid: 1), .unverified)
        let nullUid = body(#"{"osUid":null}"#)
        XCTAssertEqual(parseLocalHealthResponse(statusCode: 200, body: nullUid, expectedUid: 501), .unverified)
    }

    func testResolveLocalHealthOwnership() {
        XCTAssertEqual(
            resolveLocalHealthOwnership(osUid: 501, installRootName: ".agent-witch", expectedUid: 501),
            .ours
        )
        XCTAssertEqual(
            resolveLocalHealthOwnership(osUid: 502, installRootName: ".agent-witch", expectedUid: 501),
            .foreign
        )
        XCTAssertEqual(
            resolveLocalHealthOwnership(osUid: nil, installRootName: ".agent-witch", expectedUid: 501),
            .unverified
        )
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
