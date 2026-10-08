import Foundation

/// `~/Library/Logs/AgentWitch Local/`.
public func resolveAgentWitchLocalAppLogsDir(
    homeDirectory: URL = FileManager.default.homeDirectoryForCurrentUser
) -> URL {
    homeDirectory
        .appendingPathComponent("Library", isDirectory: true)
        .appendingPathComponent("Logs", isDirectory: true)
        .appendingPathComponent(MacAppConstants.appLogsDirectoryName, isDirectory: true)
}

/// Creates the AWL log folder (it was never created before 0.2.6). Returns the folder.
@discardableResult
public func ensureAgentWitchLocalAppLogsDir(
    homeDirectory: URL = FileManager.default.homeDirectoryForCurrentUser,
    fileManager: FileManager = .default
) -> URL? {
    let dir = resolveAgentWitchLocalAppLogsDir(homeDirectory: homeDirectory)
    do {
        try fileManager.createDirectory(at: dir, withIntermediateDirectories: true)
        return dir
    } catch {
        return nil
    }
}

/// Appends one timestamped line to `~/Library/Logs/AgentWitch Local/AgentWitchLocal.log`.
public func appendAgentWitchLocalAppLog(
    _ message: String,
    homeDirectory: URL = FileManager.default.homeDirectoryForCurrentUser,
    fileManager: FileManager = .default,
    now: Date = Date()
) {
    guard let dir = ensureAgentWitchLocalAppLogsDir(
        homeDirectory: homeDirectory,
        fileManager: fileManager
    ) else { return }
    let file = dir.appendingPathComponent(MacAppConstants.appLogFileName, isDirectory: false)
    let formatter = ISO8601DateFormatter()
    let line = "\(formatter.string(from: now)) \(message)\n"
    guard let data = line.data(using: .utf8) else { return }
    if fileManager.fileExists(atPath: file.path),
       let handle = try? FileHandle(forWritingTo: file) {
        defer { try? handle.close() }
        _ = try? handle.seekToEnd()
        try? handle.write(contentsOf: data)
    } else {
        try? data.write(to: file, options: .atomic)
    }
}
