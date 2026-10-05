import Foundation

/// Copyable sh fallback shown on bootstrap Error (generic; no install token).
public func resolveBootstrapFallbackInstallCommand() -> String {
    MacAppConstants.bootstrapFallbackInstallCommand
}
