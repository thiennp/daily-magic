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
}
