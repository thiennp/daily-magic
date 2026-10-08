import Foundation

public protocol LaunchctlRunning: Sendable {
    func run(arguments: [String]) throws -> Int32
}

extension LaunchctlRunning {
    /// `launchctl print gui/<uid>/<label>` exits 0 when the service is loaded.
    public func isServiceLoaded(domain: String, label: String) -> Bool {
        ((try? run(arguments: ["print", "\(domain)/\(label)"])) ?? 1) == 0
    }
}

#if os(macOS)
public struct ProcessLaunchctlRunner: LaunchctlRunning {
    public init() {}

    public func run(arguments: [String]) throws -> Int32 {
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/bin/launchctl")
        process.arguments = arguments
        process.standardOutput = FileHandle.nullDevice
        process.standardError = FileHandle.nullDevice
        try process.run()
        process.waitUntilExit()
        return process.terminationStatus
    }
}
#endif
