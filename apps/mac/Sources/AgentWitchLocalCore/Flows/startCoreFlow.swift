import Foundation

public struct StartCoreFlowResult: Equatable, Sendable {
    public let state: MacAppRuntimeState
    public let bootstrapStatus: Int32
    public let kickstartStatus: Int32

    public init(state: MacAppRuntimeState, bootstrapStatus: Int32, kickstartStatus: Int32) {
        self.state = state
        self.bootstrapStatus = bootstrapStatus
        self.kickstartStatus = kickstartStatus
    }
}

/// Orchestrates bootstrap (ignore already-loaded) + kickstart -k.
public func startCoreFlow(
    current: MacAppRuntimeState,
    domain: String,
    plistPath: URL,
    runner: LaunchctlRunning,
    label: String = MacAppConstants.launchAgentLabel
) throws -> StartCoreFlowResult {
    _ = try applyMacAppStateTransition(from: current, to: .starting)

    let bootstrapArgs = buildLaunchctlBootstrapArguments(domain: domain, plistPath: plistPath)
    let bootstrapStatus = (try? runner.run(arguments: bootstrapArgs)) ?? 0
    // Already-loaded is ignored (non-zero bootstrap is OK if kickstart succeeds).

    let kickstartArgs = buildLaunchctlKickstartArguments(domain: domain, label: label)
    let kickstartStatus = try runner.run(arguments: kickstartArgs)

    if kickstartStatus == 0 {
        let next = try applyMacAppStateTransition(from: .starting, to: .running)
        return StartCoreFlowResult(
            state: next,
            bootstrapStatus: bootstrapStatus,
            kickstartStatus: kickstartStatus
        )
    }

    let message = "launchctl kickstart failed (status \(kickstartStatus))."
    let next = try applyMacAppStateTransition(from: .starting, to: .error(message: message))
    return StartCoreFlowResult(
        state: next,
        bootstrapStatus: bootstrapStatus,
        kickstartStatus: kickstartStatus
    )
}
