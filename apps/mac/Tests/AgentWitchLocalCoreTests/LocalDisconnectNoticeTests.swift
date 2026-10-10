import XCTest
@testable import AgentWitchLocalCore

final class LocalDisconnectNoticeTests: XCTestCase {
    func testParsesServerDownWithRetryTime() {
        let notice = parseLocalDisconnectNotice([
            "disconnect": ["kind": "server_down", "message": "down", "nextRetryAt": "2026-10-10T14:00:00Z"],
        ])
        XCTAssertEqual(notice?.kind, .serverDown)
        XCTAssertEqual(notice?.nextRetryAt, "2026-10-10T14:00:00Z")
        XCTAssertTrue(notice?.kind.isCloudSideOutage == true)
    }

    func testDnsIsAlsoACloudSideOutage() {
        XCTAssertTrue(parseLocalDisconnectNotice(["disconnect": ["kind": "dns"]])?.kind.isCloudSideOutage == true)
    }

    func testNotLinkedAndClosedBeforeAckAreNotCloudSideOutages() {
        XCTAssertFalse(LocalDisconnectKind.deviceNotLinked.isCloudSideOutage)
        XCTAssertFalse(LocalDisconnectKind.closedBeforeAck.isCloudSideOutage)
    }

    func testUnknownKindFallsBackAndMissingFieldIsNil() {
        XCTAssertEqual(parseLocalDisconnectNotice(["disconnect": ["kind": "future_kind"]])?.kind, .unknown)
        XCTAssertNil(parseLocalDisconnectNotice(["wsConnected": false]))
        XCTAssertNil(parseLocalDisconnectNotice(["disconnect": NSNull()]))
        XCTAssertNil(parseLocalDisconnectNotice(nil))
    }
}
