import Foundation

/// Maps a kickstart result to the next Start action (never surface bare 113).
public func decideKickstartFallback(
    result: StartCoreFlowResult
) -> MacAppStartAction {
    if case .error = result.state {
        // Non-zero kickstart (e.g. 113 = not loaded) → repair via self-heal.
        return .selfHeal
    }
    if result.kickstartStatus != 0 {
        return .selfHeal
    }
    return .none
}
