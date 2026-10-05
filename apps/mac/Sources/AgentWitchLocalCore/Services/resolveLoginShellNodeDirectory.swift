import Foundation

#if os(macOS)
/// Asks the user's login shell where `node` is (nvm, asdf, custom PATH in `.zprofile`).
/// Bounded by `timeoutSeconds`; any failure returns nil (the static PATH entries still apply).
public func resolveLoginShellNodeDirectory(
    shell: String = ProcessInfo.processInfo.environment["SHELL"] ?? "/bin/zsh",
    timeoutSeconds: TimeInterval = 3,
    fileManager: FileManager = .default
) -> String? {
    let outputURL = fileManager.temporaryDirectory
        .appendingPathComponent("awl-login-shell-node-\(UUID().uuidString).txt")
    guard fileManager.createFile(atPath: outputURL.path, contents: nil),
          let outputHandle = try? FileHandle(forWritingTo: outputURL) else {
        return nil
    }
    defer {
        try? outputHandle.close()
        try? fileManager.removeItem(at: outputURL)
    }

    let process = Process()
    process.executableURL = URL(fileURLWithPath: shell)
    process.arguments = ["-lc", "command -v node"]
    process.standardInput = FileHandle.nullDevice
    // A file (not a pipe) so a lingering grandchild can never block the read.
    process.standardOutput = outputHandle
    process.standardError = FileHandle.nullDevice

    let finished = DispatchSemaphore(value: 0)
    process.terminationHandler = { _ in finished.signal() }
    do {
        try process.run()
    } catch {
        return nil
    }
    guard finished.wait(timeout: .now() + timeoutSeconds) == .success else {
        process.terminate()
        return nil
    }
    guard process.terminationStatus == 0,
          let data = try? Data(contentsOf: outputURL),
          let output = String(data: data, encoding: .utf8) else {
        return nil
    }
    return parseLoginShellNodeDirectory(output: output)
}
#endif
