import Foundation

/// Explicit runtime state for the menu bar companion.
public enum MacAppRuntimeState: Equatable, Sendable {
    case notInstalled
    case stopped
    case starting
    case running
    case stopping
    case error(message: String)
}
