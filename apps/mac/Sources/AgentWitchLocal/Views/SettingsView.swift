import AppKit
import SwiftUI
import AgentWitchLocalCore

struct SettingsView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @State private var showRemoveConfirm = false

    private let keepOptions = [7, 14, 30, 90, 365]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                header
                accountSection
                thisComputerSection
                historySection
                launchSection
                updatesSection
                diagnosticsSection
                removeSection
            }
            .padding(20)
        }
        .background(MacAppTheme.cream)
        .frame(minWidth: 440, minHeight: 560)
        .onAppear { controller.refreshInstallAndHealth() }
        .alert("Remove this computer?", isPresented: $showRemoveConfirm) {
            Button("Cancel", role: .cancel) {}
            Button("Remove from AgentWitch", role: .destructive) {
                // Local UI stub: opens Connect so the user can manage computers on the web.
                controller.openConnectThisMac()
            }
        } message: {
            Text("Disconnects all projects here. Your files and History stay on this computer.")
        }
    }

    private var header: some View {
        HStack {
            Image(systemName: "slider.horizontal.3")
                .foregroundStyle(MacAppTheme.accent)
            Text("Settings")
                .font(.title2.bold())
            Spacer()
        }
    }

    private var accountSection: some View {
        settingsCard("Account") {
            VStack(alignment: .leading, spacing: 8) {
                Text(controller.bootstrapState == nil && controller.state != .notInstalled
                     ? "Signed in on this computer"
                     : "Sign in to connect this Mac…")
                    .font(.subheadline)
                Text(controller.statusMessage)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                HStack {
                    Button("Open Connect this Mac…") {
                        controller.openConnectThisMac()
                    }
                    Button("Open AgentWitch") {
                        controller.openLocalStatus()
                    }
                }
            }
        }
    }

    private var thisComputerSection: some View {
        settingsCard("This computer") {
            VStack(alignment: .leading, spacing: 8) {
                LabeledContent("Computer name") {
                    Text(store.computerName)
                }
                Text("Shown in AgentWitch on the web.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Button("Open Computer") {
                    NotificationCenter.default.post(name: .awlOpenWindow, object: MacAppWindowID.computer.rawValue)
                }
            }
        }
    }

    private var historySection: some View {
        settingsCard("History") {
            VStack(alignment: .leading, spacing: 10) {
                Toggle("Save History on this computer", isOn: $store.historyEnabled)
                Text("Past tasks stay on this computer only.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Picker("Keep for", selection: $store.historyKeepDays) {
                    ForEach(keepOptions, id: \.self) { days in
                        Text("\(days) days").tag(days)
                    }
                }
                .pickerStyle(.menu)
                Text("Older tasks are removed by themselves.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Button("Open History") {
                    NotificationCenter.default.post(name: .awlOpenWindow, object: MacAppWindowID.history.rawValue)
                }
            }
        }
    }

    private var launchSection: some View {
        settingsCard("Startup") {
            Toggle(
                "Launch at login",
                isOn: Binding(
                    get: { controller.launchesAtLogin },
                    set: { controller.toggleLaunchAtLogin($0) }
                )
            )
            Text(controller.launchesAtLogin ? "Opens at login" : "Will not open at login")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
    }

    private var updatesSection: some View {
        settingsCard("Updates") {
            VStack(alignment: .leading, spacing: 10) {
                if let offer = controller.updateOffer {
                    Text(updateAvailableTitle(version: offer.version))
                        .font(.subheadline.weight(.semibold))
                    Button("Download update") {
                        controller.openUpdate()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.accent)
                } else {
                    Text("You are up to date (\(MacAppConstants.appVersion)).")
                        .font(.subheadline)
                }
                Toggle("Update by itself", isOn: $store.autoUpdate)
                Text("Downloads in the background and asks before restarting.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                // HARD: always show Download AWL even when connected / running / update offer present.
                DownloadAwlLink(style: .prominent)
                Text("Get AgentWitch Local for this or another Mac.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var diagnosticsSection: some View {
        settingsCard("Diagnostics") {
            VStack(alignment: .leading, spacing: 8) {
                LabeledContent("Status") {
                    Text(controller.statusMessage)
                }
                LabeledContent("Runtime") {
                    Text(String(describing: controller.state))
                }
                Button("View logs") {
                    controller.openLogs()
                }
                Text("Export diagnostics.zip is not wired in this tip.")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var removeSection: some View {
        settingsCard("Remove this computer") {
            VStack(alignment: .leading, spacing: 8) {
                Text("Remove from AgentWitch")
                    .font(.subheadline.weight(.semibold))
                Text("Disconnects all projects here. Your files and History stay on this computer.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Button("Remove this computer", role: .destructive) {
                    showRemoveConfirm = true
                }
            }
        }
    }

    private func settingsCard<Content: View>(_ title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.headline)
            content()
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.white)
                .shadow(color: .black.opacity(0.04), radius: 4, y: 1)
        )
    }
}
