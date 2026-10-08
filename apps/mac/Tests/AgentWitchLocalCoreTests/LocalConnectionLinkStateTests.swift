import XCTest
@testable import AgentWitchLocalCore

final class LocalConnectionLinkStateTests: XCTestCase {
    func testConnectedAndRetrying() {
        XCTAssertEqual(parseLocalConnectionLinkState(["wsConnected": true]), .connected)
        XCTAssertEqual(parseLocalConnectionLinkState(["wsConnected": false]), .retrying)
    }

    func testNotLinkedWinsOverWsConnected() {
        XCTAssertEqual(
            parseLocalConnectionLinkState(["wsConnected": false, "notLinked": true]),
            .notLinked
        )
        XCTAssertEqual(
            parseLocalConnectionLinkState(["wsConnected": true, "notLinked": true]),
            .notLinked
        )
    }

    func testOlderBundlesWithoutNotLinkedStayRetrying() {
        XCTAssertEqual(parseLocalConnectionLinkState(["wsConnected": false, "notLinked": false]), .retrying)
    }

    func testMissingBodyOrFieldIsUnknown() {
        XCTAssertEqual(parseLocalConnectionLinkState(nil), .unknown)
        XCTAssertEqual(parseLocalConnectionLinkState([:]), .unknown)
    }
}
