import Foundation

/// Builds the AWC connect URL with PKCE challenge query params.
public func buildBootstrapConnectUrl(
    origin: String = MacAppConstants.cloudOrigin,
    state: String,
    codeChallenge: String,
    clientId: String = MacAppConstants.bootstrapClientId
) -> URL {
    let base = origin.hasSuffix("/") ? String(origin.dropLast()) : origin
    var components = URLComponents(string: base + MacAppConstants.bootstrapConnectPath)!
    components.queryItems = [
        URLQueryItem(name: "client", value: clientId),
        URLQueryItem(name: "state", value: state),
        URLQueryItem(name: "code_challenge", value: codeChallenge),
        URLQueryItem(name: "code_challenge_method", value: "S256"),
    ]
    return components.url!
}
