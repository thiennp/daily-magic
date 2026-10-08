import Foundation

/// How AWL `/health` describes the cloud connection.
public enum LocalConnectionLinkState: Equatable {
    /// Socket is up.
    case connected
    /// Down for now; AWL keeps retrying by itself.
    case retrying
    /// Cloud revoked or replaced this computer: it will not recover without signing in again.
    case notLinked
    /// No usable answer (no healthy listener).
    case unknown
}

/// Reads `wsConnected` / `notLinked` from a decoded `/health` body. Older AWL bundles
/// omit `notLinked`, which reads as a plain retry.
public func parseLocalConnectionLinkState(_ json: [String: Any]?) -> LocalConnectionLinkState {
    guard let json else { return .unknown }
    if (json["notLinked"] as? Bool) == true {
        return .notLinked
    }
    switch json["wsConnected"] as? Bool {
    case true?: return .connected
    case false?: return .retrying
    case nil: return .unknown
    }
}
