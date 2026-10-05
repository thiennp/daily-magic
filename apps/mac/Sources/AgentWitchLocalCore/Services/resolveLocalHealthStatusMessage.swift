import Foundation

/// User-facing status line for a `/health` ownership result.
/// `.ours` / `.unhealthy` keep the runtime label (Running / Stopped / …).
/// `.foreign` and `.unverified` replace it with a clear distinct message.
public func resolveLocalHealthStatusMessage(
    ownership: LocalHealthOwnership,
    runtimeLabel: String
) -> String {
    switch ownership {
    case .ours, .unhealthy:
        return runtimeLabel
    case .foreign:
        return MacAppConstants.foreignLocalHealthReason
    case .unverified:
        return MacAppConstants.unverifiedLocalHealthReason
    }
}
