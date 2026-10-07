import Foundation

/// `agentwitch-local://status` (or `open`) — AWC opens this to raise the Mac window (AWL-H7 FIX-2).
public func isAgentWitchLocalStatusDeepLink(_ url: URL) -> Bool {
    guard let scheme = url.scheme?.lowercased(),
          scheme == MacAppConstants.bootstrapURLScheme
    else {
        return false
    }
    let host = (url.host ?? "").lowercased()
    let path = url.path.trimmingCharacters(in: CharacterSet(charactersIn: "/")).lowercased()
    if host == "status" || host == "open" {
        return path.isEmpty || path == "/"
    }
    if host.isEmpty {
        return path == "status" || path == "open"
    }
    return false
}
