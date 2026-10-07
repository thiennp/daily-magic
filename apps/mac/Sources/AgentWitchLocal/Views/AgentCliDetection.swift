import Foundation

/// Real "found on this computer" check for assistant tools (no demo defaults).
/// Looks for the CLI binary in the usual install locations; never runs it.
enum AgentCliDetection {
    static func binaryNames(for kind: AgentCliKind) -> [String] {
        switch kind {
        case .claude: return ["claude"]
        case .cursor: return ["cursor-agent", "agent"]
        case .codex: return ["codex"]
        case .gemini: return ["gemini"]
        }
    }

    static func searchDirectories(
        home: URL = FileManager.default.homeDirectoryForCurrentUser,
        fileManager: FileManager = .default
    ) -> [URL] {
        var dirs: [URL] = [
            URL(fileURLWithPath: "/opt/homebrew/bin"),
            URL(fileURLWithPath: "/usr/local/bin"),
            home.appendingPathComponent(".local/bin"),
            home.appendingPathComponent(".npm-global/bin"),
            home.appendingPathComponent(".claude/local"),
            home.appendingPathComponent(".cursor/bin"),
            home.appendingPathComponent(".bun/bin"),
            home.appendingPathComponent(".volta/bin"),
        ]
        let nvm = home.appendingPathComponent(".nvm/versions/node")
        if let versions = try? fileManager.contentsOfDirectory(atPath: nvm.path) {
            dirs += versions.map { nvm.appendingPathComponent($0).appendingPathComponent("bin") }
        }
        return dirs
    }

    static func isInstalled(
        _ kind: AgentCliKind,
        directories: [URL] = searchDirectories(),
        fileManager: FileManager = .default
    ) -> Bool {
        for dir in directories {
            for name in binaryNames(for: kind) {
                if fileManager.isExecutableFile(atPath: dir.appendingPathComponent(name).path) {
                    return true
                }
            }
        }
        return false
    }

    static func scan() -> [AgentCliKind: Bool] {
        let dirs = searchDirectories()
        var found: [AgentCliKind: Bool] = [:]
        for kind in AgentCliKind.allCases {
            found[kind] = isInstalled(kind, directories: dirs)
        }
        return found
    }
}
