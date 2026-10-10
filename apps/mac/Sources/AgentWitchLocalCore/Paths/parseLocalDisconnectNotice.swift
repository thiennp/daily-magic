import Foundation

/// Why AWL `/health` says the cloud link is down (`disconnect.kind`, bundle 345+).
public enum LocalDisconnectKind: String, Equatable {
    /// Cloud answered 404/5xx or refused: nothing is wrong on this computer.
    case serverDown = "server_down"
    /// The cloud address did not resolve (network or DNS).
    case dns
    /// Cloud revoked or replaced this computer.
    case deviceNotLinked = "device_not_linked"
    /// The socket opened but the cloud closed it before acknowledging.
    case closedBeforeAck = "closed_before_ack"
    case unknown

    /// The cloud, not this computer, is the problem: the link is kept and AWL retries by itself.
    public var isCloudSideOutage: Bool {
        self == .serverDown || self == .dns
    }
}

public struct LocalDisconnectNotice: Equatable {
    public let kind: LocalDisconnectKind
    public let message: String
    public let nextRetryAt: String?
}

/// Reads `disconnect` from a decoded `/health` body. Older AWL bundles omit it (nil).
public func parseLocalDisconnectNotice(_ json: [String: Any]?) -> LocalDisconnectNotice? {
    guard let object = json?["disconnect"] as? [String: Any],
          let rawKind = object["kind"] as? String
    else { return nil }
    return LocalDisconnectNotice(
        kind: LocalDisconnectKind(rawValue: rawKind) ?? .unknown,
        message: (object["message"] as? String) ?? "",
        nextRetryAt: object["nextRetryAt"] as? String
    )
}
