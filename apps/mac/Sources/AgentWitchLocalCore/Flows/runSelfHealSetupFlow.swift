import Foundation

public struct RunSelfHealSetupFlowResult: Equatable, Sendable {
    public let session: MacAppSetupSessionState
    public let runtimeState: MacAppRuntimeState?

    public init(session: MacAppSetupSessionState, runtimeState: MacAppRuntimeState?) {
        self.session = session
        self.runtimeState = runtimeState
    }
}

public typealias SelfHealProgressHandler = @Sendable (MacAppSetupProgressStep, Int) -> Void

/// Downloads + runs the official install/update script, then waits for verified `/health`.
/// Progress steps use Product copy. Failures never include bare status 113.
public func runSelfHealSetupFlow(
    isCoreInstalled: Bool,
    http: BootstrapHttpClienting,
    scriptRunner: InstallScriptRunning,
    probeHealth: () async -> LocalHealthOwnership,
    fileManager: FileManager = .default,
    origin: String = MacAppConstants.cloudOrigin,
    onProgress: SelfHealProgressHandler? = nil,
    sleep: (TimeInterval) async -> Void = { ns in
        try? await Task.sleep(nanoseconds: UInt64(ns * 1_000_000_000))
    },
    now: () -> Date = Date.init,
    healthTimeoutSeconds: TimeInterval = MacAppConstants.bootstrapSetupHealthTimeoutSeconds,
    healthPollIntervalSeconds: TimeInterval = MacAppConstants.bootstrapSetupHealthPollIntervalSeconds
) async -> RunSelfHealSetupFlowResult {
    func emit(_ step: MacAppSetupProgressStep, _ percent: Int) {
        onProgress?(step, min(100, max(0, percent)))
    }

    func fail(
        _ kind: MacAppSetupFailureKind,
        runtime: MacAppRuntimeState? = .notInstalled
    ) -> RunSelfHealSetupFlowResult {
        let installDir = resolveAgentWitchInstallDir()
        let setupLog = resolveAgentWitchSetupLogPath(installDir: installDir)
        // Prefer teed setup.log on a fresh failure (main log may not exist yet).
        let logPath: URL?
        if fileManager.fileExists(atPath: setupLog.path) {
            logPath = setupLog
        } else {
            logPath = resolveNewestAgentWitchMainLogPath(
                installDir: installDir,
                fileManager: fileManager
            )
        }
        return RunSelfHealSetupFlowResult(
            session: .failed(kind: kind, logPath: logPath),
            runtimeState: runtime
        )
    }

    // 1 · Checking this computer
    emit(.checkingThisComputer, 5)
    if case .foreign = await probeHealth() {
        return fail(.generic, runtime: .error(message: MacAppConstants.foreignLocalHealthReason))
    }
    emit(.checkingThisComputer, 12)

    // 2 · Downloading the connection
    emit(.downloadingTheConnection, 18)
    let scriptURL = resolveAgentWitchSelfHealScriptUrl(
        isCoreInstalled: isCoreInstalled,
        origin: origin
    )
    guard isValidBootstrapScriptUrl(scriptURL.absoluteString) else {
        return fail(.generic)
    }

    let scriptData: Data
    do {
        scriptData = try await http.getData(url: scriptURL)
    } catch {
        return fail(.offline)
    }
    guard !scriptData.isEmpty else {
        return fail(.generic)
    }
    emit(.downloadingTheConnection, 50)

    let tempRoot = fileManager.temporaryDirectory
        .appendingPathComponent("awl-self-heal-\(UUID().uuidString)", isDirectory: true)
    do {
        try fileManager.createDirectory(at: tempRoot, withIntermediateDirectories: true)
        try fileManager.setAttributes(
            [.posixPermissions: 0o700],
            ofItemAtPath: tempRoot.path
        )
    } catch {
        return fail(.permission)
    }
    defer { try? fileManager.removeItem(at: tempRoot) }

    let scriptPath = tempRoot.appendingPathComponent("install.sh")
    do {
        try scriptData.write(to: scriptPath, options: .atomic)
    } catch {
        return fail(.disk)
    }

    // 3 · Installing support for assistant tools
    emit(.installingAssistantTools, 58)
    let exitStatus: Int32
    do {
        exitStatus = try scriptRunner.run(scriptPath: scriptPath, environment: [:])
    } catch {
        return fail(.permission)
    }
    // Never surface the numeric status (113 etc.) — map to plain failure.
    if exitStatus != 0 {
        // DF-031: update scripts served before the fix verify only legacy 43347,
        // so they exit non-zero after a good reinstall on the H6 per-account port.
        // `probeHealth` uses the discovered port (saved → range → legacy): when
        // it already sees our core, the repair worked — do not report failure.
        guard isCoreInstalled, case .ours = await probeHealth() else {
            return fail(.generic)
        }
        emit(.checkingEverythingWorks, 100)
        return RunSelfHealSetupFlowResult(session: .succeeded, runtimeState: .running)
    }
    emit(.installingAssistantTools, 84)

    // 4 · Checking everything works
    emit(.checkingEverythingWorks, 88)
    let deadline = now().addingTimeInterval(healthTimeoutSeconds)
    var last = await probeHealth()
    while true {
        if Task.isCancelled {
            return fail(.generic, runtime: isCoreInstalled ? .stopped : .notInstalled)
        }
        switch last {
        case .ours:
            emit(.checkingEverythingWorks, 100)
            return RunSelfHealSetupFlowResult(
                session: .succeeded,
                runtimeState: .running
            )
        case .foreign:
            return fail(
                .generic,
                runtime: .error(message: MacAppConstants.foreignLocalHealthReason)
            )
        case .unverified, .unhealthy:
            break
        }
        guard now() < deadline else {
            break
        }
        await sleep(healthPollIntervalSeconds)
        if Task.isCancelled {
            return fail(.generic, runtime: isCoreInstalled ? .stopped : .notInstalled)
        }
        let elapsed = healthTimeoutSeconds - deadline.timeIntervalSince(now())
        let pct = 88 + Int(min(10, max(0, elapsed / healthTimeoutSeconds * 10)))
        emit(.checkingEverythingWorks, pct)
        last = await probeHealth()
    }

    // Still unverified after update → treat as incomplete setup (caller may Retry).
    return fail(.generic, runtime: isCoreInstalled ? .stopped : .notInstalled)
}
