import XCTest
@testable import AgentWitchLocalCore

private final class FakeLaunchctlRunner: LaunchctlRunning, @unchecked Sendable {
    var bootstrapStatus: Int32 = 0
    var kickstartStatus: Int32 = 0
    var bootoutStatus: Int32 = 0
    private(set) var calls: [[String]] = []

    init(bootstrapStatus: Int32 = 0, kickstartStatus: Int32 = 0, bootoutStatus: Int32 = 0) {
        self.bootstrapStatus = bootstrapStatus
        self.kickstartStatus = kickstartStatus
        self.bootoutStatus = bootoutStatus
    }

    func run(arguments: [String]) throws -> Int32 {
        calls.append(arguments)
        if arguments.first == "bootstrap" {
            return bootstrapStatus
        }
        if arguments.first == "kickstart" {
            return kickstartStatus
        }
        if arguments.first == "bootout" {
            return bootoutStatus
        }
        return 1
    }
}

final class StartStopFlowTests: XCTestCase {
    func testStartFlowIgnoresBootstrapFailureWhenKickstartSucceeds() throws {
        let runner = FakeLaunchctlRunner(bootstrapStatus: 5, kickstartStatus: 0)
        let plist = URL(fileURLWithPath: "/tmp/com.agent-witch.plist")
        let result = try startCoreFlow(
            current: .stopped,
            domain: "gui/501",
            plistPath: plist,
            runner: runner
        )
        XCTAssertEqual(result.state, .running)
        XCTAssertEqual(result.bootstrapStatus, 5)
        XCTAssertEqual(result.kickstartStatus, 0)
        XCTAssertEqual(runner.calls.count, 2)
    }

    func testStartFlowErrorsWhenKickstartFails() throws {
        let runner = FakeLaunchctlRunner(bootstrapStatus: 0, kickstartStatus: 9)
        let result = try startCoreFlow(
            current: .stopped,
            domain: "gui/501",
            plistPath: URL(fileURLWithPath: "/tmp/com.agent-witch.plist"),
            runner: runner
        )
        guard case .error = result.state else {
            return XCTFail("expected error state")
        }
    }

    func testStopFlowBootoutSuccess() throws {
        let runner = FakeLaunchctlRunner(bootoutStatus: 0)
        let result = try stopCoreFlow(
            current: .running,
            domain: "gui/501",
            runner: runner
        )
        XCTAssertEqual(result.state, .stopped)
        XCTAssertEqual(runner.calls.first, ["bootout", "gui/501/com.agent-witch"])
    }
}
