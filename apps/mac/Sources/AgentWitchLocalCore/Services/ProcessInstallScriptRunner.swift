import Foundation

#if os(macOS)
public struct ProcessInstallScriptRunner: InstallScriptRunning {
    public init() {}

    public func run(scriptPath: URL, environment: [String: String]) throws -> Int32 {
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/bin/bash")
        process.arguments = [scriptPath.path]
        var env = ProcessInfo.processInfo.environment
        env["PATH"] = buildInstallScriptPath(
            inheritedPath: env["PATH"],
            homeDirectory: FileManager.default.homeDirectoryForCurrentUser.path,
            loginShellNodeDirectory: resolveLoginShellNodeDirectory()
        )
        for (key, value) in environment {
            env[key] = value
        }
        process.environment = env
        process.standardOutput = FileHandle.nullDevice
        process.standardError = FileHandle.nullDevice
        try process.run()
        process.waitUntilExit()
        return process.terminationStatus
    }
}
#endif
