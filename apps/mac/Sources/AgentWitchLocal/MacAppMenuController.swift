import AppKit
import Darwin
import Combine
import Foundation
import ServiceManagement
import SwiftUI
import AgentWitchLocalCore

@MainActor
final class MacAppMenuController: ObservableObject {
    @Published private(set) var state: MacAppRuntimeState = .notInstalled
    /// Non-nil while the first-run bootstrap FSA owns the UI (core not installed).
    @Published private(set) var bootstrapState: MacAppBootstrapState?
    @Published var launchesAtLogin: Bool = false
    @Published var statusMessage: String = ""
    @Published private(set) var updateOffer: UpdateOffer?


    private let fileManager: FileManager
    private var healthTimer: Timer?
    /// In-memory PKCE attempt only (never UserDefaults / disk).
    private var pendingBootstrapAttempt: MacAppBootstrapPendingAttempt?
    private var bootstrapTask: Task<Void, Never>?
#if os(macOS)
    private let runner: LaunchctlRunning = ProcessLaunchctlRunner()
    private let browserOpener: BrowserOpening = NSWorkspaceBrowserOpener()
    private let httpClient: BootstrapHttpClienting = EphemeralBootstrapHttpClient()
    private let updateHttpClient: UpdateNoticeHttpClienting = EphemeralBootstrapHttpClient()
    private let scriptRunner: InstallScriptRunning = ProcessInstallScriptRunner()
#endif
    private var updateTimer: Timer?
    private var lastUpdateCheckAt: Date?
    private let nowProvider: () -> Date

    init(fileManager: FileManager = .default, now: @escaping () -> Date = Date.init) {
        self.fileManager = fileManager
        self.nowProvider = now
        refreshInstallAndHealth()
        refreshLaunchAtLogin()
        startHealthPolling()
        startUpdatePolling()
    }

    deinit {
        healthTimer?.invalidate()
        updateTimer?.invalidate()
        bootstrapTask?.cancel()
    }

    func refreshInstallAndHealth() {
        Task {
            let ownership = await probeHealth()
            let healthy = ownership.isHealthy
            let installed = isAgentWitchCoreInstalled(
                installDir: resolveAgentWitchInstallDir(),
                plistPath: resolveAgentWitchLaunchAgentPlistPath(),
                fileManager: fileManager
            )

            if installed {
                bootstrapState = nil
                pendingBootstrapAttempt = nil
                let next = detectInstallFlow(
                    installDir: resolveAgentWitchInstallDir(),
                    plistPath: resolveAgentWitchLaunchAgentPlistPath(),
                    fileManager: fileManager,
                    isHealthy: healthy
                )
                state = next
                statusMessage = resolveLocalHealthStatusMessage(
                    ownership: ownership,
                    runtimeLabel: statusLabel(for: next)
                )
                return
            }

            // Not installed: start bootstrap once; leave in-flight / error alone until Retry.
            if bootstrapState == nil {
                await startOrResumeBootstrap(isHealthy: healthy)
            }
        }
    }

    func retryBootstrap() {
        bootstrapTask?.cancel()
        pendingBootstrapAttempt = nil
        bootstrapState = .checking
        statusMessage = bootstrapStatusLabel(for: .checking)
        Task {
            await startOrResumeBootstrap(isHealthy: await probeHealth().isHealthy)
        }
    }

    /// Signing in → Signing in: fresh PKCE state/verifier replaces the pending attempt.
    func restartBootstrapSignIn() {
        guard bootstrapState == .signingIn else {
            return
        }
#if os(macOS)
        do {
            let result = try beginBootstrapSignInFlow(
                current: .signingIn,
                opener: browserOpener
            )
            pendingBootstrapAttempt = result.pending
            bootstrapState = result.state
            statusMessage = bootstrapStatusLabel(for: result.state)
        } catch {
            pendingBootstrapAttempt = nil
            let reason = sanitizeBootstrapErrorReason(error.localizedDescription)
            bootstrapState = .error(reason: reason)
            statusMessage = reason
        }
#endif
    }

    func copyBootstrapFallbackInstallCommand() {
        let command = resolveBootstrapFallbackInstallCommand()
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(command, forType: .string)
        statusMessage = "Install command copied."
    }

