import Foundation

/// Strips token/secret/password-looking assignments from script output before it hits disk.
func redactInstallScriptLog(_ text: String) -> String {
    let patterns = [
        #"(?i)(((?:PRESET_)?PAIRING_TOKEN|token|secret|password)\s*[=:]\s*)\S+"#,
        #"(?i)(authorization:\s*bearer\s+)\S+"#,
    ]
    var result = text
    for pattern in patterns {
        guard let regex = try? NSRegularExpression(pattern: pattern) else { continue }
        let range = NSRange(result.startIndex..<result.endIndex, in: result)
        result = regex.stringByReplacingMatches(
            in: result,
            range: range,
            withTemplate: "$1<redacted>"
        )
    }
    return result
}

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
        // Arch soft: fail fast on interactive prompts instead of hanging unseen.
        process.standardInput = FileHandle.nullDevice

        let setupLogURL = resolveAgentWitchSetupLogPath()
        let fileManager = FileManager.default
        try fileManager.createDirectory(
            at: setupLogURL.deletingLastPathComponent(),
            withIntermediateDirectories: true,
            attributes: [.posixPermissions: 0o700]
        )
        // Truncate previous run so See log shows this attempt only.
        fileManager.createFile(
            atPath: setupLogURL.path,
            contents: nil,
            attributes: [.posixPermissions: 0o600]
        )

        let stdout = Pipe()
        let stderr = Pipe()
        process.standardOutput = stdout
        process.standardError = stderr

        try process.run()
        process.waitUntilExit()

        let outData = stdout.fileHandleForReading.readDataToEndOfFile()
        let errData = stderr.fileHandleForReading.readDataToEndOfFile()
        var combined = Data()
        if !outData.isEmpty { combined.append(outData) }
        if !errData.isEmpty {
            if !combined.isEmpty { combined.append(Data("\n".utf8)) }
            combined.append(errData)
        }
        let redacted = redactInstallScriptLog(String(data: combined, encoding: .utf8) ?? "")
        if let payload = redacted.data(using: .utf8) {
            try payload.write(to: setupLogURL, options: .atomic)
            try? fileManager.setAttributes(
                [.posixPermissions: 0o600],
                ofItemAtPath: setupLogURL.path
            )
        }
        return process.terminationStatus
    }
}
#endif
