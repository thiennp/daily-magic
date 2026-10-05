import Foundation

/// Builds `http://127.0.0.1:43347/health`.
public func resolveAgentWitchLocalHealthUrl() -> URL {
    var components = URLComponents()
    components.scheme = "http"
    components.host = MacAppConstants.localAppHost
    components.port = MacAppConstants.localAppPort
    components.path = MacAppConstants.healthPath
    return components.url!
}
