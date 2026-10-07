import Foundation

/// Builds health URL. Prefer `resolveAgentWitchLocalHealthUrl(port:)` after discovery.
/// Default keeps probing legacy 43347 so old cores remain visible to H5 self-heal.
public func resolveAgentWitchLocalHealthUrl() -> URL {
    resolveAgentWitchLocalHealthUrl(port: MacAppConstants.localAppPort)
}
