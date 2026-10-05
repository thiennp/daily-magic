import Foundation

/// Opens the cloud Home page where Connect this Mac lives (`AGENT_WITCH_DEFAULT_ORIGIN`).
public func resolveConnectThisMacUrl(
    origin: String = MacAppConstants.cloudOrigin
) -> URL {
    URL(string: origin.hasSuffix("/") ? String(origin.dropLast()) : origin)!
}
