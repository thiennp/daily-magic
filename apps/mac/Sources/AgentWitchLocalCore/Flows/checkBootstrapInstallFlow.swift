import Foundation

public struct CheckBootstrapInstallFlowResult: Equatable, Sendable {
    public let state: MacAppBootstrapState
    /// When non-nil, leave bootstrap and adopt this runtime state.
    public let handoffRuntime: MacAppRuntimeState?

    public init(state: MacAppBootstrapState, handoffRuntime: MacAppRuntimeState?) {
        self.state = state
        self.handoffRuntime = handoffRuntime
    }
}

/// Checking: if core already installed, hand off to runtime (Connected only when healthy).
public func checkBootstrapInstallFlow(
    current: MacAppBootstrapState,
    isCoreInstalled: Bool,
    isHealthy: Bool
) throws -> CheckBootstrapInstallFlowResult {
    guard isCoreInstalled else {
        return CheckBootstrapInstallFlowResult(state: current, handoffRuntime: nil)
    }
    if isHealthy {
        let next = try applyMacAppBootstrapStateTransition(from: current, to: .connected)
        return CheckBootstrapInstallFlowResult(state: next, handoffRuntime: .running)
    }
    // Installed but not healthy — existing detectInstallFlow path (.stopped); leave bootstrap.
    return CheckBootstrapInstallFlowResult(state: current, handoffRuntime: .stopped)
}
