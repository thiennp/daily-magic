import Foundation

/// Where AWL looks for assistant CLIs (claude, cursor-agent, codex, gemini).
/// GUI apps get launchd's minimal PATH, so we merge the user's login-shell PATH
/// (what Terminal sees) with the usual install locations of each package manager.
public enum AgentCliSearchPaths {
    /// Marker so login-shell banners/motd output can't pollute the parsed PATH.
    public static let pathMarker = "__AWL_PATH__="

    /// Shell command printing the login PATH after the marker.
    public static let loginShellCommand = "printf '%s%s' '\(pathMarker)' \"$PATH\""

    /// Parses `<noise>__AWL_PATH__=/a:/b` into absolute, de-duplicated dirs.
    public static func parseLoginShellPath(_ output: String) -> [String] {
        guard let range = output.range(of: pathMarker, options: .backwards) else { return [] }
        let raw = output[range.upperBound...]
            .split(whereSeparator: { $0 == "\n" || $0 == "\r" })
            .first.map(String.init) ?? ""
        var seen = Set<String>()
        var dirs: [String] = []
        for part in raw.split(separator: ":") {
            let dir = String(part).trimmingCharacters(in: .whitespaces)
            guard dir.hasPrefix("/"), !seen.contains(dir) else { continue }
            seen.insert(dir)
            dirs.append(dir)
        }
        return dirs
    }

    /// Fixed install locations (homebrew, npm/pnpm/bun/volta globals, version managers).
    public static func defaultDirectories(home: String, nodeVersionBins: [String] = []) -> [String] {
        let h = home.hasSuffix("/") ? String(home.dropLast()) : home
        return [
            "/opt/homebrew/bin",
            "/usr/local/bin",
            "\(h)/.local/bin",
            "\(h)/.npm-global/bin",
            "\(h)/.claude/local",
            "\(h)/.cursor/bin",
            "\(h)/.bun/bin",
            "\(h)/.volta/bin",
            "\(h)/Library/pnpm",
            "\(h)/Library/pnpm/bin",
            "\(h)/.local/share/pnpm",
            "\(h)/.yarn/bin",
            "\(h)/.asdf/shims",
            "\(h)/.local/share/mise/shims",
            "\(h)/.fnm/aliases/default/bin",
            "\(h)/.local/share/fnm/aliases/default/bin",
        ] + nodeVersionBins
    }

    /// Login-shell PATH first (it is what the user's Terminal runs), then defaults.
    public static func merge(loginShellPath: [String], defaults: [String]) -> [String] {
        var seen = Set<String>()
        return (loginShellPath + defaults).filter { seen.insert($0).inserted }
    }
}
