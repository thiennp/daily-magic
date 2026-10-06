import AppKit
import SwiftUI
import AgentWitchLocalCore

struct MacAppMenuBarContentView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @Environment(\.openWindow) private var openWindow
    @State private var showQuitConfirm = false

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            hero
            Divider()
            bodyActions
                .padding(.horizontal, 12)
                .padding(.vertical, 10)
            if let offer = controller.updateOffer {
                Divider()
                updateStrip(offer)
            }
            Divider()
            // HARD: Download AWL always visible in footer even when connected/running.
            footer
        }
        .frame(minWidth: 280)
        .background(MacAppTheme.cream)
        .onAppear {
            controller.refreshInstallAndHealth()
        }
        .awlWindowOpener()
        .alert("Quit AgentWitch Local?", isPresented: $showQuitConfirm) {
            Button("Cancel", role: .cancel) {}
            Button("Quit", role: .destructive) {
                NSApplication.shared.terminate(nil)
            }
        } message: {
            Text(controller.state == .running
                 ? "Assistants cannot use this computer until you open the app again. The menu bar icon goes away until you open the app again."
                 : "The menu bar icon goes away until you open the app again.")
        }
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Image(systemName: "wand.and.stars")
                    .foregroundStyle(.white)
                Text("AgentWitch Local")
                    .font(.headline)
                    .foregroundStyle(.white)
                Spacer()
                statusPill
            }
            Text(controller.statusMessage)
                .font(.caption)
                .foregroundStyle(.white.opacity(0.9))
            if store.hasConnectedProject {
                Text("Connected projects · \(store.computerName)")
                    .font(.caption2)
                    .foregroundStyle(.white.opacity(0.8))
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(MacAppTheme.heroGradient)
    }

    private var statusPill: some View {
        let running = controller.state == .running
        return Text(running ? "Running" : shortStatus)
            .font(.caption2.weight(.semibold))
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(Capsule().fill(Color.white.opacity(0.22)))
            .foregroundStyle(.white)
    }

    private var shortStatus: String {
        if controller.bootstrapState != nil { return "Setup" }
        switch controller.state {
        case .notInstalled: return "Not installed"
        case .stopped: return "Stopped"
        case .starting: return "Starting"
        case .running: return "Running"
        case .stopping: return "Stopping"
        case .error: return "Error"
        }
    }

    @ViewBuilder
    private var bodyActions: some View {
        if let bootstrap = controller.bootstrapState {
            bootstrapButtons(bootstrap)
            Button("Open first-run wizard") {
                openWindow(id: MacAppWindowID.firstRun.rawValue)
            }
            .buttonStyle(.borderless)
        } else {
            runtimeButtons
            if store.hasConnectedProject {
                Text("This computer is connected as \(store.computerName)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.top, 4)
            } else if controller.state != .notInstalled {
                VStack(alignment: .leading, spacing: 6) {
                    Text("No project yet")
                        .font(.subheadline.weight(.semibold))
                    Text("Connect this computer to a project to let its assistants work here.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Connect a project") {
                        controller.openConnectThisMac()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.accent)
                    .controlSize(.small)
                }
                .padding(10)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.skillSoft.opacity(0.7)))
            }
        }
        HStack(spacing: 8) {
            Button {
                controller.openLocalStatus()
            } label: {
                Label("Open AgentWitch", systemImage: "safari")
            }
            .controlSize(.small)
            Button {
                openWindow(id: MacAppWindowID.computer.rawValue)
            } label: {
                Label("Open window", systemImage: "desktopcomputer")
            }
            .controlSize(.small)
        }
        .padding(.top, 6)
    }

    private func updateStrip(_ offer: UpdateOffer) -> some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text(updateAvailableTitle(version: offer.version))
                    .font(.caption.weight(.semibold))
                Text("What is new in version \(offer.version)")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Button("Download") {
                controller.openUpdate()
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.small)
            .tint(MacAppTheme.accent)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(MacAppTheme.accent.opacity(0.08))
    }

    private var footer: some View {
        VStack(spacing: 8) {
            HStack(spacing: 4) {
                Button {
                    openWindow(id: MacAppWindowID.history.rawValue)
                } label: {
                    Label("History", systemImage: "clock.arrow.circlepath")
                }
                .buttonStyle(.borderless)
                .controlSize(.small)

                Button {
                    openWindow(id: MacAppWindowID.settings.rawValue)
                } label: {
                    Label("Settings", systemImage: "slider.horizontal.3")
                }
                .buttonStyle(.borderless)
                .controlSize(.small)

                Spacer(minLength: 4)

                DownloadAwlLink(style: .compactFooter)

                Button {
                    showQuitConfirm = true
                } label: {
                    Label("Quit", systemImage: "power")
                }
                .buttonStyle(.borderless)
                .controlSize(.small)
            }
            // Second explicit always-on row so Download cannot be missed when footer wraps.
            DownloadAwlLink(style: .button)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(MacAppTheme.surface.opacity(0.95))
    }

    @ViewBuilder
    private func bootstrapButtons(_ bootstrap: MacAppBootstrapState) -> some View {
        switch bootstrap {
        case .checking, .signingIn, .installing, .settingUp:
            Text(progressLabel(for: bootstrap))
                .foregroundStyle(.secondary)
            if bootstrap == .signingIn {
                Button("Try sign-in again") {
                    controller.restartBootstrapSignIn()
                }
            }
            Button("Open Connect this Mac…") {
                controller.openConnectThisMac()
            }
        case .connected:
            EmptyView()
        case .error:
            Button("Retry") {
                controller.retryBootstrap()
            }
            Button("Copy install command") {
                controller.copyBootstrapFallbackInstallCommand()
            }
            Button("Open Connect this Mac…") {
                controller.openConnectThisMac()
            }
        }
    }

    private func progressLabel(for bootstrap: MacAppBootstrapState) -> String {
        switch bootstrap {
        case .checking: return "Checking install…"
        case .signingIn: return "Waiting for browser sign-in…"
        case .installing: return "Installing…"
        case .settingUp: return "Waiting for local health…"
        default: return ""
        }
    }

    @ViewBuilder
    private var runtimeButtons: some View {
        switch controller.state {
        case .notInstalled:
            Button("Open Connect this Mac…") {
                controller.openConnectThisMac()
            }
        case .stopped, .error:
            Button("Start AgentWitch") {
                controller.startCore()
            }
            Button("Open AgentWitch Local") {
                controller.openLocalStatus()
            }
            Button("View logs") {
                controller.openLogs()
            }
        case .starting, .running:
            Button("Open AgentWitch Local") {
                controller.openLocalStatus()
            }
            Button("Stop AgentWitch") {
                controller.stopCore()
            }
            .disabled(controller.state == .starting)
            Button("View logs") {
                controller.openLogs()
            }
        case .stopping:
            Button("Stopping…") {}
                .disabled(true)
        }
    }
}