    func handleOpenURL(_ url: URL) {
        guard let currentBootstrap = bootstrapState else {
            return
        }
        do {
            let outcome = try handleBootstrapCallbackFlow(
                current: currentBootstrap,
                url: url,
                pending: pendingBootstrapAttempt
            )
            switch outcome {
            case .ignored:
                return
            case .unsupported(let reason):
                statusMessage = reason
                return
            case .failed(let next):
                pendingBootstrapAttempt = nil
                bootstrapState = next
                statusMessage = bootstrapStatusLabel(for: next)
            case .proceed(let code, let next, let pending):
                bootstrapState = next
                statusMessage = bootstrapStatusLabel(for: next)
                pendingBootstrapAttempt = pending
                bootstrapTask?.cancel()
                bootstrapTask = Task {
                    await continueInstall(code: code, pending: pending)
                }
            }
        } catch {
            let reason = sanitizeBootstrapErrorReason(error.localizedDescription)
            bootstrapState = .error(reason: reason)
            statusMessage = reason
        }
    }

    func startCore() {
        Task {
#if os(macOS)
            do {
                let domain = resolveLaunchctlGuiDomain(userId: getuid())
                let result = try startCoreFlow(
                    current: state,
                    domain: domain,
                    plistPath: resolveAgentWitchLaunchAgentPlistPath(),
                    runner: runner
                )
                state = result.state
                statusMessage = statusLabel(for: result.state)
            } catch {
                state = .error(message: error.localizedDescription)
                statusMessage = error.localizedDescription
            }
#else
            state = .error(message: "Start is only supported on macOS.")
#endif
        }
    }

    func stopCore() {
        Task {
#if os(macOS)
            do {
                let domain = resolveLaunchctlGuiDomain(userId: getuid())
                let result = try stopCoreFlow(
                    current: state,
                    domain: domain,
                    runner: runner
                )
                state = result.state
                statusMessage = statusLabel(for: result.state)
            } catch {
                state = .error(message: error.localizedDescription)
                statusMessage = error.localizedDescription
            }
#else
            state = .error(message: "Stop is only supported on macOS.")
#endif
        }
    }

    func openLocalStatus() {
        NSWorkspace.shared.open(resolveAgentWitchLocalStatusUrl())
    }

    func openConnectThisMac() {
        NSWorkspace.shared.open(resolveConnectThisMacUrl())
    }

    func openLogs() {
        let result = openLogsFlow(fileManager: fileManager)
        guard let logPath = result.logPath else {
            statusMessage = "No agent-witch.log found yet."
            return
        }
        NSWorkspace.shared.open(logPath)
    }

    func toggleLaunchAtLogin(_ enabled: Bool) {
#if os(macOS)
        do {
            if enabled {
                try SMAppService.mainApp.register()
            } else {
                try SMAppService.mainApp.unregister()
            }
            launchesAtLogin = enabled
        } catch {
            statusMessage = "Launch at login: \(error.localizedDescription)"
            refreshLaunchAtLogin()
        }
#endif
    }

    func openUpdate() {
        guard let offer = updateOffer else {
            return
        }
        NSWorkspace.shared.open(offer.url)
    }

    private func startUpdatePolling() {
        updateTimer?.invalidate()
        // Launch check immediately; then poll daily via a coarse timer.
        Task { await maybeCheckUpdate() }
        updateTimer = Timer.scheduledTimer(
            withTimeInterval: MacAppConstants.updateCheckIntervalSeconds,
            repeats: true
        ) { [weak self] _ in
            Task { @MainActor in
                await self?.maybeCheckUpdate()
            }
        }
    }

    private func maybeCheckUpdate() async {
        let now = nowProvider()
        if let last = lastUpdateCheckAt,
           now.timeIntervalSince(last) < MacAppConstants.updateCheckIntervalSeconds {
            return
        }
#if os(macOS)
        let result = await checkForUpdate(
            http: updateHttpClient,
            prefix: MacAppConstants.tagPrefixMac,
            currentVersion: resolveMacAppVersion()
        )
        lastUpdateCheckAt = now
        switch result {
        case .failed:
            // Silent: keep any prior offer; no crash / no status noise.
            return
        case .checked(let offer):
            updateOffer = offer
        }
#else
        _ = now
#endif
    }

    // MARK: - Bootstrap

