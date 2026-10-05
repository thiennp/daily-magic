import Foundation

public protocol InstallScriptRunning: Sendable {
    /// Runs `/bin/bash` on `scriptPath` with extra environment (token via env only).
    func run(scriptPath: URL, environment: [String: String]) throws -> Int32
}
