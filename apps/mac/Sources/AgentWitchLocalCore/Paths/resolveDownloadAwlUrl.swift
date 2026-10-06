import Foundation

/// Always-on Download AWL destination (`https://www.agentwitch.com/download`).
/// Product rule: this control must stay visible even when a computer is already connected.
public func resolveDownloadAwlUrl(
    origin: String = MacAppConstants.cloudOrigin
) -> URL {
    let base = origin.hasSuffix("/") ? String(origin.dropLast()) : origin
    return URL(string: base + "/download")!
}
