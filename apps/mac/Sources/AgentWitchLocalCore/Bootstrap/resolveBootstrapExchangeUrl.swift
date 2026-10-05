import Foundation

public func resolveBootstrapExchangeUrl(
    origin: String = MacAppConstants.cloudOrigin
) -> URL {
    let base = origin.hasSuffix("/") ? String(origin.dropLast()) : origin
    return URL(string: base + MacAppConstants.bootstrapExchangePath)!
}
