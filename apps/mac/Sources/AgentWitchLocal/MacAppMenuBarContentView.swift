import AppKit
import SwiftUI
import AgentWitchLocalCore

struct MacAppMenuBarContentView: View {
    @ObservedObject var controller: MacAppMenuController

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(controller.statusMessage)
                .font(.headline)

            Divider()

            if let bootstrap = controller.bootstrapState {
                bootstrapButtons(bootstrap)
            } else {
                runtimeButtons
            }

            Divider()

            Toggle(
                "Launch at login",
                isOn: Binding(
                    get: { controller.launchesAtLogin },
                    set: { controller.toggleLaunchAtLogin($0) }
                )
            )

            Divider()

            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
        }
        .padding(8)
        .frame(minWidth: 220)
        .onAppear {
            controller.refreshInstallAndHealth()
        }
    }

    @ViewBuilder
    private func bootstrapButtons(_ bootstrap: MacAppBootstrapState) -> some View {
        switch bootstrap {
        case .checking, .signingIn, .installing, .settingUp:
            Text(progressLabel(for: bootstrap))
                .foregroundStyle(.secondary)
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
            Button("Start Agent Witch") {
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
            Button("Stop Agent Witch") {
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
