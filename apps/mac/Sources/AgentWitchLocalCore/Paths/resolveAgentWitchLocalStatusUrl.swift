import Foundation

/// Builds `http://127.0.0.1:43347/status`.
public func resolveAgentWitchLocalStatusUrl() -> URL {
    var components = URLComponents()
    components.scheme = "http"
    components.host = MacAppConstants.localAppHost
    components.port = MacAppConstants.localAppPort
    components.path = MacAppConstants.statusPath
    return components.url!
}
