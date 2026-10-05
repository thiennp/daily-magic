import Foundation

public struct RunBootstrapInstallFlowResult: Equatable, Sendable {
    public let state: MacAppBootstrapState
    /// Always nil after exchange attempt (single-use pending cleared).
    public let pending: MacAppBootstrapPendingAttempt?
    public let scriptExitStatus: Int32?

    public init(
        state: MacAppBootstrapState,
        pending: MacAppBootstrapPendingAttempt?,
        scriptExitStatus: Int32?
    ) {
        self.state = state
        self.pending = pending
        self.scriptExitStatus = scriptExitStatus
    }
}

public struct BootstrapInstallCapturedEnv: Equatable, Sendable {
    public let environment: [String: String]
    public let arguments: [String]

    public init(environment: [String: String], arguments: [String]) {
        self.environment = environment
        self.arguments = arguments
    }
}

/// Exchange code → download+verify script → run with PRESET_* env only → Setting up or Error.
/// Clears pending after one exchange attempt regardless of outcome.
public func runBootstrapInstallFlow(
    current: MacAppBootstrapState,
    code: String,
    pending: MacAppBootstrapPendingAttempt,
    http: BootstrapHttpClienting,
    scriptRunner: InstallScriptRunning,
    fileManager: FileManager = .default,
    exchangeUrl: URL = resolveBootstrapExchangeUrl(),
    onScriptInvocation: ((BootstrapInstallCapturedEnv) -> Void)? = nil
) async -> RunBootstrapInstallFlowResult {
    // Single-use: clear pending after this attempt regardless of outcome.
    let clearedPending: MacAppBootstrapPendingAttempt? = nil

    func fail(_ reason: String) -> RunBootstrapInstallFlowResult {
        let sanitized = sanitizeBootstrapErrorReason(reason)
        let next = (try? applyMacAppBootstrapStateTransition(
            from: current,
            to: .error(reason: sanitized)
        )) ?? .error(reason: sanitized)
        return RunBootstrapInstallFlowResult(
            state: next,
            pending: clearedPending,
            scriptExitStatus: nil
        )
    }

    let bodyObject: [String: String] = [
        "code": code,
        "state": pending.state,
        "code_verifier": pending.codeVerifier,
    ]
    guard let body = try? JSONSerialization.data(withJSONObject: bodyObject) else {
        return fail("Could not build exchange request.")
    }

    let responseData: Data
    let statusCode: Int
    do {
        (responseData, statusCode) = try await http.postJson(url: exchangeUrl, body: body)
    } catch {
        return fail("Exchange request failed.")
    }

    guard (200..<300).contains(statusCode) else {
        return fail("Exchange failed (HTTP \(statusCode)).")
    }

    let exchange: BootstrapExchangeResponse
    do {
        exchange = try parseBootstrapExchangeResponse(data: responseData)
    } catch {
        return fail("Invalid exchange response.")
    }

    guard isValidBootstrapScriptUrl(exchange.scriptUrl) else {
        return fail("Invalid install script URL.")
    }
    guard let scriptURL = URL(string: exchange.scriptUrl) else {
        return fail("Invalid install script URL.")
    }

    let scriptData: Data
    do {
        scriptData = try await http.getData(url: scriptURL)
    } catch {
        return fail("Failed to download install script.")
    }

    guard verifySha256Hex(data: scriptData, expectedHex: exchange.scriptSha256) else {
        return fail("Install script checksum mismatch.")
    }

    let tempRoot = fileManager.temporaryDirectory
        .appendingPathComponent("awl-bootstrap-\(UUID().uuidString)", isDirectory: true)
    do {
        try fileManager.createDirectory(at: tempRoot, withIntermediateDirectories: true)
        try fileManager.setAttributes(
            [.posixPermissions: 0o700],
            ofItemAtPath: tempRoot.path
        )
    } catch {
        return fail("Could not create secure temp directory.")
    }
    defer { try? fileManager.removeItem(at: tempRoot) }

    let scriptPath = tempRoot.appendingPathComponent("install.sh")
    do {
        try scriptData.write(to: scriptPath, options: .atomic)
    } catch {
        return fail("Could not write install script.")
    }

    let environment: [String: String] = [
        MacAppConstants.installTokenEnvironmentVariable: exchange.installToken,
        MacAppConstants.profileEmailEnvironmentVariable: exchange.profileEmail,
    ]
    let captured = BootstrapInstallCapturedEnv(
        environment: environment,
        arguments: [scriptPath.path]
    )
    onScriptInvocation?(captured)

    let exitStatus: Int32
    do {
        exitStatus = try scriptRunner.run(scriptPath: scriptPath, environment: environment)
    } catch {
        return fail("Install script failed to start.")
    }

    guard exitStatus == 0 else {
        return fail("Install script exited with status \(exitStatus).")
    }

    let next = (try? applyMacAppBootstrapStateTransition(from: current, to: .settingUp))
        ?? .settingUp
    return RunBootstrapInstallFlowResult(
        state: next,
        pending: clearedPending,
        scriptExitStatus: exitStatus
    )
}
