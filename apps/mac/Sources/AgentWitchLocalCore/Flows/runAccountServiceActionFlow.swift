import Foundation

/// Start / Stop / Restart on ONE account's LaunchAgent (dd5c338d).
public enum MacAppAccountServiceAction: String, Equatable, Sendable {
    case start
    case stop
    case restart
}

public struct AccountServiceActionResult: Equatable, Sendable {
    /// `.running` / `.stopped` on success, `.error(message:)` on failure.
    public let state: MacAppRuntimeState
    /// Every `launchctl` argument list that ran, in order (for logs and tests).
    public let launchctlCalls: [[String]]

    public init(state: MacAppRuntimeState, launchctlCalls: [[String]]) {
        self.state = state
        self.launchctlCalls = launchctlCalls
    }

    public var succeeded: Bool {
        if case .error = state { return false }
        return true
    }
}

/// Runs bootstrap / kickstart / bootout on `gui/<uid>/<label>` for the selected
/// account only, then judges success by that account's `/health`
/// (`isHealthy` must probe only this account's port and profile email).
/// Never touches the legacy `com.agent-witch` label unless `target.label` is it
/// (pre-migration installs), and never boots out on a start timeout.
public func runAccountServiceActionFlow(
    action: MacAppAccountServiceAction,
    target: MacAppAccountLaunchTarget,
    domain: String,
    runner: LaunchctlRunning,
    isHealthy: () async -> Bool,
    plistExists: (URL) -> Bool = { FileManager.default.fileExists(atPath: $0.path) },
    sleep: (TimeInterval) async -> Void = { seconds in
        try? await Task.sleep(nanoseconds: UInt64(seconds * 1_000_000_000))
    },
    now: () -> Date = Date.init,
    startTimeoutSeconds: TimeInterval = MacAppConstants.accountServiceStartTimeoutSeconds,
    stopTimeoutSeconds: TimeInterval = MacAppConstants.accountServiceStopTimeoutSeconds,
    pollIntervalSeconds: TimeInterval = MacAppConstants.accountServicePollIntervalSeconds
) async -> AccountServiceActionResult {
    var calls: [[String]] = []
    let service = "\(domain)/\(target.label)"
    let who = "AgentWitch for \(target.email)"

    func launchctl(_ arguments: [String]) -> Int32 {
        calls.append(arguments)
        do {
            return try runner.run(arguments: arguments)
        } catch {
            return -1
        }
    }

    func fail(_ message: String) -> AccountServiceActionResult {
        AccountServiceActionResult(state: .error(message: message), launchctlCalls: calls)
    }

    func isLoaded() -> Bool {
        launchctl(["print", service]) == 0
    }

    /// Polls `/health` until it matches `wantHealthy` or the deadline passes.
    func waitForHealth(_ wantHealthy: Bool, timeout: TimeInterval) async -> Bool {
        let deadline = now().addingTimeInterval(timeout)
        while true {
            if await isHealthy() == wantHealthy {
                return true
            }
            if now() >= deadline {
                return false
            }
            await sleep(pollIntervalSeconds)
        }
    }

    func ensureLoaded() -> AccountServiceActionResult? {
        if isLoaded() {
            return nil
        }
        guard plistExists(target.plistPath) else {
            return fail(
                "\(who) has no LaunchAgent at \(target.plistPath.path). Use Repair setup."
            )
        }
        let status = launchctl(["bootstrap", domain, target.plistPath.path])
        if status != 0, !isLoaded() {
            return fail(
                "macOS could not load \(who) (launchctl bootstrap returned \(status)). See log."
            )
        }
        return nil
    }

    switch action {
    case .start:
        if await isHealthy() {
            return AccountServiceActionResult(state: .running, launchctlCalls: calls)
        }
        if let failure = ensureLoaded() {
            return failure
        }
        // No -k: never restart a host that is already coming up.
        let status = launchctl(["kickstart", service])
        if status != 0 {
            return fail("macOS could not start \(who) (launchctl kickstart returned \(status)). See log.")
        }
        if await waitForHealth(true, timeout: startTimeoutSeconds) {
            return AccountServiceActionResult(state: .running, launchctlCalls: calls)
        }
        return fail(
            "\(who) did not answer within \(Int(startTimeoutSeconds)) seconds after Start. See log."
        )

    case .restart:
        if let failure = ensureLoaded() {
            return failure
        }
        let status = launchctl(["kickstart", "-k", service])
        if status != 0 {
            return fail("macOS could not restart \(who) (launchctl kickstart returned \(status)). See log.")
        }
        if await waitForHealth(true, timeout: startTimeoutSeconds) {
            return AccountServiceActionResult(state: .running, launchctlCalls: calls)
        }
        return fail(
            "\(who) did not answer within \(Int(startTimeoutSeconds)) seconds after Restart. See log."
        )

    case .stop:
        let status = launchctl(["bootout", service])
        if status != 0, isLoaded() {
            return fail("macOS could not stop \(who) (launchctl bootout returned \(status)). See log.")
        }
        if await waitForHealth(false, timeout: stopTimeoutSeconds) {
            return AccountServiceActionResult(state: .stopped, launchctlCalls: calls)
        }
        return fail(
            "\(who) is still running after Stop. It may have been started outside AgentWitch Local; quit it there or restart this computer."
        )
    }
}
