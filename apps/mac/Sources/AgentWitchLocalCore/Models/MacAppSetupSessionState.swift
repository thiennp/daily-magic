import Foundation

/// Published setup / self-heal session for menu bar + window (shared state).
public enum MacAppSetupSessionState: Equatable, Sendable {
    case idle
    /// `progressPercent` is 0…100 inclusive.
    case running(step: MacAppSetupProgressStep, progressPercent: Int)
    case failed(kind: MacAppSetupFailureKind, logPath: URL?)
    case succeeded

    public var isInProgress: Bool {
        if case .running = self { return true }
        return false
    }

    public var failureKind: MacAppSetupFailureKind? {
        if case .failed(let kind, _) = self { return kind }
        return nil
    }

    public var logPath: URL? {
        if case .failed(_, let path) = self { return path }
        return nil
    }
}
