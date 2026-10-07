import Foundation

/// Builds status URL. Prefer port-aware overload after discovery.
public func resolveAgentWitchLocalStatusUrl() -> URL {
    resolveAgentWitchLocalStatusUrl(port: MacAppConstants.localAppPort)
}
