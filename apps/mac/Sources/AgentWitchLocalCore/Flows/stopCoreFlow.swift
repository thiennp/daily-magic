import Foundation

public struct StopCoreFlowResult: Equatable, Sendable {
    public let state: MacAppRuntimeState
    public let bootoutStatus: Int32

    public init(state: MacAppRuntimeState, bootoutStatus: Int32) {
        self.state = state
        self.bootoutStatus = bootoutStatus
    }
}

/// Orchestrates `launchctl bootout gui/$UID/com.agent-witch`.
public func stopCoreFlow(
    current: MacAppRuntimeState,
    domain: String,
    runner: LaunchctlRunning,
    label: String = MacAppConstants.launchAgentLabel
) throws -> StopCoreFlowResult {
    _ = try applyMacAppStateTransition(from: current, to: .stopping)

    let args = buildLaunchctlBootoutArguments(domain: domain, label: label)
    let status = try runner.run(arguments: args)

    if status == 0 {
        let next = try applyMacAppStateTransition(from: .stopping, to: .stopped)
        return StopCoreFlowResult(state: next, bootoutStatus: status)
    }

    let message = "launchctl bootout failed (status \(status))."
    let next = try applyMacAppStateTransition(from: .stopping, to: .error(message: message))
    return StopCoreFlowResult(state: next, bootoutStatus: status)
}
