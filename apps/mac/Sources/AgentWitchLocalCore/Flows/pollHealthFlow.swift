import Foundation

/// Maps a health probe into a state transition while installed.
public func pollHealthFlow(
    current: MacAppRuntimeState,
    isHealthy: Bool
) throws -> MacAppRuntimeState {
    switch current {
    case .notInstalled:
        return current
    case .starting:
        if isHealthy {
            return try applyMacAppStateTransition(from: current, to: .running)
        }
        return current
    case .stopping:
        if !isHealthy {
            return try applyMacAppStateTransition(from: current, to: .stopped)
        }
        return current
    case .stopped, .running, .error:
        let target: MacAppRuntimeState = isHealthy ? .running : .stopped
        return try applyMacAppStateTransition(from: current, to: target)
    }
}
