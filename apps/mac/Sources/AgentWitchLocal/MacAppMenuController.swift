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
    @Published var launchesAtLogin: Bool = false
    @Published var statusMessage: String = ""

    private let fileManager: FileManager
    private var healthTimer: Timer?
#if os(macOS)
    private let runner: LaunchctlRunning = ProcessLaunchctlRunner()
#endif

    init(fileManager: FileManager = .default) {
        self.fileManager = fileManager
        refreshInstallAndHealth()
        refreshLaunchAtLogin()
        startHealthPolling()
    }

    deinit {
        healthTimer?.invalidate()
    }

    func refreshInstallAndHealth() {
        Task {
            let healthy = await probeHealth()
            let next = detectInstallFlow(
                installDir: resolveAgentWitchInstallDir(),
                plistPath: resolveAgentWitchLaunchAgentPlistPath(),
                fileManager: fileManager,
                isHealthy: healthy
            )
            state = next
            statusMessage = statusLabel(for: next)
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
        Task {
            let healthy = await probeHealth()
            do {
                state = try pollHealthFlow(current: state, isHealthy: healthy)
                statusMessage = statusLabel(for: state)
            } catch {
                // Keep current state when transition is disallowed mid-flight.
            }
        }
    }

    private func probeHealth() async -> Bool {
        var request = URLRequest(url: resolveAgentWitchLocalHealthUrl())
        request.timeoutInterval = 2.0
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            let code = (response as? HTTPURLResponse)?.statusCode ?? 0
            return parseLocalHealthResponse(statusCode: code)
        } catch {
            return false
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
