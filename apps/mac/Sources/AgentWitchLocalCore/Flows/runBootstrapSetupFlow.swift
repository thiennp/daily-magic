import Foundation

public struct RunBootstrapSetupFlowResult: Equatable, Sendable {
    public let state: MacAppBootstrapState

    public init(state: MacAppBootstrapState) {
        self.state = state
    }
}

/// Setting up: poll local health until healthy or timeout → Connected / Error.
public func runBootstrapSetupFlow(
    current: MacAppBootstrapState,
    probeHealth: () async -> Bool,
    sleep: (TimeInterval) async -> Void = { ns in
        try? await Task.sleep(nanoseconds: UInt64(ns * 1_000_000_000))
    },
    now: () -> Date = Date.init,
    timeoutSeconds: TimeInterval = MacAppConstants.bootstrapSetupHealthTimeoutSeconds,
    pollIntervalSeconds: TimeInterval = MacAppConstants.bootstrapSetupHealthPollIntervalSeconds
) async -> RunBootstrapSetupFlowResult {
    let deadline = now().addingTimeInterval(timeoutSeconds)

    if await probeHealth() {
        let next = (try? applyMacAppBootstrapStateTransition(from: current, to: .connected))
            ?? .connected
        return RunBootstrapSetupFlowResult(state: next)
    }

    while now() < deadline {
        await sleep(pollIntervalSeconds)
        if await probeHealth() {
            let next = (try? applyMacAppBootstrapStateTransition(from: current, to: .connected))
                ?? .connected
            return RunBootstrapSetupFlowResult(state: next)
        }
    }

    let reason = sanitizeBootstrapErrorReason("Timed out waiting for local Agent Witch health.")
    let next = (try? applyMacAppBootstrapStateTransition(
        from: current,
        to: .error(reason: reason)
    )) ?? .error(reason: reason)
    return RunBootstrapSetupFlowResult(state: next)
}
