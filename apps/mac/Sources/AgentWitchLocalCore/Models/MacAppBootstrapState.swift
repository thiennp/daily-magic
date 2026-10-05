import Foundation

/// Explicit first-run bootstrap states when AWL core is not yet installed.
public enum MacAppBootstrapState: Equatable, Sendable {
    case checking
    case signingIn
    case installing
    case settingUp
    case connected
    case error(reason: String)
}
