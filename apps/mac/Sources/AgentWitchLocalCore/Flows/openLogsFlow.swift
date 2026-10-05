import Foundation

public struct OpenLogsFlowResult: Equatable, Sendable {
    public let logPath: URL?

    public init(logPath: URL?) {
        self.logPath = logPath
    }
}

/// Resolves the newest main log path for the View logs action.
public func openLogsFlow(
    installDir: URL = resolveAgentWitchInstallDir(),
    fileManager: FileManager = .default
) -> OpenLogsFlowResult {
    OpenLogsFlowResult(
        logPath: resolveNewestAgentWitchMainLogPath(
            installDir: installDir,
            fileManager: fileManager
        )
    )
}
