import Foundation
import AgentWitchLocalCore

/// Real "found on this computer" check for assistant tools (no demo defaults).
/// Looks for the CLI binary on the user's login-shell PATH plus the usual install
/// locations; never runs the CLI itself.
enum AgentCliDetection {
    static func binaryNames(for kind: AgentCliKind) -> [String] {
        switch kind {
        case .claude: return ["claude"]
        case .cursor: return ["cursor-agent", "agent"]
        case .codex: return ["codex"]
        case .gemini: return ["gemini"]
        }
    }

    private static let lock = NSLock()
    private static var cachedLoginShellPath: [String]?

    /// The user's login-shell PATH (what Terminal sees). Runs the shell once, with
    /// a short timeout; call off the main thread. Cached for the app's lifetime.
    static func resolveLoginShellPath(timeout: TimeInterval = 4) -> [String] {
        lock.lock()
        if let cached = cachedLoginShellPath { lock.unlock(); return cached }
        lock.unlock()

        let shell = ProcessInfo.processInfo.environment["SHELL"].flatMap { $0.isEmpty ? nil : $0 } ?? "/bin/zsh"
        let process = Process()
        process.executableURL = URL(fileURLWithPath: shell)
        process.arguments = ["-l", "-c", AgentCliSearchPaths.loginShellCommand]
        let pipe = Pipe()
        process.standardOutput = pipe
        process.standardError = FileHandle.nullDevice
        process.standardInput = FileHandle.nullDevice
        var dirs: [String] = []
        do {
            try process.run()
            let deadline = Date().addingTimeInterval(timeout)
            while process.isRunning && Date() < deadline { usleep(50_000) }
            if process.isRunning { process.terminate() }
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            dirs = AgentCliSearchPaths.parseLoginShellPath(String(decoding: data, as: UTF8.self))
        } catch {
            dirs = []
        }
        lock.lock(); cachedLoginShellPath = dirs; lock.unlock()
        return dirs
    }

    static func searchDirectories(
        loginShellPath: [String] = [],
        home: URL = FileManager.default.homeDirectoryForCurrentUser,
        fileManager: FileManager = .default
    ) -> [URL] {
        let nvm = home.appendingPathComponent(".nvm/versions/node")
        let nodeBins = ((try? fileManager.contentsOfDirectory(atPath: nvm.path)) ?? [])
            .sorted()
            .map { nvm.appendingPathComponent($0).appendingPathComponent("bin").path }
        let defaults = AgentCliSearchPaths.defaultDirectories(home: home.path, nodeVersionBins: nodeBins)
        return AgentCliSearchPaths.merge(loginShellPath: loginShellPath, defaults: defaults)
            .map { URL(fileURLWithPath: $0) }
    }

    static func isInstalled(
        _ kind: AgentCliKind,
        directories: [URL],
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

    /// Fast scan of fixed locations (safe on the main thread).
    static func scan(loginShellPath: [String] = []) -> [AgentCliKind: Bool] {
        let dirs = searchDirectories(loginShellPath: loginShellPath)
        var found: [AgentCliKind: Bool] = [:]
        for kind in AgentCliKind.allCases {
            found[kind] = isInstalled(kind, directories: dirs)
        }
        return found
    }

    /// Full scan including the login-shell PATH; delivers the result on the main queue.
    static func scanIncludingLoginShell(completion: @escaping ([AgentCliKind: Bool]) -> Void) {
        DispatchQueue.global(qos: .utility).async {
            let result = scan(loginShellPath: resolveLoginShellPath())
            DispatchQueue.main.async { completion(result) }
        }
    }
}
