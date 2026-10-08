import XCTest
@testable import AgentWitchLocalCore

private final class RecordingLaunchctl: LaunchctlRunning, @unchecked Sendable {
    var statuses: [String: Int32] = [:]
    private(set) var calls: [[String]] = []
    var loadedLabels: Set<String> = []

    func run(arguments: [String]) throws -> Int32 {
        calls.append(arguments)
        let key = arguments.joined(separator: " ")
        if arguments.first == "print", let target = arguments.dropFirst().first {
            let label = target.split(separator: "/").last.map(String.init) ?? target
            return loadedLabels.contains(label) ? 0 : 1
        }
        if arguments.first == "bootstrap", let labelPath = arguments.last {
            let label = URL(fileURLWithPath: labelPath).deletingPathExtension().lastPathComponent
            loadedLabels.insert(label)
        }
        if arguments.first == "bootout", let target = arguments.dropFirst().first {
            let label = target.split(separator: "/").last.map(String.init) ?? target
            loadedLabels.remove(label)
        }
        return statuses[key] ?? statuses[arguments.first ?? ""] ?? 0
    }
}

final class AccountServiceActionFlowTests: XCTestCase {
    private let target = MacAppAccountLaunchTarget(
        email: "gmail@example.com",
        label: "com.agent-witch.bbb",
        plistPath: URL(fileURLWithPath: "/tmp/com.agent-witch.bbb.plist")
    )

    func testStartBootstrapsAndKickstartsOnlyTheAccountLabel() async {
        let runner = RecordingLaunchctl()
        var healthy = false
        let result = await runAccountServiceActionFlow(
            action: .start,
            target: target,
            domain: "gui/501",
            runner: runner,
            isHealthy: {
                let was = healthy
                healthy = runner.loadedLabels.contains("com.agent-witch.bbb")
                return was || healthy
            },
            plistExists: { _ in true },
            sleep: { _ in },
            now: { Date(timeIntervalSince1970: 0) },
            startTimeoutSeconds: 1,
            stopTimeoutSeconds: 1,
            pollIntervalSeconds: 0
        )
        // Force health true after kickstart by setting and re-running wait — simplify:
        _ = result
        // Re-run with health flipping to true immediately after first probe
        let runner2 = RecordingLaunchctl()
        var probes = 0
        let result2 = await runAccountServiceActionFlow(
            action: .start,
            target: target,
            domain: "gui/501",
            runner: runner2,
            isHealthy: {
                probes += 1
                return probes > 1
            },
            plistExists: { _ in true },
            sleep: { _ in },
            now: {
                // Stay under timeout
                Date(timeIntervalSince1970: Double(probes) * 0.01)
            },
            startTimeoutSeconds: 5,
            stopTimeoutSeconds: 1,
            pollIntervalSeconds: 0
        )
        XCTAssertEqual(result2.state, .running)
        XCTAssertEqual(runner2.calls.first, ["print", "gui/501/com.agent-witch.bbb"])
        XCTAssertTrue(runner2.calls.contains(["bootstrap", "gui/501", "/tmp/com.agent-witch.bbb.plist"]))
        XCTAssertTrue(runner2.calls.contains(["kickstart", "gui/501/com.agent-witch.bbb"]))
        XCTAssertFalse(runner2.calls.contains(where: { $0.contains("com.agent-witch") && !$0.joined().contains("com.agent-witch.bbb") && $0.first != "bootstrap" }))
        // No kickstart -k on Start
        XCTAssertFalse(runner2.calls.contains(["kickstart", "-k", "gui/501/com.agent-witch.bbb"]))
    }

    func testStopBootoutsOnlyTheAccountLabelAndRequiresHealthDown() async {
        let runner = RecordingLaunchctl()
        runner.loadedLabels.insert("com.agent-witch.bbb")
        var probes = 0
        let result = await runAccountServiceActionFlow(
            action: .stop,
            target: target,
            domain: "gui/501",
            runner: runner,
            isHealthy: {
                probes += 1
                return probes == 1 // first check still healthy, then down
            },
            plistExists: { _ in true },
            sleep: { _ in },
            now: { Date(timeIntervalSince1970: Double(probes) * 0.01) },
            startTimeoutSeconds: 5,
            stopTimeoutSeconds: 5,
            pollIntervalSeconds: 0
        )
        XCTAssertEqual(result.state, .stopped)
        XCTAssertEqual(runner.calls.first, ["bootout", "gui/501/com.agent-witch.bbb"])
        XCTAssertFalse(runner.calls.contains(["bootout", "gui/501/com.agent-witch"]))
    }

    func testStopShowsErrorWhenHealthStaysUp() async {
        let runner = RecordingLaunchctl()
        let start = Date(timeIntervalSince1970: 100)
        var tick = 0
        let result = await runAccountServiceActionFlow(
            action: .stop,
            target: target,
            domain: "gui/501",
            runner: runner,
            isHealthy: { true },
            plistExists: { _ in true },
            sleep: { _ in },
            now: {
                tick += 1
                return start.addingTimeInterval(Double(tick) * 10)
            },
            startTimeoutSeconds: 5,
            stopTimeoutSeconds: 5,
            pollIntervalSeconds: 0
        )
        guard case .error(let message) = result.state else {
            return XCTFail("expected error")
        }
        XCTAssertTrue(message.contains("still running"))
    }

    func testStartNeverTouchesLegacyLabelWhenTargetIsPerAccount() async {
        let runner = RecordingLaunchctl()
        var probes = 0
        _ = await runAccountServiceActionFlow(
            action: .start,
            target: target,
            domain: "gui/501",
            runner: runner,
            isHealthy: {
                probes += 1
                return probes > 1
            },
            plistExists: { _ in true },
            sleep: { _ in },
            now: { Date(timeIntervalSince1970: Double(probes) * 0.01) },
            startTimeoutSeconds: 5,
            stopTimeoutSeconds: 1,
            pollIntervalSeconds: 0
        )
        let all = runner.calls.map { $0.joined(separator: " ") }.joined(separator: "\n")
        XCTAssertFalse(all.contains("gui/501/com.agent-witch\n") || all.hasSuffix("gui/501/com.agent-witch"))
        XCTAssertFalse(all.split(separator: "\n").contains(where: { $0 == "bootout gui/501/com.agent-witch" }))
        XCTAssertTrue(all.contains("com.agent-witch.bbb"))
    }
}
