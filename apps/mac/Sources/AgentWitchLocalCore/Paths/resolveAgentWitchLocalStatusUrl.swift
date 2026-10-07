import Foundation

/// Legacy status URL builder (browser `/status` UI retired in AWL-H7).
/// Prefer opening the Mac app window via `awlOpenWindow` instead of this URL.
public func resolveAgentWitchLocalStatusUrl() -> URL {
    resolveAgentWitchLocalStatusUrl(port: MacAppConstants.localAppPort)
}
