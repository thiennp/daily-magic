import Foundation

/// Parsed `agentwitch-local://prompt-optimizer` deep link (AWL-H7 PM-3 b).
public struct AgentWitchLocalPromptOptimizerDeepLink: Equatable, Sendable {
    /// Local HTTP path, e.g. `/prompt-optimizer` or `/prompt-optimizer/guide`.
    public let path: String
    /// Raw query without `?`, e.g. `example=support-reply`.
    public let query: String?

    public init(path: String, query: String?) {
        self.path = path
        self.query = query
    }
}

/// `agentwitch-local://prompt-optimizer` (+ optional `/guide` or `?example=`).
public func isAgentWitchLocalPromptOptimizerDeepLink(_ url: URL) -> Bool {
    parseAgentWitchLocalPromptOptimizerDeepLink(url) != nil
}

public func parseAgentWitchLocalPromptOptimizerDeepLink(
    _ url: URL
) -> AgentWitchLocalPromptOptimizerDeepLink? {
    guard let scheme = url.scheme?.lowercased(),
          scheme == MacAppConstants.bootstrapURLScheme
    else {
        return nil
    }
    let host = (url.host ?? "").lowercased()
    let trimmedPath = url.path.trimmingCharacters(in: CharacterSet(charactersIn: "/")).lowercased()
    let query = url.query

    // agentwitch-local://prompt-optimizer[/guide]
    if host == "prompt-optimizer" {
        let suffix = trimmedPath.isEmpty || trimmedPath == "/" ? "" : "/\(trimmedPath)"
        return AgentWitchLocalPromptOptimizerDeepLink(
            path: "\(MacAppConstants.promptOptimizerPath)\(suffix)",
            query: query
        )
    }
    // agentwitch-local:///prompt-optimizer[/guide]
    if host.isEmpty {
        if trimmedPath == "prompt-optimizer" {
            return AgentWitchLocalPromptOptimizerDeepLink(
                path: MacAppConstants.promptOptimizerPath,
                query: query
            )
        }
        if trimmedPath.hasPrefix("prompt-optimizer/") {
            return AgentWitchLocalPromptOptimizerDeepLink(
                path: "/\(trimmedPath)",
                query: query
            )
        }
    }
    return nil
}

/// Builds Prompt optimizer URL on the discovered listen port (not hard-coded 43347).
public func resolveAgentWitchLocalPromptOptimizerUrl(
    port: Int,
    path: String = MacAppConstants.promptOptimizerPath,
    query: String? = nil
) -> URL {
    var components = URLComponents()
    components.scheme = "http"
    components.host = MacAppConstants.localAppHost
    components.port = port
    components.path = path.hasPrefix("/") ? path : "/\(path)"
    if let query, !query.isEmpty {
        components.query = query
    }
    return components.url!
}
