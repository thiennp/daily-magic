import Foundation

public enum BootstrapCallbackParseResult: Equatable, Sendable {
    case success(code: String, state: String)
    case error(slug: String, state: String)
    case rejected
}

/// Pure parser for `agentwitch-local://install?...` callbacks. Rejects without logging URL.
public func parseBootstrapCallbackUrl(_ url: URL) -> BootstrapCallbackParseResult {
    guard let scheme = url.scheme?.lowercased(),
          scheme == MacAppConstants.bootstrapURLScheme
    else {
        return .rejected
    }

    let host = (url.host ?? "").lowercased()
    // Accept host "install" with empty path, or empty host with path "/install".
    let path = url.path
    let hostMatches = host == MacAppConstants.bootstrapCallbackHost && (path.isEmpty || path == "/")
    let pathMatches = host.isEmpty && (path == "/\(MacAppConstants.bootstrapCallbackHost)"
        || path == MacAppConstants.bootstrapCallbackHost)
    guard hostMatches || pathMatches else {
        return .rejected
    }

    guard let components = URLComponents(url: url, resolvingAgainstBaseURL: false) else {
        return .rejected
    }
    let items = components.queryItems ?? []
    func value(_ name: String) -> String? {
        items.first(where: { $0.name == name })?.value?
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    let state = value("state") ?? ""
    guard !state.isEmpty else {
        return .rejected
    }

    if let errorSlug = value("error"), !errorSlug.isEmpty {
        return .error(slug: errorSlug, state: state)
    }

    guard let code = value("code"), !code.isEmpty else {
        return .rejected
    }
    return .success(code: code, state: state)
}
