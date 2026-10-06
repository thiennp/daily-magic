import Foundation

public struct RunBootstrapSetupFlowResult: Equatable, Sendable {
    public let state: MacAppBootstrapState

    public init(state: MacAppBootstrapState) {
        self.state = state
    }
}

/// Setting up: poll local health until *this user's* AWL answers or timeout → Connected / Error.
/// Port 43347 is shared by all macOS users: a `.foreign` or `.unverified` (old AWL without
/// identity) responder fails fast — do not wait out the timeout with a vague message.
public func runBootstrapSetupFlow(
    current: MacAppBootstrapState,
    probeHealth: () async -> LocalHealthOwnership,
    sleep: (TimeInterval) async -> Void = { ns in
        try? await Task.sleep(nanoseconds: UInt64(ns * 1_000_000_000))
    },
    now: () -> Date = Date.init,
    timeoutSeconds: TimeInterval = MacAppConstants.bootstrapSetupHealthTimeoutSeconds,
    pollIntervalSeconds: TimeInterval = MacAppConstants.bootstrapSetupHealthPollIntervalSeconds
) async -> RunBootstrapSetupFlowResult {
    let deadline = now().addingTimeInterval(timeoutSeconds)

    func finish(_ target: MacAppBootstrapState) -> RunBootstrapSetupFlowResult {
        let next = (try? applyMacAppBootstrapStateTransition(from: current, to: target)) ?? target
        return RunBootstrapSetupFlowResult(state: next)
    }

    func fail(_ reason: String) -> RunBootstrapSetupFlowResult {
        finish(.error(reason: sanitizeBootstrapErrorReason(reason)))
    }

    var last = await probeHealth()
    while true {
        switch last {
        case .ours:
            return finish(.connected)
        case .foreign:
            return fail(MacAppConstants.foreignLocalHealthReason)
        case .unverified:
            return fail(MacAppConstants.unverifiedLocalHealthReason)
        case .unhealthy:
            break
        }
        guard now() < deadline else {
            break
        }
        await sleep(pollIntervalSeconds)
        last = await probeHealth()
    }

    return fail("Timed out waiting for local AgentWitch health.")
}