    private func startOrResumeBootstrap(isHealthy: Bool) async {
        let installed = isAgentWitchCoreInstalled(
            installDir: resolveAgentWitchInstallDir(),
            plistPath: resolveAgentWitchLaunchAgentPlistPath(),
            fileManager: fileManager
        )

        if bootstrapState == nil {
            bootstrapState = .checking
            statusMessage = bootstrapStatusLabel(for: .checking)
        }

        do {
            let checked = try checkBootstrapInstallFlow(
                current: .checking,
                isCoreInstalled: installed,
                isHealthy: isHealthy
            )
            if let handoff = checked.handoffRuntime {
                bootstrapState = nil
                pendingBootstrapAttempt = nil
                state = handoff
                statusMessage = statusLabel(for: handoff)
                return
            }
        } catch {
            let reason = sanitizeBootstrapErrorReason(error.localizedDescription)
            bootstrapState = .error(reason: reason)
            statusMessage = reason
            return
        }

#if os(macOS)
        do {
            let result = try beginBootstrapSignInFlow(
                current: .checking,
                opener: browserOpener
            )
            // New attempt replaces any previous pending attempt.
            pendingBootstrapAttempt = result.pending
            bootstrapState = result.state
            statusMessage = bootstrapStatusLabel(for: result.state)
        } catch {
            let reason = sanitizeBootstrapErrorReason(error.localizedDescription)
            bootstrapState = .error(reason: reason)
            statusMessage = reason
        }
#else
        bootstrapState = .error(reason: "Bootstrap is only supported on macOS.")
        statusMessage = "Bootstrap is only supported on macOS."
#endif
    }

    private func continueInstall(
        code: String,
        pending: MacAppBootstrapPendingAttempt
    ) async {
#if os(macOS)
        let install = await runBootstrapInstallFlow(
            current: .installing,
            code: code,
            pending: pending,
            http: httpClient,
            scriptRunner: scriptRunner,
            fileManager: fileManager
        )
        pendingBootstrapAttempt = install.pending
        bootstrapState = install.state
        statusMessage = bootstrapStatusLabel(for: install.state)

        guard case .settingUp = install.state else {
            return
        }

        let setup = await runBootstrapSetupFlow(
            current: .settingUp,
            probeHealth: { await self.probeHealth() }
        )
        bootstrapState = setup.state
        statusMessage = bootstrapStatusLabel(for: setup.state)

        if case .connected = setup.state {
            bootstrapState = nil
            state = .running
            statusMessage = statusLabel(for: .running)
        }
#else
        _ = code
        _ = pending
#endif
    }


    private func bootstrapStatusLabel(for state: MacAppBootstrapState) -> String {
        switch state {
        case .checking:
            return "Checking…"
        case .signingIn:
            return "Sign in to connect this Mac…"
        case .installing:
            return "Installing AgentWitch…"
        case .settingUp:
            return "Setting up…"
        case .connected:
            return "Connected"
        case .error(let reason):
            return reason
        }
    }

    private func refreshLaunchAtLogin() {
#if os(macOS)
        launchesAtLogin = SMAppService.mainApp.status == .enabled
#endif
    }

    private func startHealthPolling() {
        healthTimer?.invalidate()
        healthTimer = Timer.scheduledTimer(withTimeInterval: 3.0, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.pollHealthOnce()
            }
        }
    }

    private func pollHealthOnce() {
        // Skip routine health polling while bootstrap owns the session.
        if bootstrapState != nil {
            return
        }
        Task {
            let ownership = await probeHealth()
            do {
                state = try pollHealthFlow(current: state, isHealthy: ownership.isHealthy)
                statusMessage = resolveLocalHealthStatusMessage(
                    ownership: ownership,
                    runtimeLabel: statusLabel(for: state)
                )
            } catch {
                // Keep current state when transition is disallowed mid-flight.
            }
        }
    }

    /// `.ours` only when the responder on the shared port reports this user's uid.
    private func probeHealth() async -> LocalHealthOwnership {
        var request = URLRequest(url: resolveAgentWitchLocalHealthUrl())
        request.timeoutInterval = 2.0
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            let code = (response as? HTTPURLResponse)?.statusCode ?? 0
            return parseLocalHealthResponse(statusCode: code, body: data, expectedUid: getuid())
        } catch {
            return .unhealthy
        }
    }

    private func statusLabel(for state: MacAppRuntimeState) -> String {
        switch state {
        case .notInstalled:
            return "Not installed"
        case .stopped:
            return "Stopped"
        case .starting:
            return "Starting…"
        case .running:
            return "Running"
        case .stopping:
            return "Stopping…"
        case .error(let message):
            return message
        }
    }
}
