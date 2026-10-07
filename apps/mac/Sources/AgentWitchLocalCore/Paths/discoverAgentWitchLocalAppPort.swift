import Foundation

public struct DiscoverLocalAppPortResult: Equatable, Sendable {
    public let port: Int
    public let range: MacAppLocalPortRange?
    /// True when health reported portsExhausted / conflict.
    public let portsInUse: Bool

    public init(port: Int, range: MacAppLocalPortRange?, portsInUse: Bool) {
        self.port = port
        self.range = range
        self.portsInUse = portsInUse
    }
}

/// Candidate ports: saved listen port → range ports → legacy 43347 (H5 self-heal of old cores).
public func candidateLocalAppPorts(
    savedPort: Int?,
    range: MacAppLocalPortRange?
) -> [Int] {
    var ports: [Int] = []
    if let savedPort {
        ports.append(savedPort)
    }
    if let range {
        for p in range.start...range.end where !ports.contains(p) {
            ports.append(p)
        }
    }
    if !ports.contains(MacAppConstants.localAppPort) {
        ports.append(MacAppConstants.localAppPort)
    }
    return ports
}

public func resolveAgentWitchLocalHealthUrl(port: Int) -> URL {
    var components = URLComponents()
    components.scheme = "http"
    components.host = MacAppConstants.localAppHost
    components.port = port
    components.path = MacAppConstants.healthPath
    return components.url!
}

/// Legacy status URL (browser UI retired — AWL-H7). Prefer Mac app window.
public func resolveAgentWitchLocalStatusUrl(port: Int) -> URL {
    var components = URLComponents()
    components.scheme = "http"
    components.host = MacAppConstants.localAppHost
    components.port = port
    components.path = MacAppConstants.statusPath
    return components.url!
}
