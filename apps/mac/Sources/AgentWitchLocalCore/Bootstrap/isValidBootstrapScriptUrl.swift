import Foundation

/// Accepts https only, host www.agentwitch.com or agentwitch.com, and no token query param.
public func isValidBootstrapScriptUrl(_ urlString: String) -> Bool {
    guard let url = URL(string: urlString),
          let scheme = url.scheme?.lowercased(),
          scheme == "https",
          let host = url.host?.lowercased()
    else {
        return false
    }
    let hostOk = host == MacAppConstants.cloudOriginHostExact
        || host == MacAppConstants.cloudOriginHostApex
    guard hostOk else {
        return false
    }
    // Tokenless: reject any `token` query item (official personalized URLs embed it).
    if let items = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems {
        if items.contains(where: { $0.name.lowercased() == "token" }) {
            return false
        }
    }
    return true
}
