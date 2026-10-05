import XCTest
@testable import AgentWitchLocalCore

final class LaunchctlArgumentTests: XCTestCase {
    func testGuiDomain() {
        XCTAssertEqual(resolveLaunchctlGuiDomain(userId: 501), "gui/501")
    }

    func testBootstrapArguments() {
        let plist = URL(fileURLWithPath: "/Users/t/Library/LaunchAgents/com.agent-witch.plist")
        XCTAssertEqual(
            buildLaunchctlBootstrapArguments(domain: "gui/501", plistPath: plist),
            ["bootstrap", "gui/501", plist.path]
        )
    }

    func testKickstartArguments() {
        XCTAssertEqual(
            buildLaunchctlKickstartArguments(domain: "gui/501"),
            ["kickstart", "-k", "gui/501/com.agent-witch"]
        )
    }

    func testBootoutArguments() {
        XCTAssertEqual(
            buildLaunchctlBootoutArguments(domain: "gui/501"),
            ["bootout", "gui/501/com.agent-witch"]
        )
    }
}
