import XCTest
@testable import AgentWitchLocalCore

final class StatusDeepLinkTests: XCTestCase {
    func testStatusDeepLinkHosts() {
        XCTAssertTrue(isAgentWitchLocalStatusDeepLink(URL(string: "agentwitch-local://status")!))
        XCTAssertTrue(isAgentWitchLocalStatusDeepLink(URL(string: "agentwitch-local://open")!))
        XCTAssertTrue(isAgentWitchLocalStatusDeepLink(URL(string: "agentwitch-local:///status")!))
        XCTAssertFalse(isAgentWitchLocalStatusDeepLink(URL(string: "agentwitch-local://install?code=a&state=b")!))
        XCTAssertFalse(isAgentWitchLocalStatusDeepLink(URL(string: "https://www.agentwitch.com")!))
    }
}
